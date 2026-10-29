import React from 'react';

// Isotipo de Benitez Inmobiliaria: "B" serif blanca sobre cuadrado rosa
export const BrandMark = ({ size = 40 }) => (
  <div
    className="bg-brand-500 text-white flex flex-col items-center justify-center shrink-0 shadow-md shadow-brand-200"
    style={{ width: size, height: size }}
  >
    <span className="font-serif font-bold leading-none" style={{ fontSize: size * 0.62 }}>B</span>
    {size >= 56 && (
      <span className="font-serif uppercase tracking-[0.18em] leading-none mt-0.5" style={{ fontSize: size * 0.11 }}>
        Benitez
      </span>
    )}
  </div>
);

export const BrandLogo = ({ subtitle }) => (
  <div className="flex items-center gap-3">
    <BrandMark size={40} />
    <div className="leading-tight hidden sm:block">
      <p className="font-serif text-lg text-slate-800 tracking-wide">
        Benitez <span className="text-brand-500">Inmobiliaria</span>
      </p>
      {subtitle && <p className="text-[11px] text-slate-500 font-medium uppercase tracking-[0.14em] hidden sm:block">{subtitle}</p>}
    </div>
  </div>
);
