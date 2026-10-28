import React, { useState, useMemo } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { StatusBadge, OperationBadge, PropertyTypeBadge } from '../common/Badge';
import { 
  Building2, 
  Plus, 
  Eye, 
  Edit3, 
  BookmarkCheck, 
  Key, 
  Share2, 
  RotateCcw,
  User,
  ArrowUpDown
} from 'lucide-react';
import { photoOf } from '../../utils/placeholders';

export const PropertyList = () => {
  const { 
    properties, 
    searchQuery, 
    isAgentMode, 
    setSelectedPropertyForDetail, 
    setSelectedPropertyForEdit,
    setShareTargetProperty,
    setIsShareModalOpen,
    setReservationTargetProperty,
    setIsReservationModalOpen,
    setIsCreateModalOpen,
    agents
  } = useRealEstate();

  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: searchQuery || '',
    operation: 'Todos',
    type: 'Todos',
    status: 'Todos',
    agent: 'Todos',
    sortBy: 'recent'
  });

  // Filtered and sorted properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Global and filter search
      const term = (filters.search || searchQuery).toLowerCase().trim();
      if (term) {
        const matchesRef = prop.refCode?.toLowerCase().includes(term);
        const matchesTitle = prop.title?.toLowerCase().includes(term);
        const matchesAddress = prop.location?.address?.toLowerCase().includes(term);
        const matchesNeighborhood = prop.location?.neighborhood?.toLowerCase().includes(term);
        const matchesOwner = isAgentMode && prop.agentData?.owner?.name?.toLowerCase().includes(term);
        if (!matchesRef && !matchesTitle && !matchesAddress && !matchesNeighborhood && !matchesOwner) {
          return false;
        }
      }

      // Operation
      if (filters.operation !== 'Todos' && prop.operationType !== filters.operation) {
        return false;
      }

      // Type
      if (filters.type !== 'Todos' && prop.propertyType !== filters.type) {
        return false;
      }

      // Status
      if (filters.status !== 'Todos' && prop.status !== filters.status) {
        return false;
      }

      // Agent
      if (filters.agent !== 'Todos' && prop.agentData?.assignedAgentId !== filters.agent) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return (Number(a.pricing?.price) || 0) - (Number(b.pricing?.price) || 0);
      }
      if (filters.sortBy === 'price-desc') {
        return (Number(b.pricing?.price) || 0) - (Number(a.pricing?.price) || 0);
      }
      if (filters.sortBy === 'area-desc') {
        return (Number(b.features?.totalArea) || 0) - (Number(a.features?.totalArea) || 0);
      }
      // Default: recent
      return (b.id > a.id ? 1 : -1);
    });
  }, [properties, filters, searchQuery, isAgentMode]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Casas & Catálogo de Propiedades
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestión completa de inventario, características técnicas, fotos y datos confidenciales de agentes.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-200 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Propiedad</span>
        </button>
      </div>

      {/* Filter component */}
      <PropertyFilters
        filters={filters}
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalResults={filteredProperties.length}
      />

      {/* Grid or Table content */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No se encontraron propiedades</h3>
            <p className="text-xs text-slate-500 mt-1">
              Prueba cambiando o limpiando los filtros de búsqueda aplicados.
            </p>
          </div>
          <button
            onClick={() => setFilters({
              search: '',
              operation: 'Todos',
              type: 'Todos',
              status: 'Todos',
              agent: 'Todos',
              sortBy: 'recent'
            })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Filtros</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Inmueble / Ref</th>
                  <th className="py-3 px-4">Operación & Tipo</th>
                  <th className="py-3 px-4">Precio</th>
                  <th className="py-3 px-4">Superficie & Amb</th>
                  <th className="py-3 px-4">Estado</th>
                  {isAgentMode && (
                    <>
                      <th className="py-3 px-4">Llaves</th>
                      <th className="py-3 px-4">Dueño / Comis.</th>
                    </>
                  )}
                  <th className="py-3 px-4">Agente</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProperties.map((prop) => {
                  const assignedAgent = agents.find(a => a.id === prop.agentData?.assignedAgentId);
                  return (
                    <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Image + Ref + Address */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={photoOf(prop)}
                            alt={prop.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                          <div>
                            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px]">
                              {prop.refCode}
                            </span>
                            <p 
                              onClick={() => setSelectedPropertyForDetail(prop)}
                              className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer line-clamp-1 mt-0.5 max-w-[220px]"
                            >
                              {prop.title}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate max-w-[200px]">
                              {prop.location.address}, {prop.location.neighborhood}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Operation & Type */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <OperationBadge operation={prop.operationType} />
                          <div>
                            <PropertyTypeBadge type={prop.propertyType} />
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                        <div>
                          {prop.pricing.currency === 'USD' ? 'USD ' : '$ '}
                          {prop.pricing.price.toLocaleString()}
                        </div>
                        {prop.pricing.expenses > 0 && (
                          <div className="text-[10px] text-slate-400 font-normal">
                            + ${prop.pricing.expenses.toLocaleString()} exp.
                          </div>
                        )}
                      </td>

                      {/* Area & Rooms */}
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        <div><strong>{prop.features.totalArea}</strong> m² tot.</div>
                        <div className="text-[11px] text-slate-400">
                          {prop.features.rooms} amb • {prop.features.bedrooms} dorm
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={prop.status} />
                      </td>

                      {/* Confidential Agent Info (if isAgentMode) */}
                      {isAgentMode && (
                        <>
                          <td className="py-3 px-4 max-w-[150px]">
                            <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                              <Key className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span className="truncate text-[11px]" title={prop.agentData?.keyLocation}>
                                {prop.agentData?.keyLocation || "S/D"}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-[11px]">
                            <div className="font-semibold text-slate-800 truncate max-w-[120px]">
                              {prop.agentData?.owner?.name || "Sin dato"}
                            </div>
                            <div className="text-[10px] text-amber-700 font-bold">
                              {prop.agentData?.commission?.ratePercent ? `${prop.agentData.commission.ratePercent}% com.` : ''}
                            </div>
                          </td>
                        </>
                      )}

                      {/* Agent */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium text-[11px]">
                          {assignedAgent?.name || 'No asignado'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedPropertyForDetail(prop)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Ver Ficha"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {prop.status === 'Disponible' && (
                            <button
                              onClick={() => {
                                setReservationTargetProperty(prop);
                                setIsReservationModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                              title="Reservar"
                            >
                              <BookmarkCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setShareTargetProperty(prop);
                              setIsShareModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Compartir"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedPropertyForEdit(prop)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Editar"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
