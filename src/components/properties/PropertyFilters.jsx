import React from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw 
} from 'lucide-react';

export const PropertyFilters = ({ 
  filters, 
  setFilters, 
  viewMode, 
  setViewMode, 
  totalResults 
}) => {
  const { agents } = useRealEstate();

  const handleReset = () => {
    setFilters({
      search: '',
      operation: 'Todos',
      type: 'Todos',
      status: 'Todos',
      agent: 'Todos',
      sortBy: 'recent'
    });
  };

  const hasActiveFilters = 
    filters.search !== '' ||
    filters.operation !== 'Todos' ||
    filters.type !== 'Todos' ||
    filters.status !== 'Todos' ||
    filters.agent !== 'Todos';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3.5 shadow-sm">
      
      {/* Top row: search + view switch + counts */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            placeholder="Buscar por código (CAS-101), dirección, título o dueño..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* View mode & Result count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs font-semibold text-slate-500">
            {totalResults} {totalResults === 1 ? 'propiedad' : 'propiedades'}
          </span>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Vista en Cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Vista en Tabla"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          )}
        </div>

      </div>

      {/* Filter pills row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-slate-100 text-xs">
        
        {/* Operación */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Operación
          </label>
          <select
            value={filters.operation}
            onChange={(e) => setFilters(prev => ({ ...prev, operation: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="Todos">Todas las operaciones</option>
            <option value="Venta">Solo Venta</option>
            <option value="Alquiler">Solo Alquiler</option>
            <option value="Alquiler Temporal">Alquiler Temporal</option>
          </select>
        </div>

        {/* Tipo de Inmueble */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Tipo de Inmueble
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="Todos">Todos los tipos</option>
            <option value="Casa">Casas</option>
            <option value="Departamento">Departamentos</option>
            <option value="PH">PHs</option>
            <option value="Terreno">Terrenos / Lotes</option>
            <option value="Local">Locales / Oficinas</option>
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Estado
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Disponible">🟢 Solo Disponibles</option>
            <option value="Reservada">🟡 Reservadas</option>
            <option value="Alquilada">🔵 Alquiladas</option>
            <option value="Vendida">🟣 Vendidas</option>
          </select>
        </div>

        {/* Agente Asignado */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Agente Asignado
          </label>
          <select
            value={filters.agent}
            onChange={(e) => setFilters(prev => ({ ...prev, agent: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="Todos">Todos los agentes</option>
            {agents.map(ag => (
              <option key={ag.id} value={ag.id}>{ag.name}</option>
            ))}
          </select>
        </div>

        {/* Ordenar por */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Ordenar por
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-indigo-500"
          >
            <option value="recent">Más recientes</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="area-desc">Mayor superficie (m²)</option>
          </select>
        </div>

      </div>

    </div>
  );
};
