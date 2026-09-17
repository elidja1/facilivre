'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IHealthStatus } from '@facilivre/types';
import { apiClient } from '../lib/api';
import { Button, Card, Badge, StatusIndicator } from '@facilivre/ui';
import {
  ShieldAlert,
  Server,
  Database,
  Users,
  Film,
  FileCheck2,
  Sliders,
  BarChart3,
  ScrollText,
  BookOpen,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Cpu,
  KeyRound,
  ExternalLink,
  Sparkles,
  Zap,
  Layers,
  LogOut,
  Terminal,
  Info,
  Key,
  Globe,
  HelpCircle,
} from 'lucide-react';

interface SupabaseStatus {
  status: 'connected' | 'disconnected' | 'awaiting_configuration';
  latencyMs?: number;
  databaseUrlMasked?: string;
  tablesCount?: number;
  postgresVersion?: string;
  error?: string;
}

export default function AdminHomePage() {
  const router = useRouter();
  const [health, setHealth] = useState<IHealthStatus | null>(null);
  const [dbStatus, setDbStatus] = useState<SupabaseStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // Full Supabase configuration state
  const [customDbUrl, setCustomDbUrl] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [supabaseServiceKey, setSupabaseServiceKey] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const [testingDb, setTestingDb] = useState(false);
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
    details?: SupabaseStatus;
  } | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getHealth();
      setHealth(data);
      setLastChecked(new Date());

      try {
        const dbRes = await apiClient.get<SupabaseStatus>('/api/v1/admin/database/status');
        setDbStatus(dbRes);
      } catch {
        setDbStatus((data as any)?.database || null);
      }
    } catch (err: any) {
      setError(err.message || 'Impossible de contacter l\'API NestJS');
      setHealth(null);
      setDbStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleTestConnection = async () => {
    if (!customDbUrl) {
      alert('Veuillez saisir l\'URI de connexion PostgreSQL Supabase (DATABASE_URL) pour tester la base.');
      return;
    }
    setTestingDb(true);
    setTestResult(null);
    try {
      const res = await apiClient.post<SupabaseStatus>('/api/v1/admin/database/test', {
        databaseUrl: customDbUrl,
        supabaseUrl,
        supabaseAnonKey,
        supabaseServiceRoleKey: supabaseServiceKey,
      });
      if (res.status === 'connected') {
        setTestResult({
          success: true,
          message: `Connexion Supabase PostgreSQL réussie en ${res.latencyMs}ms ! (${res.tablesCount} tables existantes dans le schéma)`,
          details: res,
        });
      } else {
        setTestResult({
          success: false,
          message: `Échec de connexion : ${res.error || 'Vérifiez le mot de passe ou le host'}.`,
          details: res,
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Erreur lors du test de connexion.',
      });
    } finally {
      setTestingDb(false);
    }
  };

  const handleSaveConnection = async () => {
    if (!customDbUrl && !supabaseUrl && !supabaseAnonKey) {
      alert('Veuillez renseigner au moins une clé Supabase avant d\'enregistrer.');
      return;
    }
    setTestingDb(true);
    try {
      const res = await apiClient.post<any>('/api/v1/admin/database/save', {
        databaseUrl: customDbUrl,
        supabaseUrl,
        supabaseAnonKey,
        supabaseServiceRoleKey: supabaseServiceKey,
      });
      if (res.success) {
        alert('Toutes les clés Supabase ont été enregistrées avec succès !');
        fetchHealth();
      } else {
        alert(res.message || 'Impossible d\'enregistrer la configuration.');
      }
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la sauvegarde.');
    } finally {
      setTestingDb(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('facilivre_admin_token');
    localStorage.removeItem('facilivre_admin_user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.12),rgba(255,255,255,0))] font-sans pb-16">
      
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <ShieldAlert className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                FaciLivre
              </span>
              <span className="ml-2 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Super Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live API status */}
            <div className="hidden sm:flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs">
              <StatusIndicator
                status={loading ? 'pending' : error ? 'offline' : 'online'}
                label={loading ? 'Vérification API' : error ? 'API Hors-ligne' : 'API NestJS Connectée'}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchHealth}
              disabled={loading}
              className="gap-1.5 text-xs border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Title and Session Info */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="success" size="sm">Phase 1 • Infrastructure &amp; Base de Données</Badge>
              <span className="text-xs text-zinc-500 font-mono">Port API: :4000</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Panneau de Contrôle SuperAdmin
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Supervision de l&apos;API NestJS, configuration des clés Supabase et exécution des migrations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900/80 border border-zinc-800 px-3 py-2 rounded-xl text-zinc-300">
            <Lock className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>Connecté : <strong className="text-white">superadmin</strong> (SUPER_ADMIN)</span>
          </div>
        </section>

        {/* ── SUPABASE & POSTGRESQL CONFIGURATION HUB ────────────────────── */}
        <section className="bg-zinc-900/70 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-black/40 space-y-6 relative overflow-hidden">
          {/* Subtle top glow */}
          <div className="absolute top-0 right-0 w-80 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shadow-inner">
                <Database className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black text-white">
                    Configuration des Clés &amp; Base Supabase
                  </h2>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Prisma + Supabase API
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Renseigne ici tes clés de projet Supabase (PostgreSQL URI, Project URL, Anon Key, Service Key).
                </p>
              </div>
            </div>

            {/* Toggle guide button & Status pill */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="px-3 py-1.5 rounded-xl border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
                <span>{showHelp ? 'Masquer le guide' : 'Où trouver mes clés ?'}</span>
              </button>

              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                dbStatus?.status === 'connected'
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                  : dbStatus?.status === 'awaiting_configuration'
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
              }`}>
                <span className={`h-2 w-2 rounded-full ${
                  dbStatus?.status === 'connected' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`} />
                <span>
                  {dbStatus?.status === 'connected'
                    ? `Connecté (${dbStatus.latencyMs}ms)`
                    : dbStatus?.status === 'awaiting_configuration'
                    ? 'Configuration requise'
                    : 'Déconnecté'}
                </span>
              </div>
            </div>
          </div>

          {/* Collapsible Supabase Guide */}
          {showHelp && (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-3 text-xs text-indigo-200 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Info className="h-4 w-4 text-indigo-400" />
                <span>Guide : Comment récupérer tes clés sur Supabase.com (en 2 clics)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-zinc-300">
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-indigo-500/20 space-y-1">
                  <p className="font-bold text-indigo-300">1. Pour la DATABASE_URL (URI PostgreSQL) :</p>
                  <p className="text-[11px] leading-relaxed">
                    Sur ton dashboard Supabase ➔ Clique sur l&apos;icône ⚙️ <strong>Project Settings</strong> ➔ <strong>Database</strong> ➔ Descends jusqu&apos;à <strong>Connection string</strong> ➔ Sélectionne l&apos;onglet <strong>URI</strong> (mode Transaction ou Session).
                  </p>
                  <p className="font-mono text-[10px] text-zinc-400 bg-zinc-900 p-1.5 rounded">
                    postgresql://postgres.[ref]:[mdp]@aws-0-[region].pooler.supabase.com:6543/postgres
                  </p>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-lg border border-indigo-500/20 space-y-1">
                  <p className="font-bold text-indigo-300">2. Pour le Project URL &amp; Clés Anon / Service :</p>
                  <p className="text-[11px] leading-relaxed">
                    Sur ton dashboard Supabase ➔ Clique sur ⚙️ <strong>Project Settings</strong> ➔ <strong>API</strong> ➔ Tu trouveras :
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-zinc-400 space-y-0.5">
                    <li><strong>Project URL :</strong> <code>https://xxxxxxxx.supabase.co</code></li>
                    <li><strong>anon (public) :</strong> <code>eyJhbGciOi...</code></li>
                    <li><strong>service_role (secret) :</strong> <code>eyJhbGciOi...</code></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Current Supabase Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">État Connexion PostgreSQL</span>
              <div className="text-sm font-bold text-zinc-200 capitalize">
                {dbStatus?.status === 'connected' ? '✅ En ligne & Opérationnel' : '⚠️ Clés en attente'}
              </div>
              <p className="text-[11px] text-zinc-500 font-mono truncate">
                {dbStatus?.databaseUrlMasked || 'Non défini'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Tables dans la Base</span>
              <div className="text-sm font-bold text-zinc-200">
                {dbStatus?.tablesCount !== undefined ? `${dbStatus.tablesCount} tables` : '0 table'}
              </div>
              <p className="text-[11px] text-zinc-400">
                {dbStatus?.tablesCount ? 'Schéma synchronisé avec Prisma' : 'Prêt pour première migration'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1">
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Moteur Base de Données</span>
              <div className="text-sm font-bold text-indigo-400 truncate">
                {dbStatus?.postgresVersion ? dbStatus.postgresVersion.slice(0, 25) + '…' : 'PostgreSQL 15 / Supabase'}
              </div>
              <p className="text-[11px] text-zinc-500">
                Pooler Transaction 6543 / Direct 5432
              </p>
            </div>
          </div>

          {/* 4 Keys Form */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-indigo-400" />
              <span>Champs de Configuration Supabase :</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. DATABASE_URL */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>1. URL de Connexion PostgreSQL (DATABASE_URL) <span className="text-indigo-400">*Requis pour Prisma &amp; Migrations</span></span>
                  <span className="text-zinc-500 text-[11px]">Settings ➔ Database ➔ URI</span>
                </label>
                <input
                  type="password"
                  value={customDbUrl}
                  onChange={(e) => setCustomDbUrl(e.target.value)}
                  placeholder="postgresql://postgres.xxxx:your_password@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                />
              </div>

              {/* 2. NEXT_PUBLIC_SUPABASE_URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>2. Supabase Project URL</span>
                  <span className="text-zinc-500 text-[11px]">Settings ➔ API</span>
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xxxxxxxxxxxx.supabase.co"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* 3. NEXT_PUBLIC_SUPABASE_ANON_KEY */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>3. Supabase Anon Key (Public)</span>
                  <span className="text-zinc-500 text-[11px]">Pour le Frontend &amp; Auth</span>
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* 4. SUPABASE_SERVICE_ROLE_KEY */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center justify-between">
                  <span>4. Supabase Service Role Key (Secret Backend)</span>
                  <span className="text-zinc-500 text-[11px]">Pour les droits administratifs NestJS</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="password"
                    value={supabaseServiceKey}
                    onChange={(e) => setSupabaseServiceKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.secret..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-950 text-white placeholder:text-zinc-600 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testingDb}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 disabled:opacity-60"
              >
                {testingDb ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                Tester la Connexion PostgreSQL
              </button>
              <button
                type="button"
                onClick={handleSaveConnection}
                disabled={testingDb}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 disabled:opacity-60"
              >
                <CheckCircle2 className="h-4 w-4" />
                Enregistrer Toutes les Clés
              </button>
            </div>

            {/* Test result message */}
            {testResult && (
              <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border ${
                testResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
              }`}>
                {testResult.success ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{testResult.message}</p>
                  {testResult.details?.postgresVersion && (
                    <p className="font-mono text-[11px] text-zinc-400 mt-1">
                      Version Serveur : {testResult.details.postgresVersion}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Migration CLI Cheat Sheet */}
          <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <span>Commandes de Migration Automatique (Monorepo FaciLivre) :</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">npm run db:push</span>
                <span className="text-zinc-500 text-[10px]">Appliquer le schéma directement</span>
              </div>
              <div className="bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">npm run db:migrate</span>
                <span className="text-zinc-500 text-[10px]">Créer une migration versionnée</span>
              </div>
              <div className="bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">npm run db:studio</span>
                <span className="text-zinc-500 text-[10px]">Visualiseur Prisma Studio</span>
              </div>
              <div className="bg-zinc-900/90 p-2.5 rounded-lg border border-zinc-800/80 flex items-center justify-between">
                <span className="text-zinc-300">npm run db:generate</span>
                <span className="text-zinc-500 text-[10px]">Régénérer les types TypeScript</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIAGNOSTICS & SYSTEM TELEMETRY ──────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2 border-zinc-800/80 bg-zinc-900/40 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Télémétrie API NestJS</h2>
                  <p className="text-xs text-zinc-400">Communication Next.js SuperAdmin → NestJS Backend (:4000)</p>
                </div>
              </div>
              <Badge variant={error ? 'error' : health?.status === 'ok' ? 'success' : 'warning'}>
                {error ? 'Déconnecté' : health?.status?.toUpperCase() || 'Vérification'}
              </Badge>
            </div>

            {loading && !health && !error && (
              <div className="py-8 flex flex-col items-center justify-center text-zinc-400 text-sm gap-2">
                <RefreshCw className="h-6 w-6 animate-spin text-indigo-500" />
                <span>Interrogation du backend à http://localhost:4000/health…</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-rose-300">Communication API Interrompue</h3>
                  <p className="text-xs text-rose-400/90">{error}</p>
                  <p className="text-xs text-zinc-400 mt-2">Vérifiez que le serveur NestJS tourne sur le port 4000.</p>
                </div>
              </div>
            )}

            {health && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">Santé API</span>
                  <div className="text-sm font-semibold text-zinc-200 capitalize">
                    {health.status} (v{health.version})
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Communication OK
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">Base de Données</span>
                  <div className="text-sm font-semibold text-zinc-200 capitalize">
                    {health.database?.status || 'Active'}
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    {health.database?.latencyMs !== undefined ? `${health.database.latencyMs}ms latence` : 'Prisma Client prêt'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">Uptime Serveur</span>
                  <div className="text-sm font-semibold text-zinc-200">{health.uptime}s</div>
                  <span className="text-[11px] text-zinc-400">Env: {health.environment}</span>
                </div>
              </div>
            )}

            <div className="text-xs text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <span>Client HTTP : <code className="text-zinc-300">@facilivre/api-client</code></span>
              <span>Dernier contrôle : {lastChecked ? lastChecked.toLocaleTimeString() : 'En attente'}</span>
            </div>
          </Card>

          {/* Student Portal & Topology Status */}
          <Card variant="default" className="border-zinc-800/80 bg-zinc-900/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm">
                <Cpu className="h-4 w-4 text-indigo-400" />
                <span>Portails &amp; Déploiement</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Le portail étudiant pointe vers l&apos;API de production Vercel / Cloud.
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">Portail Étudiant :</span>
                  <span className="text-sky-400 text-[11px] break-all">http://localhost:3000</span>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold block">API Production Vercel :</span>
                  <span className="text-emerald-400 text-[11px] break-all">https://facilivre-ad7je7o65-makouelijah2-1845.vercel.app/</span>
                </div>
              </div>
            </div>

            <Link
              href="http://localhost:3000"
              target="_blank"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Ouvrir FaciLivre Étudiant</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </section>

        {/* ── ADMIN MANAGEMENT MODULES ──────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-200">Modules d&apos;Administration FaciLivre</h2>
            <span className="text-xs text-zinc-500">Prêts pour Phase 1</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: 'Utilisateurs & Profils', desc: 'Gestion des comptes étudiants, créateurs et professeurs.', tag: 'Identité' },
              { icon: Film, title: 'Scroll & Apprends', desc: 'Gestion des micro-cours vidéo, posts et commentaires.', tag: 'Contenu' },
              { icon: FileCheck2, title: 'Modération & Signalements', desc: 'Validation des contenus communautaires et sécurité.', tag: 'Sécurité' },
              { icon: BookOpen, title: 'Programmes & Matières', desc: 'Taxonomie académique (Bénin, Francophone, Anglophone).', tag: 'Pédagogie' },
              { icon: BarChart3, title: 'Statistiques & Engagement', desc: 'Métriques d\'utilisation, taux de réussite aux quiz.', tag: 'Analyses' },
              { icon: ScrollText, title: 'Journaux d\'Audit', desc: 'Historique des actions administratives.', tag: 'Conformité' },
              { icon: Sliders, title: 'Paramètres Plateforme', desc: 'Configuration des limites et modes d\'apprentissage.', tag: 'Config' },
              { icon: Lock, title: 'Rôles & Permissions (RBAC)', desc: 'Attribution des privilèges administrateurs.', tag: 'Accès' },
            ].map((module, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-all space-y-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                    <module.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800/40">
                    {module.tag}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">{module.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{module.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
