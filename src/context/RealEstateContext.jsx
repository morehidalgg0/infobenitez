import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, INITIAL_AGENTS, INITIAL_RESERVATIONS, INITIAL_RENTALS, INITIAL_ADMIN, INITIAL_MOVEMENTS } from '../data/initialData';
import { initialsAvatar } from '../utils/placeholders';

const RealEstateContext = createContext();

const STORAGE_KEYS = {
  // v3: datos reales de Benitez Inmobiliaria (reemplazan la demo)
  PROPERTIES: 'inmopanel_properties_v3',
  AGENTS: 'inmopanel_agents_v3',
  RESERVATIONS: 'inmopanel_reservations_v3',
  RENTALS: 'inmopanel_rentals_v3',
  AGENT_MODE: 'inmopanel_agent_mode_v2',
  ADMIN: 'inmopanel_admin_v2',
  MOVEMENTS: 'inmopanel_movements_v2',
  SESSION: 'inmopanel_session_v2'
};

export const ADMIN_USER_ID = 'admin';

// Calcula honorarios de una venta y la parte exacta que corresponde a la inmobiliaria
export const calcSaleSplit = (salePrice, commissionPercent, agencySplitPercent) => {
  const round2 = (n) => Math.round(n * 100) / 100;
  const commissionTotal = round2((Number(salePrice) || 0) * (Number(commissionPercent) || 0) / 100);
  const agencyShare = round2(commissionTotal * (Number(agencySplitPercent) || 0) / 100);
  return { commissionTotal, agencyShare, brokerShare: round2(commissionTotal - agencyShare) };
};

// Completa credenciales en agentes guardados antes de que existiera el login
const withAgentDefaults = (agent) => {
  const seed = INITIAL_AGENTS.find(a => a.id === agent.id);
  if (agent.isOwner) return { ...agent, avatar: agent.avatar || initialsAvatar(agent.name) };
  return {
    ...agent,
    avatar: agent.avatar || initialsAvatar(agent.name),
    username: agent.username || seed?.username || agent.email?.split('@')[0] || agent.id,
    password: agent.password || '',
    agencySplitPercent: agent.agencySplitPercent ?? seed?.agencySplitPercent ?? 50
  };
};

export const RealEstateProvider = ({ children }) => {
  // Load initial state from LocalStorage or fall back to mock data
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure security and key custody defaults exist
        return parsed.map(p => ({
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
        }));
      }
      return INITIAL_PROPERTIES;
    } catch {
      return INITIAL_PROPERTIES;
    }
  });

  const [agents, setAgents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGENTS);
      return (saved ? JSON.parse(saved) : INITIAL_AGENTS).map(withAgentDefaults);
    } catch {
      return INITIAL_AGENTS;
    }
  });

  const [reservations, setReservations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [rentals, setRentals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RENTALS);
      return saved ? JSON.parse(saved) : INITIAL_RENTALS;
    } catch {
      return INITIAL_RENTALS;
    }
  });

  const [adminAccount, setAdminAccount] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN;
    } catch {
      return INITIAL_ADMIN;
    }
  });

  const [movements, setMovements] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
      return saved ? JSON.parse(saved) : INITIAL_MOVEMENTS;
    } catch {
      return INITIAL_MOVEMENTS;
    }
  });

  // Sesión: { role: 'admin' } | { role: 'broker', agentId }
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Presentation Mode vs Agent Mode
  const [isAgentMode, setIsAgentMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGENT_MODE);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Active view in app: 'dashboard' | 'properties' | 'reservations' | 'rentals' | 'calendar' | 'keys' | 'agents'
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

  // Persistence to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    } catch (e) {
      console.error('Error saving properties to localStorage', e);
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENTS, JSON.stringify(agents));
    } catch (e) {
      console.error('Error saving agents to localStorage', e);
    }
  }, [agents]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.error('Error saving reservations to localStorage', e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RENTALS, JSON.stringify(rentals));
    } catch (e) {
      console.error('Error saving rentals to localStorage', e);
    }
  }, [rentals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGENT_MODE, JSON.stringify(isAgentMode));
    } catch (e) {
      console.error('Error saving agent mode state', e);
    }
  }, [isAgentMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminAccount));
    } catch (e) {
      console.error('Error saving admin account', e);
    }
  }, [adminAccount]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
    } catch (e) {
      console.error('Error saving movements to localStorage', e);
    }
  }, [movements]);

  useEffect(() => {
    try {
      if (session) localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
      else localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (e) {
      console.error('Error saving session', e);
    }
  }, [session]);

  // Usuario logueado (null si la sesión apunta a un broker eliminado)
  const currentUser = (() => {
    if (!session) return null;
    if (session.role === 'admin') {
      return { id: ADMIN_USER_ID, role: 'admin', name: adminAccount.name, username: adminAccount.username };
    }
    const agent = agents.find(a => a.id === session.agentId && !a.isOwner);
    return agent ? { id: agent.id, role: 'broker', name: agent.name, username: agent.username, avatar: agent.avatar, agencySplitPercent: agent.agencySplitPercent } : null;
  })();
  const isAdmin = currentUser?.role === 'admin';
  // Brokers con cuenta propia (la dueña opera con la cuenta admin)
  const brokers = agents.filter(a => !a.isOwner);

  // Helper notification toast
  const notify = (text, type = 'info') => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // AUTH
  // Primer uso: la dueña todavía no creó su contraseña
  const needsAdminSetup = !adminAccount.password;

  const setupAdminPassword = (password) => {
    if (!needsAdminSetup || !password) return;
    setAdminAccount(prev => ({ ...prev, password }));
    setSession({ role: 'admin' });
    setCurrentView('dashboard');
  };

  const login = (username, password) => {
    const user = username.trim().toLowerCase();
    if (!password) return false;
    if (adminAccount.password && user === adminAccount.username.toLowerCase() && password === adminAccount.password) {
      setSession({ role: 'admin' });
      setCurrentView('dashboard');
      return true;
    }
    const agent = agents.find(a => !a.isOwner && a.password && a.username?.toLowerCase() === user && a.password === password);
    if (agent) {
      setSession({ role: 'broker', agentId: agent.id });
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setSession(null);
    setSelectedPropertyForDetail(null);
    setCurrentView('dashboard');
  };

  const updateAdminAccount = (fields) => {
    setAdminAccount(prev => ({ ...prev, ...fields }));
    notify('Cuenta de administración actualizada', 'success');
  };

  // FINANZAS: ingresos y egresos
  const buildMovement = (data) => {
    if (data.kind !== 'venta') return { ...data, type: data.type, kind: 'general' };
    const split = calcSaleSplit(data.salePrice, data.commissionPercent, data.agencySplitPercent);
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
    updateProperty(id, { status: newStatus });
    notify(`Estado cambiado a: ${newStatus}`, 'success');
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
      ...resData
    };

    setReservations(prev => [newReservation, ...prev]);

    if (resData.propertyId) {
      changePropertyStatus(resData.propertyId, 'Reservada');
    }

    notify('Reserva registrada exitosamente. La propiedad pasó a estado Reservada.', 'success');
    return newReservation;
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
      if (data.adminAccount) setAdminAccount(data.adminAccount);
      notify('Datos restaurados correctamente desde el respaldo', 'success');
      return true;
    } catch (e) {
      console.error(e);
      notify('Error al importar el archivo. Verifica el formato JSON.', 'error');
      return false;
    }
  };

  const resetToDemoData = () => {
    setProperties(INITIAL_PROPERTIES);
    setAgents(INITIAL_AGENTS);
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
        needsAdminSetup,
        setupAdminPassword,
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
