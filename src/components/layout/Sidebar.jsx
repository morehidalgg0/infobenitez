import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  LayoutDashboard, 
  Home, 
  BookmarkCheck, 
  KeyRound, 
  CalendarDays,
  Key,
  Users, 
  HardDriveDownload,
  ShieldAlert,
  ShieldCheck,
  Wallet
} from 'lucide-react';

// Secciones del menú (las usa también la navegación del celular)
export const useNavItems = () => {
  const { stats, isAdmin } = useRealEstate();
  return [
    {
      id: 'dashboard',
      label: 'Panel General',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'properties',
      label: 'Casas & Propiedades',
      icon: Home,
      badge: stats.availableCount,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'calendar',
      label: 'Calendario Alquileres',
      icon: CalendarDays,
      badge: 'Visual',
      badgeColor: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 'reservations',
      label: 'Reservas & Señas',
      icon: BookmarkCheck,
      // Para la administración, se destacan los contratos que esperan aprobación
      badge: isAdmin && stats.pendingContractsCount > 0 ? `${stats.pendingContractsCount} por aprobar` : stats.activeReservationsCount,
      badgeColor: (isAdmin && stats.pendingContractsCount > 0) || stats.urgentReservationsCount > 0 ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-700'
    },
    {
      id: 'rentals',
      label: 'Alquileres & Contratos',
      icon: KeyRound,
      badge: stats.activeRentalsCount,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'keys',
      label: 'Control Llaves & Alarma',
      icon: Key,
      badge: stats.keysCheckedOutCount > 0 ? `${stats.keysCheckedOutCount} en uso` : null,
      badgeColor: 'bg-amber-100 text-amber-900 font-bold'
    },
    {
      id: 'finance',
      label: isAdmin ? 'Ingresos & Egresos' : 'Mis Ingresos & Egresos',
      icon: Wallet,
      badge: null
    },
    {
      id: 'agents',
      label: 'Equipo de Agentes',
      icon: Users,
      badge: null
    }
  ];
};

export const Sidebar = () => {
  const { 
    currentView, 
    setCurrentView, 
    isAgentMode, 
    setIsBackupModalOpen,
    isAdmin
  } = useRealEstate();
  const navItems = useNavItems();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between p-4 shrink-0 h-[calc(100vh-4rem)] sticky top-16">
      
      {/* Navigation menu */}
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Gestión Operativa
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools (solo administración: el respaldo incluye cuentas y finanzas) */}
        {isAdmin && (
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Herramientas & Datos
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              <HardDriveDownload className="w-4 h-4 text-slate-400" />
              <span>Copia de Seguridad</span>
            </button>
          </nav>
        </div>
        )}
      </div>

      {/* Mode Status Card at Bottom */}
      <div className={`p-3.5 rounded-2xl border text-xs ${
        isAgentMode 
          ? 'bg-amber-50/70 border-amber-200 text-amber-900' 
          : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
      }`}>
        <div className="flex items-center gap-2 font-bold mb-1">
          {isAgentMode ? (
            <>
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Modo Agente Habilitado</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Modo Seguro Cliente</span>
            </>
          )}
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          {isAgentMode 
            ? 'Llaves, contraseñas de alarma, comisiones y manuales internos visibles.'
            : 'Fichas limpias activas para proyectar en reuniones con clientes sin revelar datos sensibles.'}
        </p>
      </div>

    </aside>
  );
};
