// Montos en letras para contratos: 5250 -> "cinco mil doscientos cincuenta"
const UNITS = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
  'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const TENS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const HUNDREDS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

const belowThousand = (n) => {
  if (n === 100) return 'cien';
  const h = Math.floor(n / 100);
  const rest = n % 100;
  let words = HUNDREDS[h];
  if (rest > 0) {
    const part = rest < 30 ? UNITS[rest] : TENS[Math.floor(rest / 10)] + (rest % 10 ? ` y ${UNITS[rest % 10]}` : '');
    words = words ? `${words} ${part}` : part;
  }
  return words;
};

// "uno" -> "un" delante de mil / millones (veintiún mil, un millón)
const apocope = (words) => words.replace(/veintiuno$/, 'veintiún').replace(/uno$/, 'un');

export const numberToWords = (value) => {
  const n = Math.floor(Math.abs(Number(value) || 0));
  if (n === 0) return 'cero';
  const millions = Math.floor(n / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1000);
  const rest = n % 1000;
  const parts = [];
  if (millions) parts.push(millions === 1 ? 'un millón' : `${apocope(numberToWordsBelowMillion(millions))} millones`);
  if (thousands) parts.push(thousands === 1 ? 'mil' : `${apocope(belowThousand(thousands))} mil`);
  if (rest) parts.push(belowThousand(rest));
  return parts.join(' ');
};

const numberToWordsBelowMillion = (n) => {
  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  return [thousands ? (thousands === 1 ? 'mil' : `${apocope(belowThousand(thousands))} mil`) : '', rest ? belowThousand(rest) : '']
    .filter(Boolean).join(' ');
};

export const currencyInWords = (amount, currency) => {
  const whole = Math.floor(Number(amount) || 0);
  const cents = Math.round(((Number(amount) || 0) - whole) * 100);
  const name = currency === 'USD' ? 'dólares estadounidenses' : 'pesos';
  return `${name} ${numberToWords(whole)}${cents ? ` con ${cents}/100` : ''}`;
};
