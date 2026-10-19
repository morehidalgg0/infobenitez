import React, { useRef } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  X, 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  FileJson 
} from 'lucide-react';

export const DataBackupModal = () => {
  const { 
    isBackupModalOpen, 
    setIsBackupModalOpen, 
    exportDataBackup, 
    importDataBackup, 
    resetToDemoData,
    properties,
    reservations,
    rentals,
    agents 
  } = useRealEstate();

  const fileInputRef = useRef(null);

  if (!isBackupModalOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        importDataBackup(content);
        setIsBackupModalOpen(false);
      } catch (err) {
        alert('Error al leer el archivo JSON');
      }
    };
    reader.readAsText(file);
  };

  const handleResetConfirm = () => {
    if (window.confirm('¿Deseas restablecer todos los datos a la demostración inicial? Se sobreescribirán los cambios no exportados.')) {
      resetToDemoData();
      setIsBackupModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Respaldo y Copias de Seguridad</h2>
              <p className="text-xs text-slate-500">
                Exporta o restaura todo el inventario, señas y contratos en formato JSON.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBackupModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          
          {/* Current dataset counter */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Propiedades</span>
              <p className="text-base font-extrabold text-slate-800">{properties.length}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Reservas</span>
              <p className="text-base font-extrabold text-slate-800">{reservations.length}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Alquileres</span>
              <p className="text-base font-extrabold text-slate-800">{rentals.length}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Agentes</span>
              <p className="text-base font-extrabold text-slate-800">{agents.length}</p>
            </div>
          </div>

          {/* Export action */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Exportar Copia de Seguridad</span>
              </div>
              <button
                onClick={exportDataBackup}
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Descargar JSON
              </button>
            </div>
            <p className="text-slate-500 text-[11px]">
              Descarga un archivo con toda la base de datos de tu inmobiliaria para guardarlo en tu computadora o compartirlo con otro equipo.
            </p>
          </div>

          {/* Import action */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>Importar / Restaurar Respaldo</span>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Cargar Archivo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            <p className="text-slate-500 text-[11px]">
              Sube un archivo de respaldo generado anteriormente para restablecer toda la información en este navegador.
            </p>
          </div>

          {/* Reset Demo Data */}
          <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Reiniciar Catálogo Demo</span>
              </div>
              <button
                onClick={handleResetConfirm}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors"
              >
                Restablecer
              </button>
            </div>
            <p className="text-rose-700 text-[11px]">
              Restaura las propiedades de ejemplo (casas en Martínez, semipisos en Puerto Madero, etc.) y agentes predefinidos.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
