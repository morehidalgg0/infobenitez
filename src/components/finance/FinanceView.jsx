import React, { useState } from 'react';
import { useRealEstate, ADMIN_USER_ID } from '../../context/RealEstateContext';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Building2,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Users
} from 'lucide-react';
import { MovementModal } from './MovementModal';
import { formatMoney, sumByCurrency, netAmount, mergeTotals } from './financeUtils';

const MoneyLines = ({ totals, className = '' }) => {
  const entries = Object.entries(totals).filter(([, v]) => v);
  if (entries.length === 0) return <p className={className}>—</p>;
  return entries.map(([cur, v]) => (
    <p key={cur} className={className}>{formatMoney(v, cur)}</p>
  ));
};

const KpiCard = ({ label, totals, icon: Icon, tone, hint }) => {
  const tones = {
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    rose: 'text-rose-700 bg-rose-50 border-rose-100',
    indigo: 'text-indigo-700 bg-indigo-50 border-indigo-100',
    amber: 'text-amber-700 bg-amber-50 border-amber-100',
    slate: 'text-slate-800 bg-slate-50 border-slate-100'
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className={`p-1.5 rounded-lg border ${tones[tone]}`}>
          <Icon className="w-4 h-4" />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      </div>
      <MoneyLines totals={totals} className={`text-lg font-extrabold ${tones[tone].split(' ')[0]}`} />
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
};

const SettledBadge = ({ settled }) => settled ? (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
    <CheckCircle2 className="w-3 h-3" /> Liquidado
  </span>
) : (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
    <Clock className="w-3 h-3" /> Pendiente de rendir
  </span>
);

const MovementRow = ({ m, ownerName, canEdit, onEdit, onDelete, onToggleSettled }) => {
  const isSale = m.kind === 'venta';
  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        <span className={`p-2 rounded-xl shrink-0 ${m.type === 'ingreso' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {m.type === 'ingreso' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        </span>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-bold text-slate-900">{m.concept}</p>
          <p className="text-[11px] text-slate-500">
            {m.date} · {m.category}
            {m.propertyRef ? ` · ${m.propertyRef}` : ''}
            {ownerName ? <> · <strong className="text-slate-700">{ownerName}</strong></> : null}
          </p>

          {isSale && (
            <div className="mt-2 rounded-xl border border-indigo-100 bg-indigo-50/50 p-2.5 text-[11px] space-y-1 max-w-md">
              <div className="flex justify-between gap-4 text-slate-600">
                <span>Venta {formatMoney(m.salePrice, m.currency)} × {m.commissionPercent}%</span>
                <span className="font-semibold text-slate-800">{formatMoney(m.commissionTotal, m.currency)}</span>
              </div>
              <div className="flex justify-between gap-4 text-indigo-800 font-bold">
                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Corresponde a la inmobiliaria ({m.agencySplitPercent}%)</span>
                <span>{formatMoney(m.agencyShare, m.currency)}</span>
              </div>
              <div className="flex justify-between gap-4 text-emerald-700 font-semibold">
                <span>Neto broker</span>
                <span>{formatMoney(m.brokerShare, m.currency)}</span>
              </div>
            </div>
          )}
          {m.notes && <p className="text-[11px] text-slate-400 italic">{m.notes}</p>}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
        <p className={`text-sm font-extrabold ${m.type === 'ingreso' ? 'text-emerald-700' : 'text-rose-700'}`}>
          {m.type === 'ingreso' ? '+' : '−'} {formatMoney(m.amount, m.currency)}
        </p>
        {isSale && (
          onToggleSettled ? (
            <button onClick={() => onToggleSettled(m.id)} title="Marcar si la inmobiliaria ya cobró su parte">
              <SettledBadge settled={m.agencyShareSettled} />
            </button>
          ) : <SettledBadge settled={m.agencyShareSettled} />
        )}
        {canEdit && (
          <div className="flex items-center gap-1">
            <button onClick={() => onEdit(m)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100" title="Editar">
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => { if (window.confirm(`¿Eliminar "${m.concept}"?`)) onDelete(m.id); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const FinanceView = () => {
  const {
    movements,
    agents,
    brokers,
    currentUser,
    isAdmin,
    deleteMovement,
    toggleAgencyShareSettled
  } = useRealEstate();

  const [tab, setTab] = useState('own'); // 'own' | 'brokers' (solo admin)
  const [month, setMonth] = useState('');
  const [brokerFilter, setBrokerFilter] = useState('');
  const [modal, setModal] = useState(null); // { movement?, initialType? }

  const agentName = (id) => agents.find(a => a.id === id)?.name || 'Broker eliminado';
  const inMonth = (m) => !month || m.date?.startsWith(month);
  const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');

  const ownId = isAdmin ? ADMIN_USER_ID : currentUser.id;
  const ownMovements = movements.filter(m => m.userId === ownId && inMonth(m)).sort(byDateDesc);
  const brokerMovements = movements
    .filter(m => m.userId !== ADMIN_USER_ID && inMonth(m) && (!brokerFilter || m.userId === brokerFilter))
    .sort(byDateDesc);
  const brokerSales = brokerMovements.filter(m => m.kind === 'venta');

  // Totales del usuario logueado
  const ownIncome = sumByCurrency(ownMovements.filter(m => m.type === 'ingreso'), m => m.amount);
  const ownExpense = sumByCurrency(ownMovements.filter(m => m.type === 'egreso'), m => m.amount);
  const ownSales = ownMovements.filter(m => m.kind === 'venta');
  const ownAgencyShare = sumByCurrency(ownSales, m => m.agencyShare);
  const ownAgencyPending = sumByCurrency(ownSales.filter(m => !m.agencyShareSettled), m => m.agencyShare);

  // Para el admin: lo que los brokers rinden a la inmobiliaria
  const allBrokerSalesInMonth = movements.filter(m => m.userId !== ADMIN_USER_ID && m.kind === 'venta' && inMonth(m));
  const agencyCollected = sumByCurrency(allBrokerSalesInMonth.filter(m => m.agencyShareSettled), m => m.agencyShare);
  const agencyPending = sumByCurrency(allBrokerSalesInMonth.filter(m => !m.agencyShareSettled), m => m.agencyShare);

  const ownBalance = isAdmin
    ? mergeTotals(ownIncome, agencyCollected, sumByCurrency(ownMovements.filter(m => m.type === 'egreso'), m => -m.amount))
    : sumByCurrency(ownMovements, netAmount);

  const canEdit = (m) => isAdmin || (m.userId === currentUser.id && !(m.kind === 'venta' && m.agencyShareSettled));

  const renderList = (list, showOwner) => (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
      {list.length === 0 ? (
        <p className="p-8 text-center text-xs text-slate-400">No hay movimientos registrados para este período.</p>
      ) : list.map(m => (
        <MovementRow
          key={m.id}
          m={m}
          ownerName={showOwner ? agentName(m.userId) : null}
          canEdit={canEdit(m)}
          onEdit={(mov) => setModal({ movement: mov })}
          onDelete={deleteMovement}
          onToggleSettled={isAdmin ? toggleAgencyShareSettled : null}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-indigo-600" />
            {isAdmin ? 'Ingresos & Egresos' : 'Mis Ingresos & Egresos'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isAdmin
              ? 'Caja de la inmobiliaria y control de lo que cada broker debe rendir por venta.'
              : 'Tus honorarios y gastos. En cada venta figura la parte exacta que corresponde a la inmobiliaria.'}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setModal({ initialType: 'egreso' })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-rose-700 font-semibold text-sm transition-all"
          >
            <TrendingDown className="w-4 h-4" /> Egreso
          </button>
          <button
            onClick={() => setModal({ initialType: 'ingreso' })}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-200 active:scale-95"
          >
            <Plus className="w-4 h-4" /> {isAdmin ? 'Ingreso' : 'Venta / Ingreso'}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        {isAdmin && (
          <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setTab('own')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${tab === 'own' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
            >
              <Building2 className="w-3.5 h-3.5" /> Caja inmobiliaria
            </button>
            <button
              onClick={() => setTab('brokers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${tab === 'brokers' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
            >
              <Users className="w-3.5 h-3.5" /> Brokers
            </button>
          </div>
        )}
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium"
        />
        {month && (
          <button onClick={() => setMonth('')} className="text-xs text-slate-500 hover:text-slate-700 font-semibold">
            Ver todo
          </button>
        )}
        {isAdmin && tab === 'brokers' && (
          <select
            value={brokerFilter}
            onChange={(e) => setBrokerFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium"
          >
            <option value="">Todos los brokers</option>
            {brokers.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        )}
      </div>

      {(!isAdmin || tab === 'own') && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard label={isAdmin ? 'Ingresos propios' : 'Ingresos (bruto)'} totals={ownIncome} icon={TrendingUp} tone="emerald" />
            <KpiCard label="Egresos" totals={ownExpense} icon={TrendingDown} tone="rose" />
            {isAdmin ? (
              <KpiCard label="Cobrado a brokers" totals={agencyCollected} icon={Building2} tone="indigo" hint="Parte de la inmobiliaria ya liquidada" />
            ) : (
              <KpiCard label="Corresponde a la inmobiliaria" totals={ownAgencyShare} icon={Building2} tone="indigo" hint={Object.keys(ownAgencyPending).length ? 'Incluye montos pendientes de rendir' : 'Todo rendido'} />
            )}
            <KpiCard
              label={isAdmin ? 'Balance inmobiliaria' : 'Mi balance neto'}
              totals={ownBalance}
              icon={Wallet}
              tone="slate"
              hint={isAdmin ? 'Ingresos + cobrado a brokers − egresos' : 'Tu parte de las ventas + otros ingresos − egresos'}
            />
          </div>

          {isAdmin && Object.keys(agencyPending).length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">Pendiente de cobro a brokers:</span>
              <MoneyLines totals={agencyPending} className="font-extrabold" />
            </div>
          )}
          {!isAdmin && Object.keys(ownAgencyPending).length > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">Te falta rendir a la inmobiliaria:</span>
              <MoneyLines totals={ownAgencyPending} className="font-extrabold" />
            </div>
          )}

          {renderList(ownMovements, false)}
        </>
      )}

      {isAdmin && tab === 'brokers' && (
        <>
          {/* Resumen por broker */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="text-left p-3">Broker</th>
                  <th className="text-right p-3">Ventas</th>
                  <th className="text-right p-3">Honorarios</th>
                  <th className="text-right p-3">Corresponde inmobiliaria</th>
                  <th className="text-right p-3">Pendiente de rendir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brokers.filter(a => !brokerFilter || a.id === brokerFilter).map(a => {
                  const sales = brokerSales.filter(m => m.userId === a.id);
                  return (
                    <tr key={a.id}>
                      <td className="p-3 font-bold text-slate-800">
                        {a.name}
                        <span className="block text-[10px] font-medium text-slate-400">{a.agencySplitPercent}% para la inmobiliaria</span>
                      </td>
                      <td className="p-3 text-right font-semibold">{sales.length}</td>
                      <td className="p-3 text-right"><MoneyLines totals={sumByCurrency(sales, m => m.commissionTotal)} /></td>
                      <td className="p-3 text-right font-bold text-indigo-700"><MoneyLines totals={sumByCurrency(sales, m => m.agencyShare)} /></td>
                      <td className="p-3 text-right font-bold text-amber-700"><MoneyLines totals={sumByCurrency(sales.filter(m => !m.agencyShareSettled), m => m.agencyShare)} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-slate-500">
            Tocá el estado de cada venta (Pendiente / Liquidado) para marcar si la inmobiliaria ya cobró su parte.
          </p>
          {renderList(brokerMovements, true)}
        </>
      )}

      {modal && (
        <MovementModal
          movement={modal.movement}
          initialType={modal.initialType}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};
