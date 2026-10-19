import React, { useState, useEffect } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  X, 
  Plus, 
  Trash2, 
  Building2, 
  Key, 
  DollarSign, 
  User, 
  Image as ImageIcon,
  Check,
  ShieldCheck,
  Info,
  Wifi
} from 'lucide-react';

const COMMON_AMENITIES = [
  "Piscina",
  "Parrilla",
  "Quincho",
  "Jardín parquizado",
  "Seguridad 24hs",
  "Cochera cubierta",
  "Balcón terraza",
  "Apto Crédito",
  "Apto Mascotas",
  "Calefacción central",
  "Aire acondicionado",
  "Gimnasio",
  "SUM / Salón de eventos",
  "Sauna",
  "Ascensor",
  "Sin expensas"
];

const DEFAULT_PHOTOS = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
];

export const PropertyFormModal = () => {
  const { 
    isCreateModalOpen, 
    setIsCreateModalOpen, 
    selectedPropertyForEdit, 
    setSelectedPropertyForEdit,
    addProperty, 
    updateProperty,
    agents
  } = useRealEstate();

  const isEditing = Boolean(selectedPropertyForEdit);
  const isOpen = isCreateModalOpen || isEditing;

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'technical' | 'agent' | 'photos'
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const [formData, setFormData] = useState({
    refCode: '',
    title: '',
    operationType: 'Venta',
    propertyType: 'Casa',
    status: 'Disponible',
    description: '',
    location: {
      address: '',
      neighborhood: '',
      city: 'Buenos Aires',
      postalCode: ''
    },
    features: {
      totalArea: 150,
      coveredArea: 120,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      age: 0,
      orientation: 'Norte'
    },
    amenities: ['Parrilla', 'Cochera cubierta'],
    pricing: {
      currency: 'USD',
      price: 180000,
      expenses: 0
    },
    images: DEFAULT_PHOTOS,
    agentData: {
      owner: {
        name: '',
        phone: '',
        email: '',
        idNumber: '',
        address: '',
        notes: ''
      },
      keyLocation: 'Llavero en oficina central',
      keyCustody: {
        status: 'en_oficina',
        currentHolder: 'Oficina Central',
        takenAt: null,
        history: []
      },
      security: {
        alarmCode: '',
        alarmCompany: '',
        gateCode: '',
        lockboxCode: '',
        wifiPassword: ''
      },
      houseManual: '',
      commission: {
        ratePercent: 3.5,
        notes: 'Comisión inmobiliaria habitual'
      },
      minNegotiationPrice: '',
      legalStatus: 'Escritura y planos en regla',
      assignedAgentId: agents[0]?.id || '',
      internalNotes: ''
    }
  });

  useEffect(() => {
    if (selectedPropertyForEdit) {
      setFormData({
        ...selectedPropertyForEdit,
        agentData: {
          ...selectedPropertyForEdit.agentData,
          owner: { ...(selectedPropertyForEdit.agentData?.owner || {}) },
          security: {
            alarmCode: '',
            alarmCompany: '',
            gateCode: '',
            lockboxCode: '',
            wifiPassword: '',
            ...(selectedPropertyForEdit.agentData?.security || {})
          },
          keyCustody: selectedPropertyForEdit.agentData?.keyCustody || {
            status: 'en_oficina',
            currentHolder: selectedPropertyForEdit.agentData?.keyLocation || 'Oficina Central',
            takenAt: null,
            history: []
          },
          houseManual: selectedPropertyForEdit.agentData?.houseManual || ''
        }
      });
    } else {
      setFormData({
        refCode: `CAS-${Math.floor(100 + Math.random() * 900)}`,
        title: '',
        operationType: 'Venta',
        propertyType: 'Casa',
        status: 'Disponible',
        description: '',
        location: {
          address: '',
          neighborhood: '',
          city: 'Buenos Aires',
          postalCode: ''
        },
        features: {
          totalArea: 160,
          coveredArea: 130,
          rooms: 4,
          bedrooms: 3,
          bathrooms: 2,
          garages: 1,
          age: 5,
          orientation: 'Norte'
        },
        amenities: ['Parrilla', 'Cochera cubierta'],
        pricing: {
          currency: 'USD',
          price: 210000,
          expenses: 0
        },
        images: DEFAULT_PHOTOS,
        agentData: {
          owner: {
            name: '',
            phone: '',
            email: '',
            idNumber: '',
            address: '',
            notes: ''
          },
          keyLocation: 'Llavero en oficina central',
          keyCustody: {
            status: 'en_oficina',
            currentHolder: 'Llavero en oficina central',
            takenAt: null,
            history: []
          },
          security: {
            alarmCode: '',
            alarmCompany: '',
            gateCode: '',
            lockboxCode: '',
            wifiPassword: ''
          },
          houseManual: '',
          commission: {
            ratePercent: 3.5,
            notes: 'Comisión estándar'
          },
          minNegotiationPrice: '',
          legalStatus: 'Escritura al día, sin gravámenes',
          assignedAgentId: agents[0]?.id || '',
          internalNotes: ''
        }
      });
    }
    setActiveTab('general');
  }, [selectedPropertyForEdit, isOpen, agents]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsCreateModalOpen(false);
    setSelectedPropertyForEdit(null);
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter(a => a !== amenity)
          : [...prev.amenities, amenity]
      };
    });
  };

  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, newPhotoUrl.trim()]
    }));
    setNewPhotoUrl('');
  };

  const handleRemovePhoto = (idx) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location.address) {
      alert('Por favor completa el título y la dirección del inmueble');
      return;
    }

    if (isEditing) {
      updateProperty(selectedPropertyForEdit.id, formData);
    } else {
      addProperty(formData);
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditing ? `Editar Propiedad (${formData.refCode})` : 'Cargar Nueva Propiedad'}
            </h2>
            <p className="text-xs text-slate-500">
              Ingresa los datos comerciales, fotos y la ficha confidencial de llaves, alarmas y dueño.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="px-6 border-b border-slate-200 bg-slate-50 flex items-center gap-4 text-xs font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'general' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Datos Generales & Precios
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('technical')}
            className={`py-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'technical' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Ficha Técnica & Amenities
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('agent')}
            className={`py-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'agent' ? 'border-amber-600 text-amber-800' : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-600" />
            <span>3. Llaves, Alarma & Datos de Agente</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`py-3 border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'photos' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>4. Fotos ({formData.images.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: DATOS GENERALES */}
          {activeTab === 'general' && (
            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Código Ref.</label>
                  <input
                    type="text"
                    value={formData.refCode}
                    onChange={(e) => setFormData(p => ({ ...p, refCode: e.target.value }))}
                    placeholder="Ej. CAS-105"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tipo de Operación *</label>
                  <select
                    value={formData.operationType}
                    onChange={(e) => setFormData(p => ({ ...p, operationType: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler Tradicional</option>
                    <option value="Alquiler Temporal">Alquiler Temporal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tipo de Inmueble *</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData(p => ({ ...p, propertyType: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800"
                  >
                    <option value="Casa">Casa</option>
                    <option value="Departamento">Departamento</option>
                    <option value="PH">PH</option>
                    <option value="Terreno">Terreno / Lote</option>
                    <option value="Local">Local / Oficina</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Título de la Publicación *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  placeholder="Ej. Residencia Estilo Francés con Parque y Piscina Climatizada"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-semibold"
                />
              </div>

              {/* Precios */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <span className="font-bold text-indigo-900 uppercase tracking-wider text-[11px]">Valores y Moneda</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Moneda</label>
                    <select
                      value={formData.pricing.currency}
                      onChange={(e) => setFormData(p => ({ ...p, pricing: { ...p.pricing, currency: e.target.value } }))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold"
                    >
                      <option value="USD">Dólares (USD)</option>
                      <option value="ARS">Pesos (ARS)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Precio *</label>
                    <input
                      type="number"
                      required
                      value={formData.pricing.price}
                      onChange={(e) => setFormData(p => ({ ...p, pricing: { ...p.pricing, price: Number(e.target.value) } }))}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2 font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Expensas Mensuales ($)</label>
                    <input
                      type="number"
                      value={formData.pricing.expenses}
                      onChange={(e) => setFormData(p => ({ ...p, pricing: { ...p.pricing, expenses: Number(e.target.value) } }))}
                      placeholder="0 si no paga"
                      className="w-full bg-white border border-slate-200 rounded-xl p-2"
                    />
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="space-y-3">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Ubicación</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">Dirección Exacta *</label>
                    <input
                      type="text"
                      required
                      value={formData.location.address}
                      onChange={(e) => setFormData(p => ({ ...p, location: { ...p.location, address: e.target.value } }))}
                      placeholder="Ej. Av. Santa Fe 3400, Piso 5 B"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Barrio / Zona *</label>
                    <input
                      type="text"
                      required
                      value={formData.location.neighborhood}
                      onChange={(e) => setFormData(p => ({ ...p, location: { ...p.location, neighborhood: e.target.value } }))}
                      placeholder="Ej. Palermo, Belgrano, Martínez..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: FICHA TÉCNICA & AMENITIES */}
          {activeTab === 'technical' && (
            <div className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">m² Totales</label>
                  <input
                    type="number"
                    value={formData.features.totalArea}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, totalArea: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">m² Cubiertos</label>
                  <input
                    type="number"
                    value={formData.features.coveredArea}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, coveredArea: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Ambientes</label>
                  <input
                    type="number"
                    value={formData.features.rooms}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, rooms: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Dormitorios</label>
                  <input
                    type="number"
                    value={formData.features.bedrooms}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, bedrooms: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Baños</label>
                  <input
                    type="number"
                    value={formData.features.bathrooms}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, bathrooms: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Cocheras</label>
                  <input
                    type="number"
                    value={formData.features.garages}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, garages: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Antigüedad (años)</label>
                  <input
                    type="number"
                    value={formData.features.age}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, age: Number(e.target.value) } }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Orientación</label>
                  <input
                    type="text"
                    value={formData.features.orientation}
                    onChange={(e) => setFormData(p => ({ ...p, features: { ...p.features, orientation: e.target.value } }))}
                    placeholder="Noreste"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                  />
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Amenities & Comodidades</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COMMON_AMENITIES.map((amenity) => {
                    const isChecked = formData.amenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                          isChecked
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${isChecked ? 'bg-indigo-600 text-white' : 'border border-slate-300'}`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Descripción Comercial</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Detalles arquitectónicos, luminosidad, entorno, estado general..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs"
                />
              </div>

            </div>
          )}

          {/* TAB 3: LLAVES, ALARMAS, MANUAL Y DATOS DEL DUEÑO */}
          {activeTab === 'agent' && (
            <div className="space-y-4 text-xs">
              
              {/* Llaves */}
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase">
                  <Key className="w-4 h-4 text-amber-600" />
                  <span>Ubicación de Llaves (Llavero / Tablero)</span>
                </div>
                <input
                  type="text"
                  value={formData.agentData.keyLocation}
                  onChange={(e) => setFormData(p => ({
                    ...p,
                    agentData: { ...p.agentData, keyLocation: e.target.value }
                  }))}
                  placeholder="Ej. Llavero #08 en oficina central / En portería con Carlos / Dueño abre"
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 font-bold text-slate-900"
                />
              </div>

              {/* SEGURIDAD & ALARMAS (New!) */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 uppercase text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Códigos de Seguridad & Alarmas
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Contraseña de Alarma</label>
                    <input
                      type="text"
                      value={formData.agentData.security?.alarmCode || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          security: { ...(p.agentData.security || {}), alarmCode: e.target.value }
                        }
                      }))}
                      placeholder="Ej. 4821# (desactivar antes de 30 seg)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Empresa de Monitoreo / Alarma</label>
                    <input
                      type="text"
                      value={formData.agentData.security?.alarmCompany || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          security: { ...(p.agentData.security || {}), alarmCompany: e.target.value }
                        }
                      }))}
                      placeholder="Ej. ADT Seguridad (Abonado #88219)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Clave de Portón / Lockbox</label>
                    <input
                      type="text"
                      value={formData.agentData.security?.gateCode || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          security: { ...(p.agentData.security || {}), gateCode: e.target.value }
                        }
                      }))}
                      placeholder="Ej. Caja reja: 1984 / Clave portón 9912"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">WiFi del Inmueble</label>
                    <input
                      type="text"
                      value={formData.agentData.security?.wifiPassword || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          security: { ...(p.agentData.security || {}), wifiPassword: e.target.value }
                        }
                      }))}
                      placeholder="Red y clave de WiFi"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2"
                    />
                  </div>
                </div>
              </div>

              {/* COSAS QUE TENEMOS QUE SABER (House Manual) */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <span className="font-bold text-amber-950 uppercase text-[11px] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  Cosas que Tenemos que Saber de la Casa (Instrucciones)
                </span>
                <textarea
                  rows={3}
                  value={formData.agentData.houseManual || ''}
                  onChange={(e) => setFormData(p => ({
                    ...p,
                    agentData: { ...p.agentData, houseManual: e.target.value }
                  }))}
                  placeholder="Ej. La bomba de la pileta se enciende con la perilla gris al lado del quincho. Al salir, trabar la reja con doble vuelta. El perro está en el patio de servicio..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-2.5 text-xs text-slate-900 leading-relaxed"
                />
              </div>

              {/* Propietario */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 uppercase text-[11px]">Datos Privados del Dueño</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Nombre Completo del Propietario</label>
                    <input
                      type="text"
                      value={formData.agentData.owner?.name || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          owner: { ...(p.agentData.owner || {}), name: e.target.value }
                        }
                      }))}
                      placeholder="Ej. Roberto Mancini"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Teléfono / WhatsApp Directo</label>
                    <input
                      type="text"
                      value={formData.agentData.owner?.phone || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          owner: { ...(p.agentData.owner || {}), phone: e.target.value }
                        }
                      }))}
                      placeholder="+54 9 11 ..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Email del Propietario</label>
                    <input
                      type="email"
                      value={formData.agentData.owner?.email || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          owner: { ...(p.agentData.owner || {}), email: e.target.value }
                        }
                      }))}
                      placeholder="dueño@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">DNI / CUIT</label>
                    <input
                      type="text"
                      value={formData.agentData.owner?.idNumber || ''}
                      onChange={(e) => setFormData(p => ({
                        ...p,
                        agentData: {
                          ...p.agentData,
                          owner: { ...(p.agentData.owner || {}), idNumber: e.target.value }
                        }
                      }))}
                      placeholder="24.582.119"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Comisiones y Agente a cargo */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Comisión Pactada (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.agentData.commission?.ratePercent || ''}
                    onChange={(e) => setFormData(p => ({
                      ...p,
                      agentData: {
                        ...p.agentData,
                        commission: { ...(p.agentData.commission || {}), ratePercent: Number(e.target.value) }
                      }
                    }))}
                    placeholder="3.5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Piso Mínimo Negociación</label>
                  <input
                    type="number"
                    value={formData.agentData.minNegotiationPrice || ''}
                    onChange={(e) => setFormData(p => ({
                      ...p,
                      agentData: { ...p.agentData, minNegotiationPrice: Number(e.target.value) }
                    }))}
                    placeholder="Precio suelo que acepta"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Agente Responsable</label>
                  <select
                    value={formData.agentData.assignedAgentId}
                    onChange={(e) => setFormData(p => ({
                      ...p,
                      agentData: { ...p.agentData, assignedAgentId: e.target.value }
                    }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-bold text-slate-800"
                  >
                    {agents.map(ag => (
                      <option key={ag.id} value={ag.id}>{ag.name}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: FOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4 text-xs">
              
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="Pega la URL de una imagen (ej. https://...)"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Foto</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[16/10] rounded-xl overflow-hidden group border border-slate-200">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Eliminar foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Portada
                      </span>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Todos los datos de llaves, alarmas y dueño quedan protegidos en tu panel.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 active:scale-95"
              >
                {isEditing ? 'Guardar Cambios' : 'Publicar Inmueble'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
