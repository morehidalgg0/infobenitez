import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_PROPERTIES, INITIAL_AGENTS, INITIAL_RESERVATIONS, INITIAL_RENTALS, INITIAL_MOVEMENTS } from '../data/initialData';
import { initialsAvatar } from '../utils/placeholders';
import { calcSaleSplit, splitForMovement } from '../utils/saleSplit';

const RealEstateContext = createContext();

// Preferencia local de cada navegador; todo lo demás vive en la base de datos
const AGENT_MODE_KEY = 'inmopanel_agent_mode_v2';

// Borra datos de versiones anteriores, que guardaban todo (incluidas contraseñas) en el navegador
try {
  Object.keys(localStorage)
    .filter(key => key.startsWith('inmopanel_') && key !== AGENT_MODE_KEY)
    .forEach(key => localStorage.removeItem(key));
} catch {
  // Sin acceso a localStorage: no hay nada que limpiar
}

export const ADMIN_USER_ID = 'admin';

export { calcSaleSplit };

const COLLECTIONS = ['properties', 'agents', 'reservations', 'rentals', 'movements'];

const api = async (path, options = {}) => {
  const res = await fetch(`/api/${path}`, {
    credentials: 'same-origin',
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(body.error || `Error ${res.status}`), { status: res.status });
  return body;
};

// Ensure security and key custody defaults exist
const withPropertyDefaults = (p) => ({
  ...p,
  agentData: {
    ...p.agentData,
    security: p.agentData?.security || {
      alarmCode: '',
      alarmCompany: '',
      gateCode: '',
      lockboxCode: '',
      wifiPassword: ''
    },
    keyCustody: p.agentData?.keyCustody || {
      status: 'en_oficina',
      currentHolder: p.agentData?.keyLocation || 'Oficina Central',
      takenAt: null,
      history: []
    },
    houseManual: p.agentData?.houseManual || ''
  }
});

const withAgentDefaults = (agent) => ({
  ...agent,
  avatar: agent.avatar || initialsAvatar(agent.name),
  ...(agent.isOwner ? {} : { agencySplitPercent: agent.agencySplitPercent ?? 50 })
});

export const RealEstateProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [movements, setMovements] = useState([]);
  const [adminAccount, setAdminAccount] = useState({ name: '', username: '' });

  // Usuario de la sesión (lo informa el servidor) y estado de carga inicial
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Presentation Mode vs Agent Mode
  const [isAgentMode, setIsAgentMode] = useState(() => {
    try {
      const saved = localStorage.getItem(AGENT_MODE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Active view in app: 'dashboard' | 'properties' | 'reservations' | 'rentals' | 'calendar' | 'keys' | 'agents' | 'finance'
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState(null);
  const [selectedPropertyForEdit, setSelectedPropertyForEdit] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationTargetProperty, setReservationTargetProperty] = useState(null);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [rentalTargetProperty, setRentalTargetProperty] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTargetProperty, setShareTargetProperty] = useState(null);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [soldPropertyForCommission, setSoldPropertyForCommission] = useState(null);
  const [contractReservation, setContractReservation] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(AGENT_MODE_KEY, JSON.stringify(isAgentMode));
    } catch (e) {
      console.error('Error saving agent mode state', e);
    }
  }, [isAgentMode]);

  // Helper notification toast
  const notify = (text, type = 'info') => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // SINCRONIZACIÓN CON LA BASE DE DATOS
  // baselines: lo último que coincide con el servidor, por colección (id -> JSON).
  // Cada cambio de estado se compara contra eso y se envían solo los registros que cambiaron.
  const baselines = useRef({});
  const saveQueue = useRef(Promise.resolve());
  const pendingSaves = useRef(0);

  // Encola llamadas que modifican datos, para que lleguen al servidor en orden
  const enqueue = (fn) => {
    pendingSaves.current += 1;
    const run = saveQueue.current.then(fn).finally(() => { pendingSaves.current -= 1; });
    saveQueue.current = run.catch(() => {});
    return run;
  };

  const setBaseline = (name, list) => {
    baselines.current[name] = new Map(list.map(item => [item.id, JSON.stringify(item)]));
  };

  const clearData = () => {
    baselines.current = {};
    setCurrentUser(null);
    setProperties([]);
    setAgents([]);
    setReservations([]);
    setRentals([]);
    setMovements([]);
    setSelectedPropertyForDetail(null);
  };

  const loadData = async () => {
    const data = await api('data');
    const lists = {
      properties: data.properties.map(withPropertyDefaults),
      agents: data.agents.map(withAgentDefaults),
      reservations: data.reservations,
      rentals: data.rentals,
      movements: data.movements
    };
    // La línea base va antes del setState, así la carga no se reenvía al servidor
    COLLECTIONS.forEach(name => setBaseline(name, lists[name]));
    setProperties(lists.properties);
    setAgents(lists.agents);
    setReservations(lists.reservations);
    setRentals(lists.rentals);
    setMovements(lists.movements);
    if (data.admin) setAdminAccount(data.admin);
    setCurrentUser(data.user);
  };

  const handleSaveError = (e) => {
    if (e.status === 401) {
      clearData();
      notify('Tu sesión venció. Ingresá de nuevo.', 'error');
      return;
    }
    notify(`No se pudo guardar: ${e.message}`, 'error');
    // Vuelve a lo que realmente quedó guardado
    loadData().catch(() => {});
  };

  const syncCollection = (name, list) => {
    const base = baselines.current[name];
    if (!base) return;
    const seen = new Set();
    const upserts = [];
    for (const item of list) {
      seen.add(item.id);
      if (base.get(item.id) !== JSON.stringify(item)) upserts.push(item);
    }
    const deletes = [...base.keys()].filter(id => !seen.has(id));
    if (upserts.length === 0 && deletes.length === 0) return;
    setBaseline(name, list);
    enqueue(() => api('data', { method: 'POST', body: JSON.stringify({ collection: name, upserts, deletes }) }))
      .catch(handleSaveError);
  };

  useEffect(() => { syncCollection('properties', properties); }, [properties]);
  useEffect(() => { syncCollection('agents', agents); }, [agents]);
  useEffect(() => { syncCollection('reservations', reservations); }, [reservations]);
  useEffect(() => { syncCollection('rentals', rentals); }, [rentals]);
  useEffect(() => { syncCollection('movements', movements); }, [movements]);

  // Al abrir: si ya hay sesión, carga los datos
  useEffect(() => {
    api('auth?action=me')
      .then(({ user }) => (user ? loadData() : null))
      .catch(() => {})
      .finally(() => setAuthChecked(true));
  }, []);

  // Trae los cambios del resto del equipo cada minuto y al volver a la pestaña
  useEffect(() => {
    if (!currentUser) return;
    const refresh = () => {
      if (pendingSaves.current === 0) loadData().catch(e => { if (e.status === 401) clearData(); });
    };
    const interval = setInterval(refresh, 60000);
    window.addEventListener('focus', refresh);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', refresh);
    };
  }, [currentUser?.id]);

  const isAdmin = currentUser?.role === 'admin';
  // Brokers con cuenta propia (la dueña opera con la cuenta admin)
  const brokers = agents.filter(a => !a.isOwner);

  // AUTH
  const login = async (username, password) => {
    try {
      await api('auth?action=login', { method: 'POST', body: JSON.stringify({ username, password }) });
      await loadData();
      setCurrentView('dashboard');
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.status === 401 ? 'Usuario o contraseña incorrectos.' : `No se pudo ingresar: ${e.message}` };
    }
  };

  const logout = async () => {
    await saveQueue.current;
    try {
      await api('auth?action=logout', { method: 'POST', body: '{}' });
    } catch {
      // Igual se limpia la sesión local
    }
    clearData();
    setCurrentView('dashboard');
  };

  // Cuentas de acceso (solo administración). password vacío = no cambiarla.
  const updateAdminAccount = async (fields) => {
    try {
      const result = await enqueue(() => api('users', { method: 'POST', body: JSON.stringify({ target: 'admin', ...fields }) }));
      setAdminAccount({ name: fields.name, username: result.username });
      setCurrentUser(prev => prev && { ...prev, name: fields.name, username: result.username });
      notify('Cuenta de administración actualizada', 'success');
      return true;
    } catch (e) {
      notify(e.message, 'error');
      return false;
    }
  };

  const setAgentCredentials = async (agentId, { username, password }) => {
    try {
      const result = await enqueue(() => api('users', { method: 'POST', body: JSON.stringify({ target: agentId, username, password }) }));
      const patch = { username: result.username, hasPassword: result.hasPassword };
      // Usuario y contraseña viven en el servidor: se actualiza la ficha sin reenviarla
      const base = baselines.current.agents;
      setAgents(prev => prev.map(a => {
        if (a.id !== agentId) return a;
        const updated = { ...a, ...patch };
        base?.set(a.id, JSON.stringify(updated));
        return updated;
      }));
      return true;
    } catch (e) {
      notify(e.message, 'error');
      return false;
    }
  };

  // FINANZAS: ingresos y egresos
  const buildMovement = (data) => {
    if (data.kind !== 'venta') return { ...data, type: data.type, kind: 'general' };
    const split = splitForMovement(data);
    return { ...data, type: 'ingreso', ...split, amount: split.commissionTotal };
  };

  const addMovement = (data) => {
    const movement = {
      id: `mov-${Date.now()}`,
      agencyShareSettled: false,
      ...buildMovement(data),
      userId: isAdmin ? (data.userId || ADMIN_USER_ID) : currentUser?.id
    };
    setMovements(prev => [movement, ...prev]);
    notify(movement.type === 'ingreso' ? 'Ingreso registrado' : 'Egreso registrado', 'success');
    return movement;
  };

  const updateMovement = (id, data) => {
    setMovements(prev => prev.map(m => {
      if (m.id !== id) return m;
      if (!isAdmin && m.userId !== currentUser?.id) return m;
      return { ...m, ...buildMovement({ ...m, ...data }), userId: isAdmin ? (data.userId || m.userId) : m.userId };
    }));
    notify('Movimiento actualizado', 'success');
  };

  const deleteMovement = (id) => {
    setMovements(prev => prev.filter(m => m.id !== id || (!isAdmin && m.userId !== currentUser?.id)));
    notify('Movimiento eliminado', 'info');
  };

  // Solo el admin marca si la inmobiliaria ya cobró su parte de una venta
  const toggleAgencyShareSettled = (id) => {
    if (!isAdmin) return;
    setMovements(prev => prev.map(m => m.id === id ? { ...m, agencyShareSettled: !m.agencyShareSettled } : m));
    notify('Estado de liquidación actualizado', 'success');
  };

  // CRUD Properties
  const addProperty = (newPropData) => {
    const id = `prop-${Date.now()}`;
    const refCode = newPropData.refCode || `REF-${Math.floor(100 + Math.random() * 900)}`;
    const property = {
      ...newPropData,
      id,
      refCode,
      createdAt: new Date().toISOString(),
      agentData: {
        ...newPropData.agentData,
        security: newPropData.agentData?.security || {
          alarmCode: '',
          alarmCompany: '',
          gateCode: '',
          lockboxCode: '',
          wifiPassword: ''
        },
        keyCustody: newPropData.agentData?.keyCustody || {
          status: 'en_oficina',
          currentHolder: newPropData.agentData?.keyLocation || 'Oficina Central',
          takenAt: null,
          history: []
        },
        houseManual: newPropData.agentData?.houseManual || ''
      }
    };
    setProperties(prev => [property, ...prev]);
    notify(`Propiedad ${refCode} agregada exitosamente`, 'success');
    return property;
  };

  const updateProperty = (id, updatedFields) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          agentData: {
            ...p.agentData,
            ...(updatedFields.agentData || {})
          }
        };
      }
      return p;
    }));

    if (selectedPropertyForDetail && selectedPropertyForDetail.id === id) {
      setSelectedPropertyForDetail(prev => ({
        ...prev,
        ...updatedFields,
        agentData: {
          ...prev.agentData,
          ...(updatedFields.agentData || {})
        }
      }));
    }

    notify('Propiedad actualizada con éxito', 'success');
  };

  const deleteProperty = (id) => {
    const prop = properties.find(p => p.id === id);
    setProperties(prev => prev.filter(p => p.id !== id));
    if (selectedPropertyForDetail?.id === id) setSelectedPropertyForDetail(null);
    notify(`Propiedad ${prop?.refCode || ''} eliminada`, 'info');
  };

  const changePropertyStatus = (id, newStatus) => {
    const prop = properties.find(p => p.id === id);
    updateProperty(id, { status: newStatus });
    notify(`Estado cambiado a: ${newStatus}`, 'success');
    // Al concretarse la venta se pide registrar la comisión, si todavía no está cargada
    const alreadyRegistered = movements.some(m => m.kind === 'venta' && m.propertyId === id);
    if (newStatus === 'Vendida' && prop && prop.status !== 'Vendida' && !alreadyRegistered) {
      setSoldPropertyForCommission({ ...prop, status: newStatus });
    }
  };

  // KEY CUSTODY ACTIONS (Critical agent feature)
  const checkoutKey = (propertyId, agentName, reason = 'Muestra a cliente') => {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} hs`;
    
    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const history = p.agentData?.keyCustody?.history || [];
        const newRecord = {
          id: `kh-${Date.now()}`,
          date: timeStr,
          agentName,
          action: 'Retiró llave',
          notes: reason
        };
        return {
          ...p,
          agentData: {
            ...p.agentData,
            keyCustody: {
              status: 'prestada',
              currentHolder: agentName,
              takenAt: timeStr,
              history: [newRecord, ...history]
            }
          }
        };
      }
      return p;
    }));

    if (selectedPropertyForDetail?.id === propertyId) {
      setSelectedPropertyForDetail(prev => {
        const history = prev.agentData?.keyCustody?.history || [];
        const newRecord = {
          id: `kh-${Date.now()}`,
          date: timeStr,
          agentName,
          action: 'Retiró llave',
          notes: reason
        };
        return {
          ...prev,
          agentData: {
            ...prev.agentData,
            keyCustody: {
              status: 'prestada',
              currentHolder: agentName,
              takenAt: timeStr,
              history: [newRecord, ...history]
            }
          }
        };
      });
    }

    notify(`Llave registrada en poder de: ${agentName}`, 'success');
  };

  const returnKey = (propertyId, locationNotes = 'Llavero de Oficina Central') => {
    const now = new Date();
    const timeStr = `${now.toLocaleDateString()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} hs`;

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const history = p.agentData?.keyCustody?.history || [];
        const newRecord = {
          id: `kh-${Date.now()}`,
          date: timeStr,
          agentName: 'Oficina',
          action: 'Devolvió llave a oficina',
          notes: locationNotes
        };
        return {
          ...p,
          agentData: {
            ...p.agentData,
            keyCustody: {
              status: 'en_oficina',
              currentHolder: locationNotes,
              takenAt: null,
              history: [newRecord, ...history]
            }
          }
        };
      }
      return p;
    }));

    if (selectedPropertyForDetail?.id === propertyId) {
      setSelectedPropertyForDetail(prev => {
        const history = prev.agentData?.keyCustody?.history || [];
        const newRecord = {
          id: `kh-${Date.now()}`,
          date: timeStr,
          agentName: 'Oficina',
          action: 'Devolvió llave a oficina',
          notes: locationNotes
        };
        return {
          ...prev,
          agentData: {
            ...prev.agentData,
            keyCustody: {
              status: 'en_oficina',
              currentHolder: locationNotes,
              takenAt: null,
              history: [newRecord, ...history]
            }
          }
        };
      });
    }

    notify('Llave devuelta al tablero de oficina', 'success');
  };

  const addVisitToProperty = (propertyId, visitData) => {
    const newVisit = {
      id: `vh-${Date.now()}`,
      date: visitData.date || new Date().toISOString().split('T')[0],
      visitorName: visitData.visitorName,
      phone: visitData.phone,
      feedback: visitData.feedback,
      agentName: visitData.agentName || 'Agente Inmobiliario'
    };

    setProperties(prev => prev.map(p => {
      if (p.id === propertyId) {
        const history = p.agentData?.visitsHistory || [];
        return {
          ...p,
          agentData: {
            ...p.agentData,
            visitsHistory: [newVisit, ...history]
          }
        };
      }
      return p;
    }));

    if (selectedPropertyForDetail?.id === propertyId) {
      setSelectedPropertyForDetail(prev => ({
        ...prev,
        agentData: {
          ...prev.agentData,
          visitsHistory: [newVisit, ...(prev.agentData?.visitsHistory || [])]
        }
      }));
    }

    notify('Visita registrada en la ficha del agente', 'success');
  };

  // CRUD Reservations
  const addReservation = (resData) => {
    const targetProp = properties.find(p => p.id === resData.propertyId);
    const newReservation = {
      id: `res-${Date.now()}`,
      receiptNumber: `REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      reservationDate: resData.reservationDate || new Date().toISOString().split('T')[0],
      propertyPrice: targetProp ? targetProp.pricing.price : 0,
      status: 'Activa',
      ...resData,
      // Si reserva un broker, la administración tiene que aprobar el contrato
      contractStatus: isAdmin ? 'aprobado' : 'pendiente',
      createdBy: currentUser?.id
    };

    setReservations(prev => [newReservation, ...prev]);

    if (resData.propertyId) {
      changePropertyStatus(resData.propertyId, 'Reservada');
    }

    notify(isAdmin
      ? 'Reserva registrada. La propiedad pasó a estado Reservada.'
      : 'Reserva registrada. El contrato queda pendiente de aprobación de la administración.', 'success');
    return newReservation;
  };

  const setContractApproval = (reservationId, approved) => {
    if (!isAdmin) return;
    setReservations(prev => prev.map(r => r.id === reservationId ? { ...r, contractStatus: approved ? 'aprobado' : 'rechazado' } : r));
    notify(approved ? 'Contrato aprobado: el broker ya puede generarlo' : 'Contrato rechazado', approved ? 'success' : 'info');
  };

  const updateReservation = (id, updatedFields) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, ...updatedFields } : r));
    notify('Reserva actualizada', 'success');
  };

  const deleteReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    notify('Reserva eliminada', 'info');
  };

  const completeReservation = (reservationId, outcome) => {
    const res = reservations.find(r => r.id === reservationId);
    if (!res) return;

    if (outcome === 'Cancelada') {
      updateReservation(reservationId, { status: 'Cancelada' });
      changePropertyStatus(res.propertyId, 'Disponible');
      notify('Reserva cancelada. La propiedad vuelve a estar Disponible.', 'info');
    } else {
      updateReservation(reservationId, { status: 'Concretada' });
      changePropertyStatus(res.propertyId, outcome);
      notify(`Operación concretada con éxito: Propiedad marcada como ${outcome}.`, 'success');
    }
  };

  // CRUD Rentals
  const addRental = (rentalData) => {
    const newRental = {
      id: `rent-${Date.now()}`,
      paymentStatusCurrentMonth: 'Al día',
      ...rentalData
    };

    setRentals(prev => [newRental, ...prev]);

    if (rentalData.propertyId) {
      changePropertyStatus(rentalData.propertyId, 'Alquilada');
    }

    notify('Contrato de alquiler registrado. La propiedad pasó a estado Alquilada.', 'success');
    return newRental;
  };

  const updateRental = (id, updatedFields) => {
    setRentals(prev => prev.map(r => r.id === id ? { ...r, ...updatedFields } : r));
    notify('Contrato de alquiler actualizado', 'success');
  };

  const deleteRental = (id) => {
    setRentals(prev => prev.filter(r => r.id !== id));
    notify('Contrato eliminado del registro', 'info');
  };

  // CRUD Agents
  const addAgent = (agentData) => {
    const newAgent = {
      id: `agent-${Date.now()}`,
      phoneClean: agentData.phone?.replace(/[^0-9]/g, '') || '',
      avatar: agentData.avatar || initialsAvatar(agentData.name),
      agencySplitPercent: 50,
      ...agentData
    };
    setAgents(prev => [...prev, newAgent]);
    notify('Agente agregado al equipo', 'success');
    return newAgent;
  };

  const updateAgent = (id, updatedFields) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, ...updatedFields } : a));
    notify('Datos del agente actualizados', 'success');
  };

  const deleteAgent = (id) => {
    setAgents(prev => prev.filter(a => a.id !== id));
    notify('Agente eliminado', 'info');
  };

  // Data Backup / Restore
  const exportDataBackup = () => {
    const exportData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      properties,
      agents,
      reservations,
      rentals,
      movements,
      adminAccount
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inmopanel-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    notify('Copia de seguridad descargada en archivo JSON', 'success');
  };

  const importDataBackup = (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (data.properties) setProperties(data.properties);
      if (data.agents) setAgents(data.agents.map(withAgentDefaults));
      if (data.reservations) setReservations(data.reservations);
      if (data.rentals) setRentals(data.rentals);
      if (data.movements) setMovements(data.movements);
      notify('Datos restaurados correctamente desde el respaldo', 'success');
      return true;
    } catch (e) {
      console.error(e);
      notify('Error al importar el archivo. Verifica el formato JSON.', 'error');
      return false;
    }
  };

  const resetToDemoData = () => {
    setProperties(INITIAL_PROPERTIES.map(withPropertyDefaults));
    setAgents(INITIAL_AGENTS.map(withAgentDefaults));
    setReservations(INITIAL_RESERVATIONS);
    setRentals(INITIAL_RENTALS);
    setMovements(INITIAL_MOVEMENTS);
    notify('Datos reiniciados al catálogo demo inicial con llaves y alarmas', 'info');
  };

  // Calculated Metrics
  const stats = {
    totalProperties: properties.length,
    availableCount: properties.filter(p => p.status === 'Disponible').length,
    reservedCount: properties.filter(p => p.status === 'Reservada').length,
    rentedCount: properties.filter(p => p.status === 'Alquilada').length,
    soldCount: properties.filter(p => p.status === 'Vendida').length,
    activeReservationsCount: reservations.filter(r => r.status === 'Activa' || r.status === 'En verificación').length,
    pendingContractsCount: reservations.filter(r => r.contractStatus === 'pendiente' && r.status !== 'Cancelada').length,
    activeRentalsCount: rentals.length,
    keysCheckedOutCount: properties.filter(p => p.agentData?.keyCustody?.status === 'prestada').length,
    urgentReservationsCount: reservations.filter(r => {
      if (r.status !== 'Activa' && r.status !== 'En verificación') return false;
      const today = new Date();
      const exp = new Date(r.expirationDate);
      const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
      return diffDays <= 5 && diffDays >= 0;
    }).length,
    totalPortfolioUSD: properties
      .filter(p => p.pricing?.currency === 'USD' && (p.status === 'Disponible' || p.status === 'Reservada'))
      .reduce((acc, curr) => acc + (Number(curr.pricing?.price) || 0), 0)
  };

  return (
    <RealEstateContext.Provider
      value={{
        properties,
        agents,
        reservations,
        rentals,
        movements,
        brokers,
        currentUser,
        isAdmin,
        adminAccount,
        login,
        authChecked,
        setAgentCredentials,
        logout,
        updateAdminAccount,
        addMovement,
        updateMovement,
        deleteMovement,
        toggleAgencyShareSettled,
        isAgentMode,
        setIsAgentMode,
        currentView,
        setCurrentView,
        searchQuery,
        setSearchQuery,
        stats,
        // Modals
        selectedPropertyForDetail,
        setSelectedPropertyForDetail,
        selectedPropertyForEdit,
        setSelectedPropertyForEdit,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isReservationModalOpen,
        setIsReservationModalOpen,
        reservationTargetProperty,
        setReservationTargetProperty,
        isRentalModalOpen,
        setIsRentalModalOpen,
        rentalTargetProperty,
        setRentalTargetProperty,
        isShareModalOpen,
        setIsShareModalOpen,
        shareTargetProperty,
        setShareTargetProperty,
        isBackupModalOpen,
        setIsBackupModalOpen,
        toastMessage,
        notify,
        soldPropertyForCommission,
        setSoldPropertyForCommission,
        contractReservation,
        setContractReservation,
        setContractApproval,
        // Actions
        addProperty,
        updateProperty,
        deleteProperty,
        changePropertyStatus,
        checkoutKey,
        returnKey,
        addVisitToProperty,
        addReservation,
        updateReservation,
        deleteReservation,
        completeReservation,
        addRental,
        updateRental,
        deleteRental,
        addAgent,
        updateAgent,
        deleteAgent,
        exportDataBackup,
        importDataBackup,
        resetToDemoData
      }}
    >
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};
