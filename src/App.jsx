import React from 'react';
import { RealEstateProvider, useRealEstate } from './context/RealEstateContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { PropertyList } from './components/properties/PropertyList';
import { RentalCalendar } from './components/calendar/RentalCalendar';
import { ReservationList } from './components/reservations/ReservationList';
import { RentalList } from './components/rentals/RentalList';
import { KeyBoardOverview } from './components/keys/KeyBoardOverview';
import { AgentDirectory } from './components/agents/AgentDirectory';
import { FinanceView } from './components/finance/FinanceView';
import { MovementModal } from './components/finance/MovementModal';
import { LoginScreen } from './components/auth/LoginScreen';
import { BrandMark } from './components/common/BrandLogo';
import { PropertyDetailModal } from './components/properties/PropertyDetailModal';
import { PropertyFormModal } from './components/properties/PropertyFormModal';
import { ReservationModal } from './components/reservations/ReservationModal';
import { RentalModal } from './components/rentals/RentalModal';
import { SharePropertyModal } from './components/common/SharePropertyModal';
import { DataBackupModal } from './components/common/DataBackupModal';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const MainAppContent = () => {
  const { currentView, toastMessage, currentUser, authChecked, soldPropertyForCommission, setSoldPropertyForCommission } = useRealEstate();

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3 text-sm font-semibold text-slate-400">
        <div className="animate-pulse"><BrandMark size={56} /></div>
        Cargando…
      </div>
    );
  }
  if (!currentUser) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'properties' && <PropertyList />}
          {currentView === 'calendar' && <RentalCalendar />}
          {currentView === 'reservations' && <ReservationList />}
          {currentView === 'rentals' && <RentalList />}
          {currentView === 'keys' && <KeyBoardOverview />}
          {currentView === 'agents' && <AgentDirectory />}
          {currentView === 'finance' && <FinanceView />}
        </main>
      </div>

      {/* Global Modals */}
      <PropertyDetailModal />
      <PropertyFormModal />
      <ReservationModal />
      <RentalModal />
      <SharePropertyModal />
      <DataBackupModal />
      {soldPropertyForCommission && (
        <MovementModal
          key={soldPropertyForCommission.id}
          soldProperty={soldPropertyForCommission}
          onClose={() => setSoldPropertyForCommission(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toastMessage.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-indigo-400" />}
          <span className="text-xs font-semibold">{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <RealEstateProvider>
      <MainAppContent />
    </RealEstateProvider>
  );
}
