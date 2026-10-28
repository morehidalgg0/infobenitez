import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { StatusBadge, OperationBadge } from '../common/Badge';
import { 
  Building2, 
  Home, 
  BookmarkCheck, 
  KeyRound, 
  DollarSign, 
  AlertTriangle, 
  ArrowRight, 
  Plus, 
  Key, 
  UserCheck, 
  Calendar,
  CalendarDays,
  Eye,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { photoOf, initialsAvatar } from '../../utils/placeholders';

export const DashboardOverview = () => {
  const { 
    properties, 
    reservations, 
    rentals, 
    agents,
    stats, 
    setCurrentView, 
    setSelectedPropertyForDetail,
    setIsCreateModalOpen,
    setIsReservationModalOpen,
    setIsRentalModalOpen,
    isAgentMode
  } = useRealEstate();

  // Find urgent reservations (< 5 days)
  const urgentReservations = reservations.filter(r => {
    if (r.status !== 'Activa' && r.status !== 'En verificación') return false;
    const diff = Math.ceil((new Date(r.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diff <= 5;
  });

  // Recent available properties
  const recentAvailable = properties
    .filter(p => p.status === 'Disponible')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Panel de Control Inmobiliario</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Gestión Centralizada de Inmuebles & Operaciones
          </h1>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Supervisa el inventario de casas disponibles, controla señas y reservas al instante, administra los contratos de alquiler y accede a los datos confidenciales de llaves y dueños para tus agentes.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Publicar Nueva Propiedad</span>
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all backdrop-blur-sm"
            >
              <CalendarDays className="w-4 h-4 text-indigo-300" />
              <span>Calendario de Alquileres</span>
            </button>
            <button
              onClick={() => setCurrentView('keys')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-semibold text-sm transition-all border border-amber-400/30 backdrop-blur-sm"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>Control de Llaves & Alarma</span>
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Alert Banner (if any) */}
      {urgentReservations.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-amber-950 text-sm">
                Atención: {urgentReservations.length} reserva(s) por vencer próximamente
              </h3>
              <p className="text-xs text-amber-800">
                Verifica el estado con el cliente y el propietario para confirmar boleto o liberar la propiedad.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('reservations')}
            className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm shrink-0"
          >
            Ver Reservas
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Disponibles */}
        <div 
          onClick={() => setCurrentView('properties')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Casas Disponibles</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Home className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.availableCount}</span>
            <span className="text-xs text-slate-500">inmuebles activos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
            <span>Listos para comercializar</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Reservas Activas */}
        <div 
          onClick={() => setCurrentView('reservations')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Reservas / Señas</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookmarkCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.activeReservationsCount}</span>
            <span className="text-xs text-slate-500">en proceso</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-600 font-semibold">
            <span>{urgentReservations.length > 0 ? `${urgentReservations.length} por vencer` : 'Plazos en orden'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Alquileres Activos */}
        <div 
          onClick={() => setCurrentView('rentals')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Alquileres Vigentes</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <KeyRound className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.activeRentalsCount}</span>
            <span className="text-xs text-slate-500">contratos activos</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
            <span>Control de pagos e IPC</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Cartera Total USD */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cartera Activa (USD)</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              ${(stats.totalPortfolioUSD / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-slate-500">en venta</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Comisión aprox. (3.5%):</span>
            <span className="font-bold text-indigo-600">
              ${((stats.totalPortfolioUSD * 0.035) / 1000).toFixed(1)}k USD
            </span>
          </div>
        </div>

      </div>

      {/* Two-column layout: Recent Available Properties & Active Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Propiedades Disponibles Recientes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Casas & Propiedades Destacadas</h2>
              <p className="text-xs text-slate-500">Últimas propiedades disponibles en cartera</p>
            </div>
            <button
              onClick={() => setCurrentView('properties')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Ver todas ({properties.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentAvailable.map((prop) => (
              <div
                key={prop.id}
                onClick={() => setSelectedPropertyForDetail(prop)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={photoOf(prop)}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <OperationBadge operation={prop.operationType} />
                      <StatusBadge status={prop.status} />
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono text-white font-bold">
                      {prop.refCode}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-md px-3 py-1 rounded-xl text-white font-extrabold text-sm">
                      {prop.pricing.currency === 'USD' ? 'USD ' : '$ '}
                      {prop.pricing.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {prop.location.address}, {prop.location.neighborhood}
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                      <span><strong>{prop.features.rooms}</strong> amb</span>
                      <span>•</span>
                      <span><strong>{prop.features.bedrooms}</strong> dorm</span>
                      <span>•</span>
                      <span><strong>{prop.features.totalArea}</strong> m²</span>
                    </div>

                    {/* Agent Confidential Preview if in Agent Mode */}
                    {isAgentMode && prop.agentData && (
                      <div className="mt-3 p-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px]">
                        <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
                          <Key className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="line-clamp-1">Llaves: {prop.agentData.keyLocation}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between text-slate-600 text-[10px]">
                          <span>Dueño: <strong>{prop.agentData.owner?.name?.split(' ')[0]}</strong></span>
                          <span>Comisión: <strong>{prop.agentData.commission?.ratePercent}%</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 transition-colors flex items-center justify-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Ficha Completa</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Reservas Activas & Accesos Rápidos */}
        <div className="space-y-6">
          
          {/* Active Reservations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-sm text-slate-900">Reservas en Curso</h3>
              </div>
              <button
                onClick={() => setCurrentView('reservations')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Ver todas
              </button>
            </div>

            <div className="space-y-3">
              {reservations.slice(0, 3).map((res) => {
                const diffDays = Math.ceil((new Date(res.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
                const isUrgent = diffDays <= 5 && diffDays >= 0;

                return (
                  <div 
                    key={res.id}
                    className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{res.propertyRef}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isUrgent ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {diffDays >= 0 ? `${diffDays} días restantes` : 'Vencida'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium mt-1">
                      Cliente: {res.clientName}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Seña: <strong>{res.currency} {res.reservationAmount.toLocaleString()}</strong></span>
                      <span>Agente: {res.agentName?.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsReservationModalOpen(true)}
              className="mt-4 w-full py-2 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Registrar Nueva Seña / Reserva</span>
            </button>
          </div>

          {/* Quick Team Status */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900">Agentes Inmobiliarios</h3>
              <button
                onClick={() => setCurrentView('agents')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                Directorio
              </button>
            </div>
            <div className="space-y-2.5">
              {agents.slice(0, 4).map((ag) => {
                const assignedProps = properties.filter(p => p.agentData?.assignedAgentId === ag.id);
                return (
                  <div key={ag.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={ag.avatar || initialsAvatar(ag.name)} alt={ag.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-slate-800">{ag.name}</p>
                        <p className="text-[10px] text-slate-500">{ag.role}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {assignedProps.length} prop.
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
