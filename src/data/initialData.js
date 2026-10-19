export const INITIAL_AGENTS = [
  {
    id: "agent-1",
    name: "Martín Gómez",
    email: "mgomez@inmopanel.com",
    phone: "+54 9 11 4455-8899",
    role: "Agente Senior / Ventas",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
    phoneClean: "5491144558899"
  },
  {
    id: "agent-2",
    name: "Lucía Benítez",
    email: "lbenitez@inmopanel.com",
    phone: "+54 9 11 5566-7788",
    role: "Especialista Alquileres & Contratos",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    phoneClean: "5491155667788"
  },
  {
    id: "agent-3",
    name: "Carlos Rossi",
    email: "crossi@inmopanel.com",
    phone: "+54 9 11 6677-9900",
    role: "Tasador & Captador",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    phoneClean: "5491166779900"
  },
  {
    id: "agent-4",
    name: "Valentina Soler",
    email: "vsoler@inmopanel.com",
    phone: "+54 9 11 7788-1122",
    role: "Atención Clientes & Visitas",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    phoneClean: "5491177881122"
  }
];

export const INITIAL_PROPERTIES = [
  {
    id: "prop-1",
    refCode: "CAS-101",
    title: "Moderna Residencia con Parque, Piscina y Quincho",
    operationType: "Venta",
    propertyType: "Casa",
    status: "Disponible",
    location: {
      address: "Av. Del Libertador 14250",
      neighborhood: "Martínez",
      city: "San Isidro, Buenos Aires",
      postalCode: "1640"
    },
    features: {
      totalArea: 480,
      coveredArea: 320,
      rooms: 6,
      bedrooms: 4,
      bathrooms: 4,
      garages: 2,
      age: 4,
      orientation: "Noreste"
    },
    amenities: [
      "Piscina climatizada",
      "Parrilla",
      "Quincho cerrado",
      "Jardín parquizado",
      "Seguridad 24hs",
      "Cochera cubierta",
      "Calefacción por losa radiante",
      "Apto Mascotas"
    ],
    pricing: {
      currency: "USD",
      price: 450000,
      expenses: 45000,
      taxesIncluded: false
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Excelente propiedad de categoría desarrollada en dos plantas. Amplio living comedor con vista al jardín, cocina con isla y acabados en silestone, master suite con vestidor e hidromasaje. Galería semicubierta con parrilla y piscina iluminada.",
    agentData: {
      owner: {
        name: "Ing. Roberto Mancini",
        phone: "+54 9 11 3322-1144",
        email: "rmancini@gmail.com",
        idNumber: "24.582.119",
        address: "Av. Alvear 1890, Recoleta",
        notes: "Dueño muy correcto. Responde rápido por WhatsApp. Viaja frecuentemente los viernes."
      },
      keyLocation: "Llavero #08 en oficina central (Rotulado CAS-101)",
      keyCustody: {
        status: "en_oficina",
        currentHolder: "Oficina Central (Llavero #08)",
        takenAt: null,
        history: [
          { id: "kh-1", date: "2026-10-14 17:30", agentName: "Martín Gómez", action: "Devolvió llave a oficina", notes: "Visita concluida con Dr. Albarracín" },
          { id: "kh-2", date: "2026-10-14 15:00", agentName: "Martín Gómez", action: "Retiró llave", notes: "Muestra de la casa" }
        ]
      },
      security: {
        alarmCode: "4821# (Desactivar en menos de 30 seg, teclado detrás de la puerta principal)",
        alarmCompany: "ADT Seguridad (Abonado #88219)",
        gateCode: "Control remoto #2 en el llavero o clave 9912 en panel vehicular",
        lockboxCode: "Caja lockbox exterior en poste lateral izquierdo: 1984",
        wifiPassword: "WiFi: Mancini_5G | Clave: Martinez2026"
      },
      houseManual: "• La bomba de la piscina se activa con la perilla gris al lado del quincho.\n• Los reflectores del jardín tienen fotocélula automática (se encienden solos a las 19:30).\n• Dejar siempre la reja con doble vuelta de llave al retirarse.\n• Si suena la alarma por error, la palabra clave telefónica es 'Cóndor'.",
      commission: {
        ratePercent: 3.5,
        sharedRate: 50,
        notes: "3.5% exclusivo vendedor. Honorarios al boleto y saldo a la escritura."
      },
      minNegotiationPrice: 425000,
      legalStatus: "Escritura perfecta. Sin hipotecas ni embargos. Planos municipales conforme a obra aprobados.",
      assignedAgentId: "agent-1",
      visitsHistory: [
        {
          id: "vh-1",
          date: "2026-10-10",
          visitorName: "Familia Peralta",
          phone: "+54 9 11 4988-2233",
          feedback: "Les encantó el jardín y la cocina. Esperan tasar su departamento en Belgrano para ofertar.",
          agentName: "Martín Gómez"
        },
        {
          id: "vh-2",
          date: "2026-10-13",
          visitorName: "Dr. Gustavo Albarracín",
          phone: "+54 9 11 3344-9988",
          feedback: "Considera el precio algo alto, pero evalúa hacer oferta de contado en USD 420.000.",
          agentName: "Martín Gómez"
        }
      ],
      internalNotes: "Prioridad alta. El dueño acepta hasta USD 50.000 en permuta por vehículo de alta gama o departamento chico en Núñez."
    }
  },
  {
    id: "prop-2",
    refCode: "DEP-204",
    title: "Semipiso Premium con Terraza y Vista al Río",
    operationType: "Alquiler",
    propertyType: "Departamento",
    status: "Disponible",
    location: {
      address: "Juana Manso 1650, Piso 12 B",
      neighborhood: "Puerto Madero",
      city: "CABA",
      postalCode: "1107"
    },
    features: {
      totalArea: 165,
      coveredArea: 140,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 3,
      garages: 2,
      age: 2,
      orientation: "Este"
    },
    amenities: [
      "Piscina infinita en rooftop",
      "Gimnasio de última generación",
      "Seguridad 24hs",
      "Cochera cubierta",
      "Balcón terraza",
      "SUM para eventos",
      "Sauna",
      "Aire acondicionado central"
    ],
    pricing: {
      currency: "USD",
      price: 2400,
      expenses: 120000,
      taxesIncluded: false
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Imponente semipiso amoblado con diseño contemporáneo y vistas panorámicas. Palier privado, suite principal con hidromasaje y vestidor, segunda y tercera habitación con baño compartido. Cocina integrada con isla de mármol.",
    agentData: {
      owner: {
        name: "Dra. Florencia Valenzuela",
        phone: "+54 9 11 9988-7711",
        email: "fvalenzuela@corp.com",
        idNumber: "28.914.302",
        address: "Av. Figueroa Alcorta 3300",
        notes: "Exige seguro de caución o garantía propietaria CABA directa. No acepta fumadores."
      },
      keyLocation: "Recepción de la torre con el conserje Luis",
      keyCustody: {
        status: "en_porteria",
        currentHolder: "Conserjería Torre (Luis - Guardia 24hs)",
        takenAt: null,
        history: [
          { id: "kh-3", date: "2026-10-12 18:00", agentName: "Lucía Benítez", action: "Devolvió a conserjería", notes: "Dejada con sobre sellado" }
        ]
      },
      security: {
        alarmCode: "No posee alarma interna. Acceso por cerradura biométrica: clave de emergencia *1088#",
        alarmCompany: "Seguridad privada del edificio (Prosegur)",
        gateCode: "Tarjeta magnética de cochera en sobre de conserjería",
        lockboxCode: "",
        wifiPassword: "WiFi: Madero_Tower_12B | Clave: RiverView2026"
      },
      houseManual: "• Anunciarse en la guardia de ingreso con DNI diciendo 'Visita autorizada por Florencia Valenzuela al 12 B'.\n• Las visitas solo se permiten entre las 10:00 y las 19:30 por reglamento del consorcio.\n• Al salir, apagar el aire central desde el panel táctil del living.",
      commission: {
        ratePercent: 4.14,
        sharedRate: 50,
        notes: "1 mes de comisión por contrato comercial/temporal en USD."
      },
      minNegotiationPrice: 2200,
      legalStatus: "Título perfecto. Reglamento de copropiedad permite alquiler corporativo o tradicional.",
      assignedAgentId: "agent-2",
      visitsHistory: [
        {
          id: "vh-3",
          date: "2026-10-12",
          visitorName: "Directivo Multinacional Tech (James Smith)",
          phone: "+54 9 11 7711-2244",
          feedback: "Interesado en contrato por 24 meses pagadero en USD anticipado semestral.",
          agentName: "Lucía Benítez"
        }
      ],
      internalNotes: "Alquiler ideal para perfil corporativo o embajadas. Se puede conversar bonificación de expensas si abona año adelantado."
    }
  },
  {
    id: "prop-3",
    refCode: "CAS-305",
    title: "Chalet Colonial en Barrio Cerrado Los Robles",
    operationType: "Venta",
    propertyType: "Casa",
    status: "Reservada",
    location: {
      address: "Calle Los Sauces 44, Lote 118",
      neighborhood: "Pilar",
      city: "Buenos Aires",
      postalCode: "1629"
    },
    features: {
      totalArea: 750,
      coveredArea: 280,
      rooms: 5,
      bedrooms: 3,
      bathrooms: 3,
      garages: 3,
      age: 8,
      orientation: "Norte"
    },
    amenities: [
      "Jardín arbolado",
      "Piscina cercada",
      "Parrilla techada",
      "Club House y Tenis",
      "Seguridad perimetral 24hs",
      "Riego por aspersión"
    ],
    pricing: {
      currency: "USD",
      price: 290000,
      expenses: 85000,
      taxesIncluded: false
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Hermosa propiedad de estilo clásico colonial en lote central. Gran living con chimenea a leña, comedor principal, cocina con comedor diario. Suite con salida a terraza y galería con vistas abiertas al golf.",
    agentData: {
      owner: {
        name: "Esteban y Mariana Quiroga",
        phone: "+54 9 11 6611-3344",
        email: "mariana.quiroga@yahoo.com.ar",
        idNumber: "18.320.104",
        address: "Actualmente residiendo en la propiedad",
        notes: "Llamar siempre antes de ir. Se mudan al interior apenas se escriture."
      },
      keyLocation: "Dueños presentes en la propiedad (avisar con antelación mínima de 4 horas)",
      keyCustody: {
        status: "dueño",
        currentHolder: "Propietarios (Esteban y Mariana)",
        takenAt: null,
        history: []
      },
      security: {
        alarmCode: "7733 (Alarma inalámbrica X-28 con control remoto)",
        alarmCompany: "Guardia del Barrio Los Robles (Interno 102)",
        gateCode: "Pase en guardia con DNI: lote 118",
        lockboxCode: "",
        wifiPassword: "WiFi: Robles118 | Clave: SaucesColonial"
      },
      houseManual: "• Anunciar en guardia que van de parte de Mariana Quiroga.\n• El perro Golden retriever es muy manso pero no dejar el portón abierto para que no salga a la calle.",
      commission: {
        ratePercent: 3.0,
        sharedRate: 50,
        notes: "3% vendedor confirmado por autorización firmada."
      },
      minNegotiationPrice: 280000,
      legalStatus: "Escritura al día, libre de deudas de expensas y municipalidad de Pilar.",
      assignedAgentId: "agent-1",
      visitsHistory: [
        {
          id: "vh-4",
          date: "2026-10-08",
          visitorName: "Lic. Marcos Santillán",
          phone: "+54 9 11 2233-5566",
          feedback: "Hizo seña ad-referéndum de aceptación de oferta por USD 282.000.",
          agentName: "Martín Gómez"
        }
      ],
      internalNotes: "Propiedad con SEÑA tomada el 09/10/2026. Pendiente de firma de boleto de compra-venta fijado para el 22/10/2026."
    }
  },
  {
    id: "prop-4",
    refCode: "DEP-412",
    title: "Triplex con Terraza Propia y Jacuzzi Privado",
    operationType: "Alquiler",
    propertyType: "Departamento",
    status: "Alquilada",
    location: {
      address: "Gorriti 4920, Piso 6 A",
      neighborhood: "Palermo Soho",
      city: "CABA",
      postalCode: "1414"
    },
    features: {
      totalArea: 130,
      coveredArea: 95,
      rooms: 3,
      bedrooms: 2,
      bathrooms: 2,
      garages: 1,
      age: 5,
      orientation: "Noroeste"
    },
    amenities: [
      "Jacuzzi en terraza privada",
      "Parrilla individual",
      "Balcón aterrazado",
      "Cochera fija",
      "Apto Profesional",
      "Apto Mascotas"
    ],
    pricing: {
      currency: "ARS",
      price: 850000,
      expenses: 95000,
      taxesIncluded: false
    },
    images: [
      "https://images.unsplash.com/photo-1502005229762-ee1afd303a27?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Espectacular triplex en el corazón de Palermo Soho. En el 1er nivel: living comedor y cocina americana. En el 2do nivel: 2 dormitorios y baño completo. En el 3er nivel: terraza exclusiva con deck, jacuzzi y parrilla propia.",
    agentData: {
      owner: {
        name: "Nicolás Bendersky",
        phone: "+54 9 11 8844-0011",
        email: "nbendersky@gmail.com",
        idNumber: "32.190.871",
        address: "Billinghurst 2100, Recoleta",
        notes: "Inversionista con varios inmuebles. Muy ágil para renovaciones y firmas."
      },
      keyLocation: "Juegos entregados al inquilino actual. Copia maestra en caja fuerte de inmobiliaria.",
      keyCustody: {
        status: "en_oficina",
        currentHolder: "Caja Fuerte Inmobiliaria (Copia Maestra DEP-412)",
        takenAt: null,
        history: []
      },
      security: {
        alarmCode: "No aplica (propiedad actualmente habitada por inquilino)",
        alarmCompany: "Totem de seguridad en hall de entrada",
        gateCode: "Portón levadizo con control",
        lockboxCode: "",
        wifiPassword: "Uso exclusivo del inquilino"
      },
      houseManual: "• Llave magnética para ingresar al edificio.\n• El calentador del jacuzzi de la terraza tarda 40 min en llegar a 36°C.",
      commission: {
        ratePercent: 4.14,
        sharedRate: 50,
        notes: "Cobrada en su totalidad al inicio del contrato."
      },
      minNegotiationPrice: 800000,
      legalStatus: "Al día con todos los servicios y ABL.",
      assignedAgentId: "agent-2",
      visitsHistory: [],
      internalNotes: "Contrato activo iniciado en Mayo 2026. Próximo ajuste trimestral por IPC en Noviembre 2026."
    }
  },
  {
    id: "prop-5",
    refCode: "PH-503",
    title: "PH Reciclado a Nuevo sin Expensas con Patio Andaluz",
    operationType: "Venta",
    propertyType: "PH",
    status: "Disponible",
    location: {
      address: "Conde 1840",
      neighborhood: "Belgrano R",
      city: "CABA",
      postalCode: "1428"
    },
    features: {
      totalArea: 190,
      coveredArea: 145,
      rooms: 4,
      bedrooms: 3,
      bathrooms: 2,
      garages: 0,
      age: 12,
      orientation: "Sureste"
    },
    amenities: [
      "Sin expensas",
      "Patio central con plantas",
      "Terraza transitable con pérgola",
      "Parrilla",
      "Entrada independiente",
      "Apto Crédito Hipotecario"
    ],
    pricing: {
      currency: "USD",
      price: 265000,
      expenses: 0,
      taxesIncluded: false
    },
    images: [
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Encantador PH al frente totalmente reciclado con materiales nobles, pisos de pinotea pulidos y carpinterías originales restauradas. Cocina con comedor de diario integrado que da a un patio lleno de sol y vegetación.",
    agentData: {
      owner: {
        name: "Arq. María Elena Casares",
        phone: "+54 9 11 5500-4499",
        email: "mcasares.arq@estudio.com.ar",
        idNumber: "21.092.388",
        address: "Juramento 2400, Belgrano",
        notes: "Excelente disposición. Ella misma coordinó la reforma integral hace 2 años."
      },
      keyLocation: "Llavero #14 en oficina central (Caja de llaves Belgrano)",
      keyCustody: {
        status: "prestada",
        currentHolder: "Carlos Rossi",
        takenAt: "Hoy a las 11:15 hs",
        history: [
          { id: "kh-4", date: "2026-10-15 11:15", agentName: "Carlos Rossi", action: "Retiró llave", notes: "Muestra a clientes de crédito hipotecario" }
        ]
      },
      security: {
        alarmCode: "3391 (Teclado a la izquierda al ingresar por el pasillo)",
        alarmCompany: "Prosegur Alarmas Residencial (Contrato #9914)",
        gateCode: "Puerta de reja exterior con llave cruz",
        lockboxCode: "",
        wifiPassword: "WiFi: BelgranoPH | Clave: Pinotea1840"
      },
      houseManual: "• La llave de la puerta principal tiene un pequeño juego: empujar levemente hacia adentro al girar.\n• La bomba presurizadora del patio funciona automáticamente al abrir cualquier canilla.",
      commission: {
        ratePercent: 3.5,
        sharedRate: 50,
        notes: "3.5% venta neta. Autorización de venta exclusiva hasta Diciembre 2026."
      },
      minNegotiationPrice: 250000,
      legalStatus: "Apto crédito bancario verificado por Banco Nación y Banco Santander.",
      assignedAgentId: "agent-3",
      visitsHistory: [
        {
          id: "vh-5",
          date: "2026-10-14",
          visitorName: "Mateo & Sofía Carballo",
          phone: "+54 9 11 6543-2198",
          feedback: "Muy buena impresión del patio y terraza. Tienen pre-aprobado un crédito hipotecario UVA.",
          agentName: "Carlos Rossi"
        }
      ],
      internalNotes: "Muy buscado por ser sin expensas y apto crédito. Destacar en portales inmobiliarios."
    }
  },
  {
    id: "prop-6",
    refCode: "CAS-601",
    title: "Imponente Casa al Río con Amarra Propia en Nordelta",
    operationType: "Venta",
    propertyType: "Casa",
    status: "Disponible",
    location: {
      address: "Bv. del Golf 502, Barrio El Yate",
      neighborhood: "Nordelta",
      city: "Tigre, Buenos Aires",
      postalCode: "1670"
    },
    features: {
      totalArea: 1100,
      coveredArea: 520,
      rooms: 7,
      bedrooms: 5,
      bathrooms: 6,
      garages: 4,
      age: 3,
      orientation: "Noroeste"
    },
    amenities: [
      "Amarra propia para yate",
      "Salida directa al Río Luján",
      "Piscina sin fin con borde infinito",
      "Cine / Playroom privado",
      "Cava de vinos climatizada",
      "Doble cochera cubierta",
      "Dependencia de servicio con baño",
      "Seguridad náutica y terrestre 24hs"
    ],
    pricing: {
      currency: "USD",
      price: 1150000,
      expenses: 280000,
      taxesIncluded: false
    },
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Arquitectura vanguardista sobre lote de 1.100 m² con costa de río navegable. Espacios abiertos de doble altura, mármol travertino, cocina premium con artefactos importados, master suite de 80 m² con vista panorámica a la laguna.",
    agentData: {
      owner: {
        name: "Dr. Federico Lanusse",
        phone: "+54 9 11 4411-9922",
        email: "flanusse@holding.com.ar",
        idNumber: "17.409.112",
        address: "Alvear Tower, Puerto Madero",
        notes: "Propietario de alto patrimonio. Visitas únicamente previa calificación financiera del interesado."
      },
      keyLocation: "Coordinar con casero permanente en la propiedad (Sr. Juan Carlos)",
      keyCustody: {
        status: "en_porteria",
        currentHolder: "Casero permanente (Sr. Juan Carlos - Cel: +54 9 11 3300-9988)",
        takenAt: null,
        history: []
      },
      security: {
        alarmCode: "9004* (Sistema perimetral laser + domótica Control4)",
        alarmCompany: "AVN Nordelta Seguridad Central (Base 10)",
        gateCode: "Portón automático con apertura remota por app o botón casero",
        lockboxCode: "",
        wifiPassword: "WiFi: ElYate_Lanusse | Clave: NordeltaVIP2026"
      },
      houseManual: "• Pedir acceso por guardia náutica o terrestre con 2 horas de anticipación.\n• El casero Juan Carlos recibe a los agentes y desconecta la alarma perimetral.\n• Prohibido pisar el deck de la amarra con calzado de calle con taco.",
      commission: {
        ratePercent: 3.0,
        sharedRate: 50,
        notes: "3.0% venta internacional o local. Acepta pago en cuenta del exterior (USA / Europa)."
      },
      minNegotiationPrice: 1050000,
      legalStatus: "Título perfecto. Construcción terminada con final de obra expedido por Municipalidad de Tigre.",
      assignedAgentId: "agent-1",
      visitsHistory: [
        {
          id: "vh-6",
          date: "2026-10-05",
          visitorName: "Inversionista del sector agro",
          phone: "+54 9 11 8899-3322",
          feedback: "Quedó fascinado con la amarra y la piscina. Está evaluando la logística escolar de sus hijos.",
          agentName: "Martín Gómez"
        }
      ],
      internalNotes: "Propiedad estrella de la cartera. Enviar únicamente dossier exclusivo a clientes VIP."
    }
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "res-1",
    propertyId: "prop-3",
    propertyRef: "CAS-305",
    propertyTitle: "Chalet Colonial en Barrio Cerrado Los Robles",
    propertyPrice: 290000,
    clientName: "Lic. Marcos Santillán",
    clientPhone: "+54 9 11 2233-5566",
    clientEmail: "marcos.santillan@consultora.com",
    clientDni: "30.450.912",
    reservationAmount: 5000,
    currency: "USD",
    reservationDate: "2026-10-09",
    expirationDate: "2026-10-22",
    agentId: "agent-1",
    agentName: "Martín Gómez",
    status: "Activa",
    conditionsNotes: "Seña ad-referéndum de la aceptación de propuesta por USD 282.000. Firma de boleto estimada para el 22/10 con el 30% del valor.",
    receiptNumber: "REC-2026-089"
  },
  {
    id: "res-2",
    propertyId: "prop-1",
    propertyRef: "CAS-101",
    propertyTitle: "Moderna Residencia con Parque, Piscina y Quincho",
    propertyPrice: 450000,
    clientName: "Dr. Gustavo Albarracín",
    clientPhone: "+54 9 11 3344-9988",
    clientEmail: "albarracin.law@estudio.com.ar",
    clientDni: "22.845.109",
    reservationAmount: 8000,
    currency: "USD",
    reservationDate: "2026-10-14",
    expirationDate: "2026-10-25",
    agentId: "agent-1",
    agentName: "Martín Gómez",
    status: "En verificación",
    conditionsNotes: "En proceso de revisión de títulos y constancia de inhibiciones por escribanía del comprador.",
    receiptNumber: "REC-2026-092"
  }
];

export const INITIAL_RENTALS = [
  {
    id: "rent-1",
    propertyId: "prop-4",
    propertyRef: "DEP-412",
    propertyTitle: "Triplex con Terraza Propia y Jacuzzi Privado",
    tenantName: "Gonzalo Echeverría",
    tenantPhone: "+54 9 11 4433-2211",
    tenantEmail: "gecheverria@productlab.io",
    tenantDni: "35.890.111",
    contractStart: "2025-05-01",
    contractEnd: "2027-04-30",
    monthlyRent: 850000,
    currency: "ARS",
    indexationMethod: "Ajuste Trimestral por IPC",
    nextAdjustmentDate: "2026-11-01",
    paymentStatusCurrentMonth: "Al día",
    guarantors: [
      {
        name: "Carlos Echeverría (Padre)",
        phone: "+54 9 11 9900-1122",
        type: "Garantía Propietaria CABA",
        notes: "Inmueble en Av. Cabildo 1500 libre de gravamen verificado."
      },
      {
        name: "Finaer Seguros",
        phone: "0800-333-3462",
        type: "Seguro de Caución",
        notes: "Póliza #889211 vigente por todo el plazo."
      }
    ],
    agentId: "agent-2",
    agentName: "Lucía Benítez",
    notes: "Inquilino muy puntual en sus pagos. Entrega comprobantes de servicios antes del día 10 de cada mes."
  },
  {
    id: "rent-2",
    propertyId: "prop-2",
    propertyRef: "DEP-204",
    propertyTitle: "Semipiso Premium con Terraza y Vista al Río",
    tenantName: "En proceso de firma / James Smith",
    tenantPhone: "+54 9 11 7711-2244",
    tenantEmail: "jsmith.tech@global.com",
    tenantDni: "Pasaporte USA #599812",
    contractStart: "2026-11-01",
    contractEnd: "2028-10-31",
    monthlyRent: 2400,
    currency: "USD",
    indexationMethod: "Fijo en Dólares (USD)",
    nextAdjustmentDate: "2027-11-01",
    paymentStatusCurrentMonth: "Al día",
    guarantors: [
      {
        name: "Garantía Corporativa Tech Inc.",
        phone: "+1 415 889-1100",
        type: "Fianza Comercial Multinacional",
        notes: "Verificada con filial Buenos Aires."
      }
    ],
    agentId: "agent-2",
    agentName: "Lucía Benítez",
    notes: "Reserva tomada por USD 2.400 de seña para ingresar el 1ro de Noviembre."
  }
];
