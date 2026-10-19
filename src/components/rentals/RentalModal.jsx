import React, { useState, useEffect } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  X, 
  KeyRound, 
  DollarSign, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export const RentalModal = () => {
  const { 
    isRentalModalOpen, 
    setIsRentalModalOpen, 
    rentalTargetProperty, 
    setRentalTargetProperty,
    properties, 
    agents, 
    addRental 
  } = useRealEstate();

  const rentalProps = properties.filter(
    p => p.id === rentalTargetProperty?.id || (p.operationType.includes('Alquiler') && (p.status === 'Disponible' || p.status === 'Reservada'))
  );

  const [formData, setFormData] = useState({
    propertyId: '',
    tenantName: '',
    tenantPhone: '',
    tenantEmail: '',
    tenantDni: '',
    contractStart: new Date().toISOString().split('T')[0],
    contractEnd: '',
    monthlyRent: 800000,
    currency: 'ARS',
    indexationMethod: 'Ajuste Trimestral por IPC',
    guarantorName: '',
    guarantorPhone: '',
    guarantorType: 'Seguro de Caución Finaer',
    agentId: '',
    notes: ''
  });

  useEffect(() => {
    // 2 years default contract
    const start = new Date();
    const end = new Date();
    end.setFullYear(end.getFullYear() + 2);

    if (rentalTargetProperty) {
      setFormData({
        propertyId: rentalTargetProperty.id,
        tenantName: '',
        tenantPhone: '',
        tenantEmail: '',
        tenantDni: '',
        contractStart: start.toISOString().split('T')[0],
        contractEnd: end.toISOString().split('T')[0],
        monthlyRent: rentalTargetProperty.pricing?.price || 500000,
        currency: rentalTargetProperty.pricing?.currency || 'ARS',
        indexationMethod: 'Ajuste Trimestral por IPC',
        guarantorName: '',
        guarantorPhone: '',
        guarantorType: 'Seguro de Caución Finaer',
        agentId: rentalTargetProperty.agentData?.assignedAgentId || agents[0]?.id || '',
        notes: ''
      });
    } else {
      setFormData({
        propertyId: rentalProps[0]?.id || '',
        tenantName: '',
        tenantPhone: '',
        tenantEmail: '',
        tenantDni: '',
        contractStart: start.toISOString().split('T')[0],
        contractEnd: end.toISOString().split('T')[0],
        monthlyRent: 750000,
        currency: 'ARS',
        indexationMethod: 'Ajuste Trimestral por IPC',
        guarantorName: '',
        guarantorPhone: '',
        guarantorType: 'Seguro de Caución Finaer',
        agentId: agents[0]?.id || '',
        notes: ''
      });
    }
  }, [rentalTargetProperty, isRentalModalOpen, agents]);

  if (!isRentalModalOpen) return null;

  const handleClose = () => {
    setIsRentalModalOpen(false);
    setRentalTargetProperty(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetProp = properties.find(p => p.id === formData.propertyId);
    if (!targetProp) {
      alert('Por favor selecciona una propiedad para el contrato');
      return;
    }

    const assignedAgent = agents.find(a => a.id === formData.agentId);

    const guarantors = formData.guarantorName ? [
      {
        name: formData.guarantorName,
        phone: formData.guarantorPhone,
        type: formData.guarantorType
      }
    ] : [];

    addRental({
      propertyId: formData.propertyId,
      propertyRef: targetProp.refCode,
      propertyTitle: targetProp.title,
      tenantName: formData.tenantName,
      tenantPhone: formData.tenantPhone,
      tenantEmail: formData.tenantEmail,
      tenantDni: formData.tenantDni,
      contractStart: formData.contractStart,
      contractEnd: formData.contractEnd,
      monthlyRent: Number(formData.monthlyRent),
      currency: formData.currency,
      indexationMethod: formData.indexationMethod,
      guarantors,
      agentId: formData.agentId,
      agentName: assignedAgent ? assignedAgent.name : 'Agente',
      notes: formData.notes
    });

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-blue-500/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Registrar Contrato de Alquiler</h2>
              <p className="text-xs text-slate-500">
                La propiedad pasará automáticamente al estado "Alquilada".
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
            <label className="block text-slate-700 font-semibold mb-1">Inmueble a Alquilar *</label>
            <select
              required
              value={formData.propertyId}
              onChange={(e) => {
                const selected = properties.find(p => p.id === e.target.value);
                setFormData(prev => ({
                  ...prev,
                  propertyId: e.target.value,
                  monthlyRent: selected?.pricing.price || prev.monthlyRent,
                  currency: selected?.pricing.currency || prev.currency,
                  agentId: selected?.agentData?.assignedAgentId || prev.agentId
                }));
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-900"
            >
              {rentalProps.length === 0 ? (
                <option value="">No hay inmuebles disponibles para alquiler</option>
              ) : (
                rentalProps.map(prop => (
                  <option key={prop.id} value={prop.id}>
                    [{prop.refCode}] {prop.title} - {prop.pricing.currency} {prop.pricing.price.toLocaleString()} ({prop.status})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Tenant Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Datos del Inquilino / Locatario</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nombre y Apellido *</label>
                <input
                  type="text"
                  required
                  value={formData.tenantName}
                  onChange={(e) => setFormData(p => ({ ...p, tenantName: e.target.value }))}
                  placeholder="Ej. Gonzalo Echeverría"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={formData.tenantPhone}
                  onChange={(e) => setFormData(p => ({ ...p, tenantPhone: e.target.value }))}
                  placeholder="+54 9 11 ..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={formData.tenantEmail}
                  onChange={(e) => setFormData(p => ({ ...p, tenantEmail: e.target.value }))}
                  placeholder="inquilino@email.com"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">DNI / Pasaporte</label>
                <input
                  type="text"
                  value={formData.tenantDni}
                  onChange={(e) => setFormData(p => ({ ...p, tenantDni: e.target.value }))}
                  placeholder="35.888.999"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Values & Period */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Moneda</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData(p => ({ ...p, currency: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
              >
                <option value="ARS">ARS ($)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Valor Mensual *</label>
              <input
                type="number"
                required
                value={formData.monthlyRent}
                onChange={(e) => setFormData(p => ({ ...p, monthlyRent: Number(e.target.value) }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Fecha Inicio *</label>
              <input
                type="date"
                required
                value={formData.contractStart}
                onChange={(e) => setFormData(p => ({ ...p, contractStart: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Fecha Fin *</label>
              <input
                type="date"
                required
                value={formData.contractEnd}
                onChange={(e) => setFormData(p => ({ ...p, contractEnd: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-blue-900"
              />
            </div>
          </div>

          {/* Indexation Method */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Método de Ajuste / Indexación</label>
            <select
              value={formData.indexationMethod}
              onChange={(e) => setFormData(p => ({ ...p, indexationMethod: e.target.value }))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-800"
            >
              <option value="Ajuste Trimestral por IPC">Ajuste Trimestral por IPC (Inflación)</option>
              <option value="Ajuste Cuatrimestral por IPC">Ajuste Cuatrimestral por IPC</option>
              <option value="Ajuste Semestral por ICL">Ajuste Semestral por ICL (Banco Central)</option>
              <option value="Fijo en Dólares (USD)">Fijo en Dólares (USD)</option>
              <option value="Ajuste Anual">Ajuste Anual</option>
            </select>
          </div>

          {/* Guarantor Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Garantía Aprobada
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tipo de Garantía</label>
                <select
                  value={formData.guarantorType}
                  onChange={(e) => setFormData(p => ({ ...p, guarantorType: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 text-xs"
                >
                  <option value="Seguro de Caución Finaer">Seguro de Caución Finaer</option>
                  <option value="Garantía Propietaria CABA/PBA">Garantía Propietaria</option>
                  <option value="Recibos de Sueldo / Garantes">Recibos de Sueldo</option>
                  <option value="Depósito en Garantía USD">Depósito en Garantía USD</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nombre / Entidad Garante</label>
                <input
                  type="text"
                  value={formData.guarantorName}
                  onChange={(e) => setFormData(p => ({ ...p, guarantorName: e.target.value }))}
                  placeholder="Ej. Finaer Seguros / Carlos Echeverría"
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Teléfono Garante</label>
                <input
                  type="text"
                  value={formData.guarantorPhone}
                  onChange={(e) => setFormData(p => ({ ...p, guarantorPhone: e.target.value }))}
                  placeholder="+54 9 11 ..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-2 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Agente responsable */}
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Agente Administrador del Contrato</label>
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 transition-all active:scale-95"
            >
              Registrar Contrato & Marcar Alquilada
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
