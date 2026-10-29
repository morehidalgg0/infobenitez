// Calcula honorarios de una venta y la parte exacta que corresponde a la inmobiliaria.
// Lo usan la app y el servidor, para que ambos den el mismo resultado.
// commissionAmount: honorarios acordados como monto exacto; si viene, reemplaza al porcentaje.
export const calcSaleSplit = (salePrice, commissionPercent, agencySplitPercent, commissionAmount) => {
  const round2 = (n) => Math.round(n * 100) / 100;
  const hasAmount = commissionAmount !== undefined && commissionAmount !== null && commissionAmount !== '';
  const commissionTotal = hasAmount
    ? round2(Number(commissionAmount) || 0)
    : round2((Number(salePrice) || 0) * (Number(commissionPercent) || 0) / 100);
  const agencyShare = round2(commissionTotal * (Number(agencySplitPercent) || 0) / 100);
  return { commissionTotal, agencyShare, brokerShare: round2(commissionTotal - agencyShare) };
};

// Honorarios de un movimiento de venta según cómo se cargaron (% o monto exacto)
export const splitForMovement = (m) =>
  calcSaleSplit(m.salePrice, m.commissionPercent, m.agencySplitPercent, m.commissionMode === 'amount' ? m.commissionAmount : undefined);
