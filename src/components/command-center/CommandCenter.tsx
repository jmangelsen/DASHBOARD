import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Compass, 
  AlertTriangle,
  Play,
  Check,
  ChevronRight,
  Layers,
  Award,
  Zap,
  Target
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    opportunity,
    products,
    transactions,
    customers,
    assets,
    evidence,
    missions,
    bossBattles,
    missionChains,
    completeMission,
    deferMission,
    monthlyRecurringRevenue,
    annualRecurringRevenue,
    oneTimeRevenue,
    grossMarginPercent,
    monthlyOperatingCost,
    netContribution,
    revenuePerHour,
    totalFounderHours,
    daysSinceLastConversation,
    daysSinceLastPaidAttempt,
    founderOperatingScore,
    compoundingIndex,
    setActiveSection,
    askOracle,
    onboarding
  } = useApp();

  // Commercial progress radar scores (1-10)
  const radarMetrics = [
    { label: 'Buyer Clarity', value: 9 },
    { label: 'Pain Severity', value: 10 },
    { label: 'Willingness to Pay', value: 8 },
    { label: 'Evidence Quality', value: 9 },
    { label: 'Distribution Access', value: 6 },
    { label: 'Product Readiness', value: 8 },
    { label: 'Automation Readiness', value: 7 },
    { label: 'Recurring Potential', value: 8 },
    { label: 'Defensibility', value: 9 },
    { label: 'Legal/Conflict Safety', value: 10 },
  ];

  const currentMonthRevenue = oneTimeRevenue + monthlyRecurringRevenue;
  const targetThreshold = onboarding.defaultApprovalThreshold || 750;
  const thresholdProgress = Math.min(100, Math.round((monthlyRecurringRevenue / targetThreshold) * 100));

  // Top urgent operational alerts
  const unsupportedEvidence = evidence.filter(e => e.isUnsupportedInference);
  const pendingMissions = missions.filter(m => m.status !== 'completed');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Key Question Diagnostics */}
      <div className="bg-[#0b0f19] border border-slate-800 p-5 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Activity className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">FOUNDER OPERATING DIAGNOSTIC</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Primary Objective: $750/mo Approval Gate</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight">
            Focus: {opportunity.name}
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-2xl">
            Highest-leverage next move: <strong className="text-slate-200">{opportunity.nextExperiment}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-3 lg:pt-0 lg:pl-6">
          <div className="text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Operating Score</div>
            <div className="text-2xl font-bold text-cyan-400 tabular-nums">{founderOperatingScore}</div>
            <div className="text-[9px] text-slate-400">TARGET: &gt;80</div>
          </div>
          <div className="text-center font-mono">
            <div className="text-[10px] text-slate-400 uppercase">Threshold Status</div>
            <div className={`text-sm font-semibold tabular-nums ${monthlyRecurringRevenue >= targetThreshold ? 'text-emerald-400' : 'text-amber-400'}`}>
              ${monthlyRecurringRevenue} / ${targetThreshold}
            </div>
            <div className="text-[9px] text-slate-400">{thresholdProgress}% cleared</div>
          </div>
          <button
            onClick={() => askOracle('What is the single highest leverage revenue action for this week?')}
            className="px-3.5 py-2 text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 rounded-md transition-colors whitespace-nowrap"
          >
            Audit with ORACLE
          </button>
        </div>
      </div>

      {/* SECTION A & B: Founder Status & Revenue Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-md space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Monthly Recurring (MRR)</span>
          <div className="text-xl font-bold text-white tabular-nums">${monthlyRecurringRevenue}</div>
          <span className="text-[10px] text-cyan-400/80 block">ARR: ${annualRecurringRevenue}</span>
        </div>

        <div className="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-md space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">One-Time Revenue</span>
          <div className="text-xl font-bold text-white tabular-nums">${oneTimeRevenue}</div>
          <span className="text-[10px] text-slate-400 block">Reports & Data Packs</span>
        </div>

        <div className="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-md space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Gross Margin</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">{grossMarginPercent}%</div>
          <span className="text-[10px] text-slate-400 block">Op Cost: ${monthlyOperatingCost}/mo</span>
        </div>

        <div className="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-md space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Net Contribution</span>
          <div className="text-xl font-bold text-white tabular-nums">${netContribution}</div>
          <span className="text-[10px] text-emerald-400 block">+${netContribution > 0 ? netContribution : 0} cash flow</span>
        </div>

        <div className="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-md space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Revenue / Founder Hr</span>
          <div className="text-xl font-bold text-cyan-400 tabular-nums">${revenuePerHour}</div>
          <span className="text-[10px] text-slate-400 block">{totalFounderHours} hrs logged</span>
        </div>

        <div className="p-3.5 bg-[#0b0f19] border border-slate-800 rounded-md space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Customer Dialogue</span>
          <div className="text-xl font-bold text-white tabular-nums">{daysSinceLastConversation}d ago</div>
          <span className="text-[10px] text-amber-400/90 block">{daysSinceLastPaidAttempt}d since paid offer</span>
        </div>
      </div>

      {/* Main Grid: Mission Queue (Left) & Radar + Portfolio (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Mission Queue - 7 Cols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Main Mission Queue // Commercial Priority
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Ranked by Revenue Leverage &amp; Effort
            </span>
          </div>

          <div className="space-y-2.5">
            {pendingMissions.map((mission) => (
              <div 
                key={mission.id}
                className="p-4 bg-[#0a0e17] border border-slate-800/90 hover:border-slate-700 rounded-lg transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase">
                        {mission.linkedProject}
                      </span>
                      <span className="text-slate-700" aria-hidden="true">·</span>
                      <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due {mission.deadline}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold font-sans text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {mission.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold tabular-nums">
                      +{mission.rewardCredits} SC
                    </span>
                    <button
                      onClick={() => completeMission(mission.id)}
                      className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 rounded transition-colors flex items-center gap-1"
                      title="Verify and complete mission"
                    >
                      <Check className="w-3 h-3" />
                      <span>Complete</span>
                    </button>
                    <button
                      onClick={() => deferMission(mission.id)}
                      className="px-2 py-1 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
                      title="Defer mission"
                    >
                      Defer
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-sans leading-relaxed">
                  <span className="text-slate-300 font-medium">Why it matters:</span> {mission.reasonItMatters}
                </div>

                <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-cyan-400/90">
                    <Target className="w-3 h-3" />
                    <span>Commercial Impact: {mission.expectedCommercialImpact}</span>
                  </div>
                  <div>Effort: {mission.estimatedEffortHours}h</div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2.5 py-1.5 rounded border border-slate-800/60">
                  Evidence Required: {mission.evidenceRequired}
                </div>
              </div>
            ))}
          </div>

          {/* Operational Risk & Data Quality Alerts */}
          {unsupportedEvidence.length > 0 && (
            <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Data Quality Alert: {unsupportedEvidence.length} Unsupported Claim Detected</span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Evidence item <code className="text-amber-300 font-mono">{unsupportedEvidence[0].id}</code> ("{unsupportedEvidence[0].claim.slice(0, 70)}...") relies on unverified commentary. Citing this in paid reports is blocked by studio governance rules.
              </p>
              <button
                onClick={() => setActiveSection('evidence-ledger')}
                className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Audit in Evidence Ledger</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Commercial Radar & Portfolio Map - 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Commercial Progress Radar */}
          <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Commercial Progress Radar</span>
              </div>
              <span className="text-[11px] text-cyan-400 font-semibold tabular-nums">
                Studio Readiness: 8.6 / 10
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {radarMetrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">{metric.label}</span>
                    <span className="text-slate-200 tabular-nums">{metric.value}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        metric.value >= 9 ? 'bg-emerald-400' :
                        metric.value >= 7 ? 'bg-cyan-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${metric.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[10px] text-slate-400 font-mono">
              Formula: Evaluates buyer clarity, verified willingness to pay, and data governance safety.
            </div>
          </div>

          {/* Venture Portfolio Map */}
          <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-mono">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Venture Portfolio Map</span>
              </div>
              <span className="text-[11px] text-slate-400">1 Active · 1 Killed</span>
            </div>

            <div className="space-y-3">
              {/* Project Card: Front Range Monitor */}
              <div className="p-3 bg-[#0d121f] border border-cyan-500/40 rounded-md space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">{opportunity.name}</span>
                  <span className="text-[10px] font-mono text-cyan-300 uppercase px-1.5 py-0.5 bg-cyan-950/60 rounded">
                    Stage: {opportunity.stage}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[9px]">DEMAND CONFIDENCE</span>
                    <span className="text-emerald-400 font-semibold">High (86/100)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">TARGET PROFIT</span>
                    <span className="text-white font-semibold">$1,380 / mo</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">ASSET COMPOUND</span>
                    <span className="text-cyan-300 font-semibold">Score: 88</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Kill Criterion: If &lt;3 paid commitments secured by Oct 25, kill weekly format and freeze build.
                </div>
              </div>

              {/* Project Card: Killed general newsletter */}
              <div className="p-3 bg-[#0d121f]/50 border border-slate-800 rounded-md space-y-1.5 opacity-75">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono line-through text-slate-400">General AI Energy Newsletter</span>
                  <span className="text-[10px] font-mono text-rose-400 uppercase px-1.5 py-0.5 bg-rose-950/40 rounded">
                    Stage: Killed Early
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Killed on Day 12 after landing page test yielded 0% paid conversions. Preserved 80+ engineering hours.
                </div>
              </div>
            </div>
          </div>

          {/* Boss Battles & Milestones Widget */}
          <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Commercial Boss Battles</span>
              </div>
              <span className="text-[11px] text-amber-400 tabular-nums">
                {bossBattles.filter(b => b.status === 'conquered').length} / {bossBattles.length} Conquered
              </span>
            </div>

            <div className="space-y-2">
              {bossBattles.slice(0, 3).map((boss) => (
                <div 
                  key={boss.id}
                  className="p-2.5 bg-[#080c14] border border-slate-800/80 rounded flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                      {boss.status === 'conquered' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />
                      )}
                      <span>{boss.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      {boss.requirement}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-cyan-400 tabular-nums shrink-0 ml-2">
                    +{boss.signalCreditsReward} SC
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
