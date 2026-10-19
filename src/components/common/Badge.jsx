import React from 'react';

export const StatusBadge = ({ status }) => {
  const styles = {
    'Disponible': 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
    'Reservada': 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
    'Alquilada': 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20',
    'Vendida': 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-600/20',
    'Pausada': 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-600/20'
  };

  const dots = {
    'Disponible': 'bg-emerald-500',
    'Reservada': 'bg-amber-500 animate-pulse',
    'Alquilada': 'bg-blue-500',
    'Vendida': 'bg-purple-500',
    'Pausada': 'bg-slate-400'
  };

  const style = styles[status] || 'bg-slate-50 text-slate-700 border-slate-200';
  const dot = dots[status] || 'bg-slate-400';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      {status}
    </span>
  );
};

export const OperationBadge = ({ operation }) => {
  const styles = {
    'Venta': 'bg-indigo-600 text-white',
    'Alquiler': 'bg-sky-600 text-white',
    'Alquiler Temporal': 'bg-teal-600 text-white'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm ${styles[operation] || 'bg-slate-800 text-white'}`}>
      {operation}
    </span>
  );
};

export const PropertyTypeBadge = ({ type }) => {
  return (
    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
      {type}
    </span>
  );
};
