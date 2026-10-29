import React, { useState } from 'react';
import { useRealEstate, ADMIN_USER_ID } from '../../context/RealEstateContext';
import { splitForMovement } from '../../utils/saleSplit';
import { X, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, formatMoney } from './financeUtils';

const today = () => new Date().toISOString().split('T')[0];

// Titular de la venta de una propiedad: el broker asignado, o la inmobiliaria si es de la dueña
const saleOwnerFor = (property, brokers) =>
  brokers.find(b => b.id === property?.agentData?.assignedAgentId)?.id || ADMIN_USER_ID;

// soldProperty: propiedad recién marcada como Vendida, para registrar su comisión
export const MovementModal = ({ movement, initialType = 'ingreso', soldProperty, onClose }) => {
  const { brokers, properties, isAdmin, currentUser, addMovement, updateMovement } = useRealEstate();

  const splitPercentFor = (userId) =>
    userId === ADMIN_USER_ID ? 100 : (brokers.find(b => b.id === userId)?.agencySplitPercent ?? currentUser.agencySplitPercent ?? 50);

  const [form, setForm] = useState(() => {
    if (movement) return { commissionMode: 'percent', ...movement };
    if (soldProperty) {
      const ownerId = isAdmin ? saleOwnerFor(soldProperty, brokers) : currentUser.id;
      return {
        userId: ownerId,
        type: 'ingreso',
        kind: 'venta',
        date: today(),
        concept: `Venta ${soldProperty.refCode} - ${soldProperty.title}`,
        category: 'Honorarios venta',
        currency: soldProperty.pricing?.currency || 'USD',
        amount: '',
        propertyId: soldProperty.id,
        propertyRef: soldProperty.refCode,
        salePrice: soldProperty.pricing?.price || '',
        commissionMode: 'percent',
        commissionPercent: soldProperty.agentData?.commission?.ratePercent ?? 3,
        commissionAmount: '',
        agencySplitPercent: splitPercentFor(ownerId),
        notes: ''
      };
    }
    const ownerId = isAdmin ? ADMIN_USER_ID : currentUser.id;
    const isBroker = ownerId !== ADMIN_USER_ID;
    return {
      userId: ownerId,
      type: initialType,
      kind: isBroker && initialType === 'ingreso' ? 'venta' : 'general',
      date: today(),
      concept: '',
      category: initialType === 'ingreso' ? (isBroker ? 'Honorarios venta' : INCOME_CATEGORIES[0]) : EXPENSE_CATEGORIES[0],
      currency: 'USD',
      amount: '',
      propertyId: '',
      propertyRef: '',
      salePrice: '',
      commissionMode: 'percent',
      commissionPercent: 3,
      commissionAmount: '',
      agencySplitPercent: splitPercentFor(ownerId),
      notes: ''
    };
  });

  const set = (fields) => setForm(prev => ({ ...prev, ...fields }));
  const ownerIsBroker = form.userId !== ADMIN_USER_ID;
  const isSale = form.type === 'ingreso' && form.kind === 'venta';
  const byAmount = form.commissionMode === 'amount';
  const split = splitForMovement(form);
  // % equivalente cuando se carga el monto exacto
  const effectivePercent = Number(form.salePrice) > 0 ? Math.round(split.commissionTotal / Number(form.salePrice) * 10000) / 100 : 0;

  const handleOwnerChange = (userId) => {
    set({ userId, agencySplitPercent: splitPercentFor(userId) });
  };

  const handleTypeChange = (type) => {
    set({
      type,
      kind: type === 'ingreso' && (ownerIsBroker || soldProperty) ? 'venta' : 'general',
      category: type === 'ingreso' ? (ownerIsBroker ? 'Honorarios venta' : INCOME_CATEGORIES[0]) : EXPENSE_CATEGORIES[0]
    });
  };

  const handlePropertyChange = (propertyId) => {
    const prop = properties.find(p => p.id === propertyId);
    if (!prop) {
      set({ propertyId: '', propertyRef: '' });
      return;
    }
    set({
      propertyId,
      propertyRef: prop.refCode,
      concept: form.concept || `Venta ${prop.refCode} - ${prop.title}`,
      salePrice: prop.pricing?.price || form.salePrice,
      currency: prop.pricing?.currency || form.currency,
      commissionPercent: prop.agentData?.commission?.ratePercent ?? form.commissionPercent,
      ...(isAdmin && !movement ? { userId: saleOwnerFor(prop, brokers), agencySplitPercent: splitPercentFor(saleOwnerFor(prop, brokers)) } : {})
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      kind: isSale ? 'venta' : 'general',
      category: isSale ? 'Honorarios venta' : form.category,
      amount: isSale ? split.commissionTotal : Number(form.amount) || 0,
      salePrice: isSale ? Number(form.salePrice) || 0 : undefined,
      commissionMode: isSale ? form.commissionMode : undefined,
      commissionPercent: isSale ? (byAmount ? effectivePercent : Number(form.commissionPercent) || 0) : undefined,
      commissionAmount: isSale && byAmount ? Number(form.commissionAmount) || 0 : undefined,
      agencySplitPercent: isSale ? (ownerIsBroker ? Number(form.agencySplitPercent) || 0 : 100) : undefined
    };
    if (movement) updateMovement(movement.id, data);
    else addMovement(data);
    onClose();
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium';
  const categories = form.type === 'ingreso' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              {movement ? 'Editar movimiento' : soldProperty ? 'Registrar comisión de la venta' : 'Registrar movimiento'}
            </h3>
            {soldProperty && (
              <p className="text-[11px] text-slate-500 mt-0.5">
                {soldProperty.refCode} quedó como Vendida. Confirmá el precio final y cuánto se cobró de honorarios.
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">

          {isAdmin && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Titular del movimiento</label>
              <select value={form.userId} onChange={(e) => handleOwnerChange(e.target.value)} className={inputCls}>
                <option value={ADMIN_USER_ID}>Inmobiliaria (propio)</option>
                {brokers.map(a => <option key={a.id} value={a.id}>Broker: {a.name}</option>)}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleTypeChange('ingreso')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold transition-all ${
                form.type === 'ingreso' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Ingreso
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange('egreso')}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border font-bold transition-all ${
                form.type === 'egreso' ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <TrendingDown className="w-4 h-4" /> Egreso
            </button>
          </div>

          {form.type === 'ingreso' && (
            <div className="flex gap-4 px-1">
              <label className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
                <input type="radio" checked={form.kind === 'venta'} onChange={() => set({ kind: 'venta' })} />
                Venta / operación
              </label>
              <label className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
                <input type="radio" checked={form.kind !== 'venta'} onChange={() => set({ kind: 'general', category: INCOME_CATEGORIES[1] })} />
                Otro ingreso
              </label>
            </div>
          )}

          {isSale && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Propiedad de la cartera (opcional)</label>
              <select value={form.propertyId || ''} onChange={(e) => handlePropertyChange(e.target.value)} className={inputCls}>
                <option value="">— Otra / no está en la cartera —</option>
                {properties.filter(p => p.operationType === 'Venta').map(p => (
                  <option key={p.id} value={p.id}>{p.refCode} · {p.title}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Concepto *</label>
              <input
                type="text"
                required
                value={form.concept}
                onChange={(e) => set({ concept: e.target.value })}
                placeholder={isSale ? 'Ej. Venta casa Martínez' : 'Ej. Publicación en portales'}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Fecha *</label>
              <input type="date" required value={form.date} onChange={(e) => set({ date: e.target.value })} className={inputCls} />
            </div>
          </div>

          {isSale ? (
            <>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Moneda</label>
                  <select value={form.currency} onChange={(e) => set({ currency: e.target.value })} className={inputCls}>
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Precio de venta *</label>
                  <input
                    type="number" min="0" step="0.01" required
                    value={form.salePrice}
                    onChange={(e) => set({ salePrice: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-700 font-semibold">Honorarios cobrados *</label>
                  <div className="flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => set({ commissionMode: 'percent', commissionPercent: byAmount ? effectivePercent : form.commissionPercent })}
                      className={`px-2 py-0.5 rounded-md ${!byAmount ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
                    >
                      Porcentaje
                    </button>
                    <button
                      type="button"
                      onClick={() => set({ commissionMode: 'amount', commissionAmount: byAmount ? form.commissionAmount : split.commissionTotal })}
                      className={`px-2 py-0.5 rounded-md ${byAmount ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
                    >
                      Monto exacto
                    </button>
                  </div>
                </div>
                {byAmount ? (
                  <input
                    type="number" min="0" step="0.01" required
                    value={form.commissionAmount}
                    onChange={(e) => set({ commissionAmount: e.target.value })}
                    placeholder={`Monto en ${form.currency}`}
                    className={inputCls}
                  />
                ) : (
                  <input
                    type="number" min="0" max="100" step="0.01" required
                    value={form.commissionPercent}
                    onChange={(e) => set({ commissionPercent: e.target.value })}
                    placeholder="%"
                    className={inputCls}
                  />
                )}
              </div>
              {ownerIsBroker && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">% para la inmobiliaria</label>
                  <input
                    type="number" min="0" max="100" step="0.01" required
                    value={form.agencySplitPercent}
                    disabled={!isAdmin}
                    onChange={(e) => set({ agencySplitPercent: e.target.value })}
                    className={`${inputCls} disabled:text-slate-500 disabled:cursor-not-allowed`}
                    title={isAdmin ? '' : 'Lo define la administración'}
                  />
                </div>
              )}

              {/* Desglose exacto de la venta */}
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-3.5 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Honorarios totales ({byAmount ? effectivePercent : Number(form.commissionPercent) || 0}%)</span>
                  <strong className="text-slate-900">{formatMoney(split.commissionTotal, form.currency)}</strong>
                </div>
                {ownerIsBroker ? (
                <>
                <div className="flex justify-between text-indigo-800 font-bold text-sm">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    Corresponde a la inmobiliaria ({Number(form.agencySplitPercent) || 0}%)
                  </span>
                  <span>{formatMoney(split.agencyShare, form.currency)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold border-t border-indigo-100 pt-1.5">
                  <span>Neto para el broker</span>
                  <span>{formatMoney(split.brokerShare, form.currency)}</span>
                </div>
                </>
                ) : (
                  <div className="flex justify-between text-indigo-800 font-bold text-sm">
                    <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Para la inmobiliaria (venta propia)</span>
                    <span>{formatMoney(split.commissionTotal, form.currency)}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Categoría</label>
                <select value={form.category} onChange={(e) => set({ category: e.target.value })} className={inputCls}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Moneda</label>
                <select value={form.currency} onChange={(e) => set({ currency: e.target.value })} className={inputCls}>
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Monto *</label>
                <input
                  type="number" min="0" step="0.01" required
                  value={form.amount}
                  onChange={(e) => set({ amount: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Notas</label>
            <textarea
              rows={2}
              value={form.notes || ''}
              onChange={(e) => set({ notes: e.target.value })}
              className={inputCls}
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold">
              Cancelar
            </button>
            <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200">
              {movement ? 'Guardar cambios' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
