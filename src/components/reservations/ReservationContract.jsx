import React, { useMemo, useRef, useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { X, Printer, FileText, AlertTriangle, Download, Plus, Trash2, Loader2 } from 'lucide-react';
import { AGENCY, buildContract, contractKind, defaultTerms, toRuns } from '../../utils/contractTemplate';
import { downloadContractPdf } from '../../utils/contractPdf';

const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rich = (s) => toRuns(s).map(r => (r.bold ? `<strong>${escapeHtml(r.text)}</strong>` : escapeHtml(r.text))).join('').replace(/\n/g, '<br>');

// Vista previa: el mismo modelo que se exporta a PDF
const contractHtml = (c) => `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>${escapeHtml(c.fileName.replace(/\.pdf$/, ''))}</title>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 16mm 18mm 18mm; }
  * { box-sizing: border-box; }
  body { font-family: Montserrat, Arial, sans-serif; color: #2b2b2b; font-size: 10pt; line-height: 1.55; margin: 0 auto; padding: 28px; background: #fff; max-width: 820px; }
  .head { display: flex; align-items: center; gap: 12px; border-bottom: 2px solid #F5738A; padding-bottom: 12px; margin-bottom: 20px; }
  .mark { width: 50px; height: 50px; flex: none; background: #F5738A; color: #fff; display: flex; align-items: center; justify-content: center; font: 700 32px 'Bodoni Moda', Didot, serif; }
  .name { flex: 1; font-family: 'Bodoni Moda', Didot, serif; font-size: 19px; font-weight: 700; }
  .name span { color: #F5738A; }
  .name small { display: block; font-family: Montserrat, Arial, sans-serif; font-size: 8pt; font-weight: 400; color: #777; }
  .meta { text-align: right; font-size: 8.5pt; color: #777; }
  .meta strong { color: #2b2b2b; }
  h1 { font-family: 'Bodoni Moda', Didot, serif; font-weight: 700; text-align: center; font-size: 15pt; margin: 4px 0 2px; text-transform: uppercase; letter-spacing: .03em; }
  .sub { text-align: center; color: #F5738A; font-size: 8.5pt; margin-bottom: 18px; }
  p { margin: 0 0 9px; text-align: justify; }
  .sign { display: grid; grid-template-columns: 1fr 1fr; column-gap: 48px; margin-top: 10px; }
  .sign div { break-inside: avoid; border-top: 1px solid #2b2b2b; margin-top: 56px; padding-top: 5px; font-size: 8.5pt; color: #777; }
  .sign b { color: #2b2b2b; display: block; }
  .accept { margin-top: 4px; font-size: 8.5pt; color: #777; }
</style></head><body>
  <div class="head">
    <div class="mark">B</div>
    <div class="name">BENÍTEZ <span>INMOBILIARIA</span><small>${escapeHtml(AGENCY.address)}</small></div>
    <div class="meta">${c.receipt ? `Recibo N.º <strong>${escapeHtml(c.receipt)}</strong><br>` : ''}${escapeHtml(c.place)}</div>
  </div>
  <h1>${escapeHtml(c.title)}</h1>
  <div class="sub">${escapeHtml(c.subtitle)}</div>
  <p>${rich(c.intro)}</p>
  ${c.clauses.map(cl => `<p><strong>${escapeHtml(cl.heading)}:</strong> ${rich(cl.body)}</p>`).join('')}
  <p style="margin-top:12px">${escapeHtml(c.closing)}</p>
  <div class="accept">${escapeHtml(c.acceptanceNote)}</div>
  <div class="sign">${c.signatures.map(s => `<div><b>${escapeHtml(s.title)}</b>${s.lines.map(escapeHtml).join('<br>')}</div>`).join('')}</div>
</body></html>`;

// Contrato de reserva: se completa con los datos de la reserva y la propiedad,
// se ajustan los datos que faltan y se descarga en PDF o se imprime.
const KIND_LABEL = { sale: 'Compra', rental: 'Alquiler', temporary: 'Alquiler temporal' };

export const ReservationContract = ({ reservation, onClose }) => {
  const { properties, agents, updateReservation, notify } = useRealEstate();
  const property = properties.find(p => p.id === reservation.propertyId);
  const agent = agents.find(a => a.id === reservation.agentId);
  const kind = contractKind(property);
  const iframeRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const [terms, setTerms] = useState(() => defaultTerms({ reservation, property, agent }));

  const contract = useMemo(() => buildContract({ reservation, property, terms }), [reservation, property, terms]);
  const html = useMemo(() => contractHtml(contract), [contract]);
  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTerms(prev => ({ ...prev, [k]: value }));
  };
  const setOwner = (i, k) => (e) => setTerms(prev => ({
    ...prev, owners: prev.owners.map((o, j) => (j === i ? { ...o, [k]: e.target.value } : o))
  }));
  const addOwner = () => setTerms(prev => ({ ...prev, owners: [...(prev.owners || []), { name: '', dni: '', address: '', email: '' }] }));
  const removeOwner = (i) => setTerms(prev => ({ ...prev, owners: prev.owners.filter((_, j) => j !== i) }));

  // Guarda lo completado para la próxima vez
  const saveTerms = () => updateReservation(reservation.id, { contractTerms: terms });

  const handleDownload = async () => {
    saveTerms();
    setDownloading(true);
    try {
      await downloadContractPdf(contract);
    } catch (err) {
      console.error(err);
      notify('No se pudo generar el PDF. Probá con Imprimir.', 'error');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    saveTerms();
    iframeRef.current?.contentWindow?.focus();
    iframeRef.current?.contentWindow?.print();
  };

  const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-medium';
  const label = (text, key, props = {}) => (
    <div className={props.wide ? 'col-span-2' : ''}>
      <label className="block text-slate-700 font-semibold mb-1">{text}</label>
      {props.textarea
        ? <textarea rows={3} value={terms[key] ?? ''} onChange={set(key)} placeholder={props.placeholder} className={inputCls} />
        : <input type={props.type || 'text'} value={terms[key] ?? ''} onChange={set(key)} placeholder={props.placeholder} className={inputCls} />}
    </div>
  );
  const check = (text, key) => (
    <label className="col-span-2 flex items-center gap-2 text-slate-700 font-semibold">
      <input type="checkbox" checked={!!terms[key]} onChange={set(key)} className="w-4 h-4 accent-brand-600" />
      {text}
    </label>
  );
  const section = (text) => <p className="col-span-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-brand-600">{text}</p>;
  const ownerLabel = kind === 'sale' ? 'Vendedor/a' : 'Locador/a';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[94vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-2 rounded-xl bg-brand-50 text-brand-600"><FileText className="w-5 h-5" /></span>
            <div className="min-w-0">
              <h2 className="text-lg text-slate-900 truncate">Contrato de reserva · {KIND_LABEL[kind]}</h2>
              <p className="text-[11px] text-slate-500 truncate">{reservation.propertyRef} · {reservation.clientName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-brand-200"
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span><span className="hidden sm:inline">Descargar </span>PDF</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700" title="Cerrar">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
          <div className="lg:w-96 shrink-0 p-4 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-y-auto text-xs space-y-3 max-h-[45vh] lg:max-h-none">
            <div className="flex gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Es un modelo base. Revisalo con tu abogado o escribano antes de usarlo como definitivo.</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {section('Operación')}
              {label('Lugar de firma', 'city')}
              {label(kind === 'sale' ? 'Precio ofrecido' : kind === 'temporary' ? 'Precio total del período' : 'Alquiler mensual', 'offeredPrice', { type: 'number' })}
              {label('Domicilio del cliente', 'clientAddress', { wide: true, placeholder: 'Calle, número, localidad' })}

              {kind === 'sale' && <>
                {label('Datos catastrales', 'cadastre', { wide: true, placeholder: 'Ej. nomenclatura catastral Circ. IV, Secc. V, Mz. 48, Parc. 12, Partida N.º 36.455' })}
                {label('% a pagar en boleto', 'boletoPercent', { type: 'number', placeholder: 'Vacío = sin cláusula' })}
                {label('Días para escriturar', 'deedDays', { type: 'number' })}
                {check('Se entrega amoblado', 'furnished')}
                {check('Inmueble en sucesión', 'inSuccession')}
              </>}

              {kind !== 'sale' && <>
                {label('Desde', 'startDate', { type: 'date' })}
                {label('Hasta', 'endDate', { type: 'date' })}
                {label('Destino', 'use', { wide: true })}
                {label('Depósito en garantía', 'deposit', { type: 'number', placeholder: kind === 'rental' ? 'Vacío = 1 mes' : '' })}
                {kind === 'temporary'
                  ? label('Máx. ocupantes', 'guests', { type: 'number' })
                  : label('Días para firmar', 'signDays', { type: 'number' })}
              </>}
              {kind === 'temporary' && <>
                {label('Ingreso (hora)', 'checkIn')}
                {label('Egreso (hora)', 'checkOut')}
                {check('Amoblado y equipado', 'furnished')}
              </>}
              {kind === 'rental' && <>
                {label('Garantía', 'guarantee', { wide: true, textarea: true })}
                {label('Actualización del alquiler', 'adjustment', { wide: true, textarea: true })}
              </>}

              {section(kind === 'sale' ? 'Parte vendedora' : 'Parte locadora')}
              {(terms.owners || []).map((o, i) => (
                <div key={i} className="col-span-2 grid grid-cols-2 gap-2 p-2 rounded-xl border border-slate-200">
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">{ownerLabel} {i + 1}</span>
                    <button type="button" onClick={() => removeOwner(i)} className="p-1 text-slate-400 hover:text-red-600" title="Quitar">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input value={o.name} onChange={setOwner(i, 'name')} placeholder="Nombre y apellido" className={`${inputCls} col-span-2`} />
                  <input value={o.dni} onChange={setOwner(i, 'dni')} placeholder="DNI" className={inputCls} />
                  <input value={o.email} onChange={setOwner(i, 'email')} placeholder="Correo (opcional)" className={inputCls} />
                  <input value={o.address} onChange={setOwner(i, 'address')} placeholder="Domicilio" className={`${inputCls} col-span-2`} />
                </div>
              ))}
              <button type="button" onClick={addOwner} className="col-span-2 inline-flex items-center justify-center gap-1 p-2 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:border-brand-400 hover:text-brand-600 font-semibold">
                <Plus className="w-3.5 h-3.5" /> Agregar {ownerLabel.toLowerCase()}
              </button>

              {section('Inmobiliaria y condiciones')}
              {label('Firma por la inmobiliaria', 'brokerName')}
              {label('Matrícula corredor', 'brokerLicense', { placeholder: 'Ej. Mat. CMCPDJD N.º …' })}
              {label('Honorarios (%)', 'commissionPercent', { type: 'number' })}
              {label('Horas para aceptar', 'acceptanceHours', { type: 'number', placeholder: 'Vacío = vencimiento' })}
              {label('Texto de honorarios', 'commissionText', { wide: true, textarea: true, placeholder: 'Vacío = texto según el %' })}
              {label('Jurisdicción', 'jurisdiction', { wide: true })}
              {label('Otras cláusulas', 'extraClauses', { wide: true, textarea: true })}
            </div>
            <p className="text-[11px] text-slate-400">Los datos que faltan quedan como línea para completar a mano. {AGENCY.name}.</p>
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
