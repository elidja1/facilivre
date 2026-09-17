'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface AuthHeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function AuthHeader({ theme, onToggleTheme }: AuthHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === 'dark';

  const navLinks = [
    { href: '/#scroll-learn', label: 'Scroll & Apprends', icon: true },
    { href: '/#vision', label: 'Vision' },
    { href: '/#piliers', label: 'Les 5 Piliers' },
    { href: '/#methode', label: 'Méthode' },
    { href: '/#demo', label: 'Démos' },
    { href: '/#communaute', label: 'Témoignages' },
  ];

  return (
    <>
      {/* ── TOP BANNER ──────────────────────────────────────────────── */}
      <div className="bg-[#0052FF] text-white text-[11px] py-1 px-3 font-bold border-b border-blue-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="bg-black/30 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-black shrink-0">
              🇧🇯 BÉNIN
            </span>
            <span className="truncate">
              Plateforme d&apos;Apprentissage Social : BAC, Concours &amp; Universités (UAC, EPAC, ENEAM)
            </span>
          </div>
          <Link
            href="/register"
            className="hidden sm:inline-flex items-center gap-1 shrink-0 font-extrabold hover:underline text-[11px]"
          >
            <span>Rejoindre</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── STICKY MAIN HEADER ──────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#070b12]/95 border-slate-800 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-[#0052FF] text-white flex items-center justify-center shadow-sm group-hover:bg-[#0041cc] transition-colors">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-xl tracking-tight font-display">
                FaciLivre
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 leading-none">
                BÉNIN
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold">
            <Link
              href="/#scroll-learn"
              className="text-[#0052FF] dark:text-[#38bdf8] flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Flame className="h-3.5 w-3.5" />
              <span>Scroll &amp; Apprends</span>
            </Link>
            {navLinks.slice(1).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`transition-colors hover:text-[#0052FF] ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              aria-label="Changer le thème"
              className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-sky-400 hover:border-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Connexion */}
            <Link
              href="/login"
              className={`hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isDark
                  ? 'bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
              }`}
            >
              Connexion
            </Link>

            {/* S'inscrire */}
            <Link
              href="/register"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg text-xs font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-95 transition-all shadow-sm"
            >
              S&apos;inscrire
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-1.5 rounded-lg border transition-colors ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
                  : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drop-down */}
        {mobileOpen && (
          <div
            className={`lg:hidden border-t p-4 space-y-3 text-xs font-bold ${
              isDark ? 'border-slate-800 bg-[#070b12]' : 'border-slate-200 bg-white'
            }`}
          >
            <nav className="flex flex-col space-y-2">
              <Link
                href="/#scroll-learn"
                onClick={() => setMobileOpen(false)}
                className="text-[#0052FF] py-1 flex items-center gap-1.5"
              >
                <Flame className="h-4 w-4" />
                <span>Scroll &amp; Apprends</span>
              </Link>
              {navLinks.slice(1).map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-1 hover:text-[#0052FF] transition-colors ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className={`pt-2 border-t flex gap-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={`flex-1 py-2 text-center rounded-lg border font-bold ${
                  isDark ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-700'
                }`}
              >
                Connexion
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 py-2 text-center rounded-lg bg-[#0052FF] text-white font-black"
              >
                Inscription
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
