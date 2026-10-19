import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  Building2, 
  Search, 
  Plus, 
  ShieldCheck, 
  EyeOff, 
  Bell, 
  Database, 
  Sparkles,
  CalendarClock,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { 
    isAgentMode, 
    setIsAgentMode, 
    searchQuery, 
    setSearchQuery, 
    setIsCreateModalOpen,
    setIsBackupModalOpen,
    stats,
    reservations,
    rentals,
    setCurrentView
  } = useRealEstate();

  const [showNotifications, setShowNotifications] = useState(false);

  // Urgent alerts
  const urgentReservations = reservations.filter(r => {
    if (r.status !== 'Activa' && r.status !== 'En verificación') return false;
    const diff = Math.ceil((new Date(r.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff <= 5 && diff >= 0;
  });

  const totalAlerts = urgentReservations.length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">InmoPanel</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Agencias
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Gestión Inmobiliaria & Equipo</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código (ej. CAS-101), dirección, barrio o dueño..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AGENT MODE TOGGLE (Key feature!) */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsAgentMode(!isAgentMode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shadow-sm ${
                  isAgentMode 
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                }`}
                title={isAgentMode ? "Modo Agente Activo: Llaves, datos de dueño y comisiones visibles" : "Modo Cliente Activo: Información confidencial oculta para mostrar al cliente"}
              >
                {isAgentMode ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span className="hidden lg:inline">Modo Agente:</span>
                    <span className="font-bold">Datos Privados ON</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-emerald-600" />
                    <span className="hidden lg:inline">Modo Presentación:</span>
                    <span className="font-bold">Cliente Seguro</span>
                  </>
                )}
              </button>
            </div>

            {/* Notifications Alert Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Alertas y Notificaciones"
              >
                <Bell className="w-5 h-5" />
                {totalAlerts > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Alertas de Vencimiento</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                      {totalAlerts} pendientes
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto px-2 py-2 space-y-1.5">
                    {urgentReservations.length === 0 ? (
                      <p className="text-xs text-slate-500 p-3 text-center">No hay reservas ni vencimientos urgentes esta semana.</p>
                    ) : (
                      urgentReservations.map(res => (
                        <div 
                          key={res.id} 
                          onClick={() => {
                            setCurrentView('reservations');
                            setShowNotifications(false);
                          }}
                          className="p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200 cursor-pointer transition-all"
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                            <CalendarClock className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Reserva por vencer: {res.propertyRef}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5">Cliente: {res.clientName} (Vence el {res.expirationDate})</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Backup / Export Button */}
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Copias de Seguridad y Datos"
            >
              <Database className="w-5 h-5" />
            </button>

            {/* Add Property Button */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Propiedad</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
