import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { StatusBadge, OperationBadge, PropertyTypeBadge } from '../common/Badge';
import { downloadSingleImage, downloadAllImages } from '../../utils/downloadHelper';
import { 
  X, 
  MapPin, 
  Maximize2, 
  DoorClosed, 
  Bed, 
  Bath, 
  Car, 
  Key, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  Share2, 
  Edit3, 
  Trash2, 
  BookmarkCheck, 
  Plus, 
  Calendar, 
  MessageSquare, 
  Check, 
  Clock, 
  ExternalLink,
  DollarSign,
  AlertCircle,
  Download,
  Lock,
  Unlock,
  Wifi,
  Info,
  Copy
} from 'lucide-react';

export const PropertyDetailModal = () => {
  const { 
    selectedPropertyForDetail, 
    setSelectedPropertyForDetail, 
    setSelectedPropertyForEdit,
    setShareTargetProperty,
    setIsShareModalOpen,
    setReservationTargetProperty,
    setIsReservationModalOpen,
    setRentalTargetProperty,
    setIsRentalModalOpen,
    changePropertyStatus,
    deleteProperty,
    checkoutKey,
    returnKey,
    addVisitToProperty,
    isAgentMode,
    agents,
    notify
  } = useRealEstate();

  const [activeTab, setActiveTab] = useState('commercial'); // 'commercial' | 'security' | 'agent' | 'visits'
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState('');
  const [selectedAgentForCheckout, setSelectedAgentForCheckout] = useState(agents[0]?.name || 'Martín Gómez');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [copiedCodeKey, setCopiedCodeKey] = useState(null);
  const [showAddVisitForm, setShowAddVisitForm] = useState(false);
  const [newVisitData, setNewVisitData] = useState({
    visitorName: '',
    phone: '',
    feedback: '',
    agentName: ''
  });

  if (!selectedPropertyForDetail) return null;
  const prop = selectedPropertyForDetail;
  const assignedAgent = agents.find(a => a.id === prop.agentData?.assignedAgentId);
  const custody = prop.agentData?.keyCustody || { status: 'en_oficina', currentHolder: 'Oficina Central', takenAt: null, history: [] };
  const security = prop.agentData?.security || {};
  const isKeyTaken = custody.status === 'prestada';

  const handleDownloadCurrentPhoto = async () => {
    const currentUrl = prop.images[activeImageIndex] || prop.images[0];
    const filename = `${prop.refCode}-foto-${activeImageIndex + 1}.jpg`;
    notify(`Descargando foto ${activeImageIndex + 1}...`, 'info');
    await downloadSingleImage(currentUrl, filename);
    notify('Foto descargada con éxito', 'success');
  };

  const handleDownloadAllPhotos = async () => {
    if (!prop.images || prop.images.length === 0) return;
    setIsDownloadingAll(true);
    notify(`Iniciando descarga de ${prop.images.length} fotos...`, 'info');

    await downloadAllImages(prop.images, prop.refCode, (current, total) => {
      setDownloadProgress(`${current} de ${total}`);
    });

    setIsDownloadingAll(false);
    setDownloadProgress('');
    notify(`¡Las ${prop.images.length} fotos fueron descargadas!`, 'success');
  };

  const handleCopyCode = (text, keyId) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedCodeKey(keyId);
    notify('Copiado al portapapeles', 'success');
    setTimeout(() => setCopiedCodeKey(null), 2500);
  };

  const handleCheckoutSubmit = () => {
    checkoutKey(prop.id, selectedAgentForCheckout, 'Visita con cliente');
    setShowCheckoutForm(false);
  };

  const handleAddVisitSubmit = (e) => {
    e.preventDefault();
    if (!newVisitData.visitorName) return;
    addVisitToProperty(prop.id, {
      ...newVisitData,
      agentName: newVisitData.agentName || assignedAgent?.name || 'Agente'
    });
    setNewVisitData({ visitorName: '', phone: '', feedback: '', agentName: '' });
    setShowAddVisitForm(false);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la propiedad ${prop.refCode}? Esta acción no se puede deshacer.`)) {
      deleteProperty(prop.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-3 bg-white shrink-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
              {prop.refCode}
            </span>
            <OperationBadge operation={prop.operationType} />
            <StatusBadge status={prop.status} />
            <PropertyTypeBadge type={prop.propertyType} />

            {/* Live Key custody mini-badge in header */}
            {isAgentMode && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isKeyTaken ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                <Key className="w-3 h-3" />
                <span>{isKeyTaken ? `Llave con: ${custody.currentHolder}` : 'Llave en Oficina'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShareTargetProperty(prop);
                setIsShareModalOpen(true);
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors"
              title="Compartir Ficha Limpia"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const current = prop;
                setSelectedPropertyForDetail(null);
                setSelectedPropertyForEdit(current);
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Editar Propiedad"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedPropertyForDetail(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 bg-slate-50/70 flex items-center gap-3 sm:gap-4 text-xs font-bold tracking-wide overflow-x-auto">
          <button
            onClick={() => setActiveTab('commercial')}
            className={`py-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'commercial'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ficha Comercial & Fotos
          </button>

          {isAgentMode ? (
            <>
              {/* NEW TAB: OPERATIVA, LLAVES & SEGURIDAD */}
              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'security'
                    ? 'border-amber-600 text-amber-800'
                    : 'border-transparent text-amber-700 hover:text-amber-900'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Operativa & Llaves / Alarma</span>
                {isKeyTaken && (
                  <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold animate-pulse">
                    Retirada
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('agent')}
                className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'agent'
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>Dueño & Comisiones</span>
              </button>

              <button
                onClick={() => setActiveTab('visits')}
                className={`py-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeTab === 'visits'
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Registro de Visitas ({prop.agentData?.visitsHistory?.length || 0})</span>
              </button>
            </>
          ) : (
            <div className="py-3 text-[11px] text-emerald-700 font-medium flex items-center gap-1 ml-auto whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Modo Presentación al Cliente (Datos privados protegidos)</span>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: FICHA COMERCIAL CON DESCARGA DE FOTOS */}
          {activeTab === 'commercial' && (
            <div className="space-y-6">
              
              {/* Photo Gallery + DOWNLOAD BUTTONS */}
              <div>
                
                {/* Photo Actions Top Bar */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600">
                    Galería ({activeImageIndex + 1} de {prop.images.length} fotos)
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadCurrentPhoto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
                      title="Descargar esta foto en alta resolución"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-600" />
                      <span>Descargar Esta Foto</span>
                    </button>

                    <button
                      type="button"
                      disabled={isDownloadingAll}
                      onClick={handleDownloadAllPhotos}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
                      title="Descarga todas las fotos de la casa al disco para enviar al cliente"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isDownloadingAll ? `Descargando (${downloadProgress})...` : 'Descargar Todas las Fotos'}</span>
                    </button>
                  </div>
                </div>

                {/* Hero Photo with overlay badges */}
                <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 relative shadow-inner">
                  <img
                    src={prop.images[activeImageIndex] || prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur-md px-4 py-2 rounded-xl text-white shadow-lg">
                    <span className="text-2xl font-extrabold">
                      {prop.pricing.currency === 'USD' ? 'USD ' : '$ '}
                      {prop.pricing.price.toLocaleString()}
                    </span>
                    {prop.pricing.expenses > 0 && (
                      <span className="text-xs text-slate-300 ml-2">
                        + ${prop.pricing.expenses.toLocaleString()} expensas
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {prop.images.length > 1 && (
                  <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                    {prop.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all relative ${
                          activeImageIndex === idx ? 'border-indigo-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">
                          #{idx + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Location */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {prop.title}
                </h2>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{prop.location.address}, {prop.location.neighborhood}, {prop.location.city}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Superficie</div>
                    <div className="text-sm font-bold text-slate-900">{prop.features.totalArea} m² tot.</div>
                    <div className="text-[10px] text-slate-400">{prop.features.coveredArea} m² cub.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <DoorClosed className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Ambientes</div>
                    <div className="text-sm font-bold text-slate-900">{prop.features.rooms} ambientes</div>
                    <div className="text-[10px] text-slate-400">{prop.features.age ? `${prop.features.age} años ant.` : 'A estrenar'}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Dormitorios</div>
                    <div className="text-sm font-bold text-slate-900">{prop.features.bedrooms} dorm.</div>
                    <div className="text-[10px] text-slate-400">Orientación {prop.features.orientation || 'Norte'}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Cocheras & Baños</div>
                    <div className="text-sm font-bold text-slate-900">{prop.features.garages} coch. / {prop.features.bathrooms} baños</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Descripción del Inmueble</h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {prop.description}
                </p>
              </div>

              {/* Amenities */}
              {prop.amenities && prop.amenities.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Características & Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {prop.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SOLAPA OPERATIVA, LLAVES, ALARMAS Y COSAS CLAVE */}
          {activeTab === 'security' && isAgentMode && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* CUSTODIA DE LLAVES INTERACTIVA */}
              <div className={`p-5 rounded-3xl border-2 space-y-3 ${
                isKeyTaken 
                  ? 'bg-amber-50 border-amber-300' 
                  : 'bg-emerald-50 border-emerald-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    <Key className="w-4 h-4 text-amber-600" />
                    <span>Custodia de la Llave en Tiempo Real</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isKeyTaken ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                  }`}>
                    {isKeyTaken ? 'Llave Retirada' : 'Llave en Oficina'}
                  </span>
                </div>

                <div className="text-sm">
                  {isKeyTaken ? (
                    <div>
                      <p className="text-slate-800">
                        La llave está actualmente en poder de: <strong className="text-amber-950 font-extrabold text-base">{custody.currentHolder}</strong>
                      </p>
                      {custody.takenAt && (
                        <p className="text-xs text-amber-800 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5" /> Retirada: {custody.takenAt}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-800">
                        Ubicación: <strong className="text-emerald-950 font-extrabold">{custody.currentHolder || prop.agentData?.keyLocation}</strong>
                      </p>
                      <p className="text-xs text-emerald-700 mt-0.5">Lista en tablero para coordinar visitas.</p>
                    </div>
                  )}
                </div>

                {/* Interactive Checkout / Return buttons */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2">
                  {isKeyTaken ? (
                    <button
                      onClick={() => returnKey(prop.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      Devolver Llave al Tablero de Oficina
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        {showCheckoutForm ? 'Cancelar' : 'Registrar: Me llevo la llave'}
                      </button>

                      {showCheckoutForm && (
                        <div className="flex items-center gap-2 animate-in fade-in">
                          <select
                            value={selectedAgentForCheckout}
                            onChange={(e) => setSelectedAgentForCheckout(e.target.value)}
                            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                          >
                            {agents.map(ag => (
                              <option key={ag.id} value={ag.name}>{ag.name}</option>
                            ))}
                          </select>
                          <button
                            onClick={handleCheckoutSubmit}
                            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 shadow-sm"
                          >
                            Confirmar Retiro
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* CÓDIGOS DE SEGURIDAD Y ALARMAS */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>Contraseñas de Alarma & Códigos de Acceso</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Alarm Code Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Contraseña de Alarma</span>
                      {security.alarmCode && (
                        <button
                          onClick={() => handleCopyCode(security.alarmCode, 'detail-alarm')}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                        >
                          {copiedCodeKey === 'detail-alarm' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCodeKey === 'detail-alarm' ? '¡Copiado!' : 'Copiar'}</span>
                        </button>
                      )}
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-sm font-extrabold text-slate-900 select-all">
                      {security.alarmCode || "Sin alarma declarada"}
                    </div>
                    {security.alarmCompany && (
                      <p className="text-[11px] text-slate-500">{security.alarmCompany}</p>
                    )}
                  </div>

                  {/* Portón / Lockbox */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Portón / Caja Lockbox</span>
                      {security.gateCode && (
                        <button
                          onClick={() => handleCopyCode(security.gateCode, 'detail-gate')}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                        >
                          {copiedCodeKey === 'detail-gate' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCodeKey === 'detail-gate' ? '¡Copiado!' : 'Copiar'}</span>
                        </button>
                      )}
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-sm font-extrabold text-slate-900 select-all">
                      {security.gateCode || security.lockboxCode || "Apertura manual por llave"}
                    </div>
                  </div>

                  {/* WiFi */}
                  <div className="sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-slate-500" />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-slate-400">Red WiFi del Inmueble</span>
                        <p className="text-xs font-bold text-slate-800">{security.wifiPassword || "Sin datos de WiFi"}</p>
                      </div>
                    </div>
                    {security.wifiPassword && (
                      <button
                        onClick={() => handleCopyCode(security.wifiPassword, 'detail-wifi')}
                        className="text-xs text-indigo-600 font-bold hover:underline"
                      >
                        {copiedCodeKey === 'detail-wifi' ? 'Copiado' : 'Copiar WiFi'}
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* COSAS QUE TENEMOS QUE SABER (Instrucciones operativas) */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Info className="w-5 h-5 text-amber-600" />
                  <span>Cosas que Tenemos que Saber de la Casa (Manual Operativo)</span>
                </div>
                
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                  {prop.agentData?.houseManual || "No se cargaron instrucciones especiales. Consulta al captador asignado."}
                </div>
              </div>

              {/* Historial de movimientos de la llave */}
              {custody.history && custody.history.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Historial de Movimientos de la Llave
                  </span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {custody.history.map(h => (
                      <div key={h.id} className="p-2 bg-white rounded-xl border border-slate-100 flex items-center justify-between text-[11px]">
                        <div>
                          <strong>{h.agentName}</strong> — {h.action} {h.notes ? `(${h.notes})` : ''}
                        </div>
                        <span className="text-slate-400">{h.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: PROPIETARIO & COMISIONES */}
          {activeTab === 'agent' && isAgentMode && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Propietario */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-sm text-slate-900">Datos Privados del Propietario</h3>
                  </div>
                  {prop.agentData?.owner?.phone && (
                    <a
                      href={`https://wa.me/${prop.agentData.owner.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Dueño</span>
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium">Nombre Completo:</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{prop.agentData?.owner?.name || "No cargado"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Teléfono Directo:</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{prop.agentData?.owner?.phone || "No cargado"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Email:</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{prop.agentData?.owner?.email || "No cargado"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">DNI / CUIT:</span>
                    <p className="font-bold text-slate-800 text-sm mt-0.5">{prop.agentData?.owner?.idNumber || "No cargado"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 font-medium">Domicilio Particular del Dueño:</span>
                    <p className="font-bold text-slate-800 mt-0.5">{prop.agentData?.owner?.address || "No especificado"}</p>
                  </div>
                </div>
              </div>

              {/* Comisiones y Negociación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                    <DollarSign className="w-4 h-4" />
                    <span>Honorarios & Comisión</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {prop.agentData?.commission?.ratePercent ? `${prop.agentData.commission.ratePercent}%` : 'Porcentaje a acordar'}
                  </div>
                  <p className="text-xs text-slate-600">
                    {prop.agentData?.commission?.notes || "Comisión estándar pactada."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>Piso Mínimo Aceptable</span>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {prop.agentData?.minNegotiationPrice 
                      ? `${prop.pricing.currency === 'USD' ? 'USD ' : '$ '}${prop.agentData.minNegotiationPrice.toLocaleString()}`
                      : 'Consultar oferta formal'}
                  </div>
                  <p className="text-xs text-slate-600">
                    {prop.agentData?.internalNotes || "El dueño está abierto a escuchar propuestas razonables de contado."}
                  </p>
                </div>
              </div>

              {/* Situación Legal & Títulos */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Estado Legal & Títulos</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {prop.agentData?.legalStatus || "Documentación en proceso de verificación por escribanía."}
                </p>
              </div>

            </div>
          )}

          {/* TAB 4: REGISTRO DE VISITAS */}
          {activeTab === 'visits' && isAgentMode && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">Historial de Visitas Realizadas</h3>
                <button
                  onClick={() => setShowAddVisitForm(!showAddVisitForm)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showAddVisitForm ? 'Cancelar Carga' : 'Registrar Nueva Visita'}</span>
                </button>
              </div>

              {/* Form */}
              {showAddVisitForm && (
                <form onSubmit={handleAddVisitSubmit} className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                  <h4 className="font-bold text-xs text-indigo-900 uppercase">Cargar Nueva Visita / Interesado</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Nombre del Visitante *</label>
                      <input
                        type="text"
                        required
                        value={newVisitData.visitorName}
                        onChange={(e) => setNewVisitData(prev => ({ ...prev, visitorName: e.target.value }))}
                        placeholder="Ej. Dr. Martínez"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        value={newVisitData.phone}
                        onChange={(e) => setNewVisitData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+54 9 11 ..."
                        className="w-full bg-white border border-slate-200 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Agente que mostró</label>
                      <input
                        type="text"
                        value={newVisitData.agentName}
                        onChange={(e) => setNewVisitData(prev => ({ ...prev, agentName: e.target.value }))}
                        placeholder={assignedAgent?.name || 'Nombre del agente'}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold text-xs">Comentarios / Feedback de la visita</label>
                    <textarea
                      rows={2}
                      value={newVisitData.feedback}
                      onChange={(e) => setNewVisitData(prev => ({ ...prev, feedback: e.target.value }))}
                      placeholder="Ej. Le gustó la luminosidad pero consulta si el precio es negociable..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm"
                    >
                      Guardar Visita
                    </button>
                  </div>
                </form>
              )}

              {/* Visits list */}
              {(!prop.agentData?.visitsHistory || prop.agentData.visitsHistory.length === 0) ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
                  No hay visitas registradas aún para esta propiedad. Haz clic en "Registrar Nueva Visita" para asentar comentarios de clientes.
                </div>
              ) : (
                <div className="space-y-3">
                  {prop.agentData.visitsHistory.map((v) => (
                    <div key={v.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-indigo-600" />
                          <span className="font-bold text-slate-900">{v.visitorName}</span>
                          {v.phone && (
                            <span className="text-slate-500 font-mono text-[11px]">({v.phone})</span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {v.date} • Mostró: <strong>{v.agentName}</strong>
                        </span>
                      </div>
                      <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                        "{v.feedback}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer with Status Change and Quick Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          
          {/* Quick status selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estado:</span>
            <select
              value={prop.status}
              onChange={(e) => changePropertyStatus(prop.id, e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Disponible">🟢 Disponible</option>
              <option value="Reservada">🟡 Reservada</option>
              <option value="Alquilada">🔵 Alquilada</option>
              <option value="Vendida">🟣 Vendida</option>
              <option value="Pausada">⚪ Pausada</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 justify-end flex-wrap">
            {prop.status === 'Disponible' && (
              <button
                onClick={() => {
                  setReservationTargetProperty(prop);
                  setIsReservationModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all"
              >
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Tomar Reserva</span>
              </button>
            )}

            {prop.operationType.includes('Alquiler') && (
              <button
                onClick={() => {
                  setRentalTargetProperty(prop);
                  setIsRentalModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Registrar Alquiler</span>
              </button>
            )}

            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
              title="Eliminar Propiedad"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
