// Descarga el contrato como PDF con texto real (se puede buscar y copiar).
// pdfmake se carga recién al pedir la descarga para no agrandar la app.
import { AGENCY, toPdfRuns as toRuns } from './contractTemplate.js';

const PINK = '#F5738A';
const INK = '#2b2b2b';
const MUTED = '#777777';

const loadPdfMake = async () => {
  const [{ default: pdfMake }, fonts] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts')
  ]);
  const vfs = fonts.default?.pdfMake?.vfs || fonts.pdfMake?.vfs || fonts.default || fonts.vfs;
  pdfMake.vfs = vfs;
  return pdfMake;
};

const signatureBlock = (s) => ({
  unbreakable: true,
  stack: [
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 0.8, lineColor: INK }], margin: [0, 46, 0, 4] },
    { text: s.title, bold: true, fontSize: 8.5 },
    ...s.lines.map(l => ({ text: l, fontSize: 8.5, color: MUTED }))
  ]
});

export const buildPdfDefinition = (c) => {
  const signRows = [];
  for (let i = 0; i < c.signatures.length; i += 2) {
    signRows.push({ columns: [signatureBlock(c.signatures[i]), c.signatures[i + 1] ? signatureBlock(c.signatures[i + 1]) : { text: '' }], columnGap: 40 });
  }

  return {
    pageSize: 'A4',
    pageMargins: [56, 50, 56, 56],
    info: { title: `${c.title} · ${c.subtitle}`, author: 'Benítez Inmobiliaria' },
    defaultStyle: { font: 'Roboto', fontSize: 9.8, lineHeight: 1.3, color: INK },
    footer: (page, pages) => ({
      columns: [
        { text: `${AGENCY.name} · ${AGENCY.address}`, fontSize: 7, color: MUTED },
        { text: `Página ${page} de ${pages}`, width: 'auto', fontSize: 7, color: MUTED }
      ],
      margin: [56, 20, 56, 0]
    }),
    content: [
      {
        columns: [
          {
            width: 42,
            table: { widths: [42], heights: [42], body: [[{ text: 'B', color: '#ffffff', bold: true, fontSize: 26, alignment: 'center', margin: [0, 5, 0, 0] }]] },
            layout: { fillColor: PINK, hLineWidth: () => 0, vLineWidth: () => 0, paddingLeft: () => 0, paddingRight: () => 0, paddingTop: () => 0, paddingBottom: () => 0 }
          },
          {
            width: '*',
            margin: [10, 4, 0, 0],
            stack: [
              { text: [{ text: 'BENÍTEZ ', bold: true }, { text: 'INMOBILIARIA', color: PINK, bold: true }], fontSize: 14 },
              { text: AGENCY.address, fontSize: 7.5, color: MUTED }
            ]
          },
          {
            width: 'auto',
            alignment: 'right',
            fontSize: 8,
            color: MUTED,
            margin: [0, 6, 0, 0],
            stack: [
              c.receipt ? { text: [{ text: 'Recibo N.º ' }, { text: c.receipt, bold: true, color: INK }] } : '',
              { text: c.place }
            ]
          }
        ]
      },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 483, y2: 0, lineWidth: 1.5, lineColor: PINK }], margin: [0, 10, 0, 16] },
      { text: c.title.toUpperCase(), alignment: 'center', bold: true, fontSize: 13, characterSpacing: 0.4 },
      { text: c.subtitle, alignment: 'center', fontSize: 8, color: PINK, margin: [0, 3, 0, 16] },
      { text: toRuns(c.intro), alignment: 'justify', margin: [0, 0, 0, 10] },
      ...c.clauses.map(cl => ({
        text: [{ text: `${cl.heading}: `, bold: true }, ...toRuns(cl.body)],
        alignment: 'justify',
        margin: [0, 0, 0, 8]
      })),
      { text: c.closing, alignment: 'justify', margin: [0, 6, 0, 0] },
      { text: c.acceptanceNote, fontSize: 8.5, color: MUTED, margin: [0, 8, 0, 0] },
      ...signRows
    ]
  };
};

export const downloadContractPdf = async (contract) => {
  const pdfMake = await loadPdfMake();
  pdfMake.createPdf(buildPdfDefinition(contract)).download(contract.fileName);
};
