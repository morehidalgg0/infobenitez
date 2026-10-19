import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  BookmarkCheck, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  AlertTriangle,
  Building2,
  Trash2,
  ExternalLink
} from 'lucide-react';

export const ReservationList = () => {
  const { 
    reservations, 
    completeReservation, 
    deleteReservation,
    setIsReservationModalOpen, 
    setSelectedPropertyForDetail,
    properties,
    setRentalTargetProperty,
    setIsRentalModalOpen
  } = useRealEstate();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Control de Reservas & Señas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Seguimiento de ofertas formales, señas recibidas, plazos de vigencia y pase a cierre de contratos.
          </p>
        </div>

        <button
          onClick={() => setIsReservationModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-all shadow-md shadow-amber-200 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nueva Seña</span>
        </button>
      </div>

      {/* Cards Grid */}
      {reservations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <BookmarkCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No hay reservas registradas</h3>
            <p className="text-xs text-slate-500 mt-1">
              Cuando un cliente señe una propiedad disponible, regístrala aquí para reservar el inmueble.
            </p>
          </div>
          <button
            onClick={() => setIsReservationModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Cargar Primera Reserva</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {reservations.map((res) => {
            const prop = properties.find(p => p.id === res.propertyId);
            const today = new Date();
            const expDate = new Date(res.expirationDate);
            const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
            const isUrgent = diffDays <= 5 && diffDays >= 0 && (res.status === 'Activa' || res.status === 'En verificación');
            const isExpired = diffDays < 0 && (res.status === 'Activa' || res.status === 'En verificación');

            return (
              <div 
                key={res.id}
                className={`bg-white rounded-2xl border p-5 space-y-4 shadow-sm transition-all ${
                  isUrgent 
                    ? 'border-amber-300 ring-2 ring-amber-400/20' 
                    : res.status === 'Concretada'
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-slate-200'
                }`}
              >
                
                {/* Card Top: Property reference + status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                        {res.propertyRef}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {res.receiptNumber}
                      </span>
                    </div>
                    <h3 
                      onClick={() => prop && setSelectedPropertyForDetail(prop)}
                      className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1"
                    >
                      {res.propertyTitle}
                    </h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                    res.status === 'Concretada'
                      ? 'bg-emerald-100 text-emerald-800'
                      : res.status === 'Cancelada'
                      ? 'bg-rose-100 text-rose-800'
                      : isUrgent
                      ? 'bg-amber-100 text-amber-800 animate-pulse'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {res.status}
                  </span>
                </div>

                {/* Reservation Amount & Expiration date */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Monto de Seña</span>
                    <div className="text-base font-extrabold text-slate-900 mt-0.5">
                      {res.currency} {res.reservationAmount?.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500">Seña / Compromiso</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Vigencia Límite</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {res.expirationDate}
                    </div>
                    <div className="text-[10px] mt-0.5">
                      {res.status === 'Concretada' ? (
                        <span className="text-emerald-600 font-bold">Operación cerrada</span>
                      ) : res.status === 'Cancelada' ? (
                        <span className="text-rose-600 font-bold">Reserva anulada</span>
                      ) : isExpired ? (
                        <span className="text-rose-600 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Plazo vencido
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold">
                          Quedan {diffDays} días para firmar
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client info & Agent */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{res.clientName}</span>
                    </div>
                    {res.clientPhone && (
                      <a 
                        href={`https://wa.me/${res.clientPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{res.clientPhone}</span>
                      </a>
                    )}
                  </div>

                  {res.conditionsNotes && (
                    <p className="text-slate-600 text-[11px] bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 italic">
                      "{res.conditionsNotes}"
                    </p>
                  )}

                  <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between border-t border-slate-100">
                    <span>Agente a cargo: <strong>{res.agentName}</strong></span>
                    <span>Fecha reserva: {res.reservationDate}</span>
                  </div>
                </div>

                {/* Operations / Actions for active reservations */}
                {res.status !== 'Concretada' && res.status !== 'Cancelada' && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {prop?.operationType === 'Venta' ? (
                        <button
                          onClick={() => completeReservation(res.id, 'Vendida')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Concretar Venta</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            completeReservation(res.id, 'Alquilada');
                            if (prop) {
                              setRentalTargetProperty(prop);
                              setIsRentalModalOpen(true);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Concretar Alquiler</span>
                        </button>
                      )}

                      <button
                        onClick={() => completeReservation(res.id, 'Cancelada')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-semibold text-xs transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5 inline mr-1" />
                        <span>Cancelar Seña</span>
                      </button>
                    </div>

                    <button
                      onClick={() => deleteReservation(res.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
