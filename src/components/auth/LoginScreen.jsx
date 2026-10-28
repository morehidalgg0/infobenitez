import React, { useState } from 'react';
import { useRealEstate } from '../../context/RealEstateContext';
import { Building2, LogIn, User, Lock, AlertTriangle } from 'lucide-react';

export const LoginScreen = () => {
  const { login, needsAdminSetup, setupAdminPassword, adminAccount } = useRealEstate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (needsAdminSetup) {
      if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
      if (password !== confirmPassword) return setError('Las contraseñas no coinciden.');
      setupAdminPassword(password);
      return;
    }
    if (!login(username, password)) {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-xl p-7 space-y-6">

        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-slate-900 tracking-tight">InmoPanel</h1>
            <p className="text-xs text-slate-500 mt-1">
              {needsAdminSetup
                ? `Primer ingreso: creá la contraseña de administración (usuario "${adminAccount.username}")`
                : 'Ingresá con tu cuenta de broker o de administración'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {!needsAdminSetup && (
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Usuario</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Ej. shidalgo"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 font-medium text-sm"
              />
            </div>
          </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">{needsAdminSetup ? 'Nueva contraseña' : 'Contraseña'}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoFocus={needsAdminSetup}
                autoComplete={needsAdminSetup ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 font-medium text-sm"
              />
            </div>
          </div>

          {needsAdminSetup && (
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Repetir contraseña</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 font-medium text-sm"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            <LogIn className="w-4 h-4" />
            <span>{needsAdminSetup ? 'Crear contraseña e ingresar' : 'Ingresar'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
