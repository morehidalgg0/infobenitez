// Datos reales de Benitez Inmobiliaria.
// Propiedades importadas de "Listado de Propiedades 28-10-2026.xls".

// Cuenta del dueño / administrador de la inmobiliaria
export const INITIAL_ADMIN = {
  name: "Natalia Benitez",
  username: "admin",
  password: "vghy7ya6"
};

// isOwner: la dueña figura como agente para tener propiedades asignadas, pero ingresa con la cuenta admin
export const INITIAL_AGENTS = [
  {
    "id": "agent-sergio-hidalgo",
    "name": "Sergio Hidalgo",
    "email": "sergio@benitezinmobiliaria.com.ar",
    "phone": "+54 9 2254 611964",
    "phoneClean": "5492254611964",
    "role": "Broker",
    "avatar": "",
    "username": "shidalgo",
    "password": "fbmu8dju",
    "agencySplitPercent": 50
  },
  {
    "id": "agent-eve-lacoste",
    "name": "Eve Lacoste",
    "email": "lacoste.e1992@gmail.com",
    "phone": "+54 9 2254 589625",
    "phoneClean": "5492254589625",
    "role": "Broker",
    "avatar": "",
    "username": "elacoste",
    "password": "tbdfushj",
    "agencySplitPercent": 50
  },
  {
    "id": "agent-natalia-benitez",
    "name": "Natalia Benitez",
    "email": "info@benitezinmobiliaria.com.ar",
    "phone": "+54 9 2297 409477",
    "phoneClean": "5492297409477",
    "role": "Dueña / Administración",
    "avatar": "",
    "isOwner": true
  },
  {
    "id": "agent-anabel-aguayo",
    "name": "Anabel Aguayo",
    "email": "anabel.aguayo9833@gmail.com",
    "phone": "+54 9 2254 531659",
    "phoneClean": "5492254531659",
    "role": "Broker",
    "avatar": "",
    "username": "aaguayo",
    "password": "vtmkjpdv",
    "agencySplitPercent": 50
  },
  {
    "id": "agent-lara-gascon",
    "name": "Lara Gascon",
    "email": "laragascon1999@gmail.com",
    "phone": "+54 9 2254 551997",
    "phoneClean": "5492254551997",
    "role": "Broker",
    "avatar": "",
    "username": "lgascon",
    "password": "6mt5etud",
    "agencySplitPercent": 50
  },
  {
    "id": "agent-candela-hidalgo",
    "name": "Candela Hidalgo",
    "email": "candelahidalgo9@gmail.com",
    "phone": "+54 9 2236 683822",
    "phoneClean": "5492236683822",
    "role": "Broker",
    "avatar": "",
    "username": "chidalgo",
    "password": "b7p7rsyp",
    "agencySplitPercent": 50
  },
  {
    "id": "agent-jorge-martin-fabbri",
    "name": "Jorge Martin Fabbri",
    "email": "fabbrijorge@hotmail.com",
    "phone": "+54 9 3489 562910",
    "phoneClean": "5493489562910",
    "role": "Broker",
    "avatar": "",
    "username": "jfabbri",
    "password": "322exsg2",
    "agencySplitPercent": 50
  }
];

export const INITIAL_PROPERTIES = [
  {
    "id": "prop-244047",
    "refCode": "244047",
    "title": "Venta De Departamento 3 Ambientes a una cuadra del mar",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. Eolo 101",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1206891,
      "lng": -56.8604873
    },
    "features": {
      "totalArea": 60,
      "coveredArea": 52,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 2,
      "garages": 1,
      "age": 35,
      "orientation": "Norte"
    },
    "amenities": [
      "Cochera descubierta",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 119000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=CZjjP7xo0n8",
    "description": "DEPARTAMENTO EN VENTA – EDIFICIO PAXAPOGA – ZONA DEL MUELLE Excelente departamento en venta ubicado en un tercer piso del Edificio Paxapoga, en la zona del muelle. La propiedad se encuentra reciclada a nuevo, es muy luminosa y se destaca por su excelente estilo, decoración y detalles de buen gusto, que le aportan calidez y personalidad a cada ambiente. Cuenta con dos dormitorios, ambos con salida a un amplio balcón ubicado hacia el lateral del edificio Capacidad para 5 personas habitación= principal en suite 1 cama doble habitación= con cama cucheta + cama individual El living-comedor ofrece una hermosa vista al mar desde su ventana, además de una cocina integrada y dos baños. La propiedad cuenta también con espacio propio para estacionamiento, con portón de acceso a distancia. Una excelente oportunidad para quienes buscan una propiedad lista para disfrutar, reciclada a nuevo, muy luminosa, con una decoración impecable, vista al mar y una ubicación privilegiada en la zona del muelle.",
    "createdAt": "2026-10-26T11:45:54",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 244047, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, portales\nVideo: https://www.youtube.com/watch?v=CZjjP7xo0n8"
    }
  },
  {
    "id": "prop-242862",
    "refCode": "242862",
    "title": "Alquiler anual Pinamar. Barrio San Jose.",
    "operationType": "Alquiler",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Los Calamares 1757",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1757",
      "lat": -37.1015954,
      "lng": -56.86944090000001
    },
    "features": {
      "totalArea": 45,
      "coveredArea": 40,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Luminoso",
      "Semicubierto 1 m²",
      "Disposición lateral"
    ],
    "pricing": {
      "currency": "ARS",
      "price": 600000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Este departamento interno, entrada lateral, cuenta con patio privado subiendo por la escalera. Cocina comedor completa con heladera, cocina, no cuenta con utensilios de cocina ni ollas, mesa y silla. Estufa a gas natural en el pasillo entre este ambiente y la habitación, que cuenta con cama, pero no con colchón. Baño completo. En el patio tiene lugar para poner el lavarropas, semicubierto. Muy luminoso. Ideal pareja con hasta una mascota máximo. Precio: Luz bimestral y gas natural compartido con el resto de los deptos. El cable esta incluido, pero no wifi. Desde nov $600.000 dic $650.000 Ene $900.000| feb $900.000 | mar $900.000 Abril 650.00$ SEÑA UDS$300 Requisitos: Ingresos comprobables Dos recibos de sueldo de Pinamar de garantía.",
    "createdAt": "2026-10-20T15:02:58",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 242862, tipo original: Apartamento Amueblado, estado original: En Alquiler).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-239538",
    "refCode": "239538",
    "title": "Departamento centrico excelente ubicacion",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "De las Medusas 1381",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1381",
      "lat": -37.1083681,
      "lng": -56.8672336
    },
    "features": {
      "totalArea": 50,
      "coveredArea": 50,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Muy luminoso",
      "A estrenar"
    ],
    "pricing": {
      "currency": "USD",
      "price": 900,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler temporada 2027 : dto amoblado ideal para dos personas -Al ingreso living -comedor. -Antebaño con bacha -baño completo -habitacion con cama matrimonial -placard -equipado con todo lo necesario para la estadia Ubicacion en 4 piso , muy luminoso y cerca de todo alquiler semanal - quincena o mes completo consultanos !!",
    "createdAt": "2026-10-16T12:18:18",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 239538, tipo original: Departamento Amoblado, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-239036",
    "refCode": "239036",
    "title": "Alquiler tempporal y venta de monoambiente en edificio Rose marie - Pinamar",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "De las Medusas 1381",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1381",
      "lat": -37.1083681,
      "lng": -56.8672336
    },
    "features": {
      "totalArea": 20,
      "coveredArea": 20,
      "rooms": 1,
      "bedrooms": 0,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 1,
      "age": 4,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso",
      "Semicubierto 5 m²",
      "Disposición contrafrente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 100,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=j39-i01Hqsk",
    "description": "VENTA – MONOAMBIENTE EN EDIFICIO ROSE MARIE Moderno y luminoso monoambiente, ubicado sobre la calle Medusas, en Pinamar, dentro del edificio Rose Marie. Cuenta con un ambiente funcional, excelente luminosidad natural con aprox. 20 m² cubiertos ,Semicubiertos / Balcón privado: entre 3 y 5 m² Carpinterías de aluminio con DVH (doble vidriado hermético), aislación térmica y acústica superior. aire acondicionado . Una excelente opción tanto para vivienda permanente como para inversión, en un departamento que combina comodidad, modernidad y practicidad.",
    "createdAt": "2026-10-14T12:15:48",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 239036, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, portales\nVideo: https://www.youtube.com/watch?v=j39-i01Hqsk"
    }
  },
  {
    "id": "prop-238901",
    "refCode": "238901",
    "title": "Alquiler temporada 2026/27 Pinamar",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "De la Merluza 905",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1060975,
      "lng": -56.85709319999999
    },
    "features": {
      "totalArea": 60,
      "coveredArea": 60,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Cochera cubierta",
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 3400,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "En zona dúplex del golf te espera esta hermosa unidad en el complejo Castel del Pinar. Cuenta con cochera cerrada al ingreso, y un patio privado con parrilla. Además te recibe un comedor con cocina completa con todos los utensilios necesarios para la estadía. En planta baja hay dos camas de una plaza y en la alta, te espera la habitación principal con balcón con vista la patio privado y baño completo. El alquiler cuenta con limpieza de entrada y salida, servicios y wifi. No incluye ropa blanca. A 10 cuadras de la playa, 10 cuadras de Bunge y Libertador. Salida directa por la calle De las Artes. Un barrio residencial muy pintoresco y prolijo. A pocas cuadras del Castillo Augusto, salida directa por la calle Martin Pescador. Bajada al balneario Marsella.",
    "createdAt": "2026-10-13T19:16:41",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 238901, tipo original: Apartamento Amueblado, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-238883",
    "refCode": "238883",
    "title": "Alquiler temporada en zona Golf de Pinamar",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Del Dorado 928",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.106131,
      "lng": -56.8581486
    },
    "features": {
      "totalArea": 80,
      "coveredArea": 80,
      "rooms": 4,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 2,
      "garages": 0,
      "age": 50,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Luminoso",
      "Disposición frente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 3800,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler temporada 2026/27 En excelente zona de Pinamar, te espera este luminoso dúplex. A 10 cuadras de la playa y 10 del centro comercial de Pinamar. Cuenta con dos cuartos, dos baños completos (uno en cada planta), balcón con vista a la calle Del Dorado. Cocina equipada, living comedor. Parrilla, patio trasero cerrado, y otro abierto al aire libre. Consulta por fechas disponibles. No acepta grupo de jóvenes. Solo familias. No acepta mascotas. El alquiler incluye limpieza de entrada y salida. Servicios y wifi. A 10 cuadras de la playa, 10 cuadras de Bunge y Libertador. Salida directa por la calle De las Artes. Un barrio residencial muy pintoresco y prolijo. A pocas cuadras del Castillo Augusto, salida directa por la calle Martin Pescador. Bajada al balneario Marsella.",
    "createdAt": "2026-10-13T17:22:42",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 238883, tipo original: Apartamento Amueblado, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-236712",
    "refCode": "236712",
    "title": "Lote en barrio Alamos Pinamar Norte - Barlovento y vela mayor",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Disponible",
    "location": {
      "address": "W45Q+WQ",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0902203,
      "lng": -56.860507
    },
    "features": {
      "totalArea": 1114,
      "coveredArea": 1114,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 79000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "ote en Barrio Álamos, ubicado en una zona tranquila y consolidada, ideal para quienes buscan construir una vivienda única rodeada de naturaleza. Su gran diferencial: una vista abierta y privilegiada al bosque, que te asegura privacidad, calma y un entorno difícil de encontrar. Un lugar donde el ruido baja, el aire cambia y el ritmo se acomoda a otra calidad de vida. -Entorno natural -Zona residencial tranquila - Ideal para vivienda permanente o casa de descanso Lote N 10 F.O.S 0.25 F.O.T 0.40 Si estás buscando algo más que un lote, este es el lugar donde empezar.",
    "createdAt": "2026-09-29T12:47:54",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 236712, tipo original: Lote, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-236625",
    "refCode": "236625",
    "title": "Venta de departamentos en pozo mar de Ostende Financiacion ! ventus ll",
    "operationType": "Venta",
    "propertyType": "Otro",
    "status": "Disponible",
    "location": {
      "address": "Lautaro 734",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1347104,
      "lng": -56.8737295
    },
    "features": {
      "totalArea": 50,
      "coveredArea": 50,
      "rooms": 1,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "A estrenar"
    ],
    "pricing": {
      "currency": "USD",
      "price": 81000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTUS II - Departamentos en Pozo | Lautaro 734 Presentamos VENTUS II, un emprendimiento inmobiliario de categoría ubicado en Lautaro 734. Pensado tanto para vivienda permanente como para una inversión inteligente, el edificio ofrece unidades funcionales de excelente diseño, terminaciones de calidad y gran luminosidad. TIPOLOGIAS DISPONIBLES: ￼ Unidades A (PB y 1 Piso): 54,02 m2 totales (50,49 m2 cubiertos + 3,53 m2 semicubiertos). Precio: USD 97.000 ￼ Unidades B (PB y 1 Piso): 45,31 m2 totales (41,12 m2 cubiertos + 4,20 m2 semicubiertos). Precio: USD 81.000 ￼ Unidades C (PB y 1 Piso): 49,03 m2 totales (45,31 m2 cubiertos + 3,72 m2 semicubiertos). Precio: USD 88.000 ￼ 2 Piso A (Con terraza propia): 101,51 m2 totales (50,49 m2 cubiertos + 3,53 m2 semicubiertos + 47,49 m2 terraza). Precio: USD 116.000 ￼ 2 Piso B (Con terraza propia): 82,44 m2 totales (41,12 m2 cubiertos + 4,20 m2 semicubiertos + 37,12 m2 terraza). Precio: USD 96.000 ￼ 2 Piso C (Con terraza propia): 91,34 m2 totales (45,31 m2 cubiertos + 3,72 m2 semicubiertos + 42,31 m2 terraza). Precio: USD 105.000 COCHERAS: ￼ Cocheras cubiertas subterráneas opcionales: USD 12.000 CONDICIONES COMERCIALES: ￼ Forma de pago: Anticipo del 30% + 18 cuotas. ￼ Bonificacion especial del 15% de descuento por pago al contado. Contactanos para recibir mas informacion y coordinar una visita al proyecto.",
    "createdAt": "2026-09-28T21:28:59",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 236625, tipo original: Edificio en Pozo, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-234573",
    "refCode": "234573",
    "title": "Venta de departamento 3 ambientes en plata baja",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "1° de julio de 1978",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1978",
      "lat": -34.5714170606244,
      "lng": -65.50270010729204
    },
    "features": {
      "totalArea": 49,
      "coveredArea": 49,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 95000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "RETASADO ANTES ~110000USD~ AHORA 95.000 USD DEPARTAMENTO 3 AMBIENTES EN EDIFICIO ATINA – PINAMAR CENTRO Con parrilla propia + Espacio propio de estacionamiento + excelente ubicación Oportunidad real en el corazón de Pinamar: departamento funcional, luminoso y con todo lo que hoy busca el mercado, ideal tanto para renta como para vivir todo el año. Distribución: Al ingresar, nos recibe un espacio integrado de cocina con barra/desayunador y living-comedor, logrando un ambiente moderno y práctico. Desde el living se accede a un **balcón con parrilla propia**, un diferencial clave para disfrutar todo el año. En el sector privado: * Baño completo con bañera * Dos dormitorios * Dormitorio principal al frente *calefacción por losa radiante Detalles que suman valor: * Cochera propia * Excelente orientación y ventilación * Edificio bien ubicado y de fácil acceso -Ubicación estratégica: * Rápida salida a la ruta * Cercanía a comercios, servicios y zona gastronómica * Ideal tanto para uso permanente como para alquiler turístico Superficies: * Cubierta: 49.38 m² * Semicubierta: 6.15 m² * Descubierta: 12.50 m² ¿Por qué es una buena oportunidad? Porque combina ubicación + funcionalidad + precio competitivo. Es de esos departamentos que se alquilan solos en temporada y que, al mismo tiempo, funcionan perfecto para vivir todo el año. Las medidas y superficies son aproximadas y deberán verificarse con la documentación correspondiente. LAS MEDIDAS Y DATOS PROPORCIONADOS DE ÉSTA PUBLICACIÓN SON APROXIMADOS Y SOLO DE CARACTER INFORMATIVO. LA INFORMACIÓN DEFINITIVA SE ENCUENTRA EN LA ESCRITURA DEL INMUEBLE Y O LOS PLANOS CORRESPONDIENTES.",
    "createdAt": "2026-09-16T13:49:00",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 234573, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-233480",
    "refCode": "233480",
    "title": "ALQUILER TEMPORAL/ ALAMOS PINAMAR",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "W45Q+WQ",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0902203,
      "lng": -56.860507
    },
    "features": {
      "totalArea": 1165,
      "coveredArea": 180,
      "rooms": 5,
      "bedrooms": 2,
      "bathrooms": 3,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera cubierta",
      "Muy luminoso",
      "Disposición frente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 4000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Casa amplia y cómoda, ideal para disfrutar unos días de descanso en Pinamar con familia o amigos. Cuenta con 5 ambientes, 2 habitaciones y 3 baños, ofreciendo espacios cómodos para compartir y disfrutar de una estadía relajada. Su amplio patio con parrilla es el lugar perfecto para disfrutar al aire libre, hacer un asado y compartir buenos momentos. Capacidad para 8 a 10 personas Una casa cómoda, amplia y pensada para disfrutar. Venís a Pinamar? Esta puede ser tu casa.",
    "createdAt": "2026-09-09T12:49:16",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-anabel-aguayo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 233480, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-233460",
    "refCode": "233460",
    "title": "ALQUILER A UNA CUADRA DEL MAR -ZONA MUELLE -FAMILIAS",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. Eolo 101",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1206891,
      "lng": -56.8604873
    },
    "features": {
      "totalArea": 60,
      "coveredArea": 52,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 2,
      "garages": 1,
      "age": 35,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 3200,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=CZjjP7xo0n8",
    "description": "DEPARTAMENTO EN ALQUILER – EDIFICIO PAXAPOGA – ZONA DEL MUELLE Excelente departamento en venta ubicado en un tercer piso del Edificio Paxapoga, en la zona del muelle. La propiedad se encuentra reciclada a nuevo, es muy luminosa y se destaca por su excelente estilo, decoración y detalles de buen gusto, que le aportan calidez y personalidad a cada ambiente. Cuenta con dos dormitorios, ambos con salida a un amplio balcón ubicado hacia el lateral del edificio Capacidad para 5 personas habitación= principal en suite 1 cama doble habitación= con cama cucheta + cama individual El living-comedor ofrece una hermosa vista al mar desde su ventana, además de una cocina integrada y dos baños. La propiedad cuenta también con espacio propio para estacionamiento, con portón de acceso a distancia. Una excelente oportunidad para quienes buscan una propiedad lista para disfrutar, reciclada a nuevo, muy luminosa, con una decoración impecable, vista al mar y una ubicación privilegiada en la zona del muelle. Disponible = Enero - Febrero -quincena - semana",
    "createdAt": "2026-09-09T12:12:59",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 233460, tipo original: Departamento, estado original: En Alquiler Temporal).\nPublicada en: web, portales\nVideo: https://www.youtube.com/watch?v=CZjjP7xo0n8"
    }
  },
  {
    "id": "prop-230809",
    "refCode": "230809",
    "title": "Departamento con vista al mar en San Bernardo -Con cochera !",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "San Juan 2885",
      "neighborhood": "San Bernardo",
      "city": "Buenos Aires",
      "postalCode": "2885",
      "lat": -36.6852144,
      "lng": -56.6789992
    },
    "features": {
      "totalArea": 40,
      "coveredArea": 40,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 50,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Cochera cubierta",
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 40000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamento 2 ambientes en San Bernardo, con vista al mar. Viví la experiencia de estar cerca de la playa todo el año. Este excelente departamento ubicado en San Bernardo se destaca por su privilegiada ubicación y sus vistas panorámicas, convirtiéndolo en una oportunidad única tanto para vacacionar como para inversión o vivienda permanente. Su diseño prioriza la luminosidad y el disfrute del paisaje costero desde distintos ambientes de la propiedad. Comodidades y distribución: - Living-comedor: Un espacio amplio, integrado y muy luminoso, con salida directa al balcón para disfrutar de momentos de relax con el sonido del mar de fondo. - Balcón al frente: El lugar ideal para contemplar la vista directa al mar. - Cocina: Práctica, integrada al área social y totalmente funcional. - Habitación principal: Con excelente ventilación, placard y el gran diferencial de tener una ventana con vista directa al mar (¡despertate contemplando la playa!). - Baño: Completo y equipado con todos sus artefactos. - Cochera propia: Un valor agregado fundamental e indispensable en la zona céntrica de la costa. - Ascensor: Acceso cómodo a las plantas altas. Consúltanos para más información o para coordinar una visita.",
    "createdAt": "2026-08-25T16:16:42",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 230809, tipo original: Departamento Amoblado, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-230213",
    "refCode": "230213",
    "title": "CASA EN VENTA | OPORTUNIDAD EN OSTENDE",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Praga 955",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.12246409999999,
      "lng": -56.8823434
    },
    "features": {
      "totalArea": 443,
      "coveredArea": 60,
      "rooms": 3,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 65000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "CASA + DEPARTAMENTO EN VENTA – OSTENDE USD 65.000 Excelente oportunidad en Ostende, ubicada sobre calle Praga, en un entorno residencial y tranquilo. La propiedad se desarrolla sobre un amplio lote de 443 m² y cuenta con aproximadamente 60 m² cubiertos, distribuidos en dos unidades independientes, lo que la convierte en una excelente opción tanto para vivienda permanente como para inversión y renta. La casa principal cuenta con 3 ambientes, mientras que además dispone de un departamento independiente de 2 ambientes, ideal para recibir visitas, alojar familiares o generar una segunda fuente de ingresos. La propiedad cuenta con: * 3 dormitorios en total * 2 baños * Casa principal de 3 ambientes * Departamento independiente de 2 ambientes * Amplio parque * Parrilla semicubierta * Gas natural * Lote de 443 m² * 60 m² cubiertos aproximadamente Una propiedad con mucho potencial, que combina espacio exterior, independencia entre las unidades y posibilidades de renta, en una de las zonas residenciales de Ostende.",
    "createdAt": "2026-08-21T19:54:25",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-lara-gascon",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 230213, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-230039",
    "refCode": "230039",
    "title": "CASA EN VENTA- BARRIO ALAMOS",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "W45Q+WQ",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0902203,
      "lng": -56.860507
    },
    "features": {
      "totalArea": 1165,
      "coveredArea": 180,
      "rooms": 5,
      "bedrooms": 3,
      "bathrooms": 3,
      "toilettes": 1,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera cubierta",
      "Muy luminoso",
      "Semicubierto 35 m²",
      "Disposición frente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 220000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Ubicada en la zona de Álamos, Pinamar, esta propiedad se emplaza sobre un amplio lote de 1.166 m², a solo 7 minutos de la playa y del centro. Desarrollada íntegramente en una planta, presenta una distribución funcional y espacios de buenas dimensiones: •Living comedor amplio y luminoso, con cocina integrada. •2 dormitorios con placard empotrado y aire acondicionado, con suite compartida. •3 baños, incluyendo toilette de recepción. •Cochera cubierta con capacidad para 2/3 vehículos. •Lavadero independiente. •Galería cubierta, vinculada al jardín. •Parrilla semicubierta con bacha. •Amplio jardín cerrado, que aporta privacidad y contacto con el entorno natural. La propiedad se encuentra próxima a La Herradura, con rápido acceso a las rutas de entrada y a los principales puntos de Pinamar, en un entorno residencial tranquilo y consolidado. Una propuesta que combina amplitud, funcionalidad y una ubicación estratégica, ideal tanto para vivienda permanente como para disfrutar durante todo el año. Consúltanos para más información o para coordinar una visita.",
    "createdAt": "2026-08-20T22:15:12",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-anabel-aguayo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 230039, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-229286",
    "refCode": "229286",
    "title": "ATENCION GRUPO DE JOVENES !!!ALQUILER TEMPORARIO ENERO 2027",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Saavedra 864",
      "neighborhood": "Ostende",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1291207,
      "lng": -56.8852206
    },
    "features": {
      "totalArea": 200,
      "coveredArea": 100,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 2,
      "garages": 1,
      "age": 35,
      "orientation": "Norte"
    },
    "amenities": [
      "Semicubierto 100 m²",
      "Disposición frente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 240,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=uIXPZIoakx4",
    "description": "Casa en alquiler temporal en Ostende - Pinamar se aceptan grupo de jovenes capacidad paara 9 personas 3 habitaciones ,cocina ,living - comedor amplio 2 baños ,parilla - lavadero ,patio ,cochera semi cubierta ,gas natural.wi fi DISPONIBLE: Diciembre = disponible Enero = 1 al 7 (disponible ) 16 al 23 (reservada ) 24 al 31 (disponible ) Febrero = DISPONIBLE no cuenta con ropa de blanco ,limpieza de salida a cargo del inquilino",
    "createdAt": "2026-08-16T21:08:16",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 229286, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=uIXPZIoakx4"
    }
  },
  {
    "id": "prop-226244",
    "refCode": "226244",
    "title": "Casa en Venta en Pinamar Norte - Acepta permuta. Barrio Alamos",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "De los Alamos",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.093804,
      "lng": -56.8486287
    },
    "features": {
      "totalArea": 1000,
      "coveredArea": 240,
      "rooms": 6,
      "bedrooms": 5,
      "bathrooms": 4,
      "toilettes": 0,
      "garages": 2,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera cubierta",
      "Muy luminoso",
      "Disposición frente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 385000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Espectacular casa en venta distribuida en dos plantas en Barrio Alamos de Pinamar norte Cuenta con 5 dormitorios y 4 baños, destacándose la suite principal en planta alta con baño privado, que brinda mayor privacidad y comodidad. El exterior ofrece un amplio parque con pileta climatizada, sistema de riego automatizado, patio con parrilla y espacios pensados para disfrutar al aire libre. Entre sus principales características se destacan: 5 dormitorios. 4 baños. Dormitorio principal en suite. Distribución en dos plantas. Pileta climatizada. Calefacción por radiadores. Aire acondicionado en las habitaciones. Hogar a leña. Patio con parrilla. Cochera cubierta con capacidad para 2 vehículos. Bomba sumergible. Sistema de riego automatizado. Alarma perimetral y de interior. Una propiedad que reúne diseño, funcionalidad y confort en uno de los entornos más buscados de Pinamar Norte. Se aceptan permutas por vehículos. Consulte para más información o coordinar una visita.",
    "createdAt": "2026-07-27T17:30:28",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-candela-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 226244, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-225368",
    "refCode": "225368",
    "title": "Departamentos en Alquiler Temporal",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Cul de Sac",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1503",
      "lat": -37.1099217,
      "lng": -56.8741168
    },
    "features": {
      "totalArea": 90,
      "coveredArea": 60,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "ARS",
      "price": 100,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamentos en alquiler temporal en Complejo Totoras, zona Hotel Zentiva, Pinamar centro. Completamente equipados para que tengas la mejor estadía Disponibles unidades de 2 y 3 ambientes! Cuentan con calefacción, pava eléctrica, tostadora, cocina equipada, pileta, sabanas y toallas. Disponible por semana y fin de semana, vacaciones de invierno y de verano Temporada 2027, diciembre enero y febrero",
    "createdAt": "2026-07-21T17:51:42",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-anabel-aguayo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 225368, tipo original: Departamento, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-225068",
    "refCode": "225068",
    "title": "CASA EN VENTA EN CAMPANA A METROS DE AV MITRE",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Fray Justo Sta. María de Oro 364",
      "neighborhood": "Campana",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -34.1628682,
      "lng": -58.9714193
    },
    "features": {
      "totalArea": 200,
      "coveredArea": 160,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 160000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Casa céntrica de dos plantas con garage y amplio balcón – Campana Excelente propiedad ubicada sobre calle Santa María de Oro, a tan solo metros de la Avenida Mitre, una de las principales arterias de la ciudad de Campana. Su ubicación privilegiada permite acceder rápidamente a comercios, bancos, colegios y todos los servicios del centro. Desarrollada en dos plantas, la vivienda ofrece ambientes amplios y funcionales. En la planta alta cuenta con tres cómodos dormitorios, todos con salida a un gran balcón corrido al frente que aporta excelente luminosidad y un agradable espacio exterior. Además, dispone de un ambiente adicional ideal para utilizar como escritorio, oficina o vestidor, adaptándose a las necesidades de cada familia. La propiedad posee dos baños completos, cocina independiente, patio con lavadero y garage con espacio para un vehículo. Cuenta con servicio de gas natural y una distribución ideal para quienes buscan comodidad, amplitud y una ubicación estratégica. Una excelente oportunidad para vivir en el corazón de Campana, con todas las comodidades y servicios a pocos pasos.",
    "createdAt": "2026-07-20T12:19:27",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-jorge-martin-fabbri",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 225068, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-224963",
    "refCode": "224963",
    "title": "venta de departamento en Pinamar - retasado oportunidad",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. Constitución 645",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.11187,
      "lng": -56.8637924
    },
    "features": {
      "totalArea": 49,
      "coveredArea": 49,
      "rooms": 1,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso",
      "Disposición contrafrente"
    ],
    "pricing": {
      "currency": "USD",
      "price": 79000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=pZ4xNUwLyPU",
    "description": "¡Oportunidad única en Pinamar! Se vende departamento retasado en Av. Constitución 645, a pasos del centro y la playa. Este luminoso dos ambientes de 40 m² totales, ubicado en contrafrente, ofrece privacidad y tranquilidad. Cuenta con 1 dormitorio, 1 baño completo y está completamente amoblado, listo para habitar o invertir. Disfruta de sus amenities: parrilla, balcón, terraza, calefacción, aire acondicionado, internet wifi, red de gas natural y ascensor. Además, es apto profesional, ideal para quienes buscan combinar vivienda y trabajo. ¡No dejes pasar esta oportunidad! Consultá por visitas.",
    "createdAt": "2026-07-18T19:13:17",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 224963, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=pZ4xNUwLyPU"
    }
  },
  {
    "id": "prop-223257",
    "refCode": "223257",
    "title": "venta de departamento en Pinamar",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "De la Corvina 1645",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1645",
      "lat": -37.1062005,
      "lng": -56.8694005
    },
    "features": {
      "totalArea": 50,
      "coveredArea": 50,
      "rooms": 1,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": "Este"
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 55000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "venta de cómodo dto. de dos ambientes en Pinamar al ingreso = -Living comedor con ventanas hacia la calle -comedor amplio -cocina -baño completo -habitacion amplia y luminosa -no posee gas natural - sin muebles -venta por boleto y posesión - subdivisión en tramite",
    "createdAt": "2026-07-03T12:29:33",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 223257, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-221624",
    "refCode": "221624",
    "title": "CASA EN VENTA EN OSTENDE - PINAMAR",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Montevideo 1745",
      "neighborhood": "Ostende",
      "city": "Buenos Aires",
      "postalCode": "1745",
      "lat": -37.1222868,
      "lng": -56.8931598
    },
    "features": {
      "totalArea": 389,
      "coveredArea": 180,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 99000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Casa ubicada sobre calle Montevideo, desarrollada sobre lote propio y con una distribución funcional, amplios ambientes y excelente luminosidad natural. Al ingresar a la propiedad nos recibe un cómodo recibidor cerrado, ideal como espacio de recepción o estar. Desde allí se accede a un amplio living, muy luminoso y confortable, que se conecta con el comedor diario, generando un ambiente cálido y funcional para la vida familiar. Frente a este sector se encuentra la cocina independiente, con buena circulación y privacidad. La vivienda cuenta con dos dormitorios mas uno exterior y un baño completo, distribuidos a través de un pasillo que conecta los distintos ambientes. Además, dispone de un entrepiso tipo altillo que puede destinarse como tercer dormitorio, escritorio, sala de juegos o espacio multifunción, adaptándose a diferentes necesidades. Desde la cocina se accede al sector exterior, donde se encuentra el garage y una galería vidriada que se integra con un agradable patio interno. Este espacio se vincula con el quincho, conformando un entorno ideal para reuniones y momentos de recreación. A través del quincho se accede a un segundo patio de mayores dimensiones, con parque y amplios espacios verdes que aportan privacidad y un entorno ideal para disfrutar al aire libre. Se trata de una propiedad cómoda, luminosa y con muy buena distribución, que combina amplios espacios interiores con sectores exteriores pensados para el disfrute familiar. Cuenta con todos los servicios esenciales para una vida confortable, incluyendo gas natural, agua corriente, red cloacal e internet, ofreciendo comodidad y practicidad para el uso permanente o como vivienda de descanso.",
    "createdAt": "2026-06-19T21:04:58",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 221624, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-219993",
    "refCode": "219993",
    "title": "Casa en alquiler zona alamos verano 2027- valores en el anuncio",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Eslora & De las Garzas",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0905771,
      "lng": -56.85055509999999
    },
    "features": {
      "totalArea": 150,
      "coveredArea": 100,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 3000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Espectacular casa en alquiler para la temporada de verano 2027 en el exclusivo barrio de Álamos, Pinamar. Con 150 m² totales, esta propiedad de 3 dormitorios y 2 baños ofrece amplitud y confort. Totalmente amoblada, cuenta con aire acondicionado, calefacción, microondas, lavarropas, televisión y conexión WiFi. Disfruta de su parrilla, amplio patio y luminosos ambientes. Incluye cochera y entrada para auto, además de servicios como agua corriente, gas natural, cloacas y medidor eléctrico individual. Equipada con alarma y frazadas para mayor comodidad. Ideal para unas vacaciones inolvidables en familia. Ubicada en Eslora & De las Garzas, a pasos de la playa y los principales centros comerciales. ¡No dejes pasar esta oportunidad única! NO SE ACEPTAN JOVENES ENERO 1quincena =usd 3000 ENERO 2 quincena = usd 3500 abona honorarios 10 % , limpieza al retirarse",
    "createdAt": "2026-06-08T13:03:06",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 219993, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-219418",
    "refCode": "219418",
    "title": "Venta de Departamento en Valeria del mar a 200 mts de la playa",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Vicealmirante Onofre Betbeder 350",
      "neighborhood": "Valeria Del Mar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1405395,
      "lng": -56.87791319999999
    },
    "features": {
      "totalArea": 80,
      "coveredArea": 80,
      "rooms": 1,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": "Norte"
    },
    "amenities": [
      "Amoblado",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 80000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=lvYRUPPWhRM",
    "description": "Descubra este luminoso departamento amoblado en Valeria del Mar, a solo pasos del mar. Con 2 dormitorios, 1 baño y 60m² cubiertos, ofrece confort y estilo. Disfrute de la pileta climatizada, parrilla y entrada para auto. Equipado con aire acondicionado,, internet y TV por cable, Su orientación norte garantiza luz natural todo el día. Ideal para vacacionar o invertir en la costa. ¡Una oportunidad única en un entorno tranquilo y natural! -living comedor con vista al parque -cocina equipada con barra desayunadora - habitacion con dos camas - habitacion con cama matrimonial -Baño completo con bañera - parrillas al aire libre de uso comun - pileta climatizada exterior - amoblado - gas natural",
    "createdAt": "2026-06-03T20:50:16",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 219418, tipo original: Departamento Amoblado, estado original: En Venta).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=lvYRUPPWhRM"
    }
  },
  {
    "id": "prop-218126",
    "refCode": "218126",
    "title": "Lote Multifamiliar Pinamar Centro 800m2",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Disponible",
    "location": {
      "address": "Del Tuyú 723",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1141705,
      "lng": -56.8653674
    },
    "features": {
      "totalArea": 800,
      "coveredArea": 0,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 435000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Lote multifamiliar de 800m2 en pleno centro de Pinamar, ideal para desarrollo inmobiliario Ubicado en calle Del tuyu entre Robinson Crusoe y Marco Polo FOS: 0.4: 315 M2 FOT: 1.2: 945 M2 (superficie construible + amenities en terraza) Superficie cochera: 590.625 m2",
    "createdAt": "2026-05-27T12:53:43",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-candela-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 218126, tipo original: Lote, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-218011",
    "refCode": "218011",
    "title": "Casa en Carilo",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Paraiso 1025",
      "neighborhood": "Carilo",
      "city": "Buenos Aires",
      "postalCode": "1025",
      "lat": -37.1515695,
      "lng": -56.8987391
    },
    "features": {
      "totalArea": 100,
      "coveredArea": 80,
      "rooms": 3,
      "bedrooms": 0,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 250,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler Temporario en Cariló Hermosa casa ideal para descansar y disfrutar de la tranquilidad del bosque y el mar Ubicada en Calle Paraíso 1025 La propiedad está preparada para alojar cómodamente hasta 5 personas, perfecta para parejas o familias que buscan comodidad y relax. La casa cuenta con: * Wi-Fi * Alarma monitoreada * Microondas * Horno eléctrico * 2 habitaciones * 2 baños * Habitación principal en suite con vestidor * Otro baño completo * En planta baja: habitación con 3 camas * En planta alta: habitación matrimonial *Patio y parrilla Un espacio cálido y cómodo para disfrutar de Cariló en cualquier época del año Consultá disponibilidad y valores por temporada.",
    "createdAt": "2026-05-26T21:00:05",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-lara-gascon",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 218011, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-217121",
    "refCode": "217121",
    "title": "Departamento en Alquiler Temporal",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. Robette 970",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1351353,
      "lng": -56.875139
    },
    "features": {
      "totalArea": 80,
      "coveredArea": 70,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "ARS",
      "price": 100,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamento en alquiler temporal en Av Robette, a dos cuadras de la playa en Mar de Ostende Cuenta con dos habitaciones, una de ellas con baño en suite. Gas natural y balcon con parrilla Disponible diciembre, enero y febrero! Consultanos",
    "createdAt": "2026-05-20T09:24:09",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-candela-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 217121, tipo original: Departamento, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-215699",
    "refCode": "215699",
    "title": "Departamento todo el año en Pinamar",
    "operationType": "Alquiler",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. Martín Pescador 1198",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1198",
      "lat": -37.1054423,
      "lng": -56.8627563
    },
    "features": {
      "totalArea": 60,
      "coveredArea": 60,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 0,
      "age": 25,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "ARS",
      "price": 750000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamento en Pinamar, listo para disfrutar todo el año. Este luminoso y amoblado departamento de 60 m² totales cuenta con 2 dormitorios, 1 baño completo y 1 toilette, distribuidos en un ambiente amplio y funcional. Su antigüedad de 25 años no le resta encanto, ya que se encuentra en excelente estado y ofrece una distribución moderna y práctica ademas cuenta con lavadero El living comedor es el corazón del hogar, con una calidez que invita al descanso. La cocina, completamente amueblada, está equipada para que cocinar sea un placer. Cuenta con calefacción a gas natural, garantizando confort en los meses más fríos, y un calefactor a gas adicional para mayor calidez. Uno de los grandes atractivos es su balcón, ideal para disfrutar del aire libre y las tardes soleadas. La luminosidad es excepcional gracias a su orientación, llenando cada rincón de luz natural. El edificio ofrece parrilla para compartir momentos inolvidables con amigos y familiares. Además, el departamento cuenta con todos los servicios esenciales: agua corriente, red de gas natural, cloacas, electricidad y asfalto en la calle. La conectividad está asegurada con internet/WiFi disponible. Ubicado en una zona tranquila pero cercana a los principales atractivos de Pinamar, este departamento es perfecto tanto para vacaciones como para residencia permanente. No pierdas la oportunidad de vivir en un espacio que combina comodidad, estilo y una ubicación privilegiada. ¡Contáctanos para más información! la propiedad se alquila amoblada , Expensas $ 170.000 aproximadamente",
    "createdAt": "2026-05-11T19:33:20",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 215699, tipo original: Departamento Amoblado, estado original: En Alquiler).\nPublicada en: ningún canal"
    }
  },
  {
    "id": "prop-214646",
    "refCode": "214646",
    "title": "Complejo de Departamentos EN VENTA",
    "operationType": "Venta",
    "propertyType": "Otro",
    "status": "Disponible",
    "location": {
      "address": "Av. Robette 970",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1351353,
      "lng": -56.875139
    },
    "features": {
      "totalArea": 480,
      "coveredArea": 480,
      "rooms": 3,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 330000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Complejo de 3 departamentos de 3 ambientes en venta, ubicado en excelente zona, a tan solo 3 cuadras del mar, sobre Av. Robette . La propiedad se desarrolla sobre un amplio lote de 480 m², lo que la convierte en una oportunidad ideal tanto para inversión como para desarrollo futuro. Cada unidad cuenta con espacios cómodos y funcionales, diseñados para brindar confort y practicidad. El complejo dispone de gas natural y todas las comodidades necesarias para vivienda permanente o alquiler turístico. El terreno ofrece gran potencial para seguir construyendo o ampliar las unidades existentes, lo que lo hace especialmente atractivo para quienes buscan proyectar a futuro. Una opción versátil, en una zona de gran demanda, perfecta para quienes desean invertir cerca del mar.",
    "createdAt": "2026-05-04T20:35:05",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-lara-gascon",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 214646, tipo original: Complejo, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-214551",
    "refCode": "214551",
    "title": "CASA EN VENTA EN LA MEJOR ZONA DE PINAMAR - OPORTUNIDAD",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "De las Ballenas 165",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1147396,
      "lng": -56.8576439
    },
    "features": {
      "totalArea": 819,
      "coveredArea": 287,
      "rooms": 6,
      "bedrooms": 4,
      "bathrooms": 5,
      "toilettes": 1,
      "garages": 2,
      "age": 30,
      "orientation": ""
    },
    "amenities": [
      "Cochera cubierta",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 360000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=ARnQ7VYGDw8",
    "description": "Descubra esta impresionante casa en venta en la mejor zona de Pinamar, sobre la prestigiosa calle De las Ballenas. Con una ubicación privilegiada, esta propiedad de 819 m² totales y 287 m² cubiertos ofrece un estilo de vida único. Distribuida en dos plantas, la casa cuenta con 3 dormitorios, 5 baños y 1 toilette, ideal para una familia numerosa o para recibir invitados. Los ambientes son amplios y muy luminosos, destacando su galería techada, balcón terraza y un patio perfecto para disfrutar al aire libre. La parrilla agregan un toque de relax y entretenimiento. se anexa la casa de servicio completa con dos baños .cocina habitacion Equipada con todas las comodidades modernas, esta casa está amoblada y lista para habitar. Cuenta con aire acondicionado, televisión, equipo de música, microondas, lavavajillas, lavarropas y ropa de cama. La cocina está amueblada y equipada, y el comedor es ideal para cenas formales, ademas cuenta con dos parrilas una interior y otra exterior ,horno de barro En el exterior, dispone de cochera subterránea y estacionamiento techado para dos autos, con entrada independiente. La propiedad incluye dependencia de servicio, alarma, y todos los servicios: agua corriente, cloacas, electricidad, , internet y TV por cable. Con una antigüedad de 30 años, la casa se encuentra en excelente estado y cuenta con planos aprobados. Acepta mascotas, lo que la hace perfecta para toda la familia. Además, el barrio cuenta con alumbrado público y asfalto. No pierda esta oportunidad única de adquirir una propiedad excepcional en una de las zonas más exclusivas de Pinamar. ¡Contáctenos para más información!",
    "createdAt": "2026-05-04T13:11:38",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 214551, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales\nVideo: https://www.youtube.com/watch?v=ARnQ7VYGDw8"
    }
  },
  {
    "id": "prop-214531",
    "refCode": "214531",
    "title": "VENTA DE DEPARTAMENTO MONOAMBIENTE A METROS DEL MAR SOBRE CALLE SIMBAD EL MARINO",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Simbad El Marino & Del Odiseo",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.121004,
      "lng": -56.8626975
    },
    "features": {
      "totalArea": 34,
      "coveredArea": 34,
      "rooms": 1,
      "bedrooms": 0,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 58000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=d1U1PXvg3Hg",
    "description": "Ubicado sobre la calle Simbad el Marino y Odiseo a metros del mar en Pinamar, este hermoso departamento en quinto piso ofrece una combinación ideal de confort, modernidad y una excelente vista al mar. La unidad fue refaccionada a nuevo, con un estilo moderno y materiales de calidad. Cuenta con cocina independiente totalmente renovada y un ambiente amplio de living comedor con dormitorio integrado. Dispone además de un balcón con vista al mar, perfecto para disfrutar del entorno, y gas natural. Muy luminoso, funcional y listo para habitar, es ideal tanto para uso personal como para inversión se vende amoblado ( menos heladera), ademas posee cochera ultima expensas $235.000 Ubicación privilegiada, a pasos de la playa. Consultanos para más información o coordinar una visita.",
    "createdAt": "2026-05-04T12:17:20",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 214531, tipo original: Departamento, estado original: En Venta).\nPublicada en: ningún canal\nVideo: https://www.youtube.com/watch?v=d1U1PXvg3Hg"
    }
  },
  {
    "id": "prop-214322",
    "refCode": "214322",
    "title": "casa en venta en nayades con pileta",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Boulevard Eros & De las Nereidas",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1187584,
      "lng": -56.877707
    },
    "features": {
      "totalArea": 720,
      "coveredArea": 180,
      "rooms": 6,
      "bedrooms": 4,
      "bathrooms": 2,
      "toilettes": 1,
      "garages": 1,
      "age": 0,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 280000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Descubra esta encantadora casa en venta en el exclusivo barrio Náyades de Pinamar, una propiedad que combina comodidad, estilo y un entorno natural inigualable. Con una superficie total de 720 m² y 180 m² cubiertos, esta vivienda de una planta se destaca por su luminosidad excepcional y su diseño funcional. Al ingresar, se recibe un amplio living-comedor con salida directa al jardín, ideal para disfrutar de momentos en familia o con amigos. La cocina, completamente amueblada y equipada con electrodomésticos modernos como microondas y lavavajillas, ofrece un espacio práctico y elegante. La propiedad cuenta con 4 dormitorios, todos con buena iluminación y ventilación, 2 baños completos y un toilette adicional, brindando privacidad y confort para todos los integrantes del hogar. El exterior es un verdadero oasis: una pileta cercada, perfecta para relajarse o refrescarse en los días cálidos, acompañada de un quincho con parrilla y un jacuzzi con hidromasajes, creando el ambiente ideal para reuniones sociales o momentos de esparcimiento. El patio, con entrada para auto, ofrece espacio suficiente para estacionamiento y actividades al aire libre. La casa está equipada con aire acondicionado, calefacción centralizada y calefactores a gas, garantizando una temperatura agradable durante todo el año. Además, cuenta con alarma, internet/wifi, televisión, y todos los servicios esenciales como agua corriente, electricidad con medidor individual y conexión para lavarropas. Se aceptan mascotas, por lo que su compañero de cuatro patas también será bienvenido. Ubicada en Boulevard Eros & De las Nereidas, en el corazón de Pinamar, esta propiedad ofrece fácil acceso a las playas, centros comerciales y áreas recreativas. Una oportunidad única para quienes buscan una vivienda amplia, luminosa y con todas las comodidades en un entorno de tranquilidad y naturaleza. ¡No deje pasar esta oportunidad!",
    "createdAt": "2026-05-01T11:20:06",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 214322, tipo original: Casa, estado original: En Venta).\nPublicada en: ningún canal"
    }
  },
  {
    "id": "prop-213440",
    "refCode": "213440",
    "title": "Casa en venta en Carilo -financiacion",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Lenatero 450",
      "neighborhood": "Carilo",
      "city": "Buenos Aires",
      "postalCode": "7169",
      "lat": -37.1577671,
      "lng": -56.9026845
    },
    "features": {
      "totalArea": 650,
      "coveredArea": 155,
      "rooms": 4,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 1,
      "age": 15,
      "orientation": "Este"
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 215000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=F7QqUU8rqeY",
    "description": "Espectacular casa en venta en Cariló, una de las zonas más exclusivas y codiciadas de la costa argentina. Ubicada en Lenatero 450, esta propiedad de 650 m² totales y 155 m² cubiertos ofrece un estilo de vida único en un entorno natural privilegiado. Con 15 años de antigüedad, la vivienda se destaca por su excelente estado de conservación y su luminosidad excepcional, gracias a su orientación este que permite disfrutar del sol de la mañana. Distribuida en dos plantas, la casa cuenta con 2 dormitorios amplios y 2 baños completos, un play room ,perfectos para una familia o pareja que busque comodidad y privacidad. El living comedor es espacioso y se integra con una cocina amueblada, equipada con microondas y lavarropas, ideal para quienes disfrutan de la cocina. Además, dispone de un balcón terraza que invita a relajarse al aire libre, y un balcón adicional para disfrutar de las vistas. Las amenities incluyen parrilla para reuniones, entrada para auto con cochera techada , y calefacción a gas que asegura calidez en los meses fríos. La propiedad cuenta con alarma, televisión por cable e internet/wifi, brindando seguridad y conectividad. Los servicios básicos como agua corriente, electricidad y alumbrado público están garantizados. El entorno es tranquilo y arbolado, típico de Cariló, ideal para quienes buscan paz y contacto con la naturaleza sin renunciar a las comodidades modernas. Esta casa es perfecta como vivienda permanente o como refugio de fin de semana. Su diseño funcional y sus espacios luminosos la convierten en un hogar acogedor. ¡No pierdas la oportunidad de adquirir esta joya en Cariló! Agenda tu visita y descubre todo lo que esta propiedad tiene para ofrecer.",
    "createdAt": "2026-04-24T23:42:10",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 213440, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=F7QqUU8rqeY"
    }
  },
  {
    "id": "prop-213431",
    "refCode": "213431",
    "title": "Lote multifamiliar Zona La Rambla",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Disponible",
    "location": {
      "address": "L. N. Alem & Colon",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1284636,
      "lng": -56.8676341
    },
    "features": {
      "totalArea": 404.68,
      "coveredArea": 0,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 110000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Excelente oportunidad de inversión: lote multifamiliar ubicado a tan solo una cuadra del mar, en la exclusiva zona de La Rambla. Con una superficie total de 404,68 m², este terreno se presenta como una opción ideal para el desarrollo inmobiliario, ya sea para viviendas multifamiliares, departamentos o proyecto turístico. Sus medidas son: frente y el fondo 11,49 mts; por el lado derecho y el izquierdo mide 35.22 mts. Su superficie total es de 404,68 mts2. Lote 2, Manzana 507. FOS, 0,30 y FOT 0,80",
    "createdAt": "2026-04-24T20:22:41",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-candela-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 213431, tipo original: Lote, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-213233",
    "refCode": "213233",
    "title": "Alquiler temporal en Zona centrica Pinamar",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. del Valle Fértil 430",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1090402,
      "lng": -56.8642327
    },
    "features": {
      "totalArea": 70,
      "coveredArea": 68,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 40,
      "orientation": "Oeste"
    },
    "amenities": [
      "Amoblado",
      "Cochera cubierta",
      "Luminoso",
      "Semicubierto 2 m²"
    ],
    "pricing": {
      "currency": "USD",
      "price": 690,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler temporada 2026/2027 zona centro, Pinamar. Hasta cuatro personas. Ubicado en el centro de Pinamar por la avenida Valle Fértil, a tres cuadras de Bunge y Marco Polo (pleno centro de Pinamar). Cuenta con dos ambientes que consisten en un living comedor equipada con cocina, heladera, mesa y sillas, microondas, cafetera, baño completo, una habitación con cama de dos plazas con salida directa al balcón. Cuenta con cochera cerrada hasta un vehículo. Zona activa, con comercios como quioscos, supermercados y plazas a dos cuadras. No acepta grupo de jóvenes. Se alquila por semana (mínimo 5 noches),semana, quincena o mes. El precio incluye: Wifi, servicios, expensas y limpieza. No incluye ropa blanca. a 6 cuadras de la playa. Ideal para vacacionar con familia, parejas.",
    "createdAt": "2026-04-23T16:46:57",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 213233, tipo original: Apartamento Amueblado, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-213020",
    "refCode": "213020",
    "title": "Departamento en Venta En Pozo ultimas dos unidades en venta !!",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Sarandí & Avenida Juan de Garay",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.13706080000001,
      "lng": -56.8756125
    },
    "features": {
      "totalArea": 53,
      "coveredArea": 53,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 9,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera cubierta",
      "Luminoso",
      "A estrenar"
    ],
    "pricing": {
      "currency": "USD",
      "price": 95000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamentos en pre-venta de diseño moderno y excelente calidad constructiva, con pisos y revestimientos en porcelanato de primera línea que garantizan durabilidad y una estética elegante. Las unidades cuentan con aberturas de aluminio con DVH (doble vidrio hermético), brindando aislación térmica y acústica. Baño completo equipado con grifería de primera calidad y detalles cuidadosamente seleccionados. Dormitorios con placard e interiores con estantes, optimizando el espacio de guardado. El diseño interior se destaca por sus cielorrasos de hormigón visto, aportando un estilo contemporáneo y urbano. Cada unidad dispone de balcón con parrilla, ideal para disfrutar al aire libre. Opciones disponibles: Planta alta con terraza propia y cochera incluida (pre-venta) Primer piso de 3 ambientes (pre-venta) Una excelente oportunidad de inversión en una propuesta que combina confort, diseño y calidad. ENTREGA EN NOVIEMBRE 2027",
    "createdAt": "2026-04-22T13:38:46",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-candela-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 213020, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-212612",
    "refCode": "212612",
    "title": "Venta de Local comercial con vivienda en centro de Pinamar",
    "operationType": "Venta",
    "propertyType": "Local",
    "status": "Disponible",
    "location": {
      "address": "Av. De las Artes 200",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1137756,
      "lng": -56.8594656
    },
    "features": {
      "totalArea": 28,
      "coveredArea": 28,
      "rooms": 1,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 58000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Venta de local con vivienda ubicado en el edificio cafi III sobre calle De la Artes casi Libertador . en pleno centro de Pinamar, este inmueble combina local comercial en planta baja y vivienda en planta alta. Distribución: * Local a la calle con buena visibilidad * 1 dormitorio * Baño completo * Cocina Excelente opción para quienes buscan trabajar y vivir en un mismo lugar o invertir con renta. Ubicación estratégica, con movimiento durante todo el año y cercanía a comercios y servicios.",
    "createdAt": "2026-04-20T12:23:10",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 212612, tipo original: Local, estado original: En Venta).\nPublicada en: ningún canal"
    }
  },
  {
    "id": "prop-212154",
    "refCode": "212154",
    "title": "Departamento en venta en pinamar zona centrica -Financiacion",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Del Lenguado 1313",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1313",
      "lat": -37.1070967,
      "lng": -56.8647695
    },
    "features": {
      "totalArea": 60,
      "coveredArea": 54,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 30,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 65000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=5shVt9XpSOU",
    "description": "Departamento en venta en Pinamar de 2 ambientes, con muy buena distribución. Cuenta con living comedor luminoso, cocina equipada y baño completo. Dispone de una habitación principal amplia con balcón a la calle, lo que aporta excelente luz natural, y además posee una segunda habitación en entrepiso, ideal como dormitorio adicional, escritorio o espacio multifunción. La unidad presenta sectores con piso flotante, brindando calidez y modernidad. Cuenta con gas natural, un diferencial muy importante para vivienda permanente o renta durante todo el año. Ubicado en una zona estratégica, cercano a comercios y servicios. Oportunidad ideal para invertir o disfrutar en la costa. DATO MUY IMPORTANTE OFRECE FINANCIACION !",
    "createdAt": "2026-04-16T13:14:34",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 212154, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=5shVt9XpSOU"
    }
  },
  {
    "id": "prop-209955",
    "refCode": "209955",
    "title": "Hotel en Alquiler por Semana Santa",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. 2 730",
      "neighborhood": "Villa Gesell",
      "city": "Buenos Aires",
      "postalCode": "7165",
      "lat": -37.2599524,
      "lng": -56.9698542
    },
    "features": {
      "totalArea": 600,
      "coveredArea": 50,
      "rooms": 0,
      "bedrooms": 10,
      "bathrooms": 10,
      "toilettes": 9,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Amoblado",
      "Semicubierto 50 m²"
    ],
    "pricing": {
      "currency": "ARS",
      "price": 50000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Te invitamos a disfrutar unos días de descanso en Av. 2 N° 730, entre 107 y 108, en un entorno ideal para desconectar y relajarte Promo por semana santa 4 noches al precio de 3 Habitaciones cómodas para 2, 3 y 4 personas Desayuno incluido para empezar cada día de la mejor manera Ubicación privilegiada, cerca del mar y del centro Una opción perfecta para una escapada en Semana Santa, ya sea en pareja, con amigos o en familia",
    "createdAt": "2026-04-01T22:06:14",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-lara-gascon",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 209955, tipo original: Apart Hotel, estado original: En Alquiler Temporal).\nPublicada en: web"
    }
  },
  {
    "id": "prop-208167",
    "refCode": "208167",
    "title": "Departamento en La Frontera - Pinamar",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Zona Pinamar Norte",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0714191,
      "lng": -56.8297494
    },
    "features": {
      "totalArea": 71,
      "coveredArea": 58,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": "Norte"
    },
    "amenities": [
      "Cochera cubierta",
      "Muy luminoso",
      "A estrenar",
      "Semicubierto 13 m²"
    ],
    "pricing": {
      "currency": "USD",
      "price": 185000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTA | 2 AMBIENTES EN GREENPOINT – PINAMAR NORTE Viví rodeado de naturaleza, a pasos del mar Departamento de 2 ambientes con 58 m² cubiertos + balcón de 13 m² con parrilla y vista al bosque. Diseño moderno, cómodo y funcional. Living-comedor amplio con cocina integrada e isla 1 dormitorio con placard completo Baño completo Pisos de porcelanato simil madera Aberturas DVH y calefacción por piso radiante Caldera dual Opcional: cochera y baulera ⸻ GREENPOINT – TU LUGAR ENTRE EL BOSQUE Y EL MAR Ubicado a solo 300 mts del mar, en un entorno natural único. El complejo ofrece: Piscina climatizada in/out Spa Gimnasio SUM + cowork Seguridad y privacidad Un proyecto exclusivo de solo 16 unidades, pensado para disfrutar la tranquilidad sin alejarte del centro.",
    "createdAt": "2026-03-19T19:13:02",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-lara-gascon",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 208167, tipo original: Apartamento, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-207929",
    "refCode": "207929",
    "title": "VENTA DE DUPLEX EN MAR DE OSTENDE - 2 UNIDADES - IDEAL INVERSION",
    "operationType": "Venta",
    "propertyType": "Dúplex",
    "status": "Disponible",
    "location": {
      "address": "Lautaro 254",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.131363,
      "lng": -56.8706761
    },
    "features": {
      "totalArea": 281,
      "coveredArea": 140,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 190000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Ubicados en Mar de Ostende, Pinamar, estos dúplex forman parte de un complejo de solo dos unidades, sobre un lote de 280 m², ofreciendo un entorno tranquilo y funcional, ideal tanto para vivienda como inversión. Cada unidad cuenta con aproximadamente 70 m² cubiertos, con una distribución cómoda y bien aprovechada: Al ingresar, nos encontramos con un luminoso living-comedor integrado a la cocina, generando un espacio amplio y práctico para el uso diario. En esta misma planta se dispone de un baño completo. En planta alta, la propiedad cuenta con dos habitaciones bien distribuidas y un segundo baño completo, brindando mayor comodidad y privacidad. En el exterior, el complejo ofrece patio con parrilla de uso compartido y espacio verde. La propiedad cuenta con gas natural, un valor agregado clave en la zona. cada dúplex , también se pude vender de manera individual consulte el valor !!! Ideal para quienes buscan invertir en renta turística, tener una propiedad en la costa o disfrutar de un entorno tranquilo y de baja densidad. Mar de Ostende – Pinamar Consultanos para más información o coordinar una visita",
    "createdAt": "2026-03-18T20:11:14",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 207929, tipo original: Dúplex, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-207566",
    "refCode": "207566",
    "title": "Duplex oportunidad en Pinamar 2 dormitorios ,2 baños gas natural",
    "operationType": "Venta",
    "propertyType": "Dúplex",
    "status": "Vendida",
    "location": {
      "address": "De la Corvina 905",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1084222,
      "lng": -56.86031999999999
    },
    "features": {
      "totalArea": 100,
      "coveredArea": 70,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 25,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 90000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Dúplex 3 amb con jardín, parrilla y cochera – Gas natural – Excelente estado – Oportunidad -planta baja Excelente dúplex de 3 ambientes ubicado en calle Corvina 905, en un entorno tranquilo y de fácil acceso, ideal tanto para vivienda permanente como para inversión. La propiedad se destaca por su funcionalidad, comodidad y espacios exteriores con verde, ofreciendo el equilibrio perfecto entre descanso y practicidad. Cuenta con: • Luminoso living-comedor • Cocina funcional • 2 dormitorios cómodos • 2 baños completos • Gas natural • Patio con espacio verde • Parrilla • Espacio de estacionamiento propio (descubierto) Se encuentra en muy buen estado de conservación, listo para habitar sin necesidad de realizar mejoras. Ideal para: Vivienda permanente Casa de descanso Inversión para renta temporaria Valor: USD 90.000 Muy buena relación precio-calidad dentro de la zona. Propiedad lista para disfrutar desde el primer día. Consultanos para coordinar una visita",
    "createdAt": "2026-03-17T11:32:32",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 207566, tipo original: Dúplex, estado original: Vendido).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-203283",
    "refCode": "203283",
    "title": "Departamento en pozo a la venta AQUA PINAMAR",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Avenida Arquitecto Jorge Bunge & Marco Polo",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.11273389999999,
      "lng": -56.8659557
    },
    "features": {
      "totalArea": 43.65,
      "coveredArea": 39.9,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "A estrenar"
    ],
    "pricing": {
      "currency": "USD",
      "price": 120000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Complejo de departamentos Premium “Acqua Pinamar”. Exclusividad y Diseño en Armonía con la Naturaleza. •Ubicado en la zona más importante de Pinamar, Avenida Jorge Bunge!!! ''Departamos en pozo'' *Financiación!! *Anticipo 30% (se puede charlar) + 24 cuotas en $ + CAC (o USD). ------------------------------------------------------- Descripción del Departamento : *Piso: 2 *Unidad funcional: 204 *Ambientes: 2 ,cuenta con 1 dormitorios, baño en suite, 1 baño, vestidor, estar comedor y balcon con parrilla. *Tipo: 03 *Orientación: FRENTE CALLE BUNGE *Superficie total: 43.65m2 / superficie cubierta 38.90m2 / Superficie semicubierta 4.75 *Valor en pesos argentinos: $155,730,681 (sujeto a modificaciones) --------------------------------------------------------------------------------------------------------- +Servicios: +Agua Corriente +Desagüe Cloacal +Luz +Comodidades +Cochera Subterránea. (Cocheras: 22.000 dolares cada una) +Laundry +Parrilla +Piscina +Sala de Juegos +Solarium +SUM +Muy Luminoso *Deck +Área de relax +Espacio para lectura y mucho más… $$Ofrece financiación$$ Fecha de Entrega Octubre 2026 Aclaracion:lista en pesos +CAC MAR 25( indice General).Vigencia hasta 31/05/25 o lo que defina el Fiduciario. {Acqua Pinamar} ^Complejo de departamentos Premium^ Exclusividad y Diseño en Armonía con la Naturaleza. Ubicado en la zona más importante de Pinamar, Avenida Jorge Bunge. Ventas en pozo que superan expectativas, respaldadas por un diseño innovador y una materialización impecable. Una inversión que crece con el tiempo En Acqua Pinamar, cada espacio ha sido diseñado no solo para habitar, sino para potenciar el valor de tu inversión. Un desarrollo que garantiza rentabilidad y alta demanda, asegurando un crecimiento sostenido en el tiempo. Espacios que inspiran - Áreas de encuentro y relax, pensadas para el bienestar y la conexión con el entorno. - Una propuesta arquitectónica que redefine la relación entre el hogar y la naturaleza, promoviendo nuevas formas de vinculación con el espacio. Acqua Pinamar no es solo un desarrollo, es una oportunidad única de ser parte de un estilo de vida inigualable.",
    "createdAt": "2026-02-16T12:48:50",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 203283, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-202169",
    "refCode": "202169",
    "title": "departamento en gral Madariaga sobre av principal",
    "operationType": "Venta",
    "propertyType": "PH",
    "status": "Disponible",
    "location": {
      "address": "Martinez Guerrero 2100",
      "neighborhood": "General Madariaga",
      "city": "Buenos Aires",
      "postalCode": "2100",
      "lat": -37.0096644,
      "lng": -57.1335318
    },
    "features": {
      "totalArea": 67,
      "coveredArea": 67,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 45000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamento en ph, sobre avenida pricipal de General Madariaga. Posible permuta por propiedad en la ciudad de Pinamar Mas detalles",
    "createdAt": "2026-02-09T12:23:23",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 202169, tipo original: PH, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-201050",
    "refCode": "201050",
    "title": "lote en venta zarate barrio las mercedes - zarate oportunidad -facilidades",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Disponible",
    "location": {
      "address": "Zárate",
      "neighborhood": "Zarate",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -34.0951512,
      "lng": -59.0240826
    },
    "features": {
      "totalArea": 300,
      "coveredArea": 300,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": "Norte"
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 22000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTA DE LOTE – BARRIO LAS MERCEDES | ZÁRATE Se vende lote de 12 x 30 metros ubicado en el Barrio Las Mercedes, una de las zonas con mayor crecimiento y proyección de la ciudad. ️ Cuenta con todos los servicios ️ Entorno en constante desarrollo ️ Ideal para vivienda o inversión La operación se realiza mediante cesión de boleto de compraventa, modalidad habitual y completamente válida. Gran oportunidad: se trata de un barrio en plena ascendencia, lo que lo convierte en una inversión única para quienes buscan resguardo de valor y proyección a futuro. Zárate – Barrio Las Mercedes",
    "createdAt": "2026-02-02T12:02:15",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-jorge-martin-fabbri",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 201050, tipo original: Lote, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-200481",
    "refCode": "200481",
    "title": "Casa Moderna Minimalista en el Bosque de Carilo con 4 Dormitorios 2 en Suite, Losa Radiante, Diseño de Hormigon Visto y Amplio Lote de 932 m²",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Lenatero 418",
      "neighborhood": "Carilo",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.153205,
      "lng": -56.9006675
    },
    "features": {
      "totalArea": 932,
      "coveredArea": 234,
      "rooms": 5,
      "bedrooms": 4,
      "bathrooms": 4,
      "toilettes": 1,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera semicubierta",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 295000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Casa moderna y minimalista en el bosque de Cariló, implantada sobre un lote de 932 m² rodeado de naturaleza, que ofrece privacidad, diseño y excelente calidad constructiva. La propiedad se destaca por su estilo contemporáneo, con techo de hormigón visto y grandes ventanales que integran el interior con el entorno natural, generando espacios luminosos y abiertos tanto hacia el frente como hacia el jardín , ubicacion estrategica a 8 cuadras del centro comercial y a 13 cuadras del mar Al ingreso encontramos un deck de madera con mobiliario exterior, ideal para disfrutar del entorno. En el interior, la casa cuenta con un amplio living comedor con cocina integrada, de concepto abierto, con excelente circulación y vistas hacia ambos lados de la propiedad. Posee rollers automatizados que aportan confort y funcionalidad a todos los ambientes. En la planta principal dispone de un toilette de recepción y una habitación en suite con vestidor. En el nivel inferior se desarrollan tres habitaciones adicionales, una de ellas en suite, y dos baños completos que asisten al resto de los dormitorios, además de un espacio con doble bacha de diseño moderno. La casa cuenta en total con cuatro habitaciones y cuatro baños. También dispone de un lavadero completo equipado y cocina con lavavajillas, sumando practicidad al uso diario. Entre sus características se destacan la calefacción por losa radiante, gas natural, placares embutidos de primera calidad en todos los ambientes y parrilla exterior. La propiedad cuenta con una superficie cubierta de 234 m², desarrollada sobre un amplio lote de 932 m², ideal para quienes buscan confort, diseño y conexión con la naturaleza en uno de los entornos más exclusivos de Cariló.",
    "createdAt": "2026-01-28T13:15:36",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 200481, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-199119",
    "refCode": "199119",
    "title": "CASA EN VENTA VILLA ROBLES",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "RP11 Km. 374",
      "neighborhood": "Villa Robles",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -36.9570946,
      "lng": -56.7720418
    },
    "features": {
      "totalArea": 174.87,
      "coveredArea": 147.3,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Semicubierto 27.57 m²"
    ],
    "pricing": {
      "currency": "USD",
      "price": 270000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Excelente propiedad de estilo moderno, ubicada en el Barrio Serena, dentro de Villa Robles, en un entorno tranquilo y rodeado de naturaleza. La casa se desarrolla en cuatro ambientes, cuenta con tres habitaciones y se destaca por su diseño contemporáneo con hormigón visto, que le aporta carácter y solidez. Dispone de una amplia y luminosa sala de estar, con grandes ventanales, y una cocina integrada, moderna y funcional, logrando una excelente conexión entre los espacios interiores. En el exterior, la propiedad ofrece un hermoso parque con pileta, ideal para disfrutar del aire libre, el descanso y reuniones en un entorno verde y privado. Una casa moderna, cómoda y bien resuelta, ideal tanto como vivienda permanente como casa de descanso. Valor de venta: USD 290.000",
    "createdAt": "2026-01-19T12:21:23",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 199119, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-196331",
    "refCode": "196331",
    "title": "Alquiler de depto centrico para 5 personas a pasos de bunge y de la playa",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Del Tuyú 700",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1145533,
      "lng": -56.8654667
    },
    "features": {
      "totalArea": 100,
      "coveredArea": 82,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 1,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 160,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler de departamento en Pinamar centro -verano 2027 Espectacular departamento en calle del tuyu a pasos de Bunge. 2 habitaciones - living comedor 2 baños - parque trasero - parrilla -cochera ideal para 4 - 6 personas Valores verano 2027: DICIEMBRE : 1 Quincena Disponible - 2 Quincena Disponible 1 QUINCENA ENERO :usd 2400 - SEMANA :usd 1500 2 QUINCENA ENERO ALQUILADA 1 QUINCENA FEBRERO :usd 1900 - SEMANA USD 1100 2 QUINCENA FEBRERO : usd 1600 -SEMANA USD 1100 consulte disponibilidad durante el año",
    "createdAt": "2025-12-26T18:39:01",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 196331, tipo original: Departamento, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-195710",
    "refCode": "195710",
    "title": "alquiler para trabajadores",
    "operationType": "Alquiler",
    "propertyType": "Casa",
    "status": "Alquilada",
    "location": {
      "address": "Junín 665",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.140058,
      "lng": -56.90247189999999
    },
    "features": {
      "totalArea": 50,
      "coveredArea": 50,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "ARS",
      "price": 750000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "alquiler temporal y todo el año casa ubicada en Valeria del mar 2 habitaciones living - comedor pequeño patio",
    "createdAt": "2025-12-19T11:50:20",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 195710, tipo original: Casa, estado original: Alquilado).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-193822",
    "refCode": "193822",
    "title": "ALQUILER EN PINAMAR IDEAL EMPRESAS",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Alquilada",
    "location": {
      "address": "Juno & Av. Martín Pescador",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.097838,
      "lng": -56.87146749999999
    },
    "features": {
      "totalArea": 100,
      "coveredArea": 80,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 100,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "alquiler en pinamar ,esta casa amplia esta pensada para grupo de trabajadores de temporada . comedor -cocina - living -luminoso tres habitaciones en total 2 baños patio - parque Disponible - enero y febrero -marzo",
    "createdAt": "2025-12-05T14:03:05",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 193822, tipo original: Casa, estado original: Alquilado).\nPublicada en: ningún canal"
    }
  },
  {
    "id": "prop-189828",
    "refCode": "189828",
    "title": "LOTE EN VENTA BARRIO LAS MERCEDES - ZARATE",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Reservada",
    "location": {
      "address": "B2800 Zárate",
      "neighborhood": "Zarate",
      "city": "Buenos Aires",
      "postalCode": "2800",
      "lat": -34.1279288,
      "lng": -59.05407349999999
    },
    "features": {
      "totalArea": 338,
      "coveredArea": 0,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 22000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Venta de terreno en Barrio Las Mercedes, Zárate, ubicado sobre calle Dorrego. El lote cuenta con medidas de 13 metros de frente por 26 metros de fondo. Zona residencial en desarrollo, muy tranquila y con buena proyección. Toda la documentación está completa y en regla. Se encuentra en la zona de la Planta Toyota, con fácil acceso a Ruta 9 / Panamericana. Excelente oportunidad tanto para construir vivienda familiar como para inversión a futuro. Consultá para más información y visitas.",
    "createdAt": "2025-11-05T13:35:55",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-jorge-martin-fabbri",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 189828, tipo original: Lote, estado original: Reservado).\nPublicada en: redes, portales"
    }
  },
  {
    "id": "prop-185318",
    "refCode": "185318",
    "title": "CASA EN VENTA PINAMAR ALAMOS A ESTRENAR",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Av. de las Tres Carabelas",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0969507,
      "lng": -56.8490092
    },
    "features": {
      "totalArea": 860,
      "coveredArea": 260,
      "rooms": 5,
      "bedrooms": 4,
      "bathrooms": 4,
      "toilettes": 1,
      "garages": 1,
      "age": 0,
      "orientation": "Este"
    },
    "amenities": [
      "Muy luminoso",
      "A estrenar"
    ],
    "pricing": {
      "currency": "USD",
      "price": 380000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTA DE CASA ESPECTACULAR Y MODERNA A ESTRENAR – ZONA ÁLAMOS, PINAMAR Propiedad construida sobre un lote de 800 m², con una superficie cubierta de 260 m². La casa combina diseño minimalista, materiales de primera línea y una excelente calidad constructiva. Planta baja: • Amplio living muy luminoso con grandes ventanales al parque. • Comedor espacioso. • Cocina moderna con amoblamiento a estrenar y diseño funcional. • Lavadero completo. • Dos habitaciones. • Dos baños. Planta alta: • Dos habitaciones en suite, una de ellas con vestidor y ambas con placares modernos de primera línea. Exterior: • Pileta con deck de madera. • Amplio parque y entorno natural. La propiedad cuenta con vidrios dobles en toda la casa, lo que garantiza confort térmico y acústico. Una oportunidad única de inversión. Casa a estrenar, moderna, luminosa y con estilo",
    "createdAt": "2025-10-06T13:02:09",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 185318, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-184815",
    "refCode": "184815",
    "title": "VENTA DE HECTAREAS EN ZARATE",
    "operationType": "Venta",
    "propertyType": "Campo",
    "status": "Disponible",
    "location": {
      "address": "C. 64",
      "neighborhood": "Zarate",
      "city": "Buenos Aires",
      "postalCode": "2800",
      "lat": -34.1133771,
      "lng": -59.0663504
    },
    "features": {
      "totalArea": 150000,
      "coveredArea": 0,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 950000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTA DE 15 HECTÁREAS EN ZÁRATE Ubicación estratégica: a solo 1,5 km de Panamericana y a pasos de Av. Antártida Argentina. Un espacio ideal para desarrollar un proyecto inmobiliario ambicioso en una zona de gran crecimiento y proyección. Superficie total: 15 hectáreas. Accesibilidad inmejorable. Potencial para urbanización, emprendimientos residenciales, comerciales o logísticos. Una oportunidad única de inversión en el corazón de Zárate. Consultanos para más información y coordinar una visita.",
    "createdAt": "2025-10-01T18:01:37",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-jorge-martin-fabbri",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 184815, tipo original: Campo, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-183116",
    "refCode": "183116",
    "title": "venta de departmento en san Bernardo",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. Bartolomé Mitre 2614",
      "neighborhood": "San Bernardo",
      "city": "Buenos Aires",
      "postalCode": "2614",
      "lat": -36.6888194,
      "lng": -56.6824714
    },
    "features": {
      "totalArea": 38,
      "coveredArea": 38,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 36000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "venta de departamento en San bernardo : piso 2 por escalera al ingreso living - comedor cocina 1 habitacion con placard ubicado en edificio hugolito ,a seis cuadras de la terminal de omnibus y a cuatro cuadras del centro Bien Centrico",
    "createdAt": "2025-09-22T12:53:01",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 183116, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-182808",
    "refCode": "182808",
    "title": "Alquiler Pinamar Norte -solo familias",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "De los Alamos & Nautilus",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.096234,
      "lng": -56.843889
    },
    "features": {
      "totalArea": 800,
      "coveredArea": 280,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 2,
      "garages": 1,
      "age": 0,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 5000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler Casa Tante Trudy – Pinamar Norte( Valores en el anuncio ) Al ingresar living - con sillones comedor con mesa para 8 personas cocina equipada Quincho cerrado con mesa y sillas para 8 personas baño - lavarropas y secadora habitacion de servicio con baño habitacion 1 en suite ( baño privado ) habitacion 2 : con dos camas individuales baño completo con bañera habitacion 3 : con cama de dos plazas cochera cerrada - alarma - Enero : 1 y 2 quincena usd 6000 febrero 1 y 2 quincena usd 4500",
    "createdAt": "2025-09-19T12:54:01",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 182808, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-182716",
    "refCode": "182716",
    "title": "Alquiler Pinamar Norte -solo familias",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Nautilus & Avenida del Olimpo",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0851206,
      "lng": -56.8325626
    },
    "features": {
      "totalArea": 800,
      "coveredArea": 200,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 1,
      "garages": 1,
      "age": 30,
      "orientation": "Norte"
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 300,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler en Pinamar Norte Alamos y Nautilus .Chalet tradicional ubicado en una zona muy tranquila de Pinamar Al ingreso living comedor con sillones ,muy luminoso Cocina comedor diario toilette de recepción comedor para 8 personas Exterior con parrilla ,amplio parque Dependencia de servicio con habitación y baño Dormitorio 1: en suite con baño privado dormitorio 2:con dos camas individuales dormitorio 3: con dos camas individuales wi fi - alarma - No es apta grupo de jovenes - No incluye ropa de blanco Valor 2027 : Diciembre 20/12 - 26/12 usd 1600 Enero 30 /12 - 31/01 usd 8200 1 Quincena Enero 30 /12 - 14/01 usd 4200 2 Quincena Enero 16/01 - 31/01 usd 4500 Febrero 02/02 - 28 -02 usd 5000 1 Quincena Febrero 02/02 -16/02 usd 3000 2 Quincena Febrero 18/02 -04/03 usd 2400 semana de febrero 31/01-07/02 usd 1800 07/02-14/02 usd 1800 14/02- 21 /02 usd1800 21 /02 -28/02 usd 1800 abona honorarios inmobiliarios 10 %",
    "createdAt": "2025-09-18T22:24:51",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 182716, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-181479",
    "refCode": "181479",
    "title": "Casa en alquiler en Carilo disponible fines de semana (comunes y largos ) y verano 2027",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Lenatero 418",
      "neighborhood": "Carilo",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.153205,
      "lng": -56.9006675
    },
    "features": {
      "totalArea": 600,
      "coveredArea": 250,
      "rooms": 5,
      "bedrooms": 4,
      "bathrooms": 4,
      "toilettes": 1,
      "garages": 1,
      "age": 10,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 300,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=H-1POvrQc7Q",
    "description": "Alquiler de Casa en Cariló – Estilo Moderno y Minimalista Casa luminosa de diseño moderno y minimalista, rodeada de verde: Planta principal: living comedor muy luminoso con vista al jardín, cocina totalmente equipada, habitación en suite,baño para invitados Subsuelo: tres habitaciones (una en suite), baño completo, y toilette con doble bacha. Exterior: deck de madera con muebles, parrilla y cochera cubierta. La vivienda cuenta con un total de cuatro dormitorios y cuatro baños, y se encuentra totalmente equipada, ideal para estadías familiares en un entorno natural la casa no cuenta con aire acondicionado Disponibilidad: enero, febrero y fines de semana largos durante el año. No se admite grupo de jóvenes. Detalles : La casa se esta disponible fines de semana : fin de semana largos fin de semana comunes honorarios inmobiliaria 10% limpieza al retirarse a cargo del inquilino deposito de garantia de usd 700 Propiedad ideal para disfrutar de confort, estilo y naturaleza en Cariló.",
    "createdAt": "2025-09-10T19:03:53",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 181479, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=H-1POvrQc7Q"
    }
  },
  {
    "id": "prop-181166",
    "refCode": "181166",
    "title": "Alquiler anual en Pinamar - zona tridente",
    "operationType": "Alquiler",
    "propertyType": "Casa",
    "status": "Alquilada",
    "location": {
      "address": "Del Tridente 1659",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1659",
      "lat": -37.1134794,
      "lng": -56.87444840000001
    },
    "features": {
      "totalArea": 100,
      "coveredArea": 100,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 1,
      "age": 40,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "ARS",
      "price": 1000000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "casa en alquiler anual en calle tridente , cerca de todo ideal para familias que buscan vivir todo el año con cercania a todo tres habitaciones Dos baños cocina separada living comedor - gas natural ingresos comprobables - garantia - para ingreso : mes ingreso - mes de honorarios -- deposito en garantia",
    "createdAt": "2025-09-08T20:57:45",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 181166, tipo original: Casa, estado original: Alquilado).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-180833",
    "refCode": "180833",
    "title": "casa en venta Pinamar calle tridente -oportunidad !! casa y departamento",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Del Tridente 1569",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1569",
      "lat": -37.1149919,
      "lng": -56.87466509999999
    },
    "features": {
      "totalArea": 680,
      "coveredArea": 150,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 1,
      "age": 35,
      "orientation": "Norte"
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 170000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "casa ubicada en barrio tridente .living luminoso vista al frente .Comedor amplio .Cocina separada amoblada .Parque amplio con mucho verde y parrilla .Habitacion en suite con cama matrimonial .Habitaciones con cama matrimonial .Habitacion pequeña con cama simple .baño completo .En la parte de arriba se anexa un dto de las siguientes características .cocina - comedor .2 habitaciones y baño completo ..Cochera semi-cubierta veni a conocerla !!",
    "createdAt": "2025-09-05T12:56:35",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 180833, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-178382",
    "refCode": "178382",
    "title": "Departamento en venta en Caballito Dos ambientes",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Cucha Cucha 1055",
      "neighborhood": "Caballito",
      "city": "Capital Federal",
      "postalCode": "1055",
      "lat": -34.6099825,
      "lng": -58.4493282
    },
    "features": {
      "totalArea": 39,
      "coveredArea": 39,
      "rooms": 1,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 13,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 75000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTA DE DEPARTAMENTO EN CABALLITO , BUENOS AIRES UBICADO EN SEGUNDO PISO ,EDIFICIO MODERNO CON ASCENSOR-VISTA A LA CALLE CUCHA CUCHA . POSEE UNA HABITACION CON PLACARD LIVING COMEDOR LUMINOSO ,CON VISTA AL FRENTE - BALCON AMPLIO COCINA MODERNA CON COCINA Y MUEBLES BAÑO COMPLETO CON BAÑERA - PISO DE CEMENTO ALISADO ESTILO MODERNO AIRE ACONDICIONADO - TERRAZA EN EL EDIFICIO GRAN OPORTUNIDAD DE INVERSION",
    "createdAt": "2025-08-20T11:18:23",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 178382, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-177024",
    "refCode": "177024",
    "title": "Venta de local en Pinamar",
    "operationType": "Venta",
    "propertyType": "Local",
    "status": "Disponible",
    "location": {
      "address": "De la Trucha 1680",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1680",
      "lat": -37.1044811,
      "lng": -56.869052
    },
    "features": {
      "totalArea": 450,
      "coveredArea": 120,
      "rooms": 1,
      "bedrooms": 0,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": "Norte"
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 350000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Lote comercial ubicado en el barrio san José de Pinamar ,sobre calle de la Trucha y las totoras .Desarrollado en una planta con disposición al frente ,posee un baño , cocina . salon de ventas amplio . Patio trasero con grandes espacios de guardado . Sup del terreno es de 450 mt2 con una construcción de 120 mt2 .Buena calidad de construcción .Gas natural .Cloacas .Excelente renta todo el año- Emprendimientos OPORTUNIDAD DE INVERSION ! .",
    "createdAt": "2025-08-11T12:33:39",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 177024, tipo original: Local Industrial, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-175860",
    "refCode": "175860",
    "title": "Oportunidad unica en Mar Azul! FONDO DE COMERCIO LISTO PARA ABRIR - HABILITACION VIGENTE",
    "operationType": "Venta",
    "propertyType": "Local",
    "status": "Disponible",
    "location": {
      "address": "Calle 33 & Mar del Plata",
      "neighborhood": "Mar Azul",
      "city": "Buenos Aires",
      "postalCode": "7165",
      "lat": -37.3390543,
      "lng": -57.029578
    },
    "features": {
      "totalArea": 111,
      "coveredArea": 111,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 9000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "¡Oportunidad única en Mar Azul! FONDO DE COMERCIO LISTO PARA ABRIR – HABILITACIÓN VIGENTE Se vende fondo de comercio completamente equipado y habilitado, ideal para empezar a trabajar de inmediato en uno de los puntos más atractivos de la costa atlántica: Mar Azul. - Habilitación vigente. - Listo para operar sin demoras - Incluye electrodomésticos, mobiliario completo y cartelería - Excelente oportunidad para quienes desean invertir o comenzar un proyecto propio en la costa El comercio está en condiciones óptimas para funcionar desde el primer día. No requiere inversiones adicionales. ¡Solo entrar y trabajar! - Valor del fondo de comercio: USD 20.000 - Documentación al día - Se escuchan propuestas serias Contáctame para obtener información detallada, inventario completo, ubicación y condiciones.",
    "createdAt": "2025-08-03T22:05:14",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 175860, tipo original: Fondo de Comercio, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-174678",
    "refCode": "174678",
    "title": "venta de lote en carilo",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Disponible",
    "location": {
      "address": "Avenida Divisadero & Nandubay",
      "neighborhood": "Carilo",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1567566,
      "lng": -56.8911193
    },
    "features": {
      "totalArea": 1200,
      "coveredArea": 0,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 180000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "vendemos este lote en zona inmejorable superficie de 40 x 30 mts ideal inversores contactanos",
    "createdAt": "2025-07-25T18:49:26",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 174678, tipo original: Lote, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-174217",
    "refCode": "174217",
    "title": "Alquiler Temporal en Pinamar",
    "operationType": "Alquiler Temporal",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Av. del Valle Fértil 75",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1120328,
      "lng": -56.8647842
    },
    "features": {
      "totalArea": 70,
      "coveredArea": 70,
      "rooms": 1,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 100,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Departamento en alquiler temporal ubicado en el centro de Pinamar ( valores en la publicacion ) al ingresar encontramos un living comedor ,cocina con vista a la ciudad habitacion con cama matrimonial- baño -antebaño parrilla en el balcon con deck de madera losa radiante ,ascensor totalmente equipado - cochera privada capacidad para 4 personas ,disponible para alquiler finde largos . FEBRERO . semana de 6 al 13 de febrero .semana de 13 al 20 de febrero .semana de 20 al 27 de febrero CARNAVAL DISPONIBLE abona limpieza al finalizar la estadia",
    "createdAt": "2025-07-23T17:57:38",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 174217, tipo original: Departamento, estado original: En Alquiler Temporal).\nPublicada en: redes"
    }
  },
  {
    "id": "prop-174081",
    "refCode": "174081",
    "title": "venta de Duplex en Pinamar",
    "operationType": "Venta",
    "propertyType": "Dúplex",
    "status": "Disponible",
    "location": {
      "address": "De los Langostinos & Avenida del Valle Fértil",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1028299,
      "lng": -56.8552315
    },
    "features": {
      "totalArea": 100,
      "coveredArea": 70,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 2,
      "toilettes": 1,
      "garages": 0,
      "age": 40,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 130000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Vendemos este excelente duplex ubicado en una zona muy tranquila de Pinamar distribuido en dos plantas con espacio verde Al ingresar en planta baja econtramos un living comodo y luminoso comedor - cocina integrada -baño toilette y patio con parrilla planta alta : Dos habitaciones con placar - baño completo con bañera Este dúplex es una oportunidad para vivienda permanente , así como también para inversión -muy buena renta durante temporada de verano veni a conocerlo",
    "createdAt": "2025-07-22T21:15:56",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 174081, tipo original: Dúplex, estado original: En Venta).\nPublicada en: redes"
    }
  },
  {
    "id": "prop-173707",
    "refCode": "173707",
    "title": "Venta de departamento en Pinamar zona Boutique",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "De las Dunas 819",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1214947,
      "lng": -56.8628703
    },
    "features": {
      "totalArea": 44,
      "coveredArea": 44,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 75000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "¡Espectacular departamento en venta en la exclusiva zona Boutique de Pinamar! Ubicado en De las Dunas 819, este inmueble de 44 m² totalmente cubiertos ofrece un ambiente luminoso y acogedor. Cuenta con 1 dormitorio, 1 baño y un living-comedor integrado, ideal para disfrutar de la playa durante todo el año. El departamento está en una tercera planta, lo que garantiza privacidad y vistas. Disfruta de amenities como gimnasio, aire acondicionado, calefacción y conexión a internet. Con agua corriente y electricidad incluidas, esta propiedad es perfecta como inversión o para quienes buscan una experiencia de vida frente al mar. SE ENTREGA EL 15 DE FEBRERO 2027",
    "createdAt": "2025-07-18T21:45:28",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 173707, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-172335",
    "refCode": "172335",
    "title": "CASA A UNA CUADRA DEL MAR ,ZONA RAMBLA -OPORTUNIDAD DE INVERSION !",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Nuestras Malvinas",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1270586,
      "lng": -56.8698965
    },
    "features": {
      "totalArea": 300,
      "coveredArea": 200,
      "rooms": 7,
      "bedrooms": 6,
      "bathrooms": 3,
      "toilettes": 0,
      "garages": 2,
      "age": 30,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 235000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=2Lw7XMRRS2Y",
    "description": "Casa en venta ubicada en mar de Ostende Zona la Rambla Excelente propiedad ubicada a tan solo dos cuadras del mar La casa al ingresar posee un living con un hogar ,una cocina comedor amplia 2 habitaciones con un baño completo , en todas las habitaciones hay placares Planta alta dos habitacioones amplias ,baño completo En subsuelo ingresando por la cochera hay otro dto que se distribuye con dos habitaciones , comedor cocina baño , patio parrilla .EL VALOR ES POR TODA LA CASA EN SUS DOS PLANTAS + EL DTO EN EL SUBSUELO * ( PERO SE PUEDEN VENDER POR SEPARADO ) El espacio para guardar autos se adapta hasta dos vehículos calefacción por gas natural . Renta durante todo el año OPORTUNIDA DE INVERSION !!!",
    "createdAt": "2025-07-07T13:49:13",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 172335, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=2Lw7XMRRS2Y"
    }
  },
  {
    "id": "prop-167920",
    "refCode": "167920",
    "title": "venta de departamento en centro de Pinamar",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Reservada",
    "location": {
      "address": "De las Gaviotas & Avenida De las Artes",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1144837,
      "lng": -56.858498
    },
    "features": {
      "totalArea": 25,
      "coveredArea": 25,
      "rooms": 1,
      "bedrooms": 0,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 48000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Monoambiente en Venta en pleno centro de Pinamar. A tan solo 2 cuadras de la playa, con salida directa a Av. Bunge donde se encuentran los mejores restaurantes, y confiterias y a pocas cuadras de los hermosos bosques de Pinamar, se encuentra este departamento de 1 ambiente, totalmente amueblado, con Cocina reciclada, listo para que disfruten dias increibles en esta hermosa ciudad, o bien generar renta tanto dentro como fuera de temporada. al mismo se accede por escalera en 2do piso. Super luminoso y muy cómodo. IDEAL PARA INVERSION.",
    "createdAt": "2025-06-03T11:56:38",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 167920, tipo original: Departamento, estado original: Reservado).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-161587",
    "refCode": "161587",
    "title": "ALQUILER DE CASA EN ZONA GOLF PINAMAR",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Fragata la Victoria 1796",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1796",
      "lat": -37.0986595,
      "lng": -56.8482712
    },
    "features": {
      "totalArea": 820,
      "coveredArea": 200,
      "rooms": 5,
      "bedrooms": 4,
      "bathrooms": 4,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 2500,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=0XhhrLLplfE",
    "description": "La casa cuenta en planta baja con amplio living comedor con espacio de trabajo y biblioteca. Comedor equipado y cocina completa con salida directa a galería semi techada. dos habitaciones en suite, una de ellas con bañera, placares de pared empotrados, y un toilette con ducha. En planta alta un espacio tipo playroom con sillones, y tv. Dos habitaciones y un toilette con ducha. Patio trasero con estacionamiento semicubierto, parrilla, galería ,cuarto de huéspedes con baño ,lavadero completo con secadora. Gas natural ,calefacción ,aire acondicionado. La casa se encuentra en una zona tranquila cerca del Golf de Pinamar en barrio Lasalle. A dos cuadras de negocios de primera necesidad como farmacias, supermercados, quioscos, panadería, etc. Y a cuatro cuadras de la playa, parador Cocodrilo. Contáctanos para conocerla Dato IMPORTANTE: El alquiler incluye ropa blanca, alarma de seguridad, servicios y wifi. valor por semana usd =2500",
    "createdAt": "2025-04-17T10:48:04",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-eve-lacoste",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 161587, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=0XhhrLLplfE"
    }
  },
  {
    "id": "prop-160970",
    "refCode": "160970",
    "title": "VENTA DE CASA EN VALERIA DEL MAR",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Pedro de Mendoza & Alfonso Cabral",
      "neighborhood": "Valeria Del Mar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1368848,
      "lng": -56.88861009999999
    },
    "features": {
      "totalArea": 500,
      "coveredArea": 120,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 1,
      "age": 30,
      "orientation": ""
    },
    "amenities": [
      "Cochera semicubierta",
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 139000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Vendemos esta hermosa casa en Valeria del mar Casa ubicada en esquina ,en una zona muy tranquila con mucho verde cuenta con un living amplio con ventanas al parque , cocina equipada tres habitaciones con placar ,dos baños completos lavadero- altillo galería techada para guardar dos autos, parrilla, patio con verde atras y adelante calefacción por gas natural . contáctanos para conocerla ACEPTA PERMUTA POR PROPIEDAD EN CABA (RECOLETA ,BELGRANO ,NUÑEZ ) PODRIA ACEPTAR VEHICULO .",
    "createdAt": "2025-04-12T12:04:45",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 160970, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-156925",
    "refCode": "156925",
    "title": "venta de casa en valeria del mar -Dos unidades en un mismo lote oportunidad !",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Fragata Hercules 77",
      "neighborhood": "Valeria Del Mar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1376761,
      "lng": -56.876831
    },
    "features": {
      "totalArea": 514,
      "coveredArea": 81,
      "rooms": 4,
      "bedrooms": 2,
      "bathrooms": 3,
      "toilettes": 0,
      "garages": 0,
      "age": 7,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 150000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=nXXarKfIj8Q",
    "description": "OPORTUNIDAD EN Valeria del Mar – DOS UNIDADES EN LOTE DE 500 m² Propiedad desarrollada sobre lote propio de 500 m², ubicada en una zona privilegiada y de gran crecimiento, ideal tanto para vivienda permanente como para inversión. La casa principal cuenta con living comedor, cocina, baño completo en planta baja y, en planta alta, un dormitorio en suite con baño privado y vestidor. Se destaca por su sistema de losa radiante por gas natural, un diferencial clave que aporta confort durante todo el año. En la parte posterior del lote se encuentra una segunda unidad independiente, compuesta por un dormitorio, baño completo, living comedor amplio, parrilla y sector de parque. La propiedad además dispone de galpón al fondo, entrada para auto y amplio parque, con una excelente distribución del lote que brinda privacidad entre ambas unidades. Una opción ideal para quienes buscan vivir y generar renta en simultáneo, o realizar una inversión con gran potencial de retorno en una de las zonas más buscadas de Valeria del Mar.",
    "createdAt": "2025-03-11T18:46:23",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 156925, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales\nVideo: https://www.youtube.com/watch?v=nXXarKfIj8Q"
    }
  },
  {
    "id": "prop-155638",
    "refCode": "155638",
    "title": "Casa en venta Pinamar norte oportunidad !!! retasada",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "De los Alamos & Nautilus",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.096234,
      "lng": -56.843889
    },
    "features": {
      "totalArea": 520,
      "coveredArea": 270,
      "rooms": 5,
      "bedrooms": 4,
      "bathrooms": 4,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 260000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=A1CrbaP87uo",
    "description": "Vendemos esta casa espectacular !!Ubicada en Pinamar Norte Construccion solida sobre un lote esquina de 500 mt 2. al ingreso living amplio con vista al parque - Comedor - cocina amplia con muebles de guardado quincho techado con baño y lavadero -garaje cerrado para dos vehiculos 4 habitaciones ( una en suite) 4 baños ( una de ellas con hidromasaje) lavadora de ropas y secadora - wifi - alarma - gas natural - aire acondionado . totalmente parquizada -construccion solida ... diseño y estilo veni a conocerla !!!",
    "createdAt": "2025-02-26T21:40:35",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 155638, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales\nVideo: https://www.youtube.com/watch?v=A1CrbaP87uo"
    }
  },
  {
    "id": "prop-151531",
    "refCode": "151531",
    "title": "Casa en venta Ostende Pinamar",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Alquilada",
    "location": {
      "address": "Cherburgo 1267",
      "neighborhood": "Ostende",
      "city": "Buenos Aires",
      "postalCode": "1267",
      "lat": -37.1333789,
      "lng": -56.8881351
    },
    "features": {
      "totalArea": 600,
      "coveredArea": 120,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 6,
      "orientation": ""
    },
    "amenities": [
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 80000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Casa ubicada en una zona muy tranquila de Ostende ,a dos cuadras de av España Construida sobre un terreno de 600 mt2 al ingresar a accedemos a un living comedor amplio y luminoso cocina integrada con ventanas al parque , habitacion con placard de melamina embutido baño con bañera . solida construccion con ventanas de paño fijo (doble vidrio ) En la parte trasera hay una construccion estilo departamento con baño y cocina -habitacion- No es apta credito Si queres conocerla estamos disponibles siempre para que la veas!!",
    "createdAt": "2025-01-20T11:14:29",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 151531, tipo original: Casa, estado original: Alquilado Temporalmente).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-149882",
    "refCode": "149882",
    "title": "Alquiler casa en pinamar Norte :casa amplia para 10 personas cerca del mar",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Av. del Olimpo",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.0828637,
      "lng": -56.8374561
    },
    "features": {
      "totalArea": 2000,
      "coveredArea": 280,
      "rooms": 5,
      "bedrooms": 5,
      "bathrooms": 4,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 250,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Impecable casa en Pinamar Norte -Lving luminoso con sillones -tv -habitacion con dos camas simples -habitacion con cama doble -baño completo con bañera- -comedor para 8 personas -cocina equipada con vista a calle del olimpo -lavadero - garage techado - habitacion de servicio con un a baño y cama de una plaza- Planta Alta = -habitacion en suite con baño completo -aire acondicionado -habitacion en suite con cama doble total de habitaciones 5 total de baños 4 personas que aloja la propiedad= 9 -10 ( solo familia ) valores verano 2027 : 1 Quincena enero = usd 5000 2 Quincena enero = usd 5500 1 Quincena febrero = usd 3800 - semana usd 2200 2 Quincena febrero = usd 3800- semana usd 2200 limpieza al retirarse con costo NO ADMITE JOVENES",
    "createdAt": "2025-01-04T21:42:43",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 149882, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-149395",
    "refCode": "149395",
    "title": "Casa en la Herradura -Pinamar",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "De Las Espuelas",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.0833728,
      "lng": -56.86620569999999
    },
    "features": {
      "totalArea": 1500,
      "coveredArea": 240,
      "rooms": 5,
      "bedrooms": 4,
      "bathrooms": 4,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 420000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Vendemos esta espectacular casa en La Herradura Pinamar. Con una superficie de 240 mts , esta casa se distribuye en una sola planta. cuenta con 4 cuatro habitaciones de enormes dimensiones y placares amplios 4 baños completos ,de excelente calidad de construcción La casa cuenta con Pileta , gas natural , calefacción por losa radiante en toda la casa . lote de 1500 mts Veni a conocer esta increible propiedad !!!",
    "createdAt": "2024-12-29T14:22:42",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 149395, tipo original: Casa, estado original: En Venta).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-148915",
    "refCode": "148915",
    "title": "Casa en alquiler Pinamar Barrio Nayades - valores en el anuncio solo familias",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Blvd. Eros",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "7167",
      "lat": -37.1170395,
      "lng": -56.8783429
    },
    "features": {
      "totalArea": 300,
      "coveredArea": 150,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 200,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Se alquila casa en Pinamar, zona Náyades, calle Eros. Hermosa cabaña de tres habitaciones (una de ellas en suite), dos baños, living y cocina. Cuenta con pileta, amplio parque, aires acondicionados en dos de las habitaciones, parrilla con deck y capacidad para seis personas Disponible = febrero 2027",
    "createdAt": "2024-12-21T18:12:20",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 148915, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-145942",
    "refCode": "145942",
    "title": "venta de casa en ostende",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "urquiza 463 ostende",
      "neighborhood": "Ostende",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.1251204,
      "lng": -56.890507
    },
    "features": {
      "totalArea": 250,
      "coveredArea": 80,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 5,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 85000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Se vende moderna casa en Ostende, ubicada en Urquiza 463. Con 2 dormitorios, 1 baño y 3 ambientes, esta propiedad de 5 años de antigüedad ofrece 80 m² cubiertos y 250 m² totales. Equipada con cocina amueblada, parrilla, patio y comedor. Cuenta con servicios como agua corriente, electricidad, medidor eléctrico individual, internet/wifi y alumbrado público. Ideal para quienes buscan comodidad y estilo en un entorno tranquilo.",
    "createdAt": "2024-11-25T09:37:17",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 145942, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-143034",
    "refCode": "143034",
    "title": "CASA EN ALQUILER TEMPORARIO EN PINAMAR",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "CORVINA 1881",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1881",
      "lat": -37.1047501,
      "lng": -56.8733765
    },
    "features": {
      "totalArea": 200,
      "coveredArea": 120,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 3,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 100,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=qCtNCFjoMgg",
    "description": "CASA EN ALQUILER TEMPORARIO – PINAMAR Alquiler por semana, quincena o mes Casa ubicada en Pinamar, en zona residencial Barrio San José, muy tranquila y familiar, ideal para descansar y disfrutar la temporada. La propiedad ofrece ambientes cómodos, funcionales y bien distribuidos, pensados para una estadía confortable. Características: * 3 dormitorios * 3 baños * Living–comedor amplio * Cocina equipada * Parrilla * Patio / parque * Entrada para auto Capacidad: hasta 6 personas Condiciones: solo grupos familiares – no se aceptan grupos de jóvenes Disponibilidad limitada – consultá valores y fechas disponible = fines de semana largos durante todo el año enero y febrero (reservada) abona limpieza al retirarse ( sin excepción )",
    "createdAt": "2024-10-30T09:47:36",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-sergio-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 143034, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=qCtNCFjoMgg"
    }
  },
  {
    "id": "prop-141124",
    "refCode": "141124",
    "title": "alquiler pinamar -temporada 2025",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Alquilada",
    "location": {
      "address": "de las hesperides 1280",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "1280",
      "lat": -37.120024,
      "lng": -56.8742329
    },
    "features": {
      "totalArea": 200,
      "coveredArea": 120,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 2,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera cubierta",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 6000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Alquiler Temporario - Casa en Pinamar verano 2025 Distribuida en una planta muy lumionosa - 3 habitaciones amplias con vista al jardin 2 baños completos cocina equipada - comedor - living amplio - pileta - parque - fogonero en el jardin - ropa blanca abona honorarios 10 % Disponible 1 Quincena Enero usd 6000 - Segunda de Enero usd 6000 Si queres mas informacion contactanos !!",
    "createdAt": "2024-10-15T12:01:03",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 141124, tipo original: Casa, estado original: Alquilado).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-138177",
    "refCode": "138177",
    "title": "Venta lote multifamiliar en mar de ostende a dos cuadras del mar -oportunidad",
    "operationType": "Venta",
    "propertyType": "Terreno",
    "status": "Disponible",
    "location": {
      "address": "biarritz mar de ostende",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.1332779,
      "lng": -56.87046669999999
    },
    "features": {
      "totalArea": 290,
      "coveredArea": 0,
      "rooms": 0,
      "bedrooms": 0,
      "bathrooms": 0,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 105000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=fdZDy1vHVPY",
    "description": "venta de lote multifamiliar hotelero ubicado en mar de Ostende la superficie total es de 289,70 mt2 sobre calle asfaltada ,a dos cuadras del hotel Viejo hotel ostende gran oportunidad para hotelería Acepta propiedad en Pinamar como parte de pago , consúltanos ! 10 mt frente x 29 mt fondo . f.o.s:0.3 =86,91 f.o.t =0.3=231.76 dens=300 hab/ha - Gas natural - Cloacas",
    "createdAt": "2024-09-18T12:09:19",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 138177, tipo original: Lote, estado original: En Venta).\nPublicada en: web, redes, portales\nVideo: https://www.youtube.com/watch?v=fdZDy1vHVPY"
    }
  },
  {
    "id": "prop-134723",
    "refCode": "134723",
    "title": "VENTA DE DEPARTAMNETO PH EN MAR DE AJO",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Vendida",
    "location": {
      "address": "espora 374",
      "neighborhood": "Mar De Ajo",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -36.7245263,
      "lng": -56.6779985
    },
    "features": {
      "totalArea": 50,
      "coveredArea": 50,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 22000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "VENTA de PH ubicado en la calle Espora 374 a tres cuadras de la playa y dos de la peatonal de Mar de Ajo Posee un dormitorio arriba, un entrepiso, cocina, baño,un pequeño comedor y un espacio para usar de baulera, fondo con parrilla compartido con los otros Dos departamentos. Gas natural no paga expensas escritura a cargo del comprador",
    "createdAt": "2024-08-22T10:18:26",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 134723, tipo original: Departamento, estado original: Vendido).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-131843",
    "refCode": "131843",
    "title": "DEPARTAMENTO EN VENTA -VALERIA DEL MAR",
    "operationType": "Venta",
    "propertyType": "Departamento",
    "status": "Disponible",
    "location": {
      "address": "Betbeder 350 valeria del mar",
      "neighborhood": "Valeria Del Mar",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.1404653,
      "lng": -56.882898
    },
    "features": {
      "totalArea": 55,
      "coveredArea": 55,
      "rooms": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 15,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 95000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Venta de departamento en Valeria del Mar a 150 metros del mar. primer piso acceso por escalera, Cuenta con cocina completa con barra desayunadora, living/comedor, un dormitorio, un baño completo. Muy luminoso, con una hermosa vista al parque. Balcon con parrilla. Aire acondicionado. Ideal para disfrutar en familia y para inversión, ya que su rentabilidad en temporada es excelente. El complejo se caracteriza por su mantenimiento, conservacion y carpintería de calidad, ademas de tener un espacio único de 2000 metros con piscina climatizada, juegos para chicos, parrillas y mucha tranquilidad. Todos los servicios, entre ellos GAS NATURAL. *Toda la información y medidas que se brindan por este medio son aproximadas y podrán ratificarse con la documentación pertinente. Antigüedad 15 años",
    "createdAt": "2024-07-29T20:35:58",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 131843, tipo original: Departamento, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-130692",
    "refCode": "130692",
    "title": "Excelente Oportunidad!!! Casa sobre boulevard con amplio lote.",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Boulevard y Paseo 145 villa gessell",
      "neighborhood": "Villa Gesell",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.2889335,
      "lng": -57.0009233
    },
    "features": {
      "totalArea": 704,
      "coveredArea": 176.97,
      "rooms": 4,
      "bedrooms": 3,
      "bathrooms": 3,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 190000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Descripción de la Propiedad Excelente oportunidad de inversión!!! - La casa cuenta con dos plantas. Planta Baja: - Living - comedor con cocina integrada. - Dos habitaciones. - Baño con ducha. - Quincho con parrilla, cocina y baño con ducha. - Garage conectado con la casa. 1° piso: - Habitacion amplia. - Toilettes. - Vestidor. - Baño completo con ducha. Patio super amplio. Piscina de 6 x 3 mts. Ideal para emprendimiento por la dimensión del lote. ZONA C2 (COMERCIAL MAYORISTA) FOS 0.6 FOT 1 DENS. 360",
    "createdAt": "2024-07-18T12:16:10",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 130692, tipo original: Casa, estado original: En Venta).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-124150",
    "refCode": "124150",
    "title": "casa en valeria del mar - oportunidad",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Vendida",
    "location": {
      "address": "sebastian el cano 2310",
      "neighborhood": "Valeria Del Mar",
      "city": "Buenos Aires",
      "postalCode": "2310",
      "lat": -37.1374321,
      "lng": -56.90258710000001
    },
    "features": {
      "totalArea": 412.5,
      "coveredArea": 61.14,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 0,
      "age": 30,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 80000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "En valeria del mar encontramos esta luminosa y comoda casa ,rodeada de un barrio tranquilo al ingresar tenemos acceso a el living con ventanas luminosas que dan al parque y la calle cocina equipada con barra de madera que la separa de los demas ambientes un baño completo cuenta con dos habitaciones patio con parrilla y espacios verdes la propiedad esta equipada con calefaccion por tiro balanceado y cuenta con gas natural , lo que garantiza comodidad para todo el año con una construccion solida e impecable,esta propiedad es ideal tanto como para vivir como para inversion. no te pierdas esta oportunidad contactame para programar una visita !",
    "createdAt": "2024-05-20T20:53:57",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-candela-hidalgo",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 124150, tipo original: Casa, estado original: Vendido).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-115465",
    "refCode": "115465",
    "title": "venta de casa en Quequen necochea",
    "operationType": "Venta",
    "propertyType": "Casa",
    "status": "Vendida",
    "location": {
      "address": "c 510 532 quequen",
      "neighborhood": "Necochea",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -38.5726738,
      "lng": -58.6992243
    },
    "features": {
      "totalArea": 300,
      "coveredArea": 80,
      "rooms": 4,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 50,
      "orientation": ""
    },
    "amenities": [
      "Cochera semicubierta",
      "Luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 55000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "casa ubicada en necochea muy linda propiedad en una sola planta dos habitaciones cocina comedor , baño completo , living amplio en el patio encontramos un quincho cerrado amplio patio con espacios verdes",
    "createdAt": "2024-03-05T11:07:36",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 115465, tipo original: Casa, estado original: Vendido).\nPublicada en: web, redes, portales"
    }
  },
  {
    "id": "prop-114818",
    "refCode": "114818",
    "title": "venta de excelente duplex en Ostende- oportunidad",
    "operationType": "Venta",
    "propertyType": "Dúplex",
    "status": "Disponible",
    "location": {
      "address": "Arcachon y San Petersburgo ostende",
      "neighborhood": "Ostende",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.123087,
      "lng": -56.89398500000001
    },
    "features": {
      "totalArea": 95,
      "coveredArea": 60,
      "rooms": 3,
      "bedrooms": 2,
      "bathrooms": 1,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [
      "Cochera semicubierta",
      "Muy luminoso"
    ],
    "pricing": {
      "currency": "USD",
      "price": 68000,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "https://www.youtube.com/watch?v=TgRkBTJubQs",
    "description": "Venta de Dúplex en Ostende-Pinamar. La propiedad se encuentra en excelente estado y con detalles de muy buen gusto, la misma cuenta con todos los servicios, gas natural, Luz, teléfono, agua corriente, cloaca, cable e internet por banda ancha. P.B: Al ingresar nos encontramos con un living comedor cómodos, luego una cocina integrada mas baulera bajo la escalera. P.A: En la planta superior tenemos dos dormitorios mas un baño completo. La propiedad es muy luminosa y cuenta con su propio patio mas un espacio verde. Se escuchan ofertas razonables. Se vende SIN muebles. LEER SE VENDE POR CESION DE BOLETO DE COMPRAVENTA. Escrituración en trámite iniciada por la Secretaría de Viviendas de Pinamar en el proceso de regulación dominial.",
    "createdAt": "2024-02-29T10:02:48",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 114818, tipo original: Dúplex, estado original: En Venta).\nPublicada en: ningún canal\nVideo: https://www.youtube.com/watch?v=TgRkBTJubQs"
    }
  },
  {
    "id": "prop-111640",
    "refCode": "111640",
    "title": "alquiler en pinamar -zona iglesia solo familias - valores en el anuncio",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "del tiburon 979",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.10817490000001,
      "lng": -56.8519829
    },
    "features": {
      "totalArea": 450,
      "coveredArea": 188,
      "rooms": 6,
      "bedrooms": 4,
      "bathrooms": 2,
      "toilettes": 1,
      "garages": 0,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 200,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Aquiler temporada 2027 ubicada en una zona estrategica ,muy cerca del mar dispone de 3 habitaciones en plata baja 2 baños completos plata alta 1 habitacion con un baño living -comedor -cocina separada cochera cubierta - lavarropas NO SE ALQUILA A GRUPO DE JOVENES DICIEMBRE = 1 al 25 disponible ENERO : NO DISPONIBLE FEBRERO : DISPONIBLE",
    "createdAt": "2024-01-28T19:26:38",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 111640, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, portales"
    }
  },
  {
    "id": "prop-76417",
    "refCode": "76417",
    "title": "Alquiler temporario Pinamar -casa para 10 personas en zona tridente",
    "operationType": "Alquiler Temporal",
    "propertyType": "Casa",
    "status": "Disponible",
    "location": {
      "address": "Tridente y silfides",
      "neighborhood": "Pinamar",
      "city": "Buenos Aires",
      "postalCode": "",
      "lat": -37.1192075,
      "lng": -56.8735134
    },
    "features": {
      "totalArea": 300,
      "coveredArea": 300,
      "rooms": 6,
      "bedrooms": 4,
      "bathrooms": 3,
      "toilettes": 0,
      "garages": 1,
      "age": 0,
      "orientation": ""
    },
    "amenities": [],
    "pricing": {
      "currency": "USD",
      "price": 299,
      "expenses": 0,
      "taxesIncluded": false
    },
    "images": [],
    "videoUrl": "",
    "description": "Excelente casa en alquiler ( NO SE ALQUILA A JOVENES ) Capacidad para 10 personas Ubicada en excelente zona de Pinamar cerca del centro y de la playa zona tridente cuenta con 4 habitaciones amplias y luminosas 3 baños completos con bañera Parrilla y patio espacio para auto - parque y mucho verde DISPONIBLE : VERANO 2027 Enero 1 Quincena = consultar 2 Quincena( reservada )X Febrero 1 quincena usd 3000 2 quincena usd 3000 honorarios inmobiliaria 10 % - Limpieza al retirarse NO ADMITE JOVENES",
    "createdAt": "2023-01-17T12:55:48",
    "agentData": {
      "owner": {
        "name": "",
        "phone": "",
        "email": "",
        "idNumber": "",
        "address": "",
        "notes": ""
      },
      "keyLocation": "Oficina",
      "keyCustody": {
        "status": "en_oficina",
        "currentHolder": "Oficina",
        "takenAt": null,
        "history": []
      },
      "security": {
        "alarmCode": "",
        "alarmCompany": "",
        "gateCode": "",
        "lockboxCode": "",
        "wifiPassword": ""
      },
      "houseManual": "",
      "commission": {
        "ratePercent": null,
        "sharedRate": null,
        "notes": ""
      },
      "minNegotiationPrice": null,
      "legalStatus": "",
      "assignedAgentId": "agent-natalia-benitez",
      "visitsHistory": [],
      "internalNotes": "Importada del listado del 28-10-2026 (ID 76417, tipo original: Casa, estado original: En Alquiler Temporal).\nPublicada en: web, redes, portales"
    }
  }
];

export const INITIAL_RESERVATIONS = [];

export const INITIAL_RENTALS = [];

// Movimientos de caja. userId: 'admin' (inmobiliaria) o el id del broker.
// kind 'venta': honorarios de una operación de un broker, con la parte exacta que corresponde a la inmobiliaria.
export const INITIAL_MOVEMENTS = [];
