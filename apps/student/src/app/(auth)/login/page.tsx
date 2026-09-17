'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import AuthHeader from '@/components/AuthHeader';
import AuthIllustration from '@/components/AuthIllustration';

const LOGIN_SLIDES = [
  {
    badge: 'Plateforme #1 au Bénin',
    badgeColor: '#0052FF',
    title: 'Apprends, collabore et réussis.',
    sub: 'Retrouve tes salons d\'étude, tes micro-cours et ton tuteur IA — tout en un seul fil.',
  },
  {
    badge: 'Scroll & Apprends ⚡',
    badgeColor: '#10B981',
    title: 'Transforme ton fil en succès académique.',
    sub: 'Des micro-cours au format dynamique pour réviser efficacement ton BAC ou ta Licence.',
  },
  {
    badge: 'Salons Collaboratifs 🎓',
    badgeColor: '#F59E0B',
    title: 'Ne révise plus jamais seul.',
    sub: 'Rejoins des milliers d\'étudiants béninois de l\'UAC, EPAC, ENEAM et de tous les lycées.',
  },
];

export default function LoginPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Sync theme with document on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('facilivre-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    alert(`Connexion simulée pour : ${identifier}.\nModule NestJS à connecter.`);
  };

  const handleGoogleLogin = () => {
    alert("Google OAuth — intégration API prête à câbler.");
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark ? 'bg-[#070b12] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* ── SHARED AUTH HEADER (Full banner + navigation matching landing page) */}
      <AuthHeader theme={theme} onToggleTheme={toggleTheme} />

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="flex-1 flex items-stretch">
        {/* LEFT — Illustration in Box with glowing animated ring + rotating text */}
        <AuthIllustration
          src="/auth-login.jpg"
          alt="Étudiante africaine apprenant sur FaciLivre Bénin"
          slides={LOGIN_SLIDES}
          accentColor="#0052FF"
        />

        {/* RIGHT — Form Panel */}
        <div
          className={`flex-1 flex flex-col justify-center px-5 sm:px-8 xl:px-16 py-10 ${
            isDark ? 'bg-[#070b12]' : 'bg-white'
          }`}
        >
          <div className="w-full max-w-[420px] mx-auto">
            {/* Heading */}
            <div className="mb-7 space-y-1">
              <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-sky-400' : 'text-[#0052FF]'}`}>
                Espace Étudiant
              </p>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
                Bon retour parmi nous ! 👋
              </h1>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Connecte-toi pour reprendre là où tu t&apos;es arrêté.
              </p>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`w-full py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-3 transition-all mb-5 ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm hover:shadow'
              }`}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Continuer avec Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-5">
              <div className={`flex-1 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
              <span className={`px-3 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                ou avec ton compte
              </span>
              <div className={`flex-1 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email / Username */}
              <div className="space-y-1.5">
                <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email ou Pseudo (@)
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="koffi@etudiant.uac.bj ou @koffi"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Mot de passe
                  </label>
                  <Link
                    href="/forgot-password"
                    className={`text-xs font-semibold hover:underline ${isDark ? 'text-sky-400' : 'text-[#0052FF]'}`}
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}
                    aria-label="Afficher/masquer le mot de passe"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 accent-[#0052FF] cursor-pointer"
                />
                <span className={`text-xs select-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Rester connecté sur cet appareil
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/25 mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Connexion en cours…
                  </>
                ) : (
                  <>
                    Se Connecter
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer link */}
            <p className={`mt-6 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Pas encore de compte ?{' '}
              <Link href="/register" className={`font-bold hover:underline ${isDark ? 'text-sky-400' : 'text-[#0052FF]'}`}>
                S&apos;inscrire gratuitement
              </Link>
            </p>

            {/* Security note */}
            <div className={`mt-6 pt-5 border-t flex items-center justify-center gap-1.5 text-[11px] ${isDark ? 'border-slate-800 text-slate-600' : 'border-slate-100 text-slate-400'}`}>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Connexion sécurisée SSL · Données hébergées au Bénin</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
