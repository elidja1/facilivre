'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import AuthHeader from '@/components/AuthHeader';


export default function ForgotPasswordPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('facilivre-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const handleRequestCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    setSuccess(true);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#070b12] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* ── SHARED AUTH HEADER (Full banner + navigation matching landing page) */}
      <AuthHeader theme={theme} onToggleTheme={toggleTheme} />


      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-10">
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-2xl border shadow-xl transition-colors ${
          isDark ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
        }`}>

          {!success ? (
            <>
              <div className="mb-6 space-y-1.5">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                  isDark ? 'bg-[#0052FF]/15 text-sky-400' : 'bg-[#0052FF]/10 text-[#0052FF]'
                }`}>
                  <KeyRound className="h-3 w-3" />
                  Récupération de Compte
                </div>
                <h1 className="text-2xl font-black tracking-tight font-display">
                  {step === 1 ? 'Mot de passe oublié ?' : 'Nouveau mot de passe'}
                </h1>
                <p className={`text-sm ${ isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {step === 1
                    ? "Saisis l'adresse email de ton compte pour recevoir un code de réinitialisation."
                    : `Un code de sécurité a été envoyé à ${email}.`}
                </p>
              </div>

              {step === 1 ? (
                <form onSubmit={handleRequestCode} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Adresse Email</label>
                    <div className="relative">
                      <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      <input
                        type="email" required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="koffi@etudiant.uac.bj"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                    Recevoir le Code <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Code à 6 chiffres</label>
                    <input
                      type="text" required maxLength={6} value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="1 2 3 4 5 6"
                      className={`w-full text-center tracking-[0.5em] font-mono text-lg py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  {[{label:'Nouveau mot de passe', val: newPassword, set: setNewPassword, show: showPassword, toggle: () => setShowPassword(!showPassword)},
                    {label:'Confirmer le mot de passe', val: confirmPassword, set: setConfirmPassword, show: showPassword, toggle: () => setShowPassword(!showPassword)}].map((f) => (
                    <div key={f.label} className="space-y-1.5">
                      <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{f.label}</label>
                      <div className="relative">
                        <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <input
                          type={f.show ? 'text' : 'password'} required value={f.val}
                          onChange={(e) => f.set(e.target.value)}
                          placeholder="Min. 8 caractères"
                          className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] ${
                            isDark ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                        <button type="button" onClick={f.toggle} className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}>
                          {f.show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  ))}

                  <button type="submit" className="w-full py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20">
                    Mettre à Jour Mon Mot de Passe <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-display">Mot de passe réinitialisé !</h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ton mot de passe a été mis à jour avec succès.
                </p>
              </div>
              <Link href="/login" className="inline-flex w-full py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] items-center justify-center gap-2">
                Aller à la Connexion <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          <div className={`mt-5 pt-4 border-t text-center text-xs ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'}`}>
            <Link href="/login" className={`font-bold hover:underline ${isDark ? 'text-sky-400' : 'text-[#0052FF]'}`}>
              ← Retour à la connexion
            </Link>
          </div>

        </div>
      </main>

      <footer className={`border-t py-4 text-center text-[11px] transition-colors ${
        isDark ? 'border-slate-900 text-slate-600 bg-[#05080e]' : 'border-slate-200 text-slate-400 bg-slate-50'
      }`}>
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>FaciLivre Bénin • Récupération Sécurisée SSL</span>
        </div>
      </footer>

    </div>
  );
}
