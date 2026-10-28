import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { StatusBadge, OperationBadge } from '../common/Badge';
import { 
  Eye, 
  Edit3, 
  Share2, 
  Key, 
  User, 
  BookmarkCheck, 
  Maximize2, 
  Bed, 
  Bath, 
  DoorClosed,
  Percent,
  MapPin
} from 'lucide-react';
import { photoOf } from '../../utils/placeholders';

export const PropertyCard = ({ property }) => {
  const { 
    isAgentMode, 
    setSelectedPropertyForDetail, 
    setSelectedPropertyForEdit,
    setShareTargetProperty,
    setIsShareModalOpen,
    setReservationTargetProperty,
    setIsReservationModalOpen,
    agents
  } = useRealEstate();

  const assignedAgent = agents.find(a => a.id === property.agentData?.assignedAgentId);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group">
      
      {/* Image & Badges */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={photoOf(property)}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <OperationBadge operation={property.operationType} />
            <StatusBadge status={property.status} />
          </div>

          <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-mono text-white font-bold tracking-wider shadow">
            {property.refCode}
          </div>

          {/* Bottom Price on Image */}
          <div className="absolute bottom-3 left-3 text-white">
            <div className="text-xl font-extrabold drop-shadow">
              {property.pricing.currency === 'USD' ? 'USD ' : '$ '}
              {property.pricing.price.toLocaleString()}
            </div>
            {property.pricing.expenses > 0 && (
              <div className="text-[11px] text-slate-200 drop-shadow">
                + ${property.pricing.expenses.toLocaleString()} expensas
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {property.propertyType}
            </span>
            <h3 
              onClick={() => setSelectedPropertyForDetail(property)}
              className="mt-1.5 font-bold text-slate-900 line-clamp-1 hover:text-indigo-600 transition-colors cursor-pointer text-sm"
              title={property.title}
            >
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{property.location.address}, {property.location.neighborhood}</span>
            </div>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-50 text-slate-700 text-xs border border-slate-100">
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>{property.features.totalArea}</strong> m²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DoorClosed className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>{property.features.rooms}</strong> amb</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>{property.features.bedrooms}</strong> dorm</span>
            </div>
          </div>

          {/* EXCLUSIVE AGENT DATA BOX (Only in Agent Mode) */}
          {isAgentMode && property.agentData && (
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 space-y-1.5 text-xs text-amber-950">
              <div className="flex items-center justify-between font-bold text-[11px] pb-1 border-b border-amber-200/60">
                <span className="text-amber-800 uppercase tracking-wider">Datos Internos del Agente</span>
                {property.agentData.commission?.ratePercent && (
                  <span className="bg-amber-200/70 text-amber-900 px-1.5 py-0.2 rounded font-extrabold text-[10px]">
                    {property.agentData.commission.ratePercent}% Comis.
                  </span>
                )}
              </div>

              {/* Key Location */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <Key className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="font-semibold text-slate-800 truncate" title={property.agentData.keyLocation}>
                  Llaves: {property.agentData.keyLocation || "Consultar en oficina"}
                </span>
              </div>

              {/* Owner and assigned agent */}
              <div className="flex items-center justify-between text-[11px] text-slate-700 pt-0.5">
                <div className="flex items-center gap-1 truncate max-w-[55%]">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">Dueño: <strong>{property.agentData.owner?.name?.split(' ')[0] || "S/D"}</strong></span>
                </div>
                <div className="text-[10px] text-indigo-700 font-semibold bg-indigo-50/80 px-1.5 py-0.5 rounded">
                  {assignedAgent ? assignedAgent.name.split(' ')[0] : 'Sin agente'}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-2">
        <button
          onClick={() => setSelectedPropertyForDetail(property)}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ficha</span>
        </button>

        {property.status === 'Disponible' && (
          <button
            onClick={() => {
              setReservationTargetProperty(property);
              setIsReservationModalOpen(true);
            }}
            title="Tomar Seña / Reserva"
            className="p-2 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
          >
            <BookmarkCheck className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => {
            setShareTargetProperty(property);
            setIsShareModalOpen(true);
          }}
          title="Compartir con Cliente (WhatsApp / Ficha limpia)"
          className="p-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => setSelectedPropertyForEdit(property)}
          title="Editar Propiedad"
          className="p-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
