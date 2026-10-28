import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  Key, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  Search, 
  Building2, 
  UserCheck, 
  AlertTriangle, 
  Clock, 
  Wifi, 
  Phone, 
  FileText,
  Eye,
  CheckCircle2,
  Info
} from 'lucide-react';
import { photoOf } from '../../utils/placeholders';

export const KeyBoardOverview = () => {
  const { 
    properties, 
    agents, 
    checkoutKey, 
    returnKey, 
    setSelectedPropertyForDetail, 
    notify 
  } = useRealEstate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgentForCheckout, setSelectedAgentForCheckout] = useState(agents[0]?.name || 'Martín Gómez');
  const [activeCheckoutPropId, setActiveCheckoutPropId] = useState(null);
  const [copiedCodeKey, setCopiedCodeKey] = useState(null);

  const filteredProperties = properties.filter(p => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const ref = p.refCode?.toLowerCase() || '';
    const title = p.title?.toLowerCase() || '';
    const addr = p.location?.address?.toLowerCase() || '';
    const holder = p.agentData?.keyCustody?.currentHolder?.toLowerCase() || '';
    return ref.includes(term) || title.includes(term) || addr.includes(term) || holder.includes(term);
  });

  const handleCopy = (text, keyId) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedCodeKey(keyId);
    notify('Código copiado al portapapeles', 'success');
    setTimeout(() => setCopiedCodeKey(null), 2500);
  };

  const handleCheckoutSubmit = (propertyId) => {
    checkoutKey(propertyId, selectedAgentForCheckout, 'Visita con cliente');
    setActiveCheckoutPropId(null);
  };

  // Stats
  const inOfficeCount = properties.filter(p => (p.agentData?.keyCustody?.status || 'en_oficina') === 'en_oficina').length;
  const takenCount = properties.filter(p => p.agentData?.keyCustody?.status === 'prestada').length;
  const inPorteriaCount = properties.filter(p => p.agentData?.keyCustody?.status === 'en_porteria' || p.agentData?.keyCustody?.status === 'dueño').length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Control de Llaves, Alarmas & Seguridad
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Uso Interno Agentes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Consulta en tiempo real quién tiene la llave de cada casa, contraseñas de alarma, claves de portón y manual de la propiedad.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por casa, dirección o agente..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">En Tablero Oficina</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">
              {inOfficeCount} juegos
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Disponibles para retirar ya</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Retiradas por Agentes</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-0.5">
              {takenCount} en visita
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">En poder de un compañero</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Unlock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">En Portería o con Dueño</span>
            <div className="text-2xl font-extrabold text-blue-600 mt-0.5">
              {inPorteriaCount} llaves
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Retiro en el lugar con DNI</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid of Key & Security Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredProperties.map((prop) => {
          const custody = prop.agentData?.keyCustody || { status: 'en_oficina', currentHolder: 'Oficina', takenAt: null };
          const security = prop.agentData?.security || {};
          const isTaken = custody.status === 'prestada';
          const isPorteria = custody.status === 'en_porteria' || custody.status === 'dueño';
          const isCheckoutActive = activeCheckoutPropId === prop.id;

          return (
            <div 
              key={prop.id}
              className={`bg-white rounded-3xl border p-5 space-y-4 shadow-sm hover:shadow-md transition-all ${
                isTaken ? 'border-amber-300 ring-1 ring-amber-300/40' : 'border-slate-200'
              }`}
            >
              
              {/* Header: Ref + Address + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={photoOf(prop)}
                    alt=""
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                      {prop.refCode}
                    </span>
                    <h3 
                      onClick={() => setSelectedPropertyForDetail(prop)}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1 mt-0.5"
                    >
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate max-w-[280px]">
                      {prop.location.address}, {prop.location.neighborhood}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPropertyForDetail(prop)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
                  title="Ver ficha completa"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* CUSTODY BOX: Who has the key right now */}
              <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                isTaken 
                  ? 'bg-amber-50/90 border-amber-300 text-amber-950' 
                  : isPorteria 
                  ? 'bg-blue-50/90 border-blue-200 text-blue-950' 
                  : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              }`}>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider">
                    <Key className="w-3.5 h-3.5" />
                    <span>¿Quién tiene la llave actualmente?</span>
                  </div>
                  <p className="text-sm font-bold mt-1">
                    {isTaken ? (
                      <span className="text-amber-900">
                        La retiró: <strong>{custody.currentHolder}</strong>
                      </span>
                    ) : isPorteria ? (
                      <span className="text-blue-900">{custody.currentHolder}</span>
                    ) : (
                      <span className="text-emerald-900">
                        En Tablero de Oficina ({prop.agentData?.keyLocation || "Llavero central"})
                      </span>
                    )}
                  </p>
                  {custody.takenAt && (
                    <span className="text-[10px] text-amber-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Retirada: {custody.takenAt}
                    </span>
                  )}
                </div>

                {/* Key Action Buttons */}
                <div className="shrink-0 flex items-center gap-1.5 w-full sm:w-auto">
                  {isTaken ? (
                    <button
                      onClick={() => returnKey(prop.id)}
                      className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      Devolver a Oficina
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveCheckoutPropId(isCheckoutActive ? null : prop.id)}
                      className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      {isCheckoutActive ? 'Cancelar' : 'Me llevo la llave'}
                    </button>
                  )}
                </div>
              </div>

              {/* Checkout Form Popover when "Me llevo la llave" is clicked */}
              {isCheckoutActive && (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs">
                  <span className="font-bold text-indigo-900 text-xs">Registrar retiro de llave:</span>
                  <div className="flex gap-2">
                    <select
                      value={selectedAgentForCheckout}
                      onChange={(e) => setSelectedAgentForCheckout(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl p-2 font-bold text-slate-800 text-xs"
                    >
                      {agents.map(ag => (
                        <option key={ag.id} value={ag.name}>{ag.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleCheckoutSubmit(prop.id)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 shadow-sm"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              )}

              {/* SECURITY & ALARM CODES */}
              <div className="space-y-2 text-xs">
                
                {/* Alarm code box */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                      Código de Alarma
                    </span>
                    {security.alarmCode && (
                      <button
                        onClick={() => handleCopy(security.alarmCode, `alarm-${prop.id}`)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                      >
                        {copiedCodeKey === `alarm-${prop.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCodeKey === `alarm-${prop.id}` ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    )}
                  </div>
                  <p className="font-mono text-xs font-bold text-slate-900">
                    {security.alarmCode || "Sin alarma o no informada"}
                  </p>
                  {security.alarmCompany && (
                    <span className="text-[10px] text-slate-500">{security.alarmCompany}</span>
                  )}
                </div>

                {/* Gate / Lockbox / WiFi row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Gate or lockbox */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                      <span>Portón / Lockbox</span>
                      {security.gateCode && (
                        <button onClick={() => handleCopy(security.gateCode, `gate-${prop.id}`)}>
                          <Copy className="w-2.5 h-2.5 text-slate-500 hover:text-slate-800" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-800 truncate mt-0.5">
                      {security.gateCode || security.lockboxCode || "Llave común"}
                    </p>
                  </div>

                  {/* WiFi */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400">
                      <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> WiFi</span>
                      {security.wifiPassword && (
                        <button onClick={() => handleCopy(security.wifiPassword, `wifi-${prop.id}`)}>
                          <Copy className="w-2.5 h-2.5 text-slate-500 hover:text-slate-800" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-800 truncate mt-0.5">
                      {security.wifiPassword || "Consultar dueño"}
                    </p>
                  </div>
                </div>

                {/* House Instructions / Cosas que tenemos que saber */}
                {prop.agentData?.houseManual && (
                  <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-amber-900 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-amber-600" />
                      Cosas que tenemos que saber de esta casa:
                    </span>
                    <p className="text-slate-700 text-[11px] whitespace-pre-line leading-relaxed">
                      {prop.agentData.houseManual}
                    </p>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
