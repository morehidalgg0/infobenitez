import React, { useState, useMemo } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  BookmarkCheck, 
  KeyRound, 
  Home, 
  DollarSign, 
  User, 
  Phone, 
  Eye, 
  Filter, 
  Info,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export const RentalCalendar = () => {
  const { 
    properties: allProperties, 
    rentals, 
    reservations: allReservations, 
    setSelectedPropertyForDetail 
  } = useRealEstate();

  // Solo alquileres: se dejan afuera las propiedades en venta y sus señas
  const properties = useMemo(() => allProperties.filter(p => p.operationType !== 'Venta'), [allProperties]);
  const reservations = useMemo(() => {
    const rentalIds = new Set(properties.map(p => p.id));
    return allReservations.filter(r => rentalIds.has(r.propertyId));
  }, [allReservations, properties]);

  // Mes actual al abrir
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState('ALL');
  const [selectedDayDetails, setSelectedDayDetails] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDayDetails(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDayDetails(null);
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 9, 15));
    setSelectedDayDetails(null);
  };

  // Helper date conversions
  const isDateInRange = (dateStr, startStr, endStr) => {
    if (!startStr || !endStr) return false;
    const d = new Date(dateStr);
    const start = new Date(startStr);
    const end = new Date(endStr);
    return d >= start && d <= end;
  };

  // Generate calendar days for current month
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    // Monday is index 0 in standard ISO: Sunday is 0 in JS, so convert
    let startDayIndex = firstDayOfMonth.getDay() - 1;
    if (startDayIndex === -1) startDayIndex = 6; // Sunday becomes 6

    const days = [];

    // Empty padding slots
    for (let i = 0; i < startDayIndex; i++) {
      days.push({ dayNumber: null, isCurrentMonth: false, dateStr: null });
    }

    // Days of the month
    for (let d = 1; d <= totalDays; d++) {
      const monthStr = (currentMonth + 1).toString().padStart(2, '0');
      const dayStr = d.toString().padStart(2, '0');
      const dateStr = `${currentYear}-${monthStr}-${dayStr}`;

      // Find active rentals for this day
      const activeRentals = rentals.filter(r => {
        if (selectedPropertyFilter !== 'ALL' && r.propertyId !== selectedPropertyFilter) return false;
        return isDateInRange(dateStr, r.contractStart, r.contractEnd);
      });

      // Find active reservations for this day
      const activeReservations = reservations.filter(res => {
        if (res.status === 'Cancelada') return false;
        if (selectedPropertyFilter !== 'ALL' && res.propertyId !== selectedPropertyFilter) return false;
        return isDateInRange(dateStr, res.reservationDate, res.expirationDate);
      });

      // Available properties in catalog (for context)
      const availableProps = properties.filter(p => {
        if (p.status !== 'Disponible') return false;
        if (selectedPropertyFilter !== 'ALL' && p.id !== selectedPropertyFilter) return false;
        return true;
      });

      days.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateStr,
        rentals: activeRentals,
        reservations: activeReservations,
        availableCount: availableProps.length,
        isToday: dateStr === '2026-10-15'
      });
    }

    return days;
  }, [currentYear, currentMonth, rentals, reservations, properties, selectedPropertyFilter]);

  // Overall Month Statistics
  const monthStats = useMemo(() => {
    const monthRentals = rentals.filter(r => {
      const start = new Date(r.contractStart);
      const end = new Date(r.contractEnd);
      const mStart = new Date(currentYear, currentMonth, 1);
      const mEnd = new Date(currentYear, currentMonth + 1, 0);
      return start <= mEnd && end >= mStart;
    });

    const monthReservations = reservations.filter(r => {
      if (r.status === 'Cancelada') return false;
      const resDate = new Date(r.reservationDate);
      return resDate.getFullYear() === currentYear && resDate.getMonth() === currentMonth;
    });

    const totalDepositAmountUSD = monthReservations
      .filter(r => r.currency === 'USD')
      .reduce((sum, r) => sum + (Number(r.reservationAmount) || 0), 0);

    const totalDepositAmountARS = monthReservations
      .filter(r => r.currency === 'ARS')
      .reduce((sum, r) => sum + (Number(r.reservationAmount) || 0), 0);

    return {
      activeRentalsCount: monthRentals.length,
      reservationsCount: monthReservations.length,
      totalDepositUSD: totalDepositAmountUSD,
      totalDepositARS: totalDepositAmountARS
    };
  }, [currentYear, currentMonth, rentals, reservations]);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Calendario de Alquileres & Disponibilidad
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              Visual & Tarifas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visualiza qué inmuebles están reservados, alquilados y disponibles, con valores mensuales y señas tomadas.
          </p>
        </div>

        {/* Quick Month Navigation */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm shrink-0">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            title="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs sm:text-sm font-extrabold text-slate-800 px-3 min-w-[130px] text-center">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>

          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            title="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100 ml-1"
          >
            Hoy
          </button>
        </div>
      </div>

      {/* KPI Top Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Alquileres en curso */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Alquileres en Curso</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-0.5">
              {monthStats.activeRentalsCount} contratos
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Ocupación vigente este mes</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <KeyRound className="w-5 h-5" />
          </div>
        </div>

        {/* Señas y Reservas */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Señas / Reservas del Mes</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-0.5">
              {monthStats.reservationsCount} señadas
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 font-semibold">
              Total señas: USD {monthStats.totalDepositUSD.toLocaleString()} {monthStats.totalDepositARS > 0 ? `+ $${monthStats.totalDepositARS.toLocaleString()}` : ''}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BookmarkCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Disponibles para alquilar o vender */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Casas Disponibles</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">
              {properties.filter(p => p.status === 'Disponible').length} libres
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Listas para señar o mostrar</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Property Filter Selector */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-slate-700">Filtrar por Propiedad en Calendario:</span>
        </div>
        <select
          value={selectedPropertyFilter}
          onChange={(e) => setSelectedPropertyFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 font-bold text-slate-800 focus:outline-none focus:border-indigo-500 w-full sm:w-auto"
        >
          <option value="ALL">Todos los alquileres</option>
          {properties.map(p => (
            <option key={p.id} value={p.id}>
              [{p.refCode}] {p.title} ({p.status} - {p.operationType})
            </option>
          ))}
        </select>
      </div>

      {/* Main Calendar Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50/80 text-center py-2.5 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
          {WEEK_DAYS.map((wd, i) => (
            <div key={i} className={i >= 5 ? 'text-indigo-600' : ''}>
              {wd}
            </div>
          ))}
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 min-h-[500px]">
          {calendarDays.map((day, idx) => {
            if (!day.isCurrentMonth) {
              return (
                <div key={idx} className="bg-slate-50/40 p-2 min-h-[90px] sm:min-h-[110px]" />
              );
            }

            const hasRentals = day.rentals.length > 0;
            const hasReservations = day.reservations.length > 0;
            const isSelected = selectedDayDetails?.dateStr === day.dateStr;

            return (
              <div
                key={idx}
                onClick={() => setSelectedDayDetails(day)}
                className={`p-1.5 sm:p-2.5 min-h-[90px] sm:min-h-[110px] flex flex-col justify-between transition-all cursor-pointer hover:bg-indigo-50/30 ${
                  day.isToday ? 'bg-indigo-50/50' : 'bg-white'
                } ${isSelected ? 'ring-2 ring-indigo-500 z-10' : ''}`}
              >
                {/* Day number & indicators */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    day.isToday 
                      ? 'bg-indigo-600 text-white font-extrabold shadow-sm' 
                      : 'text-slate-700'
                  }`}>
                    {day.dayNumber}
                  </span>

                  <div className="flex items-center gap-1">
                    {hasReservations && (
                      <span className="w-2 h-2 rounded-full bg-amber-500" title="Reserva activa" />
                    )}
                    {hasRentals && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" title="Alquiler vigente" />
                    )}
                  </div>
                </div>

                {/* Day events badges */}
                <div className="space-y-1 mt-1 overflow-hidden">
                  
                  {/* Reservation Badge */}
                  {day.reservations.map(res => (
                    <div
                      key={res.id}
                      className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold truncate flex items-center gap-1"
                      title={`Reservada: ${res.propertyRef} - Seña: ${res.currency} ${res.reservationAmount?.toLocaleString()} por ${res.clientName}`}
                    >
                      <BookmarkCheck className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                      <span className="truncate">{res.propertyRef}: Seña {res.currency} {res.reservationAmount?.toLocaleString()}</span>
                    </div>
                  ))}

                  {/* Rental Badge */}
                  {day.rentals.map(rent => (
                    <div
                      key={rent.id}
                      className="px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-200 text-[10px] font-bold truncate flex items-center gap-1"
                      title={`Alquilada: ${rent.propertyRef} - Canon: ${rent.currency} ${rent.monthlyRent?.toLocaleString()}/mes`}
                    >
                      <KeyRound className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                      <span className="truncate">{rent.propertyRef}: {rent.currency} {rent.monthlyRent?.toLocaleString()}</span>
                    </div>
                  ))}

                  {/* Available indicator if neither */}
                  {!hasRentals && !hasReservations && (
                    <div className="hidden sm:block text-[9px] text-emerald-600 font-semibold px-1 py-0.5 rounded bg-emerald-50/50">
                      Libre / Disponible
                    </div>
                  )}

                </div>

                <div className="text-[9px] text-slate-400 text-right mt-1">
                  {day.rentals.length + day.reservations.length > 0 ? (
                    <span className="font-bold text-slate-600">{day.rentals.length + day.reservations.length} activas</span>
                  ) : ''}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Popover / Bottom Drawer when a day is clicked */}
      {selectedDayDetails && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-5 shadow-lg space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-indigo-600" />
              <h3 className="font-extrabold text-base text-slate-900">
                Detalle del Día: {selectedDayDetails.dateStr}
              </h3>
            </div>
            <button
              onClick={() => setSelectedDayDetails(null)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg"
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Active Reservations on this day */}
            <div className="space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <BookmarkCheck className="w-4 h-4 text-amber-600" />
                <span>Reservas en Curso en esta Fecha ({selectedDayDetails.reservations.length})</span>
              </span>

              {selectedDayDetails.reservations.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  No hay propiedades bajo seña o reserva en este día.
                </p>
              ) : (
                selectedDayDetails.reservations.map(res => {
                  const prop = properties.find(p => p.id === res.propertyId);
                  return (
                    <div key={res.id} className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[11px]">
                          {res.propertyRef}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Recibo: {res.receiptNumber}</span>
                      </div>
                      
                      <h4 className="font-bold text-sm text-slate-900">{res.propertyTitle}</h4>

                      {/* Tarifa y Monto señado */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white border border-amber-200/60 mt-2">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold">Valor Propiedad</span>
                          <p className="text-xs font-extrabold text-slate-800">
                            {prop ? `${prop.pricing.currency} ${prop.pricing.price.toLocaleString()}` : 'Ver ficha'}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-amber-700 uppercase font-bold">Por Cuánto Señaron</span>
                          <p className="text-xs font-extrabold text-amber-900">
                            {res.currency} {res.reservationAmount?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-slate-600 pt-1">
                        <span>Interesado: <strong>{res.clientName}</strong></span>
                        <span>Vigencia: {res.expirationDate}</span>
                      </div>

                      {prop && (
                        <button
                          onClick={() => setSelectedPropertyForDetail(prop)}
                          className="w-full mt-2 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 font-semibold border border-amber-200 text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Abrir Ficha de la Casa</span>
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Active Rentals on this day */}
            <div className="space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-blue-600" />
                <span>Contratos de Alquiler Vigentes ({selectedDayDetails.rentals.length})</span>
              </span>

              {selectedDayDetails.rentals.length === 0 ? (
                <p className="text-xs text-slate-400 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  No hay contratos de alquiler activos en este día con el filtro actual.
                </p>
              ) : (
                selectedDayDetails.rentals.map(rent => {
                  const prop = properties.find(p => p.id === rent.propertyId);
                  return (
                    <div key={rent.id} className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded text-[11px]">
                          {rent.propertyRef}
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          Contrato Activo
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900">{rent.propertyTitle}</h4>

                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white border border-blue-200/60 mt-2">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold">Cuánto Sale (Canon)</span>
                          <p className="text-xs font-extrabold text-blue-900">
                            {rent.currency} {rent.monthlyRent?.toLocaleString()}/mes
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold">Ajuste</span>
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {rent.indexationMethod || "IPC"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-slate-600 pt-1">
                        <span>Inquilino: <strong>{rent.tenantName}</strong></span>
                        <span>Fin: {rent.contractEnd}</span>
                      </div>

                      {prop && (
                        <button
                          onClick={() => setSelectedPropertyForDetail(prop)}
                          className="w-full mt-2 py-1.5 rounded-xl bg-white hover:bg-blue-100 text-blue-900 font-semibold border border-blue-200 text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Abrir Ficha de la Casa</span>
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
