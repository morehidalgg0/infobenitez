import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  Users, 
  Phone, 
  Mail, 
  Plus, 
  Building2, 
  Key, 
  Edit3, 
  Trash2, 
  X, 
  MessageSquare,
  Award,
  Home
} from 'lucide-react';

export const AgentDirectory = () => {
  const { 
    agents, 
    addAgent, 
    updateAgent, 
    deleteAgent, 
    properties,
    setSelectedPropertyForDetail 
  } = useRealEstate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agente Inmobiliario',
    avatar: ''
  });

  const handleOpenCreate = () => {
    setEditingAgent(null);
    setFormData({
      name: '',
      email: '',
      phone: '+54 9 11 ',
      role: 'Agente Inmobiliario',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
      avatar: agent.avatar
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingAgent) {
      updateAgent(editingAgent.id, formData);
    } else {
      addAgent(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Equipo de Agentes Inmobiliarios
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Directorio del equipo, asignación de casas en cartera, contactos directos y comisiones.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-200 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Agente</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agents.map((agent) => {
          const assignedProps = properties.filter(p => p.agentData?.assignedAgentId === agent.id);
          const availableCount = assignedProps.filter(p => p.status === 'Disponible').length;
          const reservedCount = assignedProps.filter(p => p.status === 'Reservada').length;

          return (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Agent Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={agent.avatar || "https://images.unsplash.com/photo-1534528741775?auto=format&fit=crop&w=256&q=80"}
                      alt={agent.name}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-slate-200"
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{agent.name}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{agent.role}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-[150px]">{agent.email}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(agent)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      title="Editar Agente"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {agents.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar al agente ${agent.name}?`)) {
                            deleteAgent(agent.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* KPIs bar */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-center mt-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Total Asignadas</span>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">{assignedProps.length}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 uppercase font-bold">Disponibles</span>
                    <p className="text-sm font-extrabold text-emerald-700 mt-0.5">{availableCount}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-600 uppercase font-bold">En Reserva</span>
                    <p className="text-sm font-extrabold text-amber-700 mt-0.5">{reservedCount}</p>
                  </div>
                </div>

                {/* Assigned properties mini-chips */}
                <div className="mt-4 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Propiedades en Cartera
                  </span>
                  {assignedProps.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No tiene propiedades asignadas actualmente.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {assignedProps.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPropertyForDetail(p)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-indigo-100"
                        >
                          <Home className="w-3 h-3" />
                          <span>{p.refCode}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({p.status})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Contact Button */}
              {agent.phone && (
                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{agent.phone}</span>
                  <a
                    href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Agente</span>
                  </a>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Modal Add/Edit Agent */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingAgent ? 'Editar Agente' : 'Nuevo Agente Inmobiliario'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ej. Martín Gómez"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Rol / Especialidad</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))}
                  placeholder="Ej. Agente Senior Ventas / Alquileres"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+54 9 11 ..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Profesional</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="agente@inmopanel.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Foto / Avatar URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData(p => ({ ...p, avatar: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200"
                >
                  {editingAgent ? 'Guardar Cambios' : 'Agregar Agente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
