import React, { useState, useEffect } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  X, 
  BookmarkCheck, 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  FileText 
} from 'lucide-react';

export const ReservationModal = () => {
  const { 
    isReservationModalOpen, 
    setIsReservationModalOpen, 
    reservationTargetProperty, 
    setReservationTargetProperty,
    properties, 
    agents, 
    addReservation 
  } = useRealEstate();

  // Available properties for reservation
  const availableProps = properties.filter(p => p.status === 'Disponible' || p.id === reservationTargetProperty?.id);

  const [formData, setFormData] = useState({
    propertyId: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientDni: '',
    reservationAmount: 5000,
    currency: 'USD',
    reservationDate: new Date().toISOString().split('T')[0],
    expirationDate: '',
    agentId: '',
    conditionsNotes: ''
  });

  useEffect(() => {
    // 14 days default expiration
    const defaultExp = new Date();
    defaultExp.setDate(defaultExp.getDate() + 14);
    const expStr = defaultExp.toISOString().split('T')[0];

    if (reservationTargetProperty) {
      setFormData({
        propertyId: reservationTargetProperty.id,
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientDni: '',
        reservationAmount: reservationTargetProperty.pricing.currency === 'USD' ? 5000 : 500000,
        currency: reservationTargetProperty.pricing.currency || 'USD',
        reservationDate: new Date().toISOString().split('T')[0],
        expirationDate: expStr,
        agentId: reservationTargetProperty.agentData?.assignedAgentId || agents[0]?.id || '',
        conditionsNotes: 'Seña ad-referéndum de la aceptación de la oferta de compra/alquiler.'
      });
    } else {
      setFormData({
        propertyId: availableProps[0]?.id || '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientDni: '',
        reservationAmount: 5000,
        currency: 'USD',
        reservationDate: new Date().toISOString().split('T')[0],
        expirationDate: expStr,
        agentId: agents[0]?.id || '',
        conditionsNotes: 'Seña ad-referéndum de la aceptación formal.'
      });
    }
  }, [reservationTargetProperty, isReservationModalOpen, agents]);

  if (!isReservationModalOpen) return null;

  const handleClose = () => {
    setIsReservationModalOpen(false);
    setReservationTargetProperty(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetProp = properties.find(p => p.id === formData.propertyId);
    if (!targetProp) {
      alert('Por favor selecciona una propiedad para reservar');
      return;
    }

    const assignedAgent = agents.find(a => a.id === formData.agentId);

    addReservation({
      ...formData,
      propertyRef: targetProp.refCode,
      propertyTitle: targetProp.title,
      agentName: assignedAgent ? assignedAgent.name : 'Agente',
      reservationAmount: Number(formData.reservationAmount)
    });

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-amber-500/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Tomar Reserva / Seña</h2>
              <p className="text-xs text-slate-500">
                La propiedad pasará automáticamente al estado "Reservada".
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Property Selector */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Inmueble a Reservar *</label>
            <select
              required
              value={formData.propertyId}
              onChange={(e) => {
                const selected = properties.find(p => p.id === e.target.value);
                setFormData(prev => ({
                  ...prev,
                  propertyId: e.target.value,
                  currency: selected?.pricing.currency || prev.currency,
                  agentId: selected?.agentData?.assignedAgentId || prev.agentId
                }));
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900"
            >
              {availableProps.length === 0 ? (
                <option value="">No hay propiedades disponibles</option>
              ) : (
                availableProps.map(prop => (
                  <option key={prop.id} value={prop.id}>
                    [{prop.refCode}] {prop.title} - {prop.pricing.currency} {prop.pricing.price.toLocaleString()} ({prop.operationType})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Client Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Datos del Comprador / Interesado</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData(p => ({ ...p, clientName: e.target.value }))}
                  placeholder="Ej. Ing. Martín Santillán"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={formData.clientPhone}
                  onChange={(e) => setFormData(p => ({ ...p, clientPhone: e.target.value }))}
                  placeholder="+54 9 11 ..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData(p => ({ ...p, clientEmail: e.target.value }))}
                  placeholder="cliente@email.com"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">DNI / Identificación</label>
                <input
                  type="text"
                  value={formData.clientDni}
                  onChange={(e) => setFormData(p => ({ ...p, clientDni: e.target.value }))}
                  placeholder="30.222.111"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Moneda</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData(p => ({ ...p, currency: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Monto de Seña *</label>
              <input
                type="number"
                required
                value={formData.reservationAmount}
                onChange={(e) => setFormData(p => ({ ...p, reservationAmount: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Fecha Reserva</label>
              <input
                type="date"
                required
                value={formData.reservationDate}
                onChange={(e) => setFormData(p => ({ ...p, reservationDate: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Vigencia Límite *</label>
              <input
                type="date"
                required
                value={formData.expirationDate}
                onChange={(e) => setFormData(p => ({ ...p, expirationDate: e.target.value }))}
                className="w-full bg-slate-50 border border-amber-300 rounded-xl p-2 font-bold text-amber-900"
              />
            </div>
          </div>

          {/* Agente responsable */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Agente que toma la reserva</label>
            <select
              value={formData.agentId}
              onChange={(e) => setFormData(p => ({ ...p, agentId: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-800"
            >
              {agents.map(ag => (
                <option key={ag.id} value={ag.id}>{ag.name} ({ag.role})</option>
              ))}
            </select>
          </div>

          {/* Conditions */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Condiciones de la Oferta / Notas</label>
            <textarea
              rows={2}
              value={formData.conditionsNotes}
              onChange={(e) => setFormData(p => ({ ...p, conditionsNotes: e.target.value }))}
              placeholder="Ej. Oferta sujeta a verificación de planos por escribanía antes del 22/10..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-200 transition-all active:scale-95"
            >
              Confirmar Seña & Reservar Inmueble
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
