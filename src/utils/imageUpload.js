// Achica la foto en el navegador (máx. 1600 px, JPEG) y la sube a /api/images.
const MAX_SIDE = 1600;

const loadImage = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
  img.onerror = () => { URL.revokeObjectURL(url); reject(new Error(`No se pudo leer "${file.name}"`)); };
  img.src = url;
});

const compress = async (file) => {
  const img = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
  return dataUrl.slice(dataUrl.indexOf(',') + 1);
};

export const uploadPhoto = async (file) => {
  const data = await compress(file);
  const res = await fetch('/api/images', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mime: 'image/jpeg', data })
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `No se pudo subir "${file.name}"`);
  return body.url;
};
