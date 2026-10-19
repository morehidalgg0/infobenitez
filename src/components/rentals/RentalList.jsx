import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  KeyRound, 
  Calendar, 
  User, 
  Phone, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Clock, 
  DollarSign,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export const RentalList = () => {
  const { 
    rentals, 
    updateRental, 
    deleteRental, 
    setIsRentalModalOpen, 
    setSelectedPropertyForDetail, 
    properties,
    changePropertyStatus
  } = useRealEstate();

  const handleTogglePayment = (rental) => {
    const nextStatus = rental.paymentStatusCurrentMonth === 'Al día' 
      ? 'Pendiente' 
      : rental.paymentStatusCurrentMonth === 'Pendiente' 
      ? 'Atrasado' 
      : 'Al día';
    updateRental(rental.id, { paymentStatusCurrentMonth: nextStatus });
  };

  const handleEndContract = (rental) => {
    if (window.confirm(`¿Deseas finalizar este contrato de alquiler? La propiedad ${rental.propertyRef} volverá a estar Disponible.`)) {
      changePropertyStatus(rental.propertyId, 'Disponible');
      deleteRental(rental.id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Alquileres & Contratos Activos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Administración de contratos de locación, estado de pagos del mes, métodos de ajuste (IPC/ICL) y garantes.
          </p>
        </div>

        <button
          onClick={() => setIsRentalModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-200 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Contrato</span>
        </button>
      </div>

      {/* Rentals List */}
      {rentals.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mx-auto">
            <KeyRound className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No hay contratos de alquiler activos</h3>
            <p className="text-xs text-slate-500 mt-1">
              Registra los contratos vigentes para llevar el control de vencimientos y ajustes.
            </p>
          </div>
          <button
            onClick={() => setIsRentalModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Cargar Primer Contrato</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {rentals.map((rental) => {
            const prop = properties.find(p => p.id === rental.propertyId);
            const today = new Date();
            const expDate = new Date(rental.contractEnd);
            const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
            const isNearExpiration = diffDays <= 60 && diffDays >= 0;

            return (
              <div
                key={rental.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm hover:shadow-md transition-all"
              >
                
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                      {rental.propertyRef}
                    </span>
                    <h3 
                      onClick={() => prop && setSelectedPropertyForDetail(prop)}
                      className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1 mt-1"
                    >
                      {rental.propertyTitle}
                    </h3>
                  </div>

                  {/* Payment toggle badge */}
                  <button
                    onClick={() => handleTogglePayment(rental)}
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                      rental.paymentStatusCurrentMonth === 'Al día'
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : rental.paymentStatusCurrentMonth === 'Pendiente'
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                    title="Haz clic para alternar el estado de pago del mes"
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      rental.paymentStatusCurrentMonth === 'Al día' ? 'bg-emerald-500' : rental.paymentStatusCurrentMonth === 'Pendiente' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    <span>Mes: {rental.paymentStatusCurrentMonth}</span>
                  </button>
                </div>

                {/* Canon & Adjustment */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Canon Mensual</span>
                    <div className="text-base font-extrabold text-slate-900 mt-0.5">
                      {rental.currency === 'USD' ? 'USD ' : '$ '}
                      {rental.monthlyRent?.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-indigo-700 font-semibold flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {rental.indexationMethod || "Ajuste Trimestral"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Vigencia del Contrato</span>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">
                      {rental.contractStart} al {rental.contractEnd}
                    </div>
                    <div className="text-[10px] mt-1 font-semibold">
                      {isNearExpiration ? (
                        <span className="text-amber-700 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Vence en {diffDays} días (renovar)
                        </span>
                      ) : diffDays < 0 ? (
                        <span className="text-rose-600">Contrato Vencido</span>
                      ) : (
                        <span className="text-slate-500">Restan {diffDays} días</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tenant & Guarantor */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Inquilino: {rental.tenantName}</span>
                    </div>
                    {rental.tenantPhone && (
                      <a
                        href={`https://wa.me/${rental.tenantPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{rental.tenantPhone}</span>
                      </a>
                    )}
                  </div>

                  {rental.guarantors && rental.guarantors.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Garantías presentadas
                      </span>
                      {rental.guarantors.map((g, idx) => (
                        <div key={idx} className="text-[11px] text-slate-700 flex items-center justify-between">
                          <span>• {g.name} ({g.type})</span>
                          {g.phone && <span className="text-slate-500">{g.phone}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  {rental.notes && (
                    <p className="text-[11px] text-slate-500 italic">
                      "{rental.notes}"
                    </p>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Agente: <strong>{rental.agentName}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEndContract(rental)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Finalizar contrato y liberar propiedad"
                    >
                      Finalizar Contrato
                    </button>
                    <button
                      onClick={() => deleteRental(rental.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
