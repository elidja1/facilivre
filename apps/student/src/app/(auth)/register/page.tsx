'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck,
  Check,
  Sparkles,
  Phone,
} from 'lucide-react';
import AuthHeader from '@/components/AuthHeader';
import AuthIllustration from '@/components/AuthIllustration';

const REGISTER_SLIDES = [
  {
    badge: '100% Gratuit 🇧🇯',
    badgeColor: '#10B981',
    title: 'Rejoins 12 000+ étudiants.',
    sub: 'Micro-cours, salons d\'étude silencieux, duels de quiz et tuteur IA — tout pour réussir ensemble.',
  },
  {
    badge: 'Progression par Étape 🚀',
    badgeColor: '#0052FF',
    title: 'Du Collège à l\'Université.',
    sub: 'Programmes Francophone (6ème au Master), Anglophone (JSS1 à SS3 & Uni) ou parcours Mixte personnalisé.',
  },
  {
    badge: 'Communauté Active 🤝',
    badgeColor: '#F59E0B',
    title: 'UAC, EPAC, ENEAM & Lycées.',
    sub: 'Des milliers d\'exercices résolus et d\'annales corrigées par les meilleurs majors du Bénin.',
  },
];


// ── Types ──────────────────────────────────────────────────────────────────
type Theme = 'dark' | 'light';
type EducationSystem = 'francophone' | 'anglophone' | 'mixte';
type LevelCategory = 'college' | 'lycee' | 'universite';

// ── Step indicator component ───────────────────────────────────────────────
function StepDots({
  total,
  current,
  isDark,
}: {
  total: number;
  current: number;
  isDark: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-300 rounded-full ${
            i < current
              ? 'h-2 w-2 bg-emerald-500'
              : i === current
              ? 'h-2 w-6 bg-[#0052FF]'
              : isDark
              ? 'h-2 w-2 bg-slate-700'
              : 'h-2 w-2 bg-slate-200'
          }`}
        />
      ))}
    </div>
  );
}

// ── Input wrapper ──────────────────────────────────────────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-current opacity-70">{label}</label>
      {children}
    </div>
  );
}

// ── Curriculum data ────────────────────────────────────────────────────────
const FRANCOPHONE_COLLEGE = ['6ème (Sixième)', '5ème (Cinquième)', '4ème (Quatrième)', '3ème — Préparation BEPC'];
const FRANCOPHONE_LYCEE = [
  'Seconde C (Scientifique)', 'Seconde A (Littéraire)', 'Seconde Technique/F/E',
  'Première C (Maths & Physique)', 'Première D (Sciences & SVT)',
  'Première A (Lettres & Langues)', 'Première B (Économie)',
  'Terminale C — BAC C', 'Terminale D — BAC D (Sciences)',
  'Terminale A — BAC A (Lettres)', 'Terminale B — BAC B (Économie)',
  'Terminale F/E — Génie Technique',
];
const ANGLOPHONE_COLLEGE = ['JSS 1 (Junior Sec. 1)', 'JSS 2 (Junior Sec. 2)', 'JSS 3 — BECE / Junior WAEC'];
const ANGLOPHONE_LYCEE = ['SS 1 (Senior Sec. 1)', 'SS 2 (Senior Sec. 2)', 'SS 3 — WAEC / NECO / JAMB'];
const UNIVERSITY_YEARS = [
  'Licence 1 (L1 / 100 Level)', 'Licence 2 (L2 / 200 Level)', 'Licence 3 (L3 / 300 Level)',
  'Master 1 (M1 / 400 Level)', 'Master 2 (M2 / Postgrad)', 'Doctorat / PhD',
];
const UNIVERSITY_FIELDS = [
  'Génie Logiciel / Informatique (EPAC/FAST)',
  'Médecine & Santé (FSS / INMES)',
  'Économie, Gestion & Finance (ENEAM/FASEG)',
  'Droit & Sciences Politiques (FADESP)',
  'Génie Civil / Électrique / Mécanique',
  'Agronomie & Bio-ressources (UNA/FSA)',
  'Sciences Fondamentales — Maths/Physique/Chimie',
  'Lettres, Langues & Communication (FLASH)',
];

// ── Input styles helper ────────────────────────────────────────────────────
function inputCls(isDark: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] ${
    isDark
      ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600'
      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300'
  }`;
}

function selectCls(isDark: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#0052FF]/30 focus:border-[#0052FF] cursor-pointer ${
    isDark
      ? 'bg-slate-950 border-slate-800 text-white'
      : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-slate-300'
  }`;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function RegisterPage() {
  const TOTAL_STEPS = 3;
  const [step, setStep] = useState(0);
  const [theme, setTheme] = useState<Theme>('light');

  // Step 1 — Identity
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 — Password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Step 3 — Academic profile
  const [educationSystem, setEducationSystem] = useState<EducationSystem>('francophone');
  const [levelCategory, setLevelCategory] = useState<LevelCategory>('lycee');
  const [selectedClass, setSelectedClass] = useState('Terminale D — BAC D (Sciences)');
  const [universityYear, setUniversityYear] = useState('Licence 1 (L1 / 100 Level)');
  const [universityField, setUniversityField] = useState('Génie Logiciel / Informatique (EPAC/FAST)');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Sync theme on mount
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

  const isDark = theme === 'dark';

  // ── Classes list helper
  const getClassList = () => {
    if (levelCategory === 'universite') return [];
    if (educationSystem === 'francophone') {
      return levelCategory === 'college' ? FRANCOPHONE_COLLEGE : FRANCOPHONE_LYCEE;
    }
    return levelCategory === 'college' ? ANGLOPHONE_COLLEGE : ANGLOPHONE_LYCEE;
  };

  // ── Navigation helpers
  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Validate passwords
      if (password.length < 8) {
        setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError('Les mots de passe ne correspondent pas.');
        return;
      }
      setPasswordError('');
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleGoogleSignup = () => {
    alert('Google OAuth — intégration API prête à câbler.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    const level =
      levelCategory === 'universite'
        ? `${universityYear} — ${universityField}`
        : selectedClass;
    alert(
      `✅ Profil créé !\n\nNom: ${fullName}\nPseudo: @${username}\nEmail: ${email}\nSystème: ${educationSystem}\nNiveau: ${level}`
    );
  };

  // ── Step content ──────────────────────────────────────────────────────
  const stepTitles = [
    { title: 'Qui es-tu ?', sub: 'Commence par te présenter — c\'est rapide !' },
    { title: 'Sécurise ton compte', sub: 'Choisis un mot de passe fort.' },
    { title: 'Ton profil académique', sub: 'Personnalise ton fil de cours.' },
  ];

  // ── Pill selector helper
  function PillSelect({
    options,
    value,
    onChange,
    color = 'blue',
  }: {
    options: { key: string; label: string; emoji: string }[];
    value: string;
    onChange: (v: string) => void;
    color?: 'blue' | 'emerald' | 'amber';
  }) {
    const colors = {
      blue: 'border-[#0052FF] bg-[#0052FF]/15 text-[#0052FF] dark:text-sky-400',
      emerald: 'border-emerald-500 bg-emerald-500/15 text-emerald-500',
      amber: 'border-amber-500 bg-amber-500/15 text-amber-400',
    };
    const inactive = isDark ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-700 hover:border-slate-300';

    return (
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0,1fr))` }}>
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
              value === o.key ? colors[color] : inactive
            }`}
          >
            <span className="block text-base mb-0.5">{o.emoji}</span>
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  // ── Render step forms
  const renderStep = () => {
    switch (step) {
      // ──────────────────── STEP 0 — Identity ──────────────────────────────
      case 0:
        return (
          <form onSubmit={nextStep} className="space-y-4">
            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className={`w-full py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-3 transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              S&apos;inscrire avec Google
            </button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className={`flex-1 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
              <span className={`px-3 text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>ou</span>
              <div className={`flex-1 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
            </div>

            {/* Fields */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nom & Prénom">
                <div className="relative">
                  <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Koffi Agbossou"
                    className={inputCls(isDark) + ' pl-10'}
                  />
                </div>
              </Field>

              <Field label="Pseudo (@)">
                <div className="relative">
                  <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>@</span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="koffi_epac"
                    className={inputCls(isDark) + ' pl-8'}
                  />
                </div>
              </Field>
            </div>

            <Field label="Adresse Email">
              <div className="relative">
                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="koffi@etudiant.uac.bj"
                  className={inputCls(isDark) + ' pl-10'}
                />
              </div>
            </Field>

            <Field label="Téléphone (optionnel)">
              <div className="relative">
                <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+229 97 00 00 00"
                  className={inputCls(isDark) + ' pl-10'}
                />
              </div>
            </Field>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 mt-1"
            >
              Continuer
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        );

      // ──────────────────── STEP 1 — Password ───────────────────────────────
      case 1:
        return (
          <form onSubmit={nextStep} className="space-y-4">
            <div className={`rounded-xl border p-3.5 text-xs ${isDark ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
              <p className="font-semibold">Compte : <span className={isDark ? 'text-white' : 'text-slate-800'}>{fullName || 'Étudiant'} (@{username || '…'})</span></p>
              <p>{email}</p>
            </div>

            <Field label="Mot de passe">
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 caractères"
                  className={inputCls(isDark) + ' pl-10 pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[4, 6, 8, 10].map((threshold, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= threshold
                          ? i < 2 ? 'bg-red-500' : i < 3 ? 'bg-amber-400' : 'bg-emerald-500'
                          : isDark ? 'bg-slate-800' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                  <span className={`text-[10px] font-bold ml-1 ${
                    password.length < 6 ? 'text-red-500' : password.length < 8 ? 'text-amber-400' : 'text-emerald-500'
                  }`}>
                    {password.length < 6 ? 'Faible' : password.length < 8 ? 'Moyen' : 'Fort ✓'}
                  </span>
                </div>
              )}
            </Field>

            <Field label="Confirmer le mot de passe">
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Répéter le mot de passe"
                  className={`${inputCls(isDark)} pl-10 pr-10 ${
                    confirmPassword && confirmPassword !== password
                      ? 'border-red-500 focus:ring-red-500/30'
                      : confirmPassword && confirmPassword === password
                      ? 'border-emerald-500 focus:ring-emerald-500/30'
                      : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {confirmPassword && confirmPassword === password && (
                  <Check className="absolute right-9 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                )}
              </div>
            </Field>

            {/* Password error */}
            {passwordError && (
              <p className="text-xs text-red-500 font-medium -mt-2">{passwordError}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={prevStep}
                className={`flex-none py-3.5 px-4 rounded-xl text-sm font-bold flex items-center gap-1.5 border transition-all ${
                  isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        );

      // ──────────────────── STEP 2 — Academic Profile ───────────────────────
      case 2:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Education System Selector */}
            <div>
              <p className={`text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Système éducatif
              </p>
              <PillSelect
                options={[
                  { key: 'francophone', label: 'Francophone (Bénin)', emoji: '🇫🇷' },
                  { key: 'anglophone', label: 'Anglophone (WAEC)', emoji: '🇬🇧' },
                  { key: 'mixte', label: 'Mixte / Tout voir', emoji: '🌍' },
                ]}
                value={educationSystem}
                onChange={(v) => setEducationSystem(v as EducationSystem)}
                color="blue"
              />
            </div>

            {/* Level Category */}
            {educationSystem !== 'mixte' && (
              <div>
                <p className={`text-xs font-bold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Niveau d&apos;études
                </p>
                <PillSelect
                  options={[
                    { key: 'college', label: educationSystem === 'anglophone' ? 'Junior Sec. (JSS)' : 'Collège (BEPC)', emoji: '🏫' },
                    { key: 'lycee', label: educationSystem === 'anglophone' ? 'Senior Sec. (SS)' : 'Lycée (BAC)', emoji: '🎓' },
                    { key: 'universite', label: 'Université / Master', emoji: '🏛️' },
                  ]}
                  value={levelCategory}
                  onChange={(v) => setLevelCategory(v as LevelCategory)}
                  color="emerald"
                />
              </div>
            )}

            {/* Class or University fields */}
            {educationSystem === 'mixte' ? (
              <div className={`text-xs text-center px-4 py-3 rounded-xl border ${isDark ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
                ✅ Mode <strong>Mixte</strong> — tu verras du contenu pour tous les niveaux et tous les systèmes.
                Pas besoin de choisir une classe.
              </div>
            ) : levelCategory !== 'universite' ? (
              <Field label="Classe exacte">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className={selectCls(isDark)}
                >
                  {getClassList().map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Année d'étude">
                  <select
                    value={universityYear}
                    onChange={(e) => setUniversityYear(e.target.value)}
                    className={selectCls(isDark)}
                  >
                    {UNIVERSITY_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </Field>
                <Field label="Filière / Faculté">
                  <select
                    value={universityField}
                    onChange={(e) => setUniversityField(e.target.value)}
                    className={selectCls(isDark)}
                  >
                    {UNIVERSITY_FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </Field>
              </div>
            )}

            {/* Free badge */}
            <div className={`flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl border ${isDark ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400' : 'border-emerald-500/30 bg-emerald-50 text-emerald-700'}`}>
              <Check className="h-4 w-4 shrink-0" />
              <span>Accès complet gratuit : salons d&apos;étude, micro-cours, tuteur IA et duels de quiz.</span>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={prevStep}
                className={`flex-none py-3.5 px-4 rounded-xl text-sm font-bold flex items-center gap-1.5 border transition-all ${
                  isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl text-sm font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Création en cours…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Créer Mon Profil
                  </>
                )}
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark ? 'bg-[#070b12] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* ── SHARED AUTH HEADER (Full banner + navigation matching landing page) */}
      <AuthHeader theme={theme} onToggleTheme={toggleTheme} />

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-stretch">

        {/* LEFT — Illustration Box with animated glowing ring + rotating slides */}
        <AuthIllustration
          src="/auth-register.jpg"
          alt="Étudiants africains collaborant sur FaciLivre"
          slides={REGISTER_SLIDES}
          accentColor="#10B981"
        />

        {/* RIGHT — Form */}
        <div
          className={`flex-1 flex flex-col justify-center px-5 sm:px-8 xl:px-12 py-8 ${
            isDark ? 'bg-[#070b12]' : 'bg-white'
          }`}
        >
          <div className="w-full max-w-[440px] mx-auto">

            {/* Step header */}
            <div className="mb-6 space-y-3">
              <StepDots total={TOTAL_STEPS} current={step} isDark={isDark} />
              <div>
                <p className={`text-[11px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Étape {step + 1} sur {TOTAL_STEPS}
                </p>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-display mt-0.5">
                  {stepTitles[step].title}
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stepTitles[step].sub}
                </p>
              </div>
            </div>

            {/* Form content */}
            {renderStep()}

            {/* Already have account */}
            {step === 0 && (
              <p className={`mt-5 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                Déjà inscrit ?{' '}
                <Link href="/login" className={`font-bold hover:underline ${isDark ? 'text-sky-400' : 'text-[#0052FF]'}`}>
                  Se connecter
                </Link>
              </p>
            )}

            {/* Security note */}
            <div className={`mt-5 pt-4 border-t flex items-center justify-center gap-1.5 text-[11px] ${isDark ? 'border-slate-800 text-slate-600' : 'border-slate-100 text-slate-400'}`}>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Inscription sécurisée · Aucune carte bancaire · Bénin 🇧🇯</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
