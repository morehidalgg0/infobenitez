export const INCOME_CATEGORIES = [
  'Honorarios venta',
  'Honorarios alquiler',
  'Administración alquileres',
  'Tasaciones',
  'Otro ingreso'
];

export const EXPENSE_CATEGORIES = [
  'Publicidad',
  'Movilidad / combustible',
  'Alquiler oficina',
  'Sueldos',
  'Servicios',
  'Impuestos',
  'Comisión a terceros',
  'Otro egreso'
];

export const formatMoney = (amount, currency = 'USD') =>
  `${currency} ${(Number(amount) || 0).toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;

// Suma por moneda: { USD: n, ARS: n }
export const sumByCurrency = (items, getValue) =>
  items.reduce((acc, item) => {
    const value = Number(getValue(item)) || 0;
    if (!value) return acc;
    acc[item.currency] = (acc[item.currency] || 0) + value;
    return acc;
  }, {});

// Lo que efectivamente le queda al titular del movimiento:
// en una venta de broker, sus honorarios menos la parte de la inmobiliaria
export const netAmount = (m) => {
  if (m.type === 'egreso') return -(Number(m.amount) || 0);
  if (m.kind === 'venta') return Number(m.brokerShare) || 0;
  return Number(m.amount) || 0;
};

export const mergeTotals = (...totals) =>
  totals.reduce((acc, t) => {
    Object.entries(t).forEach(([cur, v]) => { acc[cur] = (acc[cur] || 0) + v; });
    return acc;
  }, {});
