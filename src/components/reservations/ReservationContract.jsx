import React, { useMemo, useRef, useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { X, Printer, FileText, AlertTriangle } from 'lucide-react';
import { currencyInWords } from '../../utils/numberToWords';

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const longDate = (iso) => {
  if (!iso) return '____ de __________ de ______';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};

const money = (amount, currency) =>
  `${currency === 'USD' ? 'USD' : '$'} ${(Number(amount) || 0).toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;

const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Texto en blanco para completar a mano si falta el dato
const field = (value, blank = '______________________') => (value ? escapeHtml(value) : blank);

const buildContractHtml = ({ reservation: r, property: p, terms: t }) => {
  const isSale = (p?.operationType || 'Venta') === 'Venta';
  const address = p ? `${p.location?.address || ''}, ${p.location?.neighborhood || ''}${p.location?.city ? `, ${p.location.city}` : ''}` : '';
  const operation = isSale ? 'compra' : 'locación';
  const priceLabel = isSale ? 'precio de venta' : 'canon locativo mensual';
  const clauses = [
    `<strong>OBJETO.</strong> EL/LA OFERENTE formula oferta de ${operation} del inmueble ubicado en <strong>${field(address)}</strong> (referencia ${field(r.propertyRef)}), por un ${priceLabel} de <strong>${money(t.offeredPrice, r.currency)}</strong> (${currencyInWords(t.offeredPrice, r.currency)}), en las condiciones que se detallan en el presente.`,
    `<strong>RESERVA.</strong> En este acto EL/LA OFERENTE entrega a LA INMOBILIARIA la suma de <strong>${money(r.reservationAmount, r.currency)}</strong> (${currencyInWords(r.reservationAmount, r.currency)}) en concepto de reserva, que LA INMOBILIARIA recibe en depósito <em>ad referéndum</em> de la aceptación de la oferta por parte del propietario${t.ownerName ? `, ${escapeHtml(t.ownerName)}` : ''}. El presente sirve de suficiente recibo.`,
    `<strong>PLAZO.</strong> La oferta se mantiene vigente hasta el <strong>${longDate(r.expirationDate)}</strong>. Si dentro de ese plazo el propietario no la aceptara, LA INMOBILIARIA devolverá a EL/LA OFERENTE la suma recibida, sin intereses ni penalidad alguna.`,
    isSale
      ? `<strong>ACEPTACIÓN.</strong> Aceptada la oferta por el propietario, la suma entregada se convertirá en seña y a cuenta del precio, rigiendo lo dispuesto por los arts. 1059 y 1060 del Código Civil y Comercial de la Nación. Las partes se obligan a suscribir el boleto de compraventa y/o la escritura traslativa de dominio en la fecha y ante el escribano que se acuerden.`
      : `<strong>ACEPTACIÓN.</strong> Aceptada la oferta por el propietario, la suma entregada se imputará a cuenta de los importes que correspondan al momento de la firma del contrato de locación, la que deberá realizarse en la fecha que acuerden las partes.`,
    `<strong>DESISTIMIENTO.</strong> Si, aceptada la oferta, EL/LA OFERENTE desistiera de la operación, perderá la suma entregada. Si quien desistiera fuera el propietario, deberá restituirla duplicada.`,
    `<strong>HONORARIOS.</strong> ${t.commissionText ? escapeHtml(t.commissionText) : 'Los honorarios de LA INMOBILIARIA serán los que correspondan según la normativa vigente y lo acordado entre las partes.'}`,
    r.conditionsNotes ? `<strong>CONDICIONES PARTICULARES.</strong> ${escapeHtml(r.conditionsNotes)}` : '',
    t.extraClauses ? `<strong>OTRAS CLÁUSULAS.</strong> ${escapeHtml(t.extraClauses).replace(/\n/g, '<br>')}` : '',
    `<strong>DOMICILIOS Y JURISDICCIÓN.</strong> Las partes constituyen domicilio en los indicados en el encabezamiento y se someten a la jurisdicción de los tribunales ordinarios correspondientes a la ubicación del inmueble.`
  ].filter(Boolean);

  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Reserva ${escapeHtml(r.receiptNumber || '')} - ${escapeHtml(r.clientName || '')}</title>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 18mm 18mm 20mm; }
  * { box-sizing: border-box; }
  body { font-family: Montserrat, Arial, sans-serif; color: #2b2b2b; font-size: 10.5pt; line-height: 1.55; margin: 0; padding: 24px; background: #fff; }
  .head { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #F5738A; padding-bottom: 12px; margin-bottom: 18px; }
  .brand { display: flex; align-items: center; gap: 12px; }
  .mark { width: 54px; height: 54px; background: #F5738A; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: 'Bodoni Moda', Didot, serif; }
  .mark b { font-size: 34px; line-height: 1; }
  .mark small { font-size: 6px; letter-spacing: .18em; }
  .name { font-family: 'Bodoni Moda', Didot, serif; font-size: 20px; }
  .name span { color: #F5738A; }
  .meta { text-align: right; font-size: 9pt; color: #666; }
  h1 { font-family: 'Bodoni Moda', Didot, serif; font-weight: 500; text-align: center; font-size: 19pt; margin: 6px 0 2px; letter-spacing: .02em; }
  .sub { text-align: center; color: #F5738A; font-size: 9pt; letter-spacing: .2em; text-transform: uppercase; margin-bottom: 18px; }
  p { margin: 0 0 10px; text-align: justify; }
  ol { padding-left: 20px; margin: 0; }
  li { margin-bottom: 9px; text-align: justify; }
  .sign { display: flex; justify-content: space-between; gap: 40px; margin-top: 70px; }
  .sign div { flex: 1; border-top: 1px solid #2b2b2b; padding-top: 6px; font-size: 9pt; text-align: center; }
  .foot { margin-top: 28px; font-size: 8pt; color: #999; text-align: center; }
</style></head><body>
  <div class="head">
    <div class="brand"><div class="mark"><b>B</b><small>BENITEZ</small></div><div class="name">Benitez <span>Inmobiliaria</span></div></div>
    <div class="meta">Recibo N.º <strong>${field(r.receiptNumber, '______')}</strong><br>${field(t.city)}, ${longDate(r.reservationDate)}</div>
  </div>
  <h1>${isSale ? 'Reserva de compra y recibo de seña' : 'Reserva de locación'}</h1>
  <div class="sub">${field(r.propertyRef)} · ${field(p?.title || r.propertyTitle)}</div>
  <p>En ${field(t.city)}, a los ${longDate(r.reservationDate)}, entre <strong>${field(r.clientName)}</strong>, DNI ${field(r.clientDni, '____________')}, con domicilio en ${field(t.clientAddress)}, teléfono ${field(r.clientPhone, '____________')}${r.clientEmail ? `, correo ${escapeHtml(r.clientEmail)}` : ''}, en adelante <strong>EL/LA OFERENTE</strong>; y <strong>BENITEZ INMOBILIARIA</strong>, representada en este acto por ${field(t.brokerName)}${t.brokerLicense ? `, ${escapeHtml(t.brokerLicense)}` : ''}, en adelante <strong>LA INMOBILIARIA</strong>, se conviene lo siguiente:</p>
  <ol>${clauses.map(c => `<li>${c}</li>`).join('')}</ol>
  <p style="margin-top:14px">En prueba de conformidad se firman dos ejemplares de un mismo tenor y a un solo efecto, en el lugar y fecha indicados.</p>
  <div class="sign">
    <div>EL/LA OFERENTE<br>${field(r.clientName)}<br>DNI ${field(r.clientDni, '____________')}</div>
    <div>LA INMOBILIARIA<br>Benitez Inmobiliaria<br>${field(t.brokerName)}</div>
  </div>
  <div class="sign" style="margin-top:50px">
    <div>ACEPTACIÓN DEL PROPIETARIO<br>${field(t.ownerName)}<br>DNI ${field(t.ownerDni, '____________')}</div>
    <div>Fecha de aceptación<br>&nbsp;<br>____ / ____ / ________</div>
  </div>
  <div class="foot">Benitez Inmobiliaria · Documento generado el ${longDate(new Date().toISOString().split('T')[0])}</div>
</body></html>`;
};

// Contrato de reserva: se completa con los datos de la reserva y la propiedad,
// se pueden ajustar los datos que faltan y se imprime o guarda como PDF.
export const ReservationContract = ({ reservation, onClose }) => {
  const { properties, agents, updateReservation } = useRealEstate();
  const property = properties.find(p => p.id === reservation.propertyId);
  const agent = agents.find(a => a.id === reservation.agentId);
  const iframeRef = useRef(null);

  const [terms, setTerms] = useState(() => ({
    city: property?.location?.neighborhood || 'Pinamar',
    clientAddress: '',
    offeredPrice: reservation.propertyPrice || property?.pricing?.price || '',
    ownerName: property?.agentData?.owner?.name || '',
    ownerDni: property?.agentData?.owner?.idNumber || '',
    brokerName: agent?.name || reservation.agentName || '',
    brokerLicense: '',
    commissionText: property?.agentData?.commission?.ratePercent
      ? `EL/LA OFERENTE abonará a LA INMOBILIARIA honorarios del ${property.agentData.commission.ratePercent}% sobre el precio, más IVA si correspondiera, al momento de la firma del ${property.operationType === 'Venta' ? 'boleto o escritura' : 'contrato'}.`
      : '',
    extraClauses: '',
    ...(reservation.contractTerms || {})
  }));

  const html = useMemo(() => buildContractHtml({ reservation, property, terms }), [reservation, property, terms]);
  const set = (k) => (e) => setTerms(prev => ({ ...prev, [k]: e.target.value }));

  const handlePrint = () => {
    // Guarda lo completado para la próxima vez
    updateReservation(reservation.id, { contractTerms: terms });
    iframeRef.current?.contentWindow?.focus();
    iframeRef.current?.contentWindow?.print();
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium';
  const label = (text, key, props = {}) => (
    <div className={props.wide ? 'col-span-2' : ''}>
      <label className="block text-slate-700 font-semibold mb-1">{text}</label>
      {props.textarea
        ? <textarea rows={3} value={terms[key]} onChange={set(key)} placeholder={props.placeholder} className={inputCls} />
        : <input type={props.type || 'text'} value={terms[key]} onChange={set(key)} placeholder={props.placeholder} className={inputCls} />}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-brand-50 text-brand-600"><FileText className="w-5 h-5" /></span>
            <div className="min-w-0">
              <h2 className="text-lg text-slate-900 truncate">Contrato de reserva</h2>
              <p className="text-[11px] text-slate-500 truncate">{reservation.propertyRef} · {reservation.clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-200"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700" title="Cerrar">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
          <div className="lg:w-80 shrink-0 p-4 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto text-xs space-y-3 max-h-[38vh] lg:max-h-none">
            <div className="flex gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Es un modelo base. Revisalo con tu abogado o escribano antes de usarlo como definitivo.</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {label('Lugar de firma', 'city')}
              {label('Precio ofrecido', 'offeredPrice', { type: 'number' })}
              {label('Domicilio del oferente', 'clientAddress', { wide: true, placeholder: 'Calle, número, localidad' })}
              {label('Propietario', 'ownerName')}
              {label('DNI propietario', 'ownerDni')}
              {label('Firma por la inmobiliaria', 'brokerName')}
              {label('Matrícula corredor', 'brokerLicense', { placeholder: 'Ej. Mat. CMCP N.º …' })}
              {label('Honorarios', 'commissionText', { wide: true, textarea: true, placeholder: 'Vacío = texto genérico' })}
              {label('Otras cláusulas', 'extraClauses', { wide: true, textarea: true })}
            </div>
            <p className="text-[11px] text-slate-400">Los datos que faltan quedan como línea para completar a mano.</p>
          </div>

          <div className="flex-1 min-h-0 bg-slate-100 p-2 sm:p-4">
            <iframe
              ref={iframeRef}
              title="Vista previa del contrato"
              srcDoc={html}
              className="w-full h-full bg-white rounded-xl shadow-sm border border-slate-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
