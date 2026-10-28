// Imagen neutra para propiedades que todavía no tienen fotos cargadas
export const NO_PHOTO = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">' +
  '<rect width="800" height="600" fill="#e2e8f0"/>' +
  '<path d="M330 330 L400 270 L470 330 V390 H330 Z" fill="none" stroke="#94a3b8" stroke-width="12" stroke-linejoin="round"/>' +
  '<text x="400" y="450" font-family="sans-serif" font-size="30" font-weight="600" fill="#64748b" text-anchor="middle">Sin fotos cargadas</text>' +
  '</svg>'
)}`;

export const photoOf = (property, index = 0) => property?.images?.[index] || property?.images?.[0] || NO_PHOTO;

// Avatar con iniciales para agentes sin foto
export const initialsAvatar = (name = '') => {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('');
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
    '<rect width="128" height="128" fill="#e0e7ff"/>' +
    `<text x="64" y="80" font-family="sans-serif" font-size="48" font-weight="700" fill="#4338ca" text-anchor="middle">${initials}</text>` +
    '</svg>'
  )}`;
};
