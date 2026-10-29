import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { useNavItems } from './Sidebar';
import { Menu, X, HardDriveDownload, LogOut } from 'lucide-react';

// Secciones fijas en la barra inferior; el resto queda en "Más"
const PRIMARY = ['dashboard', 'properties', 'reservations', 'finance'];
const SHORT_LABELS = { dashboard: 'Inicio', properties: 'Propiedades', reservations: 'Reservas', finance: 'Finanzas' };

export const MobileNav = () => {
  const { currentView, setCurrentView, isAdmin, setIsBackupModalOpen, logout, currentUser, stats } = useRealEstate();
  const navItems = useNavItems();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const go = (id) => {
    setCurrentView(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  const primary = PRIMARY.map(id => navItems.find(i => i.id === id)).filter(Boolean);
  const moreActive = !PRIMARY.includes(currentView);

  return (
    <>
      {/* Barra inferior */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5">
          {primary.map(item => {
            const Icon = item.icon;
            const active = currentView === item.id;
            // Reservas: contratos por aprobar (admin) o reservas activas (broker)
            const badgeCount = item.id === 'reservations' ? (isAdmin ? stats.pendingContractsCount : stats.activeReservationsCount) : 0;
            const showBadge = badgeCount > 0;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold ${active ? 'text-brand-600' : 'text-slate-500'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{SHORT_LABELS[item.id]}</span>
                {showBadge && (
                  <span className="absolute top-1 right-1/2 translate-x-4 min-w-[16px] h-4 px-1 rounded-full bg-brand-500 text-white text-[9px] leading-4">
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold ${moreActive ? 'text-brand-600' : 'text-slate-500'}`}
          >
            <Menu className="w-5 h-5" />
            <span>Más</span>
          </button>
        </div>
      </nav>

      {/* Menú completo */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/50" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-serif text-lg text-slate-900">{currentUser?.name}</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">{isAdmin ? 'Dueña / Admin' : 'Broker'}</p>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400" aria-label="Cerrar menú">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const active = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold ${
                      active ? 'bg-brand-50 text-brand-700' : 'text-slate-700 active:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${active ? 'text-brand-600' : 'text-slate-400'}`} />
                      {item.label}
                    </span>
                    {item.badge !== null && item.badge !== undefined && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${item.badgeColor}`}>{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
              {isAdmin && (
                <button
                  onClick={() => { setIsBackupModalOpen(true); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-700"
                >
                  <HardDriveDownload className="w-5 h-5 text-slate-400" />
                  Copia de seguridad
                </button>
              )}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold text-rose-600"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
