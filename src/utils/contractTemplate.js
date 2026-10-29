// Contrato de reserva (compra, alquiler o alquiler temporal) armado como datos:
// el mismo modelo se muestra en HTML y se exporta a PDF.
// En los textos, **así** marca negrita.
import { numberToWords, currencyInWords } from './numberToWords.js';

export const AGENCY = {
  name: 'BENÍTEZ INMOBILIARIA',
  address: 'De la Corvina 1296, Local 7, Pinamar, Provincia de Buenos Aires'
};

const BLANK = '______________________';
const SHORT_BLANK = '____________';
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const ORDINALS = ['PRIMERA', 'SEGUNDA', 'TERCERA', 'CUARTA', 'QUINTA', 'SEXTA', 'SÉPTIMA', 'OCTAVA', 'NOVENA', 'DÉCIMA'];
const ordinal = (i) => (i < 10 ? ORDINALS[i] : `DÉCIMA ${ORDINALS[i - 10]}`);

// Los datos cargados no pueden romper el formato de negritas
const clean = (v) => String(v ?? '').replace(/\*/g, '').trim();
const val = (v, blank = BLANK) => clean(v) || blank;
const upper = (v, blank = BLANK) => (clean(v) ? clean(v).toUpperCase() : blank);

const parseDate = (iso) => {
  if (!iso) return null;
  const [y, m, d] = String(iso).split('-').map(Number);
  return y && m && d ? { y, m, d } : null;
};

export const longDate = (iso) => {
  const p = parseDate(iso);
  return p ? `${p.d} de ${MONTHS[p.m - 1]} de ${p.y}` : '____ de __________ de ______';
};

// "a los VEINTIOCHO (28) días del mes de MAYO del año DOS MIL VEINTISÉIS"
const dateInWords = (iso) => {
  const p = parseDate(iso);
  if (!p) return 'a los ____ días del mes de __________ del año ________';
  const day = p.d === 1 ? 'al PRIMER (1) día' : `a los ${numberToWords(p.d).toUpperCase()} (${p.d}) días`;
  return `${day} del mes de ${MONTHS[p.m - 1].toUpperCase()} del año ${numberToWords(p.y).toUpperCase()}`;
};

const fmtNumber = (n) => (Number(n) || 0).toLocaleString('es-AR', { maximumFractionDigits: 2 });
const hasAmount = (n) => n !== '' && n !== null && n !== undefined && !Number.isNaN(Number(n));

export const money = (amount, currency) => `${currency === 'USD' ? 'USD' : '$'} ${fmtNumber(amount)}`;

// "DÓLARES ESTADOUNIDENSES OCHENTA Y CUATRO MIL (USD 84.000)"
const moneyWords = (amount, currency) => (hasAmount(amount)
  ? `**${currencyInWords(amount, currency).toUpperCase()} (${money(amount, currency)})**`
  : `${currency === 'USD' ? 'DÓLARES ESTADOUNIDENSES' : 'PESOS'} ${BLANK} (${currency === 'USD' ? 'USD' : '$'} ${SHORT_BLANK})`);

// "TRES POR CIENTO (3%)"
const percentWords = (n) => {
  const num = Number(n);
  if (!hasAmount(n) || n === '') return `______ POR CIENTO (____%)`;
  return Number.isInteger(num)
    ? `${numberToWords(num).toUpperCase()} POR CIENTO (${num}%)`
    : `${fmtNumber(num)} POR CIENTO (${fmtNumber(num)}%)`;
};

const countWords = (n) => `${numberToWords(n).toUpperCase().replace(/^UNO$/, 'UN')} (${n})`;

const joinList = (items) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join('; ')}; y ${items[items.length - 1]}`);

const nightsBetween = (from, to) => {
  const a = parseDate(from); const b = parseDate(to);
  if (!a || !b) return 0;
  return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000);
};

export const contractKind = (property) => {
  const op = property?.operationType || 'Venta';
  if (op === 'Venta') return 'sale';
  return op === 'Alquiler Temporal' ? 'temporary' : 'rental';
};

const PARTIES = {
  sale: { client: 'LA PARTE COMPRADORA', owner: 'LA PARTE VENDEDORA' },
  rental: { client: 'LA PARTE LOCATARIA', owner: 'LA PARTE LOCADORA' },
  temporary: { client: 'LA PARTE LOCATARIA', owner: 'LA PARTE LOCADORA' }
};

const TITLES = {
  sale: 'Reserva / Ofrecimiento de compra ad referéndum',
  rental: 'Reserva / Ofrecimiento de locación ad referéndum',
  temporary: 'Reserva de locación temporaria ad referéndum'
};

// Notas que la app pone por defecto al crear la reserva: ya están cubiertas por las cláusulas
const DEFAULT_NOTES = /^Seña ad-referéndum de la aceptación/i;

// Valores iniciales del formulario a partir de la reserva y la propiedad
export const defaultTerms = ({ reservation, property, agent }) => {
  const kind = contractKind(property);
  const owner = property?.agentData?.owner || {};
  const saved = { ...(reservation.contractTerms || {}) };
  // Contratos guardados con la versión anterior (un solo propietario)
  if (!saved.owners && (saved.ownerName || saved.ownerDni)) {
    saved.owners = [{ name: saved.ownerName || '', dni: saved.ownerDni || '', address: '', email: '' }];
  }
  const rate = property?.agentData?.commission?.ratePercent;
  return {
    city: property?.location?.neighborhood || 'Pinamar',
    clientAddress: '',
    offeredPrice: reservation.propertyPrice || property?.pricing?.price || '',
    owners: [{ name: owner.name || '', dni: owner.idNumber || '', address: owner.address || '', email: owner.email || '' }],
    brokerName: agent?.name || reservation.agentName || '',
    brokerLicense: '',
    commissionPercent: rate ?? (kind === 'sale' ? 3 : ''),
    commissionText: '',
    acceptanceHours: 72,
    jurisdiction: 'Departamento Judicial de Dolores',
    extraClauses: '',
    // Venta
    cadastre: '',
    furnished: (property?.amenities || []).includes('Amoblado'),
    inSuccession: false,
    boletoPercent: 80,
    deedDays: 180,
    // Alquiler
    startDate: '',
    endDate: '',
    use: kind === 'temporary' ? 'turismo y descanso' : 'vivienda familiar',
    guests: '',
    checkIn: '14',
    checkOut: '10',
    deposit: '',
    guarantee: 'seguro de caución o garantía propietaria a satisfacción de LA PARTE LOCADORA',
    adjustment: 'cada TRES (3) meses según la variación del Índice de Precios al Consumidor (IPC) publicado por el INDEC',
    signDays: 10,
    ...saved
  };
};

export const buildContract = ({ reservation: r, property: p, terms: t }) => {
  const kind = contractKind(p);
  const { client: CLIENT, owner: OWNER } = PARTIES[kind];
  const cur = r.currency || p?.pricing?.currency || 'USD';
  const isSale = kind === 'sale';
  const isTemp = kind === 'temporary';

  const address = p
    ? [p.location?.address, p.location?.neighborhood, p.location?.city && `Provincia de ${p.location.city}`].filter(Boolean).join(', ')
    : '';
  const surface = Number(p?.features?.totalArea) || 0;
  const owners = (t.owners || []).filter(o => clean(o.name) || clean(o.dni));

  // Encabezado con las partes
  const clientDesc = `**${upper(r.clientName)}**, DNI ${val(r.clientDni, SHORT_BLANK)}, con domicilio en ${val(t.clientAddress)}`
    + `${clean(r.clientPhone) ? `, teléfono ${clean(r.clientPhone)}` : ''}${clean(r.clientEmail) ? ` y correo electrónico ${clean(r.clientEmail)}` : ''}`;
  const ownerDesc = owners.length
    ? joinList(owners.map(o => `**${upper(o.name)}**, DNI ${val(o.dni, SHORT_BLANK)}, con domicilio en ${val(o.address)}${clean(o.email) ? `, correo electrónico ${clean(o.email)}` : ''}`))
      + `, ${owners.length > 1 ? 'todos ellos en carácter de titulares' : 'en carácter de titular'}${t.inSuccession && isSale ? ', herederos declarados y/o continuadores de la sucesión correspondiente' : ''} del inmueble objeto de la presente`
    : `${BLANK}, DNI ${SHORT_BLANK}, con domicilio en ${BLANK}, en carácter de titular del inmueble objeto de la presente`;
  const broker = clean(t.brokerName) ? `, representada en este acto por ${clean(t.brokerName)}${clean(t.brokerLicense) ? ` (${clean(t.brokerLicense)})` : ''}` : '';
  const title = TITLES[kind].toUpperCase();

  const intro = `En la ciudad de ${val(t.city)}, Provincia de Buenos Aires, ${dateInWords(r.reservationDate)}, entre ${clientDesc}, en adelante denominada **“${CLIENT}”**, por una parte; y por la otra ${ownerDesc}, en adelante denominada **“${OWNER}”**, con intervención de **${AGENCY.name}**, con domicilio en ${AGENCY.address}${broker}, en adelante **“LA INMOBILIARIA”**, convienen celebrar la presente **${title}**, sujeta a las cláusulas y condiciones que a continuación se detallan:`;

  const acceptance = clean(t.acceptanceHours)
    ? `dentro del plazo de **${countWords(Number(t.acceptanceHours) || 0)} horas** corridas contadas desde su firma`
    : `hasta el día **${longDate(r.expirationDate)}** inclusive`;
  const reserve = moneyWords(r.reservationAmount, cur);
  const commission = clean(t.commissionText)
    || (isSale
      ? `Las partes reconocen la intervención profesional de ${AGENCY.name} en la presente operación, pactándose honorarios inmobiliarios equivalentes al **${percentWords(t.commissionPercent)}** del precio total de venta para cada una de las partes, compradora y vendedora, abonándose en la misma moneda de la operación al momento de la firma del boleto de compraventa o, en su defecto, de la escritura.`
      : `Las partes reconocen la intervención profesional de ${AGENCY.name}. ${CLIENT} abonará en concepto de honorarios inmobiliarios el **${percentWords(t.commissionPercent)}** del valor total ${isTemp ? 'de la locación' : 'del contrato de locación'}, ${isTemp ? 'junto con el saldo del precio, al momento del ingreso' : 'al momento de su firma'}. Los honorarios a cargo de ${OWNER} serán los convenidos por separado con LA INMOBILIARIA.`);
  const penalty = `En caso de arrepentimiento, incumplimiento o negativa injustificada por parte de ${OWNER} luego de aceptada la presente, deberá reintegrar a ${CLIENT} el doble de la suma entregada en concepto de reserva, sin perjuicio de los daños y perjuicios que pudieran corresponder. En caso de arrepentimiento, incumplimiento o negativa injustificada por parte de ${CLIENT}, la suma entregada en concepto de reserva quedará en beneficio de ${OWNER}. Asimismo, la parte que ocasionare la frustración, caída o incumplimiento de la operación deberá abonar íntegramente a LA INMOBILIARIA los honorarios profesionales pactados.`;
  const currencyClause = cur === 'USD'
    ? `Las partes acuerdan expresamente que todos los importes correspondientes al precio, reserva, saldo, ${isSale ? '' : 'depósito en garantía, '}honorarios y cualquier otra suma derivada de la presente deberán abonarse en dólares estadounidenses billete. Los billetes deberán ser auténticos, de libre circulación, encontrarse en buen estado de conservación y no presentar roturas, manchas, inscripciones, sellos ni deterioros que afecten su valor o aceptación. Los billetes de CIEN DÓLARES ESTADOUNIDENSES (USD 100) deberán corresponder a la serie denominada “cara grande” o de diseño moderno, salvo conformidad expresa y por escrito de la parte receptora.`
    : '';
  const notes = clean(r.conditionsNotes) && !DEFAULT_NOTES.test(clean(r.conditionsNotes)) ? clean(r.conditionsNotes) : '';
  const object = `inmueble ubicado en **${val(address)}**${clean(p?.refCode || r.propertyRef) ? ` (referencia interna ${clean(p?.refCode || r.propertyRef)})` : ''}`
    + `${clean(t.cadastre) ? `, ${clean(t.cadastre)}` : ''}${surface ? `, con una superficie aproximada de ${fmtNumber(surface)} m²` : ''}`;

  let clauses;
  if (isSale) {
    clauses = [
      ['OBJETO', `${CLIENT} formula formal e irrevocable ofrecimiento de compra respecto del ${object}, conforme antecedentes de título y documentación exhibida.`],
      ['PRECIO', `El precio total y convenido de la presente operación se fija en la suma de ${moneyWords(t.offeredPrice, cur)}, pagaderos en la misma moneda pactada.`],
      ['RESERVA', `En este acto ${CLIENT} entrega la suma de ${reserve} en concepto de reserva y principio de pago, que LA INMOBILIARIA recibe en depósito hasta la aceptación de ${OWNER}, sirviendo la presente de suficiente recibo y carta de pago en legal forma. Aceptada la oferta, dicha suma se imputará como seña y a cuenta del precio (arts. 1059 y 1060 del Código Civil y Comercial de la Nación).`],
      ['CONDICIÓN AD REFERÉNDUM', `La presente operación se celebra AD REFERÉNDUM de la aceptación expresa de ${OWNER}; de la verificación y conformidad de los informes de dominio e inhibición correspondientes al inmueble y a todas las personas intervinientes; y de la revisión y aprobación de los títulos antecedentes y demás documentación necesaria para escriturar. Si la oferta no fuera aceptada, o los informes resultaran observados, LA INMOBILIARIA reintegrará a ${CLIENT} la suma recibida sin intereses ni penalidad alguna.`],
      t.inSuccession && ['SUCESIÓN Y DOCUMENTACIÓN', `${OWNER} declara encontrarse gestionando y/o completando las actuaciones sucesorias necesarias para perfeccionar la transmisión dominial del inmueble, obligándose a culminar toda documentación faltante, tracto abreviado, inscripción, declaratoria, cesiones, conformidades y/o cualquier requisito exigido por la escribanía interviniente para otorgar escritura traslativa de dominio libre de observaciones.`],
      ['ESTADO DEL INMUEBLE', `${OWNER} se obliga a transmitir el inmueble libre de ocupantes, locatarios, intrusos, deudas, expensas, impuestos, tasas, contribuciones, servicios, gravámenes, hipotecas, embargos, inhibiciones y cualquier otra carga o restricción que pudiera afectar el dominio, la posesión o la libre disponibilidad del bien.${t.furnished ? ` El inmueble será entregado amoblado y equipado en el estado en que actualmente se encuentra, excepto los muebles, objetos personales y efectos de carácter privado o familiar que ${OWNER} decida retirar antes de la posesión.` : ''}`],
      clean(t.boletoPercent) && ['BOLETO DE COMPRAVENTA', `Las partes podrán, de común acuerdo, celebrar un Boleto de Compraventa antes de la escritura traslativa de dominio, pudiendo pactarse en dicha instancia el pago del **${percentWords(t.boletoPercent)}** del precio total, quedando el saldo restante para ser abonado contra la firma de la escritura definitiva.`],
      ['HONORARIOS INMOBILIARIOS', commission],
      ['PENALIDAD', penalty],
      ['GASTOS DE ESCRITURACIÓN', 'Los gastos de escrituración, certificados, sellados, impuestos y honorarios notariales serán soportados por las partes conforme las prácticas y costumbres notariales vigentes en la Provincia de Buenos Aires.'],
      currencyClause && ['MONEDA DE PAGO', currencyClause],
      ['ESCRITURACIÓN', `La escritura traslativa de dominio será otorgada ante la escribanía que designe ${CLIENT} dentro del plazo de **${countWords(Number(t.deedDays) || 0)} días** contados desde la aceptación de la presente y desde que la documentación se encuentre en condiciones legales de escriturar, momento en el cual se hará entrega de la posesión.`]
    ];
  } else if (isTemp) {
    const nights = nightsBetween(t.startDate, t.endDate);
    const balance = hasAmount(t.offeredPrice) && hasAmount(r.reservationAmount) ? Number(t.offeredPrice) - Number(r.reservationAmount) : '';
    clauses = [
      ['OBJETO', `${CLIENT} formula ofrecimiento de locación temporaria del ${object}, ${p?.propertyType ? `${clean(p.propertyType).toLowerCase()} ` : ''}${t.furnished ? 'amoblado y equipado, ' : ''}con destino exclusivo de **${val(t.use)}**, en los términos del art. 1199 inc. b) del Código Civil y Comercial de la Nación. La cantidad máxima de ocupantes será de **${clean(t.guests) ? countWords(Number(t.guests) || 0) : '____'} personas**.`],
      ['PERÍODO', `La locación se extenderá desde el día **${longDate(t.startDate)}**, con ingreso a partir de las ${val(t.checkIn, '__')} horas, hasta el día **${longDate(t.endDate)}**, con egreso antes de las ${val(t.checkOut, '__')} horas${nights > 0 ? `, totalizando ${countWords(nights)} noches` : ''}. La permanencia posterior a la fecha y hora de egreso devengará, por cada día de demora, un importe equivalente al doble del valor diario de la locación.`],
      ['PRECIO', `El precio total y convenido por todo el período se fija en la suma de ${moneyWords(t.offeredPrice, cur)}.`],
      ['RESERVA Y SALDO', `En este acto ${CLIENT} entrega la suma de ${reserve} en concepto de reserva y a cuenta del precio, sirviendo la presente de suficiente recibo. El saldo${balance !== '' ? ` de ${moneyWords(balance, cur)}` : ''} se abonará al momento del ingreso, contra entrega de las llaves.`],
      ['DEPÓSITO EN GARANTÍA', `Al momento del ingreso ${CLIENT} entregará en concepto de depósito en garantía la suma de ${hasAmount(t.deposit) && clean(t.deposit) ? moneyWords(t.deposit, cur) : moneyWords('', cur)}, que le será devuelta al egreso, previa verificación del estado del inmueble y de su inventario, deducidos los daños, faltantes o consumos extraordinarios que correspondan.`],
      ['CONDICIÓN AD REFERÉNDUM', `La presente se celebra AD REFERÉNDUM de la aceptación de ${OWNER}. Si la oferta no fuera aceptada, LA INMOBILIARIA reintegrará a ${CLIENT} la suma recibida sin intereses ni penalidad alguna.`],
      ['USO Y CONVIVENCIA', `${CLIENT} se obliga a utilizar el inmueble exclusivamente para el destino pactado, a no exceder la cantidad de ocupantes indicada, a no subarrendarlo ni cederlo total o parcialmente, a no ingresar mascotas sin autorización previa y a respetar el reglamento de copropiedad y las normas de convivencia, evitando ruidos molestos y reuniones o eventos. ${CLIENT} será responsable por los daños que causen las personas a su cargo.`],
      ['SERVICIOS', `El precio incluye los servicios de luz, gas y agua${(p?.amenities || []).some(a => /wi-?fi|internet/i.test(a)) ? ', e internet' : ''}, para un uso razonable. Los impuestos, tasas y expensas del inmueble son a cargo de ${OWNER}.`],
      ['ESTADO Y RESTITUCIÓN', `${CLIENT} recibirá el inmueble en buen estado de uso, limpieza y conservación, junto con el inventario que firmarán las partes al ingreso, y se obliga a restituirlo en idénticas condiciones, salvo el desgaste propio del uso normal, entregando la totalidad de las llaves.`],
      ['HONORARIOS INMOBILIARIOS', commission],
      ['DESISTIMIENTO', penalty],
      currencyClause && ['MONEDA DE PAGO', currencyClause]
    ];
  } else {
    clauses = [
      ['OBJETO', `${CLIENT} formula formal ofrecimiento de locación del ${object}, con destino exclusivo de **${val(t.use)}**, no pudiendo darle otro uso ni cederlo o subarrendarlo, total o parcialmente.`],
      ['PLAZO', `La locación tendrá vigencia desde el día **${longDate(t.startDate)}** hasta el día **${longDate(t.endDate)}**, o el plazo que se fije en el contrato de locación conforme el Código Civil y Comercial de la Nación (arts. 1187 y siguientes).`],
      ['PRECIO Y ACTUALIZACIÓN', `El canon locativo mensual inicial se fija en la suma de ${moneyWords(t.offeredPrice, cur)}, pagadero por mes adelantado del uno (1) al diez (10) de cada mes. El canon se actualizará ${val(t.adjustment)}.`],
      ['RESERVA', `En este acto ${CLIENT} entrega la suma de ${reserve} en concepto de reserva, sirviendo la presente de suficiente recibo. Aceptada la oferta, dicha suma se imputará a cuenta de los importes a abonar al momento de la firma del contrato de locación.`],
      ['CONDICIÓN AD REFERÉNDUM', `La presente se celebra AD REFERÉNDUM de la aceptación de ${OWNER} y de la aprobación de la garantía y de los informes comerciales y de ingresos de ${CLIENT} y de sus garantes. Si la oferta no fuera aceptada, o la garantía no resultara aprobada, LA INMOBILIARIA reintegrará a ${CLIENT} la suma recibida sin intereses ni penalidad alguna.`],
      ['GARANTÍA', `En garantía del fiel cumplimiento del contrato, ${CLIENT} ofrece ${val(t.guarantee)}.`],
      ['DEPÓSITO EN GARANTÍA', `Al firmar el contrato de locación ${CLIENT} entregará en concepto de depósito en garantía ${hasAmount(t.deposit) && clean(t.deposit) ? `la suma de ${moneyWords(t.deposit, cur)}` : 'el equivalente a UN (1) mes del canon locativo inicial'}, que le será devuelto al finalizar la locación, previa verificación del estado del inmueble y de la cancelación de servicios y expensas.`],
      ['EXPENSAS, SERVICIOS E IMPUESTOS', `Serán a cargo de ${CLIENT} los servicios de luz, gas, agua, internet y demás que contrate, y las expensas ordinarias. Serán a cargo de ${OWNER} las expensas extraordinarias y los impuestos y tasas que gravan el inmueble, salvo que el contrato de locación disponga otra cosa.`],
      ['FIRMA DEL CONTRATO Y ENTREGA', `Las partes se obligan a suscribir el contrato de locación dentro de los **${countWords(Number(t.signDays) || 0)} días** corridos desde la aceptación de la presente. En dicho acto se abonarán el primer mes del canon, el depósito en garantía y los honorarios, y se hará entrega de las llaves y la tenencia del inmueble, con el inventario y el estado que las partes dejen asentados.`],
      ['HONORARIOS INMOBILIARIOS', commission],
      ['DESISTIMIENTO', penalty],
      currencyClause && ['MONEDA DE PAGO', currencyClause]
    ];
  }

  clauses.push(
    ['ACEPTACIÓN', `${OWNER} podrá aceptar la presente oferta ${acceptance}, quedando perfeccionada la operación a partir de dicha aceptación, que se acreditará con su firma al pie.`],
    notes && ['CONDICIONES PARTICULARES', notes],
    clean(t.extraClauses) && ['OTRAS CLÁUSULAS', clean(t.extraClauses)],
    ['DOMICILIOS Y JURISDICCIÓN', `Las partes constituyen domicilio en los indicados en el encabezamiento, donde serán válidas todas las notificaciones, y para cualquier divergencia derivada de la presente se someten a la jurisdicción de los Tribunales Ordinarios del ${val(t.jurisdiction)}, con renuncia expresa a cualquier otro fuero o jurisdicción.`]
  );

  const signatures = [
    { title: CLIENT, lines: [upper(r.clientName), `DNI ${val(r.clientDni, SHORT_BLANK)}`] },
    ...(owners.length
      ? owners.map(o => ({ title: `${OWNER} (acepta)`, lines: [upper(o.name), `DNI ${val(o.dni, SHORT_BLANK)}`] }))
      : [{ title: `${OWNER} (acepta)`, lines: ['Aclaración:', 'DNI:'] }]),
    { title: 'LA INMOBILIARIA', lines: [AGENCY.name, clean(t.brokerName)].filter(Boolean) }
  ];

  return {
    kind,
    title: TITLES[kind],
    subtitle: [clean(r.propertyRef), clean(p?.title || r.propertyTitle)].filter(Boolean).join(' · '),
    receipt: clean(r.receiptNumber),
    place: `${val(t.city)}, ${longDate(r.reservationDate)}`,
    intro,
    clauses: clauses.filter(Boolean).map(([heading, body], i) => ({ heading: `${ordinal(i)} — ${heading}`, body })),
    closing: `Leída y ratificada la presente, se firman ${countWords(signatures.length)} ejemplares de un mismo tenor y a un solo efecto, en el lugar y fecha indicados.`,
    acceptanceNote: `Fecha y hora de aceptación de ${OWNER}: ____ / ____ / ________ , ____ : ____ hs.`,
    signatures,
    fileName: `Reserva_${clean(r.propertyRef) || 'propiedad'}_${clean(r.clientName) || 'cliente'}`.replace(/[^\w\-áéíóúñÁÉÍÓÚÑ]+/g, '_') + '.pdf'
  };
};

// "texto **negrita**" -> [{ text, bold }]
export const toRuns = (s) => String(s).split('**').map((text, i) => ({ text, bold: i % 2 === 1 })).filter(r => r.text);

// Para el PDF: los cortes entre negrita y texto normal tienen que caer en un espacio;
// si no, el justificado separa "ISIDRO ," o "“ LA PARTE ”".
export const toPdfRuns = (s) => {
  const runs = toRuns(s).map(r => ({ ...r }));
  for (let i = 1; i < runs.length; i++) {
    const prev = runs[i - 1]; const cur = runs[i];
    const head = cur.text.match(/^[^\s]+/)?.[0];
    if (head && !/\s$/.test(prev.text)) { prev.text += head; cur.text = cur.text.slice(head.length); }
  }
  return runs.filter(r => r.text);
};
