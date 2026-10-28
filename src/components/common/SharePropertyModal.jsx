import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  MessageSquare, 
  Printer, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { photoOf } from '../../utils/placeholders';

export const SharePropertyModal = () => {
  const { 
    shareTargetProperty, 
    setShareTargetProperty, 
    isShareModalOpen, 
    setIsShareModalOpen, 
    notify,
    agents 
  } = useRealEstate();

  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen || !shareTargetProperty) return null;
  const prop = shareTargetProperty;
  const assignedAgent = agents.find(a => a.id === prop.agentData?.assignedAgentId);

  // Clean WhatsApp text generation without sensitive agent data
  const formattedText = `🏡 *${prop.title}*
📌 *Referencia:* ${prop.refCode}
📍 *Ubicación:* ${prop.location.address}, ${prop.location.neighborhood}
💰 *Precio:* ${prop.pricing.currency === 'USD' ? 'USD ' : '$ '}${prop.pricing.price.toLocaleString()} ${prop.pricing.expenses > 0 ? `(+ $${prop.pricing.expenses.toLocaleString()} exp.)` : ''}

📐 *Características Principales:*
• Superficie: ${prop.features.totalArea} m² (${prop.features.coveredArea} m² cubiertos)
• Ambientes: ${prop.features.rooms} (${prop.features.bedrooms} dormitorios, ${prop.features.bathrooms} baños)
• Cocheras: ${prop.features.garages}
${prop.amenities?.length ? `• Amenities: ${prop.amenities.slice(0, 5).join(', ')}` : ''}

📝 *Descripción:*
${prop.description?.slice(0, 200)}...

📞 *Para coordinar visita o consultas:*
${assignedAgent ? `${assignedAgent.name} (${assignedAgent.phone})` : 'Inmobiliaria InmoPanel'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    notify('Ficha comercial copiada al portapapeles', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(formattedText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Compartir Ficha Limpia con Cliente</h2>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Datos de llaves, dueño y comisiones 100% protegidos</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsShareModalOpen(false);
              setShareTargetProperty(null);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          
          {/* Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4">
            <img
              src={photoOf(prop)}
              alt=""
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200 shadow-sm"
            />
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[10px] font-bold bg-white border border-slate-200 px-1.5 py-0.5 rounded text-indigo-700">
                {prop.refCode}
              </span>
              <h4 className="font-bold text-sm text-slate-900 truncate mt-1">{prop.title}</h4>
              <p className="text-slate-500 truncate">{prop.location.address}, {prop.location.neighborhood}</p>
              <div className="mt-1 font-extrabold text-sm text-indigo-700">
                {prop.pricing.currency === 'USD' ? 'USD ' : '$ '}{prop.pricing.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Formatted Text Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                Texto para WhatsApp / Correo
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={8}
              value={formattedText}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 font-mono text-[11px] text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 leading-relaxed select-all"
            />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-200 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar directo por WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Ficha Comercial</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
