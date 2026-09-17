'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Users,
  Trophy,
  Bot,
  Flame,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  Clock,
  Play,
  Share2,
  Bookmark,
  TrendingUp,
  Brain,
  Check,
  X,
  GraduationCap,
  Zap,
  Radio,
  MapPin,
  Menu,
  Sparkles,
  Volume2,
  VolumeX,
  Heart,
  Target,
  Rocket,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export default function StudentHomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'shorts' | 'ai' | 'study' | 'quiz'>('shorts');
  
  // Interactive Scroll & Learn Feed State
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Interactive AI Demo State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Interactive Study Room State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyParticipants, setStudyParticipants] = useState(194);

  // Interactive Quiz State
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Educational Reels Data
  const educationalReels = [
    {
      id: 0,
      subject: 'Mathématiques BAC C & D',
      tag: '#CalculIntégrale',
      title: 'Astuce : Intégration par parties en 35 secondes',
      creator: 'Prof. Houénou',
      institution: 'Lycée Béhanzin / Cotonou',
      formula: '∫ u·v\' = u·v - ∫ u\'·v',
      analogy: 'Règle ALPES : ArcTan, Log, Polynôme, Exp, Sin/Cos pour choisir u(x) en 1 clin d’œil !',
      likes: '2.8k',
      badge: 'BAC 2026',
      color: '#0052FF'
    },
    {
      id: 1,
      subject: 'SVT & Biologie (BAC D / FSS)',
      tag: '#Neurophysiologie',
      title: 'Le Potentiel d’Action Neuronal en 40s',
      creator: 'Dr. Bio',
      institution: 'Faculté des Sciences de la Santé (FSS)',
      formula: 'Dépolarisation Na+ (-70mV ➔ +30mV) ➔ Repolarisation K+',
      analogy: 'Comme une porte coupe-feu qui s’ouvre d’un coup puis se referme immédiatement.',
      likes: '3.4k',
      badge: 'Concours FSS',
      color: '#10B981'
    },
    {
      id: 2,
      subject: 'Informatique & Algorithmique',
      tag: '#EPAC_Code',
      title: 'Comprendre la Complexité O(log n) en 30s',
      creator: 'Koffi A.',
      institution: 'Major Génie Logiciel EPAC Calavi',
      formula: 'Recherche Binaire : n ➔ n/2 ➔ n/4 ➔ 1',
      analogy: 'Chercher un mot dans le dictionnaire en coupant toujours le livre en deux.',
      likes: '1.9k',
      badge: 'Génie Logiciel',
      color: '#00B4D8'
    },
    {
      id: 3,
      subject: 'Physique-Chimie BAC C & D',
      tag: '#InductionElectromag',
      title: 'La Loi de Lenz-Faraday sans paniquer',
      creator: 'Sènami D.',
      institution: 'Major BAC Cotonou',
      formula: 'e = - dΦ/dt',
      analogy: 'Le courant induit s’oppose toujours à la cause qui lui donne naissance (effet rebelle !).',
      likes: '4.1k',
      badge: 'Mention TB',
      color: '#F59E0B'
    }
  ];

  // Theme Sync on Mount
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

  // Timer Countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulateAi = (presetText: string, presetResponse: string) => {
    setAiPrompt(presetText);
    setIsAiTyping(true);
    setAiResponse(null);
    setTimeout(() => {
      setAiResponse(presetResponse);
      setIsAiTyping(false);
    }, 450);
  };

  const nextReel = () => {
    setCurrentReelIndex((prev) => (prev + 1) % educationalReels.length);
    setIsLiked(false);
  };

  const prevReel = () => {
    setCurrentReelIndex((prev) => (prev - 1 + educationalReels.length) % educationalReels.length);
    setIsLiked(false);
  };

  const currentReel = educationalReels[currentReelIndex];

  return (
    <div className={`min-h-screen bg-sharp-grid transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#070b12] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* ========================================================================= */}
      {/* 0. COMPACT NOTIFICATION BANNER                                            */}
      {/* ========================================================================= */}
      <div className="bg-[#0052FF] text-white text-[11px] py-1 px-3 font-bold flex items-center justify-between border-b border-blue-700">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="bg-black/30 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-black shrink-0">
              🇧🇯 BÉNIN
            </span>
            <span className="truncate">
              Plateforme d&apos;Apprentissage Social : BAC, Concours &amp; Universités (UAC, EPAC, ENEAM)
            </span>
          </div>
          <Link href="/register" className="hidden sm:inline-flex items-center gap-1 shrink-0 font-extrabold hover:underline text-[11px]">
            <span>Rejoindre</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. STICKY HEADER                                                          */}
      {/* ========================================================================= */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
        theme === 'dark' 
          ? 'bg-[#070b12]/95 border-slate-800 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-[#0052FF] text-white flex items-center justify-center font-black text-base shadow-sm group-hover:bg-[#0041cc] transition-colors">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight font-display">
                  FaciLivre
                </span>
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                  BÉNIN
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold">
            <a href="#scroll-learn" className="text-[#0052FF] dark:text-[#38bdf8] flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              <span>Scroll &amp; Apprends</span>
            </a>
            <a href="#vision" className="text-slate-400 hover:text-[#0052FF] transition-colors">Vision</a>
            <a href="#piliers" className="text-slate-400 hover:text-[#0052FF] transition-colors">Les 5 Piliers</a>
            <a href="#methode" className="text-slate-400 hover:text-[#0052FF] transition-colors">Méthode</a>
            <a href="#demo" className="text-slate-400 hover:text-[#0052FF] transition-colors">Démos</a>
            <a href="#communaute" className="text-slate-400 hover:text-[#0052FF] transition-colors">Témoignages</a>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Changer le thème"
              className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-800 text-sky-400 hover:border-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* High-Contrast Login Button */}
            <Link
              href="/login"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-900 text-slate-100 border-slate-700 hover:bg-slate-800 hover:text-white'
                  : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200 hover:text-black'
              }`}
            >
              Connexion
            </Link>

            {/* Solid Sign Up Button */}
            <Link
              href="/register"
              className="px-3.5 py-1.5 rounded-lg text-xs font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-95 transition-all shadow-sm"
            >
              <span>S&apos;inscrire</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#070b12] p-4 space-y-3 text-xs font-bold">
            <nav className="flex flex-col space-y-2">
              <a href="#scroll-learn" onClick={() => setMobileMenuOpen(false)} className="text-[#0052FF] py-1 flex items-center gap-1.5">
                <Flame className="h-4 w-4" />
                <span>1. Scroll &amp; Apprends (Nouveau !)</span>
              </a>
              <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-[#0052FF] py-1">2. Vision</a>
              <a href="#piliers" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-[#0052FF] py-1">3. Les 5 Piliers</a>
              <a href="#methode" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-[#0052FF] py-1">4. La Méthode</a>
              <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="text-slate-300 hover:text-[#0052FF] py-1">5. Démos Interactives</a>
            </nav>
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-2 text-center rounded-lg border border-slate-700 text-slate-200">
                Connexion
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 py-2 text-center rounded-lg bg-[#0052FF] text-white font-black">
                Inscription
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH ANIMATED HEADLINE & BOUNCING 3D STICKERS            */}
      {/* ========================================================================= */}
      <section className="relative pt-6 pb-6 sm:pt-8 sm:pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Content Card */}
            <div className="lg:col-span-7 space-y-4 text-left relative">
              
              {/* Animated Floating 3D Stickers Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0052FF]/15 border border-[#0052FF]/30 text-[#0052FF] dark:text-[#38bdf8] text-xs font-black uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Excellence Académique 🇧🇯</span>
                </span>

                {/* Bouncing Streak Flame Sticker */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-black animate-sticker-bounce">
                  <Flame className="h-4 w-4 fill-amber-500" />
                  <span>Série BAC 2026</span>
                </div>

                {/* Wiggling Major Promo Sticker */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-xs font-black animate-sticker-wiggle">
                  <Sparkles className="h-4 w-4" />
                  <span>Major Promo</span>
                </div>

                {/* Target 20/20 Sticker */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-black animate-sticker-pop">
                  <Target className="h-3.5 w-3.5" />
                  <span>Objectif 20/20</span>
                </div>
              </div>

              {/* Large Animated Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-display">
                  Ne révise plus jamais seul.{' '}
                  <span className="headline-animated-gradient block sm:inline">
                    Apprends, collabore et réussis.
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className={`text-sm sm:text-lg leading-relaxed font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                FaciLivre réunit les <strong>micro-cours de 45s</strong>, les <strong>salons d&apos;étude silencieux</strong> (UAC, lycées), un <strong>tuteur IA</strong> et des <strong>duels de quiz</strong> pour transformer ton travail en résultats concrets.
              </p>

              {/* Live Status Bar */}
              <div className={`p-3 rounded-xl border flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold ${
                theme === 'dark' ? 'bg-[#0d131f] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-emerald-500 font-extrabold">1 840+ étudiants connectés en direct</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-[#0052FF]" />
                  <span>Calavi • Cotonou • Parakou</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/register"
                  className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-black text-white bg-[#0052FF] hover:bg-[#0041cc] active:scale-95 transition-all text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Rejoindre Gratuitement</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <a
                  href="#scroll-learn"
                  className={`px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Découvrir le Scroll &amp; Apprends</span>
                </a>
              </div>

            </div>

            {/* Right Hero Image Column with Bouncing 3D Sticker Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                <Image
                  src="/images/hero_benin.jpg"
                  alt="Étudiants FaciLivre Bénin"
                  width={700}
                  height={450}
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                  priority
                />
                
                {/* 3D Animated Trophy Sticker */}
                <div className="absolute top-3 right-3 p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-amber-500/50 text-white flex items-center gap-2 animate-sticker-bounce shadow-xl">
                  <Trophy className="h-6 w-6 text-amber-400" />
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Ligue UAC</span>
                    <span className="text-xs font-black text-amber-400">#1 EPAC Sprint</span>
                  </div>
                </div>

                {/* 3D Animated Live Focus Sticker */}
                <div className="absolute bottom-3 left-3 p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-emerald-500/50 text-white flex items-center gap-2 animate-sticker-wiggle shadow-xl">
                  <Radio className="h-5 w-5 text-emerald-400 animate-pulse" />
                  <div className="text-left">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Salon Calavi</span>
                    <span className="text-xs font-black text-emerald-400">48 en concentration</span>
                  </div>
                </div>

                {/* 3D Animated Rocket Sticker */}
                <div className="absolute top-3 left-3 p-2 rounded-xl bg-[#0052FF]/90 text-white flex items-center gap-1.5 animate-sticker-pop shadow-md">
                  <Rocket className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase">BAC &amp; Concours</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="font-extrabold text-sm sm:text-base font-display">L&apos;Écosystème FaciLivre Bénin</h3>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5 SPECIAL FEATURE: THE INTERACTIVE "SCROLL & APPRENDS" VERTICAL FEED    */}
      {/* ========================================================================= */}
      <section id="scroll-learn" className={`py-6 sm:py-10 border-y transition-colors ${
        theme === 'dark' ? 'bg-[#080e1a] border-blue-900/40' : 'bg-blue-50/70 border-blue-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          
          <div className="text-center max-w-3xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0052FF]/15 text-[#0052FF] dark:text-[#38bdf8] text-xs font-black uppercase tracking-wider">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>LE CONCEPT RÉVOLUTIONNAIRE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display">
              Tu Scrolles = Tu Apprends.
            </h2>
            <p className={`text-xs sm:text-base font-medium leading-relaxed max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Remplace le doom-scrolling passif par le <strong>smart-learning actif</strong>. Chaque swipe de 45 secondes te fait maîtriser une formule, une méthode ou un piège d&apos;examen.
            </p>
          </div>

          {/* Interactive TikTok-Style Micro-Lesson Phone Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl mx-auto">
            
            {/* Left Value Box */}
            <div className="lg:col-span-6 space-y-3.5 text-left">
              
              <div className={`p-4 rounded-2xl border ${
                theme === 'dark' ? 'bg-[#0c1322] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-rose-500 uppercase tracking-wider">Réseaux Sociaux Classiques</span>
                  <span className="text-xs font-bold text-slate-500">45 min</span>
                </div>
                <p className="text-xs text-slate-400">
                  Doom-scrolling passif ➔ Fatigue mentale ➔ Zéro notion retenue pour tes examens ❌
                </p>
              </div>

              <div className={`p-4 rounded-2xl border-2 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-[#0c1424] to-[#0a1836] border-[#0052FF] text-white shadow-lg shadow-blue-500/10' 
                  : 'bg-white border-[#0052FF] text-slate-900 shadow-md'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#0052FF] dark:text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                    Le Scroll &amp; Apprends FaciLivre
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-500 text-black">45 min</span>
                </div>
                <p className="text-xs font-semibold leading-relaxed">
                  15 micro-cours assimilés ➔ 3 quiz résolus ➔ +180 XP académique ➔ Confiance totale pour le BAC et l&apos;Université ✅
                </p>
              </div>

              {/* Feed navigation controls */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={prevReel}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronUp className="h-4 w-4" />
                  <span>Précédent</span>
                </button>
                <button
                  onClick={nextReel}
                  className="flex-1 py-2.5 rounded-xl text-xs font-black text-white bg-[#0052FF] hover:bg-[#0041cc] flex items-center justify-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Scroller vers la vidéo suivante</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

            </div>

            {/* Right Interactive Reel Player Phone */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[320px] rounded-3xl border-4 border-slate-800 bg-[#050912] p-4 aspect-[9/16] flex flex-col justify-between shadow-2xl overflow-hidden">
                
                {/* Background Subject Header */}
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="font-extrabold text-[10px] px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/20">
                    {currentReel.tag}
                  </span>
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className="p-1.5 rounded-full bg-black/60 text-white border border-white/20"
                    aria-label="Toggle Sound"
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                </div>

                {/* Main Reel Visual Content */}
                <div className="my-auto text-center space-y-3 z-10 py-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase text-white" style={{ backgroundColor: currentReel.color }}>
                    {currentReel.badge}
                  </div>
                  <h4 className="text-sm font-black text-white leading-snug font-display px-2">
                    {currentReel.title}
                  </h4>
                  
                  {/* Formula HUD Card */}
                  <div className="p-2.5 rounded-xl bg-black/85 border border-slate-700/80 text-emerald-400 font-mono text-xs shadow-inner">
                    {currentReel.formula}
                  </div>

                  <p className="text-[11px] text-slate-200 px-2 leading-relaxed bg-black/60 p-2 rounded-lg backdrop-blur-sm">
                    💡 <strong>Astuce :</strong> {currentReel.analogy}
                  </p>
                </div>

                {/* Bottom Creator & Actions */}
                <div className="flex items-end justify-between z-10 pt-2 border-t border-white/10">
                  <div className="text-left space-y-0.5">
                    <span className="font-extrabold text-xs text-white block">{currentReel.creator}</span>
                    <span className="text-[10px] text-slate-300 block">{currentReel.institution}</span>
                  </div>

                  {/* Right TikTok Action Icons */}
                  <div className="flex flex-col items-center gap-2.5">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="flex flex-col items-center text-[10px] text-white"
                    >
                      <div className={`p-2 rounded-full backdrop-blur-md transition-transform ${isLiked ? 'bg-rose-600 scale-110' : 'bg-black/60'}`}>
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-white' : 'text-white'}`} />
                      </div>
                      <span className="font-bold">{isLiked ? '2.9k' : currentReel.likes}</span>
                    </button>

                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className="flex flex-col items-center text-[10px] text-white"
                    >
                      <div className={`p-2 rounded-full backdrop-blur-md transition-transform ${isBookmarked ? 'bg-[#0052FF] scale-110' : 'bg-black/60'}`}>
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-white' : 'text-white'}`} />
                      </div>
                    </button>

                    <button
                      onClick={nextReel}
                      className="p-2 rounded-full bg-emerald-600 text-white animate-bounce shadow-md"
                      title="Vidéo suivante"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE VISION COMPARISON                                                  */}
      {/* ========================================================================= */}
      <section id="vision" className={`py-6 sm:py-8 border-y transition-colors ${
        theme === 'dark' ? 'bg-[#080d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0052FF]">Pourquoi FaciLivre ?</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              Changer la Réalité des Études au Bénin
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Nous ne reproduisons pas les plateformes d&apos;administration scolaire traditionnelles. FaciLivre part de tes besoins quotidiens d&apos;étudiant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            {/* Old Struggle Card */}
            <div className={`p-4 sm:p-5 rounded-xl border ${
              theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  <X className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-500 font-display">Les Révisions Solitaires</h3>
                  <p className="text-[11px] text-slate-400">Le modèle qui décourage les étudiants</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>Être bloqué seul chez soi sur un devoir ou un chapitre sans aide immédiate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>Se perdre entre 10 groupes WhatsApp distrayants et des PDF mal scannés.</span>
                </li>
              </ul>
            </div>

            {/* FaciLivre Way Card */}
            <div className={`p-4 sm:p-5 rounded-xl border-2 ${
              theme === 'dark' 
                ? 'bg-[#0c1424] border-[#0052FF] text-white' 
                : 'bg-white border-[#0052FF] text-slate-900 shadow-sm'
            }`}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-2 rounded-lg bg-[#0052FF]/10 text-[#0052FF] border border-[#0052FF]/30">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0052FF] font-display">L&apos;Environnement FaciLivre</h3>
                  <p className="text-[11px] text-slate-400">Social, interactif, stimulant et mesurable</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong className="text-emerald-400">Salons silencieux :</strong> 25 minutes de focus aux côtés de dizaines de camarades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span><strong className="text-emerald-400">Tuteur IA 24/7 :</strong> Résumés de polycopiés, analogies concrètes et quiz sur-mesure.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE 5 PILLARS BENTO GRID                                               */}
      {/* ========================================================================= */}
      <section id="piliers" className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0052FF]">Fondations de la Réussite</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
              Les Cinq Piliers Fondamentaux
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Chaque fonctionnalité a été conçue pour optimiser tes révisions et t&apos;amener au sommet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            
            {/* Pillar 1 */}
            <div className={`p-4 rounded-xl border sharp-card relative overflow-hidden ${
              theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-lg bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="p-1 rounded-md bg-[#0052FF]/10 text-[#0052FF] animate-sticker-bounce">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
              <span className="text-[10px] font-black text-[#0052FF] uppercase tracking-wider">Pilier 01</span>
              <h3 className="text-base font-bold my-1 font-display">Discipline &amp; Pomodoro</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Salons d&apos;étude synchronisés (25/5). Développe des habitudes régulières sans céder à la dispersion.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className={`p-4 rounded-xl border sharp-card relative overflow-hidden ${
              theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Brain className="h-5 w-5" />
                </div>
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 animate-sticker-wiggle">
                  <Lightbulb className="h-4 w-4" />
                </div>
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Pilier 02</span>
              <h3 className="text-base font-bold my-1 font-display">IA Pédagogique Contextuelle</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transforme tes cours et polycopiés en flashcards interactives et explications claires.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className={`p-4 rounded-xl border sharp-card relative overflow-hidden ${
              theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="p-1 rounded-md bg-amber-500/10 text-amber-500 animate-sticker-bounce">
                  <Flame className="h-4 w-4" />
                </div>
              </div>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-wider">Pilier 03</span>
              <h3 className="text-base font-bold my-1 font-display">Duels de Quiz &amp; Classements</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Défie tes pairs dans des quiz rapides par matière et monte dans le classement de ta filière.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className={`p-4 rounded-xl border sharp-card relative overflow-hidden ${
              theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-lg bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div className="p-1 rounded-md bg-[#0052FF]/10 text-[#0052FF] animate-sticker-pop">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <span className="text-[10px] font-black text-[#0052FF] uppercase tracking-wider">Pilier 04</span>
              <h3 className="text-base font-bold my-1 font-display">Communauté &amp; Créateurs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apprends des meilleurs majors de promotion, des professeurs du pays et des créateurs passionnés.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className={`p-4 rounded-xl border sharp-card sm:col-span-2 relative overflow-hidden ${
              theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-500 animate-sticker-bounce">
                  <Target className="h-4 w-4" />
                </div>
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-wider">Pilier 05</span>
              <h3 className="text-base font-bold my-1 font-display">Excellence Académique Réelle</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nous mesurons l&apos;impact de FaciLivre par tes notes, ta réussite aux examens et concours, et ta confiance intellectuelle.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE 5-STEP METHOD                                                      */}
      {/* ========================================================================= */}
      <section id="methode" className={`py-6 sm:py-8 border-y ${
        theme === 'dark' ? 'bg-[#080d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0052FF]">Cycle Pédagogique</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              La Méthode en 5 Étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {[
              { num: '01', title: 'Découvrir', desc: '45s pour comprendre l&apos;essentiel d&apos;une notion en vidéo.' },
              { num: '02', title: 'Comprendre', desc: 'Explication approfondie avec l&apos;aide du tuteur IA.' },
              { num: '03', title: 'Pratiquer', desc: 'Exercices types et flashcards de mémorisation active.' },
              { num: '04', title: 'Tester', desc: 'Duels de quiz contre le chrono pour ancrer les connaissances.' },
              { num: '05', title: 'Progresser', desc: 'Diagnostic de tes lacunes pour viser la mention.' },
            ].map((step, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border ${
                  theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-lg font-black text-[#0052FF] mb-1 font-display">{step.num}</div>
                <h3 className="text-xs font-bold mb-1">{step.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE FEATURE PLAYGROUND                                         */}
      {/* ========================================================================= */}
      <section id="demo" className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-500">Outils en Direct</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
              Essaie FaciLivre Maintenant
            </h2>
            <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Clique sur les onglets ci-dessous pour tester l&apos;expérience étudiante.
            </p>
          </div>

          {/* Tab Selector Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('shorts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'shorts' ? 'bg-[#0052FF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Shorts (45s)
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ai' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Tuteur IA
            </button>

            <button
              onClick={() => setActiveTab('study')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'study' ? 'bg-[#0052FF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Salon Calavi
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'quiz' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              4. Quiz Duel
            </button>
          </div>

          {/* Tab Content Box */}
          <div className={`p-4 sm:p-5 rounded-2xl border max-w-4xl mx-auto ${
            theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            
            {/* TAB 1: SHORTS */}
            {activeTab === 'shorts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    BAC C &amp; D Mathématiques
                  </span>
                  <h3 className="text-xl font-bold font-display">Calcul de Primitives en 45s</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Les meilleurs professeurs et majors de promo décortiquent les astuces de cours en vidéo verticale.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/register"
                      className="inline-flex px-4 py-2 rounded-lg text-xs font-bold bg-[#0052FF] text-white hover:bg-[#0041cc]"
                    >
                      Voir le Fil de Micro-Cours
                    </Link>
                  </div>
                </div>

                <div className="mx-auto w-full max-w-[240px] rounded-xl border border-slate-700 bg-slate-950 p-3 aspect-[9/14] flex flex-col justify-between shadow-md">
                  <div className="flex items-center justify-between text-[10px] text-white/80">
                    <span className="font-bold bg-black/60 px-1.5 py-0.5 rounded">#MathsBAC</span>
                    <Volume2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-center space-y-1.5">
                    <div className="h-10 w-10 mx-auto rounded-full bg-[#0052FF] flex items-center justify-center text-white">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 bg-black/80 p-1.5 rounded">
                      ∫ [u&apos;(x)/u(x)] dx = ln|u(x)| + C
                    </div>
                    <p className="text-[9px] text-slate-300">Astuce primitives</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white">
                    <span className="font-bold">Prof. Houénou (Bénin)</span>
                    <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI TUTOR */}
            {activeTab === 'ai' && (
              <div className="space-y-2.5 text-left">
                <div>
                  <h3 className="text-lg font-bold font-display">Tuteur IA Pédagogique</h3>
                  <p className="text-xs text-slate-400">Clique sur une question pour tester la clarté :</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleSimulateAi(
                      'Explique-moi le théorème de Thalès en 2 phrases',
                      '💡 Le théorème de Thalès indique que lorsque deux droites parallèles coupent deux droites sécantes, elles forment des triangles aux proportions parfaitement égales. C&apos;est le principe de l&apos;agrandissement ou de la réduction à l&apos;échelle !'
                    )}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-left"
                  >
                    📐 &quot;Thalès en 2 phrases&quot;
                  </button>

                  <button
                    onClick={() => handleSimulateAi(
                      'Fais-moi 3 flashcards sur la mitose (BAC D)',
                      '📝 Flashcards SVT BAC D :\n1. Prophase : Condensation de l&apos;ADN en chromosomes visibles.\n2. Métaphase : Alignement équatorial des chromosomes.\n3. Anaphase : Séparation des chromatides vers les pôles opposés.'
                    )}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#0052FF]/10 text-[#0052FF] dark:text-sky-400 border border-[#0052FF]/30 hover:bg-[#0052FF]/20 text-left"
                  >
                    🧬 &quot;Mitose SVT (BAC D)&quot;
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-sans min-h-[120px]">
                  {aiPrompt ? (
                    <div className="space-y-1.5">
                      <div className="font-bold text-emerald-400 text-xs">Question : &quot;{aiPrompt}&quot;</div>
                      {isAiTyping ? (
                        <div className="text-slate-400 flex items-center gap-1.5 text-xs">
                          <span className="animate-spin h-3 w-3 border-2 border-emerald-400 border-t-transparent rounded-full" />
                          <span>Génération de l&apos;explication...</span>
                        </div>
                      ) : (
                        <div className="text-slate-200 whitespace-pre-line leading-relaxed bg-slate-900 p-2.5 rounded-lg text-xs sm:text-sm">
                          {aiResponse}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-500 py-4 text-xs">
                      Choisis une question ci-dessus pour lancer la démo.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: STUDY ROOM */}
            {activeTab === 'study' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Salon Calavi • En direct
                  </span>
                  <h3 className="text-xl font-bold font-display">Salon d&apos;Étude Silencieux</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {studyParticipants} étudiants sont connectés. Active le chrono pour te concentrer.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold text-white transition-colors ${
                        isTimerRunning ? 'bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {isTimerRunning ? 'Pause' : 'Lancer Focus (25m)'}
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(25 * 60);
                        setIsTimerRunning(false);
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-bold border border-slate-700 text-slate-300"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Focus Pomodoro</span>
                  <div className="text-3xl sm:text-4xl font-mono font-black text-emerald-400">
                    {formatTimer(timerSeconds)}
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1.5 border-t border-slate-800 flex items-center justify-between">
                    <span>En direct :</span>
                    <span className="font-bold text-emerald-400">Sènami, Koffi +192</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-2.5 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-display">Duel de Quiz</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">+50 XP</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                  <p className="text-xs sm:text-sm font-bold text-slate-200">
                    Quelle structure informatique fonctionne selon le principe &quot;Premier Entré, Premier Sorti&quot; (FIFO) ?
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 0, text: 'A. La Pile (LIFO)' },
                      { id: 1, text: 'B. La File (Queue / FIFO)', isCorrect: true },
                      { id: 2, text: 'C. L&apos;Arbre Binaire' },
                      { id: 3, text: 'D. Table de Hachage' },
                    ].map((opt) => {
                      const isSelected = selectedQuizAnswer === opt.id;
                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300';
                      if (quizSubmitted) {
                        if (opt.isCorrect) btnStyle = 'bg-emerald-600 text-white font-bold border-emerald-500';
                        else if (isSelected && !opt.isCorrect) btnStyle = 'bg-rose-600 text-white border-rose-500';
                      } else if (isSelected) {
                        btnStyle = 'bg-[#0052FF] text-white font-bold border-[#0052FF]';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            if (!quizSubmitted) {
                              setSelectedQuizAnswer(opt.id);
                              setQuizSubmitted(true);
                            }
                          }}
                          className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span dangerouslySetInnerHTML={{ __html: opt.text }} />
                          {quizSubmitted && opt.isCorrect && <CheckCircle2 className="h-3.5 w-3.5 text-white shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-400 flex items-center justify-between font-bold">
                      <span>{selectedQuizAnswer === 1 ? '🎉 Bravo ! C&apos;est la bonne réponse.' : '💡 Réponse : B (La File / FIFO)'}</span>
                      <button
                        onClick={() => {
                          setSelectedQuizAnswer(null);
                          setQuizSubmitted(false);
                        }}
                        className="underline text-xs"
                      >
                        Recommencer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. STUDENT STORIES WITH STUDY IMAGE EMBEDDED                              */}
      {/* ========================================================================= */}
      <section id="communaute" className={`py-6 sm:py-8 border-y ${
        theme === 'dark' ? 'bg-[#080d16] border-slate-800/80' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#0052FF]">Témoignages</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              La Parole aux Étudiants
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className="text-xs sm:text-sm text-slate-300 italic mb-3 leading-relaxed">
                &quot;Le salon silencieux Calavi m&apos;a permis de valider mon semestre à l&apos;EPAC sans rattrapages. L&apos;ambiance collective change tout.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[#0052FF] text-white font-black text-xs flex items-center justify-center">
                  KA
                </div>
                <div>
                  <h4 className="text-xs font-bold">Koffi A.</h4>
                  <p className="text-[10px] text-slate-400">Génie Logiciel • EPAC Calavi</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className="text-xs sm:text-sm text-slate-300 italic mb-3 leading-relaxed">
                &quot;Pour le BAC D, les micro-cours de SVT et de Physique m&apos;ont permis de réviser chaque matin. J&apos;ai obtenu ma mention Très Bien !&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  SD
                </div>
                <div>
                  <h4 className="text-xs font-bold">Sènami D.</h4>
                  <p className="text-[10px] text-slate-400">Major BAC D • Cotonou</p>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#0c121d] border-slate-800' : 'bg-white border-slate-200'}`}>
              <p className="text-xs sm:text-sm text-slate-300 italic mb-3 leading-relaxed">
                &quot;L&apos;IA de FaciLivre me crée des QCM à partir de mes cours d&apos;anatomie. C&apos;est devenu mon rituel de révision incontournable.&quot;
              </p>
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center">
                  FO
                </div>
                <div>
                  <h4 className="text-xs font-bold">Faridath O.</h4>
                  <p className="text-[10px] text-slate-400">Médecine • FSS Cotonou</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Campus Study Image Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-lg mt-2">
            <Image
              src="/images/study_benin.jpg"
              alt="Groupe d'étude FaciLivre Bénin"
              width={1000}
              height={450}
              className="w-full h-[200px] sm:h-[280px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white text-left">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500 text-black w-max mb-1">
                ÉTUDIER ENSEMBLE
              </span>
              <h3 className="font-extrabold text-sm sm:text-base font-display">La force du collectif pour réussir</h3>
              <p className="text-xs text-slate-300 max-w-md hidden sm:block">
                Des milliers d&apos;étudiants se motivent chaque jour dans les salons d&apos;étude virtuels.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CALL TO ACTION                                                         */}
      {/* ========================================================================= */}
      <section className="py-6 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0052FF] text-white space-y-3 text-center shadow-lg">
            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-black/30 text-white">
              100% GRATUIT POUR LES ÉTUDIANTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-display">
              Prêt à transformer tes études dès aujourd&apos;hui ?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
              Crée ton profil en 30 secondes. Rejoins les salons d&apos;étude silencieux, accède aux cours en vidéo et vise l&apos;excellence.
            </p>
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Link
                href="/register"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-white text-[#0052FF] hover:bg-slate-100 transition-all shadow-sm"
              >
                Créer Mon Compte Gratuit
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-700/70 hover:bg-blue-700 text-white border border-blue-400/40 transition-all"
              >
                Connexion
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. SHARP CLEAN FOOTER                                                     */}
      {/* ========================================================================= */}
      <footer className={`border-t pt-8 pb-6 transition-colors ${
        theme === 'dark' ? 'bg-[#05080e] border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-lg bg-[#0052FF] text-white flex items-center justify-center font-bold">
                  <GraduationCap className="h-3.5 w-3.5" />
                </div>
                <span className="font-extrabold text-sm text-white dark:text-white font-display">FaciLivre</span>
                <span className="text-[8px] font-black px-1.5 py-0.2 rounded bg-[#0052FF]/20 text-[#0052FF]">
                  BÉNIN
                </span>
              </div>
              <p className="leading-relaxed text-[11px] text-slate-400">
                L&apos;écosystème d&apos;excellence académique pour les élèves et étudiants.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-200 dark:text-slate-300 uppercase tracking-wider text-[11px]">Navigation</h4>
              <ul className="space-y-1 text-[11px]">
                <li><a href="#scroll-learn" className="hover:text-[#0052FF]">Scroll &amp; Apprends</a></li>
                <li><a href="#vision" className="hover:text-[#0052FF]">Vision &amp; Objectifs</a></li>
                <li><a href="#piliers" className="hover:text-[#0052FF]">Les 5 Piliers</a></li>
                <li><a href="#methode" className="hover:text-[#0052FF]">Méthode en 5 Étapes</a></li>
              </ul>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-200 dark:text-slate-300 uppercase tracking-wider text-[11px]">Accès</h4>
              <ul className="space-y-1 text-[11px]">
                <li><Link href="/login" className="hover:text-[#0052FF]">Connexion Étudiant</Link></li>
                <li><Link href="/register" className="hover:text-[#0052FF]">Inscription Gratuite</Link></li>
                <li><span className="text-slate-500">API Core (:4000)</span></li>
              </ul>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-200 dark:text-slate-300 uppercase tracking-wider text-[11px]">Engagement</h4>
              <p className="leading-relaxed text-[11px] text-slate-400">
                &quot;Rendre chaque minute de révision active et orientée vers la réussite.&quot;
              </p>
              <div className="text-[10px] font-bold text-[#0052FF] pt-0.5">
                © 2026 FaciLivre Bénin. Licence MIT.
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
            <span>Conçu pour la jeunesse ambitieuse du Bénin et d&apos;Afrique 🇧🇯 🌍</span>
            <span>Thème : {theme === 'dark' ? 'Mode Nuit' : 'Mode Jour'}</span>
          </div>

        </div>
      </footer>

    </div>
  );
}
