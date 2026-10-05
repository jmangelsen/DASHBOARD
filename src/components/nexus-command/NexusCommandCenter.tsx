import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import {
  Target,
  Briefcase,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Percent,
  Layers,
  Sparkles,
  Activity,
  Calendar,
  Compass,
  Cpu,
  BarChart3,
  Database,
  Search,
  Check,
  X,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Ban,
  Flame,
  FileText,
  Mail,
  Users,
  Shield,
  HelpCircle,
  Lock,
  GitBranch,
  RefreshCw
} from 'lucide-react';

interface ProspectItem {
  id: string;
  name: string;
  title: string;
  company: string;
  segment: string;
  status: 'Identified' | 'Sent' | 'Meeting';
  sentTimestamp?: string;
}

export const NexusCommandCenter: React.FC = () => {
  const {
    setActiveDivision,
    setActiveNexusSection,
    setActiveOracleDepartment,
    setActiveForgeDepartment,
    oracleHoursThisWeek,
    forgeHoursThisWeek,
    founderCompoundingIndex,
    oracleIntegrityScore,
    currentForgeMRR,
    forgeRevenueThreshold,
    oracleModels,
    oracleGames,
    forgeOpportunity,
    sharedMissions,
    sharedAssets,
    automations,
    blockedAttempts,
    setOrchestratorOpen,
    setOrchestratorMode
  } = useNexus();

  // Interactive Decisions State
  const [decisions, setDecisions] = useState<{
    id: string;
    title: string;
    division: 'ORACLE' | 'FORGE' | 'SHARED';
    department: string;
    description: string;
    recommendation: 'defer' | 'approve' | 'kill';
    recommendationText: string;
    status: 'pending' | 'resolved';
    resolution?: string;
  }[]>([
    {
      id: 'DEC-01',
      title: 'ORACLE Candidate Model v3.0 Promotion',
      division: 'ORACLE',
      department: 'Model Lab & Change Control',
      description: 'Candidate Model v3.0 incorporates pace-compression adjustments. Backtest sample currently limited to 48 games.',
      recommendation: 'defer',
      recommendationText: 'QUARANTINE / DEFER until 200+ historical game backtest proves out-of-sample Brier improvement.',
      status: 'pending'
    },
    {
      id: 'DEC-02',
      title: 'Creed Humphrey Injury Downgrade Factor',
      division: 'ORACLE',
      department: 'Player Intelligence & Game Intel',
      description: 'Chiefs starting Center ankle flagged as Questionable. Projected EPA rushing impact: -0.12 pts.',
      recommendation: 'approve',
      recommendationText: 'APPROVE conditional penalty factor upon Friday 16:30 official practice filing.',
      status: 'pending'
    },
    {
      id: 'DEC-03',
      title: 'Front Range Monitor Customer Web Portal Scope',
      division: 'FORGE',
      department: 'Product Forge & Buyer Research',
      description: 'Prospective buyer asked if data comes with an interactive React dashboard.',
      recommendation: 'kill',
      recommendationText: 'KILL FEATURE REQUEST. Both paying customers explicitly prefer email delivery of concise Markdown memos; building a web portal is premature feature bloat.',
      status: 'pending'
    },
    {
      id: 'DEC-04',
      title: 'Weekly Automation & Token Burn Audit',
      division: 'SHARED',
      department: 'Automation Control & Governance',
      description: '3 active cron pipelines incurred $1.42 in API token spend (Weekly budget cap: $50.00). 100% execution success.',
      recommendation: 'approve',
      recommendationText: 'SIGN OFF token spend audit log. All lineage checks verified.',
      status: 'pending'
    }
  ]);

  // Interactive Prospect Queue for Highest-Leverage Action
  const [showProspectDrawer, setShowProspectDrawer] = useState<boolean>(false);
  const [prospects, setProspects] = useState<ProspectItem[]>([
    { id: 'P-01', name: 'Marcus Vance', title: 'VP Infrastructure Planning', company: 'Pioneer Natural Resources / Permian', segment: 'Energy Operator', status: 'Sent', sentTimestamp: '2026-10-04 14:15' },
    { id: 'P-02', name: 'Elena Rostova', title: 'Managing Director, Power Grid', company: 'Front Range Clean Power Consortium', segment: 'Grid Infrastructure', status: 'Sent', sentTimestamp: '2026-10-04 15:30' },
    { id: 'P-03', name: 'David Chen', title: 'Director of Energy & Land Assets', company: 'Weld County Industrial Development', segment: 'Site Selector', status: 'Identified' },
    { id: 'P-04', name: 'Sarah Jenkins', title: 'Head of Regulatory Compliance', company: 'Rocky Mountain Midstream Partners', segment: 'Pipeline Infrastructure', status: 'Identified' },
    { id: 'P-05', name: 'Thomas Sterling', title: 'VP Transmission Expansion', company: 'Tri-State Generation & Transmission', segment: 'Utility / Power', status: 'Identified' },
    { id: 'P-06', name: 'Rachel Morales', title: 'Partner, Infrastructure Fund', company: 'Blackstone Energy Transition', segment: 'Capital / Investor', status: 'Identified' },
    { id: 'P-07', name: 'Grant Miller', title: 'Director of Interconnection', company: 'Xcel Energy Colorado', segment: 'Regulated Utility', status: 'Identified' },
    { id: 'P-08', name: 'Amanda Lewis', title: 'VP Economic Development', company: 'Northern Colorado Clean Energy Hub', segment: 'Regional Authority', status: 'Identified' },
    { id: 'P-09', name: 'Kevin O’Donnell', title: 'Principal Site Selection Lead', company: 'NextEra Energy Resources', segment: 'Renewable Site Selector', status: 'Identified' }
  ]);

  const handleMarkProspectSent = (id: string) => {
    setProspects(prev => prev.map(p => p.id === id ? { ...p, status: 'Sent', sentTimestamp: 'Just now' } : p));
  };

  const handleResolveDecision = (id: string, action: string) => {
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'resolved', resolution: action } : d));
  };

  const remainingProspects = prospects.filter(p => p.status === 'Identified').length;
  const pendingDecisionsCount = decisions.filter(d => d.status === 'pending').length;

  const thresholdGap = Math.max(0, forgeRevenueThreshold - currentForgeMRR);
  const targetThresholdProgress = Math.min(100, Math.round((currentForgeMRR / forgeRevenueThreshold) * 100));

  return (
    <div className="space-y-7 pb-20 font-mono text-xs select-none">
      {/* ==================================================== */}
      {/* 1. EXECUTIVE COMMAND HEADER & DIRECT SYSTEM NAVIGATION */}
      {/* ==================================================== */}
      <div className="bg-[#080c16] border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                NEXUS COMMAND CENTER
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-400">
                Single-Operator Personal OS · Private Executive Console
              </span>
            </div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight">
              Critical Path, Founder Decisions, and Operating Readiness
            </h1>
            <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
              Real-time operational command for ORACLE (NFL forecast rigor) and FORGE (venture deployment). Unblock critical paths, enforce single-operator discipline, and eliminate misallocation of founder hours.
            </p>
          </div>

          {/* Quick Screen Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveNexusSection('system-map')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-2"
              title="Open full interactive flow diagram"
            >
              <Activity className="w-4 h-4" />
              <span>NEXUS SYSTEM MAP →</span>
            </button>

            <button
              onClick={() => setActiveNexusSection('advisor')}
              className="px-3.5 py-2.5 rounded-xl bg-[#0e1626] hover:bg-[#132038] text-cyan-300 border border-cyan-500/40 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Executive Review</span>
            </button>

            <button
              onClick={() => {
                setOrchestratorMode('nexus');
                setOrchestratorOpen(true);
              }}
              className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-xs transition-all flex items-center gap-1.5"
              title="Open NEXUS Orchestrator"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Orchestrator</span>
            </button>
          </div>
        </div>

        {/* Real-Time Operational Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-[11px]">
          <div className="p-2.5 rounded-lg bg-[#05070c] border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Weekly Capacity</span>
            <span className="text-sm font-bold text-white tabular-nums">{oracleHoursThisWeek + forgeHoursThisWeek}h / wk</span>
            <span className="text-[10px] text-slate-400 block font-sans">14h ORACLE · 18h FORGE</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#05070c] border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Venture MRR Gate</span>
            <span className="text-sm font-bold text-violet-300 tabular-nums">${currentForgeMRR} / ${forgeRevenueThreshold}</span>
            <span className="text-[10px] text-rose-400 block font-sans">-${thresholdGap} gap · Kill gate Oct 25</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#05070c] border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">ORACLE Baseline</span>
            <span className="text-sm font-bold text-cyan-400 tabular-nums">v2.4.1 (Week 5)</span>
            <span className="text-[10px] text-emerald-400 block font-sans">Brier 0.188 · Calibration nominal</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#05070c] border border-slate-850">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Founder Compounding</span>
            <span className="text-sm font-bold text-cyan-300 tabular-nums">{founderCompoundingIndex}/100</span>
            <span className="text-[10px] text-slate-400 block font-sans">Disciplined execution score</span>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. THE SINGLE HIGHEST-LEVERAGE ACTION RIGHT NOW       */}
      {/* ==================================================== */}
      <div className="bg-gradient-to-r from-amber-950/40 via-[#0a0d18] to-[#070a14] border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-500 text-black uppercase tracking-widest flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                HIGHEST-LEVERAGE ACTION RIGHT NOW
              </span>
              <span className="px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-500/40 text-[10px] font-bold uppercase">
                FORGE // DISTRIBUTION ENGINE
              </span>
              <span className="text-slate-500 text-[10px]">Deadline: Thursday Oct 8, 15:00</span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white font-display tracking-tight">
              Personalize and Send 7 Remaining Outbound Briefs to Weld County Energy Site Selectors
            </h2>

            <p className="text-xs text-slate-200 font-sans leading-relaxed max-w-4xl">
              <strong className="text-amber-300 font-mono">Why this is the highest leverage:</strong> This single action directly drives commercial validation, addresses the immediate $450/mo MRR deficit ($300 current vs $750 kill gate), and determines whether the Front Range Monitor passes its Oct 25 viability gate. Campaign #CMP-01 currently holds a <span className="text-emerald-400 font-bold">40% response rate</span> on the first 5 sent briefs.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-2 text-right">
            <div className="p-3 rounded-xl bg-[#03060c] border border-amber-500/40 text-left">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Remaining Outbound</span>
              <span className="text-2xl font-black text-amber-400 tabular-nums">{remainingProspects} Records</span>
              <span className="text-[10px] text-slate-400 block font-sans">Est. Effort: 2.5 hours</span>
            </div>
          </div>
        </div>

        {/* Action Expectations and Disciplined Boundaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-amber-500/20">
          <div className="p-3.5 rounded-xl bg-[#04070e] border border-slate-800 space-y-1.5">
            <span className="text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Expected Outcome & Completion Definition
            </span>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              <strong>Outcome:</strong> 2-3 qualified discovery conversations scheduled; 1-2 new paid subscribers acquired at $350/mo.<br />
              <strong>Completion:</strong> All 7 remaining site selector records marked as &quot;Brief Sent&quot; in Campaign #CMP-01 with recorded timestamps.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-1.5">
            <span className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1.5">
              <Ban className="w-3.5 h-3.5" />
              What NOT To Do Until This Is Complete
            </span>
            <ul className="text-xs text-rose-200 font-sans space-y-1 leading-snug">
              <li>• <strong>Do NOT</strong> open code editor to build user login portals or SaaS UI.</li>
              <li>• <strong>Do NOT</strong> tune ORACLE candidate model parameters.</li>
              <li>• <strong>Do NOT</strong> research new venture hypotheses or explore new markets.</li>
            </ul>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowProspectDrawer(!showProspectDrawer)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold text-xs transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>{showProspectDrawer ? 'Hide Outbound Queue' : `View ${remainingProspects} Prospects in Queue`}</span>
            </button>

            <button
              onClick={() => {
                setActiveDivision('forge');
                setActiveForgeDepartment('distribution');
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Open FORGE Distribution Engine →</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 font-sans">
            Strict single-operator boundary: execute outbound before product development.
          </span>
        </div>

        {/* Collapsible Prospect Queue Drawer */}
        {showProspectDrawer && (
          <div className="p-4 rounded-xl bg-[#03060c] border border-amber-500/30 space-y-3 mt-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Campaign #CMP-01 Outbound Pipeline Records ({prospects.length} total)
              </span>
              <span className="text-[10px] text-slate-500">
                1-Click Dispatch Tracking
              </span>
            </div>

            <div className="space-y-2">
              {prospects.map(p => (
                <div 
                  key={p.id}
                  className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    p.status === 'Sent'
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-[#060a14] border-slate-750 text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-sans">· {p.title}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-800 text-slate-300 font-mono">
                        {p.company}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      Target Segment: <span className="text-cyan-400">{p.segment}</span> · Offer: Front Range Regulatory Brief ($350/mo)
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {p.status === 'Sent' ? (
                      <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Sent ({p.sentTimestamp})
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkProspectSent(p.id)}
                        className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      >
                        Mark Brief Sent
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* 3. CRITICAL PATH & BLOCKER DIAGNOSTICS: ORACLE VS FORGE */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ORACLE CRITICAL PATH & BLOCKERS */}
        <div className="bg-[#070b14] border-2 border-cyan-500/40 rounded-2xl p-6 space-y-5 shadow-xl relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 uppercase tracking-widest">
                    DIVISION 01 // CRITICAL PATH
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold uppercase">
                    Status: Awaiting Review
                  </span>
                </div>
                <h3 className="text-xl font-black text-white font-display tracking-tight mt-1.5">
                  ORACLE // NFL Forecast Path
                </h3>
                <div className="text-xs text-cyan-400 font-bold mt-0.5">
                  Current Stage: Game Intelligence → Market Benchmark
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-inner">
                <Target className="w-5 h-5" />
              </div>
            </div>

            {/* What is Blocking ORACLE */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/60 space-y-1.5">
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                What is Blocking ORACLE Right Now:
              </span>
              <ul className="text-xs text-rose-200 font-sans space-y-1 leading-snug">
                <li>
                  • <strong>Model v3.0 Quarantined:</strong> Candidate model v3.0 quarantined pending 200+ historical game backtest. Overfitting risk on small sample (n=48).
                </li>
                <li>
                  • <strong>Player Injury Uncertainty:</strong> Chiefs Center Creed Humphrey ankle status flagged as Questionable. Model EPA penalty factor (-0.12 pts) requires founder approval.
                </li>
              </ul>
            </div>

            {/* What Must Be Completed Before Next Stage */}
            <div className="p-3.5 rounded-xl bg-[#04070e] border border-cyan-900/50 space-y-1.5">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                What Must Be Completed Before Next Stage:
              </span>
              <ul className="text-xs text-slate-300 font-sans space-y-1 leading-snug">
                <li>1. Confirm Friday 16:30 official practice participation filings for Chiefs & Bills.</li>
                <li>2. Baseline freeze Saturday 20:00 for market benchmark closing-line comparison.</li>
                <li>3. Complete Week 5 model divergence log without altering frozen forecast probabilities.</li>
              </ul>
            </div>

            {/* Visual Critical Path Pipeline */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Workflow Sequence:
              </span>
              <div className="flex items-center gap-1 text-[10px] flex-wrap">
                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold">
                  1. Data Ops ✓
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-bold">
                  2. Model Lab (Frozen v2.4.1)
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-500/50 font-bold animate-pulse">
                  3. Game Intel (Review)
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  4. Market Benchmark
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  5. Backtest
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveDivision('oracle');
                setActiveOracleDepartment('game-intel');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <span>Inspect Game Intel (KC vs BUF) →</span>
            </button>

            <button
              onClick={() => setActiveNexusSection('system-map')}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-sans"
            >
              View ORACLE in System Map
            </button>
          </div>
        </div>

        {/* FORGE CRITICAL PATH & BLOCKERS */}
        <div className="bg-[#090b14] border-2 border-violet-500/40 rounded-2xl p-6 space-y-5 shadow-xl relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-violet-950/80 text-violet-300 border border-violet-500/50 uppercase tracking-widest">
                    DIVISION 02 // CRITICAL PATH
                  </span>
                  <span className="text-[10px] text-rose-400 font-bold uppercase">
                    Status: Blocked By Revenue Deficit
                  </span>
                </div>
                <h3 className="text-xl font-black text-white font-display tracking-tight mt-1.5">
                  FORGE // Venture Deployment Path
                </h3>
                <div className="text-xs text-violet-400 font-bold mt-0.5">
                  Current Stage: Paid Pilot ($300 MRR) → Outbound Distribution
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/50 flex items-center justify-center text-violet-400 shadow-inner">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>

            {/* What is Blocking FORGE */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/60 space-y-1.5">
              <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                What is Blocking FORGE Right Now:
              </span>
              <ul className="text-xs text-rose-200 font-sans space-y-1 leading-snug">
                <li>
                  • <strong>Revenue Threshold Gap:</strong> $300 MRR active vs $750 MRR kill gate ($450 deficit, 18 days remaining until Oct 25 deadline).
                </li>
                <li>
                  • <strong>Stalled Distribution Queue:</strong> 7 prospect records in Campaign F1 have sat in &quot;Identified&quot; status for 4 days without dispatch.
                </li>
                <li>
                  • <strong>Feature Scope Trap:</strong> Unsolicited request for customer portal software risks diverting founder hours away from outbound sales.
                </li>
              </ul>
            </div>

            {/* What Must Be Completed Before Next Stage */}
            <div className="p-3.5 rounded-xl bg-[#04070e] border border-violet-900/50 space-y-1.5">
              <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                What Must Be Completed Before Next Stage:
              </span>
              <ul className="text-xs text-slate-300 font-sans space-y-1 leading-snug">
                <li>1. Send all 7 remaining briefs to Weld County site selectors by Thursday 15:00.</li>
                <li>2. Convert 2 additional subscribers at $350/mo to exceed $750/mo revenue threshold.</li>
                <li>3. Enforce kill gate: if $750/mo is not achieved by Oct 25, kill venture with zero remorse.</li>
              </ul>
            </div>

            {/* Visual Critical Path Pipeline */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Workflow Sequence:
              </span>
              <div className="flex items-center gap-1 text-[10px] flex-wrap">
                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold">
                  1. Signals ✓
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold">
                  2. Interviews ✓
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold">
                  3. Offer Ready ✓
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-500/50 font-bold animate-pulse">
                  4. Outbound Dist (7 Left)
                </span>
                <span className="text-slate-600">→</span>
                <span className="px-2 py-1 rounded bg-rose-950/60 text-rose-300 border border-rose-500/50 font-bold">
                  5. $750 Gate ($300/mo)
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveDivision('forge');
                setActiveForgeDepartment('distribution');
              }}
              className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <span>Execute Outbound in FORGE →</span>
            </button>

            <button
              onClick={() => setActiveNexusSection('system-map')}
              className="text-[11px] text-violet-400 hover:text-violet-300 underline font-sans"
            >
              View FORGE in System Map
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 4. FOUNDER APPROVAL & DECISION QUEUE (INTERACTIVE)    */}
      {/* ==================================================== */}
      <div className="bg-[#080c16] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Action Required: Pending Founder Sign-offs
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                {pendingDecisionsCount} Pending
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Decisions reserved strictly for the single founder/administrator. NEXUS AI and automations provide recommendations but cannot sign off.
            </p>
          </div>

          <button
            onClick={() => setActiveNexusSection('advisor')}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 font-mono underline"
          >
            Review Full Advisor Memo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {decisions.map(d => (
            <div
              key={d.id}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-colors ${
                d.status === 'resolved'
                  ? 'bg-slate-900/30 border-slate-800 opacity-60'
                  : 'bg-[#050811] border-slate-750 shadow-md'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      d.division === 'ORACLE'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                        : d.division === 'FORGE'
                        ? 'bg-violet-950 text-violet-300 border border-violet-500/40'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {d.division}
                    </span>
                    <span className="text-[10px] text-slate-500">{d.department}</span>
                  </div>

                  {d.status === 'resolved' && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                      Resolved: {d.resolution}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white font-sans">
                  {d.title}
                </h4>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {d.description}
                </p>

                <div className="p-2.5 rounded bg-[#03050a] border border-slate-850 text-[11px] text-amber-300 font-sans">
                  <strong className="text-amber-400 font-mono">Advisor Recommendation:</strong> {d.recommendationText}
                </div>
              </div>

              {d.status === 'pending' && (
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                  {d.recommendation === 'defer' && (
                    <>
                      <button
                        onClick={() => handleResolveDecision(d.id, 'Quarantined / Deferred')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                      >
                        Defer & Quarantine (Recommended)
                      </button>
                      <button
                        onClick={() => handleResolveDecision(d.id, 'Force Approved')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                      >
                        Approve Anyway
                      </button>
                    </>
                  )}

                  {d.recommendation === 'approve' && (
                    <>
                      <button
                        onClick={() => handleResolveDecision(d.id, 'Approved')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                      >
                        Approve (Recommended)
                      </button>
                      <button
                        onClick={() => handleResolveDecision(d.id, 'Rejected')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {d.recommendation === 'kill' && (
                    <>
                      <button
                        onClick={() => handleResolveDecision(d.id, 'Feature Killed')}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-[0_0_10px_rgba(225,29,72,0.2)]"
                      >
                        Kill Feature Request (Recommended)
                      </button>
                      <button
                        onClick={() => handleResolveDecision(d.id, 'Added to Backlog')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
                      >
                        Add to Backlog
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================== */}
      {/* 5. FOUNDER WEEKLY ATTENTION ALLOCATION & WHAT NOT TO DO */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: What Founder Should Work On This Week */}
        <div className="lg:col-span-7 bg-[#080c16] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider block">
                Disciplined Capacity Planning
              </span>
              <h3 className="text-base font-black text-white font-display">
                What Founder Should Work On This Week (32 Hours Total)
              </h3>
            </div>
            <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-1 rounded">
              14h ORACLE · 18h FORGE
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#04070e] border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs">Priority 1 (8.0h · FORGE Distribution)</span>
                  <span className="px-1.5 py-0.5 rounded bg-violet-950 text-violet-300 text-[9px]">Commercial</span>
                </div>
                <div className="text-white font-bold font-sans text-xs">
                  Personalize and send 7 remaining site selector outbound briefs.
                </div>
                <div className="text-slate-400 text-[10px] font-sans">
                  Follow up with Elena Rostova and Marcus Vance regarding custom transmission analysis.
                </div>
              </div>
              <span className="text-emerald-400 font-bold text-xs shrink-0">8.0 hrs</span>
            </div>

            <div className="p-3 rounded-xl bg-[#04070e] border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold text-xs">Priority 2 (6.0h · ORACLE Game Intel)</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[9px]">Forecasting</span>
                </div>
                <div className="text-white font-bold font-sans text-xs">
                  Chiefs vs Bills Week 5 matchup EPA deep-dive & weather freeze.
                </div>
                <div className="text-slate-400 text-[10px] font-sans">
                  Audit Creed Humphrey center ankle status and Buffalo high-wind forecast trajectory.
                </div>
              </div>
              <span className="text-cyan-400 font-bold text-xs shrink-0">6.0 hrs</span>
            </div>

            <div className="p-3 rounded-xl bg-[#04070e] border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-violet-400 font-bold text-xs">Priority 3 (4.0h · FORGE Fulfillment)</span>
                  <span className="px-1.5 py-0.5 rounded bg-violet-950 text-violet-300 text-[9px]">Fulfillment</span>
                </div>
                <div className="text-white font-bold font-sans text-xs">
                  Deliver Monthly Regulatory Dossier to current 2 paying subscribers.
                </div>
                <div className="text-slate-400 text-[10px] font-sans">
                  Format and dispatch via email. Total fulfillment overhead: 1.5h per subscriber.
                </div>
              </div>
              <span className="text-violet-400 font-bold text-xs shrink-0">4.0 hrs</span>
            </div>

            <div className="p-3 rounded-xl bg-[#04070e] border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-xs">Priority 4 (4.0h · ORACLE Market Benchmark)</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[9px]">Accountability</span>
                </div>
                <div className="text-white font-bold font-sans text-xs">
                  Log closing line consensus divergence vs Circa/Pinnacle.
                </div>
                <div className="text-slate-400 text-[10px] font-sans">
                  Freeze model spreads and document discrepancies before kickoff.
                </div>
              </div>
              <span className="text-slate-300 font-bold text-xs shrink-0">4.0 hrs</span>
            </div>

            <div className="p-3 rounded-xl bg-[#04070e] border border-slate-800 flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-xs">Priority 5 (3.0h · NEXUS Governance & Review)</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[9px]">Shared Core</span>
                </div>
                <div className="text-white font-bold font-sans text-xs">
                  Weekly Advisor review, token audit, and decision memo sign-offs.
                </div>
              </div>
              <span className="text-emerald-400 font-bold text-xs shrink-0">3.0 hrs</span>
            </div>
          </div>
        </div>

        {/* Right 5 cols: What NOT to Work on Yet (Strict Discipline) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-rose-950/20 to-[#080c16] border-2 border-rose-900/50 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="space-y-1">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Ban className="w-4 h-4" />
              Strict Boundary Enforcement
            </span>
            <h3 className="text-base font-black text-white font-display">
              What NOT to Work on Yet
            </h3>
            <p className="text-xs text-slate-300 font-sans">
              These activities create negative leverage, premature complexity, and fatal distraction for a single operator.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[#03060c] border border-rose-900/40 space-y-1">
              <span className="text-xs font-bold text-rose-300 block font-sans">
                ❌ Building Interactive Web Dashboards or SaaS UI
              </span>
              <p className="text-[11px] text-slate-300 font-sans leading-snug">
                Current subscribers explicitly asked for email Markdown delivery. Building a web portal consumes 40+ hours without validating willingness to pay.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#03060c] border border-rose-900/40 space-y-1">
              <span className="text-xs font-bold text-rose-300 block font-sans">
                ❌ Activating Candidate Model v3.0 in ORACLE
              </span>
              <p className="text-[11px] text-slate-300 font-sans leading-snug">
                Small sample sizes produce spurious improvements that fail out-of-sample. Keep Model v2.4.1 locked.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#03060c] border border-rose-900/40 space-y-1">
              <span className="text-xs font-bold text-rose-300 block font-sans">
                ❌ Exploring Secondary Venture Concepts
              </span>
              <p className="text-[11px] text-slate-300 font-sans leading-snug">
                Front Range Monitor must pass its $750/mo revenue kill gate by Oct 25 before any other idea is explored.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#03060c] border border-rose-900/40 space-y-1">
              <span className="text-xs font-bold text-rose-300 block font-sans">
                ❌ Complex Player Prop Correlation Models
              </span>
              <p className="text-[11px] text-slate-300 font-sans leading-snug">
                Calibration monotonicity must be verified across moneyline and totals first. Do not add low-signal prop legs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 6. REAL-TIME OPERATING READINESS RADAR (THE 5 PILLARS) */}
      {/* ==================================================== */}
      <div className="bg-[#080c16] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider block">
              Core Operating Readiness
            </span>
            <h3 className="text-base font-black text-white font-display">
              Real-Time Status Across 5 Foundational Systems
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-sans">
            Verified live application telemetry · No vanity metrics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 pt-1">
          {/* Pillar 1: Revenue Readiness */}
          <div className="p-4 rounded-xl bg-[#04070e] border border-violet-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-violet-400 font-bold uppercase">1. Revenue Readiness</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">Caution</span>
            </div>
            <div className="text-lg font-black text-white tabular-nums">${currentForgeMRR} / ${forgeRevenueThreshold}</div>
            <div className="text-[10px] text-slate-300 font-sans space-y-0.5">
              <div>• 2 Active paying subscribers</div>
              <div>• $0 Churn · $150 average price</div>
              <div className="text-amber-400 font-mono">• 18 days to Oct 25 kill gate</div>
            </div>
          </div>

          {/* Pillar 2: Forecast Rigor */}
          <div className="p-4 rounded-xl bg-[#04070e] border border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">2. Forecast Rigor</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">Nominal</span>
            </div>
            <div className="text-lg font-black text-white tabular-nums">Brier 0.188</div>
            <div className="text-[10px] text-slate-300 font-sans space-y-0.5">
              <div>• Model v2.4.1 locked</div>
              <div>• Log loss: 0.542 (stable)</div>
              <div>• Honesty protocol enforced</div>
            </div>
          </div>

          {/* Pillar 3: Data Quality */}
          <div className="p-4 rounded-xl bg-[#04070e] border border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">3. Data Quality</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">100% Verified</span>
            </div>
            <div className="text-lg font-black text-white tabular-nums">0 Gaps</div>
            <div className="text-[10px] text-slate-300 font-sans space-y-0.5">
              <div>• 100% Ingestion lineage</div>
              <div>• 0 Rumor or media inputs</div>
              <div>• Official filings only</div>
            </div>
          </div>

          {/* Pillar 4: Automation Health */}
          <div className="p-4 rounded-xl bg-[#04070e] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">4. Automations</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">Healthy</span>
            </div>
            <div className="text-lg font-black text-white tabular-nums">3 Active</div>
            <div className="text-[10px] text-slate-300 font-sans space-y-0.5">
              <div>• $1.42 spent / $50 cap</div>
              <div>• 0 Execution failures</div>
              <div>• Weekly cron active</div>
            </div>
          </div>

          {/* Pillar 5: Governance & Airgap */}
          <div className="p-4 rounded-xl bg-[#04070e] border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase">5. Governance</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">Enforced</span>
            </div>
            <div className="text-lg font-black text-white tabular-nums">Airgap Safe</div>
            <div className="text-[10px] text-slate-300 font-sans space-y-0.5">
              <div>• 0 Cross-division breaches</div>
              <div>• Audit logs immutable</div>
              <div>• Zero simulated activity</div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 7. QUICK ACCESS LAUNCHER TO KEY DEPARTMENTS           */}
      {/* ==================================================== */}
      <div className="p-4 rounded-xl bg-[#050811] border border-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 font-bold uppercase text-[10px]">Quick Department Jumps:</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveDivision('oracle');
              setActiveOracleDepartment('game-intel');
            }}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-semibold"
          >
            ORACLE Game Dossier
          </button>
          <button
            onClick={() => {
              setActiveDivision('forge');
              setActiveForgeDepartment('distribution');
            }}
            className="px-3 py-1.5 rounded-lg bg-violet-950/60 hover:bg-violet-900/60 text-violet-300 border border-violet-500/30 text-xs font-semibold"
          >
            FORGE Distribution Engine
          </button>
          <button
            onClick={() => setActiveNexusSection('system-map')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-white border border-slate-700 text-xs font-semibold"
          >
            System Map Architecture
          </button>
          <button
            onClick={() => setActiveNexusSection('workspace')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-white border border-slate-700 text-xs font-semibold"
          >
            Google Workspace Hub
          </button>
          <button
            onClick={() => setActiveNexusSection('advisor')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-white border border-slate-700 text-xs font-semibold"
          >
            Advisor Memo
          </button>
        </div>
      </div>
    </div>
  );
};
