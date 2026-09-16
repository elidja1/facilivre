'use client';

import React, { useEffect, useState } from 'react';
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
  Cpu
} from 'lucide-react';

export default function AdminHomePage() {
  const [health, setHealth] = useState<IHealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getHealth();
      setHealth(data);
      setLastChecked(new Date());
    } catch (err: any) {
      setError(err.message || 'Failed to connect to NestJS API');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                FaciLivre
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Super Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs">
              <StatusIndicator
                status={loading ? 'pending' : error ? 'offline' : 'online'}
                label={loading ? 'Verifying API' : error ? 'API Offline' : 'API Online'}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchHealth}
              disabled={loading}
              className="gap-2 text-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Sync Diagnostics
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Title */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="warning" size="sm">Phase 0 Architecture Foundation</Badge>
              <span className="text-xs text-zinc-500 font-mono">Port: 3001</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Super Admin Control Center
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Platform administration, system telemetry, moderation operations, and RBAC governance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900/60 border border-zinc-800 px-3 py-2 rounded-xl text-zinc-400">
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            <span>Role: SUPER_ADMIN</span>
          </div>
        </section>

        {/* Diagnostics & API Communication Test */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="glass" className="lg:col-span-2 border-zinc-800/80 bg-zinc-900/40 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">API Core Connection Telemetry</h2>
                  <p className="text-xs text-zinc-400">Next.js Super Admin → NestJS Backend (:4000)</p>
                </div>
              </div>
              <Badge variant={error ? 'error' : health?.status === 'ok' ? 'success' : 'warning'}>
                {error ? 'Unreachable' : health?.status?.toUpperCase() || 'Probing'}
              </Badge>
            </div>

            {loading && !health && !error && (
              <div className="py-8 flex flex-col items-center justify-center text-zinc-400 text-sm gap-2">
                <RefreshCw className="h-6 w-6 animate-spin text-indigo-500" />
                <span>Interrogating NestJS endpoint at http://localhost:4000/health...</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-rose-300">Backend Communication Interrupted</h3>
                  <p className="text-xs text-rose-400/90">{error}</p>
                  <p className="text-xs text-zinc-400 mt-2">Ensure NestJS API daemon is active on port 4000.</p>
                </div>
              </div>
            )}

            {health && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">API Health State</span>
                  <div className="text-sm font-semibold text-zinc-200 capitalize">
                    {health.status} ({health.version})
                  </div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Communication Verified
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">PostgreSQL Status</span>
                  <div className="text-sm font-semibold text-zinc-200 capitalize">
                    {health.database.status}
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    {health.database.latencyMs !== undefined ? `${health.database.latencyMs}ms latency` : 'Prisma client ready'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">System Uptime</span>
                  <div className="text-sm font-semibold text-zinc-200">{health.uptime}s</div>
                  <span className="text-[11px] text-zinc-400">Env: {health.environment}</span>
                </div>
              </div>
            )}

            <div className="text-xs text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <span>Client package: <code className="text-zinc-300">@facilivre/api-client</code></span>
              <span>Last Probe: {lastChecked ? lastChecked.toLocaleTimeString() : 'Pending'}</span>
            </div>
          </Card>

          {/* Governance & Monorepo Status */}
          <Card variant="default" className="border-zinc-800/80 bg-zinc-900/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                <Cpu className="h-4 w-4 text-indigo-400" />
                <span>Monorepo Topology</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Super Admin executes in isolated Next.js space without direct PostgreSQL bindings, maintaining strict backend-first data governance.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Apps Running</span>
                  <span className="font-mono text-zinc-200">Student, Admin, API</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Shared Packages</span>
                  <span className="font-mono text-zinc-200">types, ui, auth, client</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Database Engine</span>
                  <span className="font-mono text-indigo-400">PostgreSQL (Prisma)</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" size="sm" className="w-full text-xs">
              Super Admin Gateway Ready
            </Button>
          </Card>
        </section>

        {/* Admin Management Surfaces */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-200">Management Domains (Architectural Routing)</h2>
            <span className="text-xs text-zinc-500">Super Admin Modules</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: 'Users & Creators', desc: 'Manage student, teacher & creator accounts', tag: 'Identity' },
              { icon: Film, title: 'Content Governance', desc: 'Videos, posts, comments & metadata inspection', tag: 'Content' },
              { icon: FileCheck2, title: 'Moderation Queue', desc: 'Review user reports & automated flags', tag: 'Safety' },
              { icon: BookOpen, title: 'Curriculum & Subjects', desc: 'Academic taxonomy, levels & categories', tag: 'Academics' },
              { icon: BarChart3, title: 'Platform Analytics', desc: 'Engagement metrics & system throughput', tag: 'Analytics' },
              { icon: ScrollText, title: 'Audit Logs', desc: 'Immutable trail of administrative actions', tag: 'Compliance' },
              { icon: Sliders, title: 'Platform Settings', desc: 'Feature flags, policies & rate limits', tag: 'Config' },
              { icon: Lock, title: 'RBAC & Permissions', desc: 'Roles, capability grants & session policies', tag: 'Security' },
            ].map((module, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-all space-y-3 group"
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
