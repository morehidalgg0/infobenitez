// Calcula honorarios de una venta y la parte exacta que corresponde a la inmobiliaria.
// Lo usan la app y el servidor, para que ambos den el mismo resultado.
export const calcSaleSplit = (salePrice, commissionPercent, agencySplitPercent) => {
  const round2 = (n) => Math.round(n * 100) / 100;
  const commissionTotal = round2((Number(salePrice) || 0) * (Number(commissionPercent) || 0) / 100);
  const agencyShare = round2(commissionTotal * (Number(agencySplitPercent) || 0) / 100);
  return { commissionTotal, agencyShare, brokerShare: round2(commissionTotal - agencyShare) };
};
