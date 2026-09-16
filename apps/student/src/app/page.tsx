'use client';

import React, { useEffect, useState } from 'react';
import { IHealthStatus } from '@facilivre/types';
import { apiClient } from '../lib/api';
import { Button, Card, Badge, StatusIndicator } from '@facilivre/ui';
import { 
  GraduationCap, 
  Activity, 
  Database, 
  Server, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Bell, 
  User, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function StudentHomePage() {
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.15),rgba(255,255,255,0))]">
      {/* Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                FaciLivre
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Student App
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs">
              <StatusIndicator
                status={loading ? 'pending' : error ? 'offline' : 'online'}
                label={loading ? 'Connecting' : error ? 'API Offline' : 'API Online'}
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
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="info" size="md" className="gap-1.5 py-1 px-3">
            <Sparkles className="h-3.5 w-3.5" /> Phase 0 Foundation Active
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">FaciLivre Student</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            The next-generation social-learning ecosystem. Short educational content, collaborative study rooms, AI-assisted learning, and interactive quizzes.
          </p>
        </section>

        {/* System Communication Status Card */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Diagnostic Card */}
          <Card variant="glass" className="lg:col-span-2 border-zinc-800/80 bg-zinc-900/40 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Backend Communication Status</h2>
                  <p className="text-xs text-zinc-400">Direct Next.js → NestJS API health communication</p>
                </div>
              </div>
              <Badge variant={error ? 'error' : health?.status === 'ok' ? 'success' : 'warning'}>
                {error ? 'Unavailable' : health?.status?.toUpperCase() || 'Checking'}
              </Badge>
            </div>

            {loading && !health && !error && (
              <div className="py-8 flex flex-col items-center justify-center text-zinc-400 text-sm gap-2">
                <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
                <span>Pinging NestJS API at http://localhost:4000/health...</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-rose-300">Connection Failed</h3>
                  <p className="text-xs text-rose-400/90">{error}</p>
                  <p className="text-xs text-zinc-400 mt-2">Ensure the NestJS backend is running on port 4000.</p>
                </div>
              </div>
            )}

            {health && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">API Endpoint</span>
                  <div className="text-sm font-semibold text-zinc-200">http://localhost:4000</div>
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Responding 200 OK
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">Database Engine</span>
                  <div className="text-sm font-semibold text-zinc-200 capitalize">
                    PostgreSQL ({health.database.status})
                  </div>
                  <span className="text-[11px] text-zinc-400">
                    {health.database.latencyMs !== undefined ? `${health.database.latencyMs}ms query latency` : 'Prisma client ready'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
                  <span className="text-xs text-zinc-500">Service Uptime</span>
                  <div className="text-sm font-semibold text-zinc-200">{health.uptime}s</div>
                  <span className="text-[11px] text-zinc-400">Environment: {health.environment}</span>
                </div>
              </div>
            )}

            <div className="text-xs text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-800/60">
              <span>Client target: <code className="text-zinc-300">@facilivre/api-client</code></span>
              <span>Last ping: {lastChecked ? lastChecked.toLocaleTimeString() : 'Pending'}</span>
            </div>
          </Card>

          {/* Quick Architecture Summary */}
          <Card variant="default" className="border-zinc-800/80 bg-zinc-900/40 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                <Database className="h-4 w-4 text-indigo-400" />
                <span>Architecture Boundaries</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Phase 0 guarantees clean isolation: Student Next.js application communicates exclusively through the NestJS API layer. Direct database access is strictly prohibited.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Student Portal</span>
                  <span className="text-blue-400 font-mono">:3000</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-400">Super Admin</span>
                  <span className="text-indigo-400 font-mono">:3001</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-400">NestJS Core API</span>
                  <span className="text-emerald-400 font-mono">:4000</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="secondary" size="sm" className="w-full text-xs">
                Phase 0 Foundation Verified
              </Button>
            </div>
          </Card>
        </section>

        {/* Future Modules Navigation Placeholders */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-200">Phase 1 & 2 Modules (Architectural Boundaries)</h2>
            <span className="text-xs text-zinc-500">Established Structure</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: 'Feed & Shorts', desc: 'Micro-learning vertical video feed', tag: 'Core Feed' },
              { icon: Compass, title: 'Explore & Search', desc: 'Subject discovery & curriculum topics', tag: 'Discovery' },
              { icon: Activity, title: 'Study Rooms', desc: 'Collaborative live sessions & Pomodoro', tag: 'Study' },
              { icon: Sparkles, title: 'AI Learning Tutor', desc: 'Adaptive AI explanations & summaries', tag: 'AI' },
              { icon: Bell, title: 'Notifications', desc: 'Activity & peer interaction updates', tag: 'Social' },
              { icon: User, title: 'Student Profile', desc: 'Learning progress, badges & identity', tag: 'Identity' },
            ].map((module, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-zinc-700/80 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
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
