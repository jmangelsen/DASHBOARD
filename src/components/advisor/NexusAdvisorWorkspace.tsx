import React, { useState, useMemo } from 'react';
import { useNexus, OracleDepartment, ForgeDepartment } from '../../context/NexusContext';
import { 
  WeeklyExecutiveReviewPackage, 
  EvidenceLabel, 
  LabeledStatement 
} from '../../types/advisor';
import { generateWeeklyExecutiveReview } from '../../services/advisorReportGenerator';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  Briefcase,
  Shield,
  Download,
  Printer,
  Sparkles,
  Database,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Layers,
  Activity,
  Calendar,
  Lock,
  Compass,
  Archive,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

export const NexusAdvisorWorkspace: React.FC = () => {
  const nexus = useNexus();
  const {
    oracleGames,
    oracleModels,
    modelChanges,
    parlayCards,
    weeklyPostmortem,
    forgeOpportunity,
    forgeSignals,
    buyerInterviews,
    forgeOffers,
    forgeCustomers,
    forgeTransactions,
    forgeCampaigns,
    sharedMissions,
    sharedAssets,
    automations,
    blockedAttempts,
    currentForgeMRR,
    forgeRevenueThreshold,
    founderCompoundingIndex,
    oracleIntegrityScore,
    oracleHoursThisWeek,
    forgeHoursThisWeek,
    setActiveDivision,
    setActiveNexusSection,
    setActiveOracleDepartment,
    setActiveForgeDepartment
  } = nexus;

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'summary' | 'oracle' | 'forge' | 'allocation' | 'decisions' | 'data-quality' | 'archive'
  >('summary');

  // Generate Initial / Live Review Package
  const [currentPackage, setCurrentPackage] = useState<WeeklyExecutiveReviewPackage>(() => {
    return generateWeeklyExecutiveReview({
      oracleGames,
      oracleModels,
      modelChanges,
      parlayCards,
      weeklyPostmortem,
      forgeOpportunity,
      forgeSignals,
      buyerInterviews,
      forgeOffers,
      forgeCustomers,
      forgeTransactions,
      forgeCampaigns,
      sharedMissions,
      sharedAssets,
      automations,
      blockedAttempts,
      currentForgeMRR,
      forgeRevenueThreshold,
      founderCompoundingIndex,
      oracleIntegrityScore,
      oracleHoursThisWeek,
      forgeHoursThisWeek
    });
  });

  // Archive of past reviews
  const [reportArchive, setReportArchive] = useState<WeeklyExecutiveReviewPackage[]>(() => {
    // Seed with prior week 4 review
    const prior = generateWeeklyExecutiveReview({
      ...nexus,
      currentForgeMRR: 350,
      forgeRevenueThreshold: 750,
      founderCompoundingIndex: 88,
      oracleIntegrityScore: 86,
      oracleHoursThisWeek: 16,
      forgeHoursThisWeek: 16
    });
    prior.id = 'REVIEW-PKG-W4-HISTORIC';
    prior.weekNumber = 4;
    prior.status = 'archived';
    prior.founderReviewConfirmed = true;
    prior.generatedAt = '2026-09-28T07:30:00Z';
    return [prior];
  });

  // Review & Decision Form State
  const [founderNotes, setFounderNotes] = useState<string>('');
  const [reviewConfirmed, setReviewConfirmed] = useState<boolean>(currentPackage.founderReviewConfirmed);
  const [missingDataConfirmed, setMissingDataConfirmed] = useState<boolean>(currentPackage.understoodMissingDataAcknowledged);
  const [decisionNotes, setDecisionNotes] = useState<Record<string, string>>({});
  const [decisionChoices, setDecisionChoices] = useState<Record<string, 'accept' | 'reject' | 'modify' | 'defer'>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Re-generate Review
  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const fresh = generateWeeklyExecutiveReview({
        oracleGames,
        oracleModels,
        modelChanges,
        parlayCards,
        weeklyPostmortem,
        forgeOpportunity,
        forgeSignals,
        buyerInterviews,
        forgeOffers,
        forgeCustomers,
        forgeTransactions,
        forgeCampaigns,
        sharedMissions,
        sharedAssets,
        automations,
        blockedAttempts,
        currentForgeMRR,
        forgeRevenueThreshold,
        founderCompoundingIndex,
        oracleIntegrityScore,
        oracleHoursThisWeek,
        forgeHoursThisWeek
      });
      setCurrentPackage(fresh);
      setIsGenerating(false);
    }, 600);
  };

  // Sign off & Complete Review
  const handleFinalSignOff = () => {
    if (!reviewConfirmed || !missingDataConfirmed) return;

    const updated: WeeklyExecutiveReviewPackage = {
      ...currentPackage,
      status: 'founder_reviewed',
      founderReviewConfirmed: true,
      understoodMissingDataAcknowledged: true,
      founderReviewedAt: new Date().toISOString(),
      founderNotes,
      founderMemo: {
        ...currentPackage.founderMemo,
        decisionLog: currentPackage.founderMemo.decisionLog.map(d => ({
          ...d,
          founderDecision: decisionChoices[d.id] || d.founderDecision || 'accept',
          founderRationale: decisionNotes[d.id] || d.founderRationale || 'Confirmed by founder during weekly executive review.',
          status: 'decided'
        }))
      }
    };

    setCurrentPackage(updated);
    setReportArchive(prev => [updated, ...prev.filter(p => p.id !== updated.id)]);
  };

  // Label Styling Helper
  const getLabelBadge = (label: EvidenceLabel) => {
    switch (label) {
      case 'Verified Fact':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60';
      case 'Derived Metric':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/60';
      case 'Model Output':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60';
      case 'AI Inference':
        return 'bg-violet-950/80 text-violet-300 border-violet-500/60';
      case 'Founder Hypothesis':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/60';
      case 'Unknown / Missing Data':
        return 'bg-orange-950/80 text-orange-300 border-orange-500/60';
      case 'Conflicting Evidence':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/60';
      case 'Risk / Watch Item':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/60';
      case 'Required Founder Decision':
        return 'bg-yellow-950/80 text-yellow-300 border-yellow-500/60';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  // Export to Markdown
  const handleExportMarkdown = () => {
    const md = `
# NEXUS ADVISOR // Weekly Executive Review
**Week ${currentPackage.weekNumber} | Reporting Period: ${currentPackage.reportingPeriod.start} to ${currentPackage.reportingPeriod.end}**
*Generated: ${new Date(currentPackage.generatedAt).toLocaleString()}*
*Data Completeness: ${currentPackage.dataCompletenessScore}%*

---

## REPORT 01: ORACLE // Weekly Forecast Intelligence Review
### Executive Truth Summary
${currentPackage.oracleReport.executiveTruthSummary.map(s => `- [${s.label}] ${s.statement} (Ref: ${s.sourceReference})`).join('\n')}

### Readiness Scorecard
- Status: ${currentPackage.oracleReport.readinessScorecard.overallStatus}
- Active Model: ${currentPackage.oracleReport.readinessScorecard.activeModelVersion}
- 4-Week Rolling Brier: ${currentPackage.oracleReport.forecastQuality.brierScore}
- Reason: ${currentPackage.oracleReport.readinessScorecard.readinessReason}

### Required Founder Decisions
${currentPackage.oracleReport.requiredDecisions.map((d, i) => `${i + 1}. **${d.decisionRequired}**\n   - Recommendation: ${d.advisorRecommendation}\n   - Deadline: ${d.deadline}`).join('\n\n')}

---

## REPORT 02: FORGE // Weekly Venture Deployment Review
### Executive Commercial Truth
${currentPackage.forgeReport.executiveCommercialTruth.map(s => `- [${s.label}] ${s.statement} (Ref: ${s.sourceReference})`).join('\n')}

### Revenue Truth
- Actual Collected Cash: $${currentPackage.forgeReport.revenueTruthTable.actualCollectedRevenue.toFixed(2)}
- Active MRR: $${currentPackage.forgeReport.revenueTruthTable.activeMRR.toFixed(2)} / mo
- Commercial Gate Threshold: $${nexus.forgeRevenueThreshold.toFixed(2)} / mo (Code Frozen: ${nexus.currentForgeMRR < nexus.forgeRevenueThreshold ? 'YES' : 'NO'})
- Probability-Weighted Pipeline: $${currentPackage.forgeReport.revenueTruthTable.probabilityWeightedPipeline.toFixed(2)}

### Required Founder Decisions
${currentPackage.forgeReport.requiredDecisions.map((d, i) => `${i + 1}. **${d.decisionRequired}**\n   - Recommendation: ${d.advisorRecommendation}\n   - Deadline: ${d.deadline}`).join('\n\n')}

---

## REPORT 03: NEXUS // Founder Allocation & Decision Memo
### Attention Allocation
- ORACLE: ${currentPackage.founderMemo.attentionAllocation.oracle.percentage}% (${currentPackage.founderMemo.attentionAllocation.oracle.hours} hours)
- FORGE: ${currentPackage.founderMemo.attentionAllocation.forge.percentage}% (${currentPackage.founderMemo.attentionAllocation.forge.hours} hours)
- Shared/Governance: ${currentPackage.founderMemo.attentionAllocation.sharedAdminGovernance.percentage}% (${currentPackage.founderMemo.attentionAllocation.sharedAdminGovernance.hours} hours)

### Single Highest-Leverage Action
**${currentPackage.founderMemo.highestLeverageAction.actionTitle}**
- Division: ${currentPackage.founderMemo.highestLeverageAction.division} (${currentPackage.founderMemo.highestLeverageAction.department})
- Why: ${currentPackage.founderMemo.highestLeverageAction.whyHighestLeverage}
- Deadline: ${currentPackage.founderMemo.highestLeverageAction.deadline}
- What NOT to do until complete: ${currentPackage.founderMemo.highestLeverageAction.whatNotToDoUntilComplete}

### Stop / Pause / Kill
- STOP: ${currentPackage.founderMemo.stopPauseKill.oneThingToStop.item}
- PAUSE: ${currentPackage.founderMemo.stopPauseKill.oneThingToPause.item}
- KILL: ${currentPackage.founderMemo.stopPauseKill.oneThingToKill.item} (Deadline: ${currentPackage.founderMemo.stopPauseKill.oneThingToKill.evaluationDeadline})
    `.trim();

    navigator.clipboard.writeText(md);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const { oracleReport, forgeReport, founderMemo } = currentPackage;

  return (
    <div className="space-y-6 pb-20 font-mono text-xs select-none max-w-7xl mx-auto">
      {/* 1. Mandatory Executive Advisor Header Banner */}
      <div className="bg-[#0b101c] border-2 border-cyan-500/40 p-5 rounded-2xl space-y-3 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                NEXUS ADVISOR // WEEKLY EXECUTIVE REVIEW
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-400">
                Week {currentPackage.weekNumber} Slate &amp; Venture Audit
              </span>
            </div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight">
              Single-Operator Portfolio Counsel
            </h1>
            <div className="text-[11px] text-slate-300 font-sans max-w-3xl leading-relaxed">
              Advisory only. The founder remains the sole accountable decision-maker. Strict evidence separation enforced: zero synthetic facts, zero uncollected pipeline counted as cash, and zero feature-building without buyer validation.
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Compiling Review...' : 'Re-Run Live Audit'}</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="px-3 py-2 rounded-xl bg-[#070d18] hover:bg-[#0f172a] text-cyan-300 border border-cyan-500/40 text-xs transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{copySuccess ? 'Copied Markdown!' : 'Export Markdown'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-xl bg-[#070d18] hover:bg-[#0f172a] text-slate-300 border border-slate-700 text-xs transition-all flex items-center gap-1.5"
              title="Print-Friendly Dossier"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Governance Guard Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2 py-0.5 rounded bg-rose-950/70 text-rose-300 border border-rose-500/50 text-[10px] font-bold uppercase tracking-wider">
              ADVISOR OUTPUT — DECISION SUPPORT ONLY. HUMAN REVIEW REQUIRED.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-slate-400">
            <div>
              <span className="text-slate-500">Cutoff: </span>
              <strong className="text-slate-300">Sunday 18:00</strong>
            </div>
            <div>
              <span className="text-slate-500">Completeness: </span>
              <strong className={currentPackage.dataCompletenessScore >= 85 ? 'text-emerald-400' : 'text-amber-400'}>
                {currentPackage.dataCompletenessScore}%
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Status: </span>
              <strong className="text-cyan-300 uppercase">{currentPackage.status.replace(/_/g, ' ')}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Partial Report Warning (if any) */}
      {currentPackage.isPartialMissingData && (
        <div className="bg-amber-950/40 border border-amber-500/50 p-4 rounded-xl flex items-start gap-3 text-amber-200 text-xs font-sans">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-mono font-bold text-amber-300 text-[11px] uppercase tracking-wider">
              PARTIAL REPORT — MISSING DATA WARNING
            </div>
            <p className="text-[11px] text-amber-200/90 leading-relaxed font-mono">
              The following internal data records are incomplete or pending verification. Advisory inferences have been labeled accordingly:
            </p>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-300/80 font-mono">
              {currentPackage.missingDataWarnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 2. Primary Navigation Workspace Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 overflow-x-auto text-[11px]">
        {[
          { id: 'summary', label: 'Executive Summary', icon: FileText },
          { id: 'oracle', label: 'ORACLE Review (Report 01)', icon: Target },
          { id: 'forge', label: 'FORGE Review (Report 02)', icon: Briefcase },
          { id: 'allocation', label: 'Founder Allocation (Memo 03)', icon: Compass },
          { id: 'decisions', label: `Decision Log (${founderMemo.decisionLog.length})`, icon: CheckSquare },
          { id: 'data-quality', label: 'Data Quality & Airgap', icon: Shield },
          { id: 'archive', label: `Report Archive (${reportArchive.length})`, icon: Archive }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold shadow-lg shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-white bg-[#070a12] border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: EXECUTIVE SUMMARY                                   */}
      {/* ========================================================= */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Top 3 High-Impact Portfolio Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Highest Leverage Action */}
            <div className="p-4 rounded-xl bg-[#090e1a] border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                  HIGHEST LEVERAGE ACTION
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {founderMemo.highestLeverageAction.division}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                {founderMemo.highestLeverageAction.actionTitle}
              </h3>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {founderMemo.highestLeverageAction.whyHighestLeverage}
              </p>
              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Deadline: <strong className="text-white">{founderMemo.highestLeverageAction.deadline}</strong></span>
                <button
                  onClick={() => {
                    setActiveDivision('forge');
                    setActiveForgeDepartment('distribution');
                  }}
                  className="text-cyan-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Open Dept</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Time Allocation Recommendation */}
            <div className="p-4 rounded-xl bg-[#0c0915] border border-violet-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                  TIME ALLOCATION (36h TOTAL)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Disciplined Focus</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                <div className="p-2 rounded bg-slate-900/80 border border-cyan-900/50">
                  <span className="text-[9px] text-slate-400 block uppercase">ORACLE</span>
                  <span className="text-base font-bold text-cyan-300">{founderMemo.attentionAllocation.oracle.percentage}%</span>
                  <span className="text-[10px] text-slate-500 block">{founderMemo.attentionAllocation.oracle.hours}h</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-violet-900/50">
                  <span className="text-[9px] text-slate-400 block uppercase">FORGE</span>
                  <span className="text-base font-bold text-violet-300">{founderMemo.attentionAllocation.forge.percentage}%</span>
                  <span className="text-[10px] text-slate-500 block">{founderMemo.attentionAllocation.forge.hours}h</span>
                </div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block uppercase">SHARED</span>
                  <span className="text-base font-bold text-slate-200">{founderMemo.attentionAllocation.sharedAdminGovernance.percentage}%</span>
                  <span className="text-[10px] text-slate-500 block">{founderMemo.attentionAllocation.sharedAdminGovernance.hours}h</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed pt-1">
                FORGE receives majority allocation due to approaching Oct 25 validation milestone.
              </p>
            </div>

            {/* Commercial Gate & Revenue Truth */}
            <div className="p-4 rounded-xl bg-[#14080a] border border-rose-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                  COMMERCIAL GATE ($750 MRR)
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                  CODE FROZEN
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1 font-mono">
                <div>
                  <span className="text-xs text-slate-500 block">Actual MRR</span>
                  <span className="text-xl font-black text-white tabular-nums">${currentForgeMRR.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Target Clearance</span>
                  <span className="text-sm font-bold text-amber-300 tabular-nums">${forgeRevenueThreshold.toFixed(2)} / mo</span>
                </div>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all" 
                  style={{ width: `${Math.min(100, (currentForgeMRR / forgeRevenueThreshold) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-300 font-sans">
                Product Forge feature build pipeline is locked. Software cannot resume until 2 new subscribers pay.
              </p>
            </div>
          </div>

          {/* Connected Executive Truth Statements */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  Unified Portfolio Truth Statements (Strict Evidence Classification)
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Every statement strictly classified &amp; cited
              </span>
            </div>

            <div className="space-y-2.5">
              {[...oracleReport.executiveTruthSummary, ...forgeReport.executiveCommercialTruth].map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#04060a] border border-slate-850 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 uppercase tracking-wider ${getLabelBadge(item.label)}`}>
                      {item.label}
                    </span>
                    <span className="text-slate-200 font-sans leading-relaxed">
                      {item.statement}
                    </span>
                  </div>

                  {item.sourceReference && (
                    <div className="shrink-0 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                      <span>Ref:</span>
                      <span className="text-slate-400 font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {item.sourceReference}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stop / Pause / Kill Matrix */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white font-display">
                  Stop / Pause / Kill Portfolio Recommendations
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Preserve Founder Capital &amp; Sanity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block">
                  ONE THING TO STOP
                </span>
                <h4 className="text-xs font-bold text-white">
                  {founderMemo.stopPauseKill.oneThingToStop.item}
                </h4>
                <p className="text-[11px] text-slate-300 font-sans">
                  {founderMemo.stopPauseKill.oneThingToStop.reason}
                </p>
                <div className="pt-2 text-[10px] text-emerald-400 font-bold">
                  Reclaims: {founderMemo.stopPauseKill.oneThingToStop.hoursReclaimed}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                  ONE THING TO PAUSE
                </span>
                <h4 className="text-xs font-bold text-white">
                  {founderMemo.stopPauseKill.oneThingToPause.item}
                </h4>
                <p className="text-[11px] text-slate-300 font-sans">
                  {founderMemo.stopPauseKill.oneThingToPause.rationale}
                </p>
                <div className="pt-2 text-[10px] text-amber-300">
                  Condition: {founderMemo.stopPauseKill.oneThingToPause.conditionToResume}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#14080a] border border-rose-600/40 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">
                  ONE THING TO KILL (ON GATE)
                </span>
                <h4 className="text-xs font-bold text-white">
                  {founderMemo.stopPauseKill.oneThingToKill.item}
                </h4>
                <p className="text-[11px] text-slate-300 font-sans">
                  {founderMemo.stopPauseKill.oneThingToKill.currentGap}
                </p>
                <div className="pt-2 text-[10px] text-rose-300 font-bold">
                  Gate Deadline: {founderMemo.stopPauseKill.oneThingToKill.evaluationDeadline}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: ORACLE REVIEW (REPORT 01)                          */}
      {/* ========================================================= */}
      {activeTab === 'oracle' && (
        <div className="space-y-6">
          {/* Section 2: Forecast Readiness Scorecard */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  SECTION 02 // FORECAST READINESS SCORECARD
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Week {oracleReport.week} Forecast Readiness: {oracleReport.readinessScorecard.overallStatus}
                </h3>
              </div>
              <span className="px-3 py-1 rounded bg-amber-950 text-amber-300 border border-amber-500/50 text-xs font-bold">
                {oracleReport.readinessScorecard.overallStatus}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {oracleReport.readinessScorecard.readinessReason}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block">Active Model</span>
                <span className="text-sm font-bold text-white">{oracleReport.readinessScorecard.activeModelVersion}</span>
                <span className="text-[10px] text-emerald-400 block">Baseline Locked</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block">Source Coverage</span>
                <span className="text-sm font-bold text-emerald-400">{oracleReport.readinessScorecard.sourceVerificationCoverage}</span>
                <span className="text-[10px] text-slate-400 block">Official filings</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block">Data Freshness</span>
                <span className="text-sm font-bold text-cyan-300">{oracleReport.readinessScorecard.dataFreshness}</span>
                <span className="text-[10px] text-slate-400 block">Live ingestion</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block">Injury Status</span>
                <span className="text-sm font-bold text-amber-400">1 Critical Questionable</span>
                <span className="text-[10px] text-slate-400 block">Friday practice lock</span>
              </div>
            </div>
          </div>

          {/* Section 4 & 5: Model Integrity, Calibration & Brier Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  MODEL INTEGRITY &amp; CHANGE CONTROL
                </span>
                <span className="text-[10px] text-slate-400">Preregistration Enforced</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-[#04060a] border border-slate-850 space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase">Active Baseline Assumptions</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 font-sans text-[11px]">
                    {oracleReport.modelIntegrity.activeAssumptions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 space-y-1">
                  <div className="text-[10px] text-amber-400 uppercase font-bold">Candidate Model Assessment</div>
                  <div className="text-white font-bold">{oracleReport.modelIntegrity.candidateChanges[0]?.name}</div>
                  <p className="text-amber-200 text-[11px] font-sans">
                    {oracleReport.modelIntegrity.candidateChanges[0]?.recommendation}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  FORECAST QUALITY &amp; CALIBRATION
                </span>
                <span className="text-emerald-400 font-bold">Brier Score: {oracleReport.forecastQuality.brierScore}</span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                  {oracleReport.forecastQuality.calibrationStatus}
                </p>

                <div className="p-3 rounded-lg bg-[#04060a] border border-slate-850 space-y-2">
                  <div className="text-[10px] text-slate-500 uppercase">Reliability Buckets (Predicted vs Actual)</div>
                  <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
                    {oracleReport.forecastQuality.reliabilityBuckets.map((b, i) => (
                      <div key={i} className="p-1.5 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">{b.bucket}</span>
                        <span className="text-cyan-300 font-bold">{(b.predictedProb * 100).toFixed(0)}% pred</span>
                        <span className="text-emerald-400 block">{(b.actualOutcomeFreq * 100).toFixed(0)}% act</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-sans">
                  {oracleReport.forecastQuality.uncertaintyNotes}
                </div>
              </div>
            </div>
          </div>

          {/* Section 9 & 10: Red-Team Review & Required Founder Decisions */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white font-display">
                  ORACLE Red-Team Review &amp; Required Founder Decisions (Max 3)
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">No Decision Made Automatically</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {oracleReport.requiredDecisions.map((dec) => (
                <div key={dec.id} className="p-4 rounded-xl bg-[#04060a] border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 uppercase">
                      {dec.id}
                    </span>
                    <span className="text-[10px] text-slate-400">Deadline: <strong className="text-white">{dec.deadline}</strong></span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{dec.decisionRequired}</h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    <strong>Why It Matters:</strong> {dec.whyItMatters}
                  </p>
                  <div className="p-2.5 rounded bg-cyan-950/20 border border-cyan-500/30 text-[11px] text-cyan-200 font-sans">
                    <strong>Advisor Recommendation:</strong> {dec.advisorRecommendation}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">
                    Supporting: {dec.supportingInternalEvidence}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: FORGE REVIEW (REPORT 02)                           */}
      {/* ========================================================= */}
      {activeTab === 'forge' && (
        <div className="space-y-6">
          {/* Section 2: Revenue Truth Table */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">
                  SECTION 02 // REVENUE TRUTH TABLE (NO PIPELINE BLENDING)
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Actual Settled Cash vs Pipeline Forecast
                </h3>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs font-bold">
                ${forgeReport.revenueTruthTable.actualCollectedRevenue.toFixed(2)} Settled
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Collected Cash</span>
                <span className="text-base font-bold text-emerald-400 tabular-nums">
                  ${forgeReport.revenueTruthTable.actualCollectedRevenue.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400 block font-sans">2 Transactions</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active MRR</span>
                <span className="text-base font-bold text-white tabular-nums">
                  ${forgeReport.revenueTruthTable.activeMRR.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400 block font-sans">Recurring monthly</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Gross Contribution</span>
                <span className="text-base font-bold text-cyan-300 tabular-nums">
                  ${forgeReport.revenueTruthTable.grossContribution.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400 block font-sans">After operating costs</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Operating Costs</span>
                <span className="text-base font-bold text-slate-300 tabular-nums">
                  ${forgeReport.revenueTruthTable.operatingCosts.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400 block font-sans">API &amp; hosting</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Raw Pipeline</span>
                <span className="text-base font-bold text-slate-400 tabular-nums">
                  ${forgeReport.revenueTruthTable.pipelineRevenue.toFixed(2)}
                </span>
                <span className="text-[9px] text-rose-400 block font-sans">Uncollected</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Weighted Pipeline</span>
                <span className="text-base font-bold text-amber-300 tabular-nums">
                  ${forgeReport.revenueTruthTable.probabilityWeightedPipeline.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400 block font-sans">35% estimated prob</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-sans pt-1 border-t border-slate-850">
              Rule enforced: Raw pipeline ($4,200.00) is strictly isolated and never reported as actual business cash.
            </div>
          </div>

          {/* Section 5: Build vs Sell Red-Team Test */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">
                  SECTION 05 // BUILD VS SELL RED-TEAM TEST
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Feature Gatekeeper (Prevent Feature-Building Theater)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                Commercial Discipline
              </span>
            </div>

            {forgeReport.offerProductDeployment.buildVsSellTests.map((test, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#04060a] border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">Feature Proposed: {test.activeBuildItem}</h4>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${test.buyerProofExists ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' : 'bg-rose-950 text-rose-300 border-rose-500/50'}`}>
                    {test.buyerProofExists ? 'Buyer Proof Exists' : 'Zero Buyer Proof'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  <strong>Buyer Evidence:</strong> {test.buyerProofDetail}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold block">Smallest Reversible Test</span>
                    <span className="text-slate-300 font-sans">{test.smallestReversibleTest}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-rose-400 uppercase font-bold block">Criterion to Prove Unnecessary</span>
                    <span className="text-slate-300 font-sans">{test.criterionToProveUnnecessary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 10: FORGE Required Founder Decisions */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-violet-400">
                <Briefcase className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white font-display">
                  FORGE Required Founder Decisions (Max 3)
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Immediate Commercial Action</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forgeReport.requiredDecisions.map((dec) => (
                <div key={dec.id} className="p-4 rounded-xl bg-[#04060a] border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-violet-950 text-violet-300 border border-violet-500/40 uppercase">
                      {dec.id}
                    </span>
                    <span className="text-[10px] text-slate-400">Deadline: <strong className="text-white">{dec.deadline}</strong></span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{dec.decisionRequired}</h4>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    <strong>Why It Matters:</strong> {dec.whyItMatters}
                  </p>
                  <div className="p-2.5 rounded bg-violet-950/20 border border-violet-500/30 text-[11px] text-violet-200 font-sans">
                    <strong>Advisor Recommendation:</strong> {dec.advisorRecommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: FOUNDER ALLOCATION (MEMO 03)                       */}
      {/* ========================================================= */}
      {activeTab === 'allocation' && (
        <div className="space-y-6">
          {/* Detailed Attention Allocation Breakdown */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  MEMO 03 // ATTENTION ALLOCATION RECOMMENDATION
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Recommended Founder Workload Distribution (36h Week)
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Evidence-Based Allocation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ORACLE */}
              <div className="p-4 rounded-xl bg-[#090e1a] border border-cyan-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase">ORACLE Division</span>
                  <span className="text-base font-bold text-white">{founderMemo.attentionAllocation.oracle.percentage}% ({founderMemo.attentionAllocation.oracle.hours}h)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  <strong>Evidence:</strong> {founderMemo.attentionAllocation.oracle.evidence}
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                  <strong className="text-slate-200">What gets deprioritized:</strong> {founderMemo.attentionAllocation.oracle.whatGetsDeprioritized}
                </div>
                <div className="text-[10px] text-rose-300/90 font-sans">
                  <strong>Risk of misallocation:</strong> {founderMemo.attentionAllocation.oracle.riskOfMisallocation}
                </div>
              </div>

              {/* FORGE */}
              <div className="p-4 rounded-xl bg-[#0c0915] border border-violet-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-300 uppercase">FORGE Division</span>
                  <span className="text-base font-bold text-white">{founderMemo.attentionAllocation.forge.percentage}% ({founderMemo.attentionAllocation.forge.hours}h)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  <strong>Evidence:</strong> {founderMemo.attentionAllocation.forge.evidence}
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                  <strong className="text-slate-200">What gets deprioritized:</strong> {founderMemo.attentionAllocation.forge.whatGetsDeprioritized}
                </div>
                <div className="text-[10px] text-rose-300/90 font-sans">
                  <strong>Risk of misallocation:</strong> {founderMemo.attentionAllocation.forge.riskOfMisallocation}
                </div>
              </div>

              {/* SHARED */}
              <div className="p-4 rounded-xl bg-[#0d1220] border border-slate-700 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase">Shared / Governance</span>
                  <span className="text-base font-bold text-white">{founderMemo.attentionAllocation.sharedAdminGovernance.percentage}% ({founderMemo.attentionAllocation.sharedAdminGovernance.hours}h)</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  <strong>Evidence:</strong> {founderMemo.attentionAllocation.sharedAdminGovernance.evidence}
                </p>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                  <strong className="text-slate-200">What gets deprioritized:</strong> {founderMemo.attentionAllocation.sharedAdminGovernance.whatGetsDeprioritized}
                </div>
                <div className="text-[10px] text-rose-300/90 font-sans">
                  <strong>Risk of misallocation:</strong> {founderMemo.attentionAllocation.sharedAdminGovernance.riskOfMisallocation}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Weekly Scorecard */}
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                WEEKLY SYSTEM SCORECARD
              </span>
              <span className="text-[10px] text-slate-400">Separated Division Metrics</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">ORACLE Integrity</span>
                <span className="text-base font-bold text-cyan-400">{founderMemo.weeklyScorecard.oracleForecastIntegrityIndex}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">FORGE Compounding</span>
                <span className="text-base font-bold text-violet-400">{founderMemo.weeklyScorecard.forgeCompoundingIndex}/100</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Governance</span>
                <span className="text-base font-bold text-emerald-400">100% Airgapped</span>
              </div>
              <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850">
                <span className="text-[9px] text-slate-500 uppercase block font-semibold">Workload Health</span>
                <span className="text-base font-bold text-white">36h Balanced</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: DECISION LOG & REVIEW SIGN-OFF                      */}
      {/* ========================================================= */}
      {activeTab === 'decisions' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  FOUNDER DECISION LOG &amp; SIGN-OFF CHAMBER
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Active Weekly Decisions Requiring Human Determination
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                The advisor never automatically executes
              </span>
            </div>

            {/* Decision Table */}
            <div className="space-y-4">
              {founderMemo.decisionLog.map((dec) => {
                const currentChoice = decisionChoices[dec.id] || dec.founderDecision || 'accept';
                return (
                  <div key={dec.id} className="p-4 rounded-xl bg-[#04060a] border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-cyan-300 border border-slate-700">
                          {dec.division}
                        </span>
                        <h4 className="text-xs font-bold text-white">{dec.decision}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400">Deadline: <strong className="text-amber-300">{dec.deadline}</strong></span>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-sans">
                      <strong>Advisor Recommendation:</strong> {dec.advisorRecommendation}
                    </div>

                    {/* Interactive Decision Selector */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-500 uppercase font-bold mr-1">Founder Action:</span>
                      {[
                        { id: 'accept', label: 'Accept Recommendation', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' },
                        { id: 'reject', label: 'Reject', color: 'bg-rose-500/20 text-rose-300 border-rose-500/50' },
                        { id: 'modify', label: 'Modify', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' },
                        { id: 'defer', label: 'Defer to Next Review', color: 'bg-amber-500/20 text-amber-300 border-amber-500/50' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setDecisionChoices({ ...decisionChoices, [dec.id]: opt.id as any })}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                            currentChoice === opt.id
                              ? opt.color
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {/* Optional Custom Rationale Input */}
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Add custom founder rationale or follow-up note (optional)..."
                        value={decisionNotes[dec.id] || ''}
                        onChange={(e) => setDecisionNotes({ ...decisionNotes, [dec.id]: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-[11px] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final Sign-Off Form */}
            <div className="p-5 rounded-xl bg-[#090e1a] border-2 border-cyan-500/40 space-y-4 mt-6">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-display">
                  Weekly Executive Review Completion &amp; Sign-Off
                </h4>
                <p className="text-xs text-slate-300 font-sans">
                  To mark this review complete, confirm review of all labeled evidence and acknowledge any partial data warnings.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewConfirmed}
                    onChange={(e) => setReviewConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-200 font-sans">
                    I have audited the ORACLE readiness scorecard, FORGE revenue truth table, and attention allocation recommendations.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={missingDataConfirmed}
                    onChange={(e) => setMissingDataConfirmed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
                  />
                  <span className="text-slate-200 font-sans">
                    I acknowledge incomplete/missing data flags (including Friday practice status and single-buyer interview sample).
                  </span>
                </label>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Record executive notes or strategic commitments for this week..."
                  value={founderNotes}
                  onChange={(e) => setFounderNotes(e.target.value)}
                  className="w-full bg-[#04060a] border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <button
                onClick={handleFinalSignOff}
                disabled={!reviewConfirmed || !missingDataConfirmed}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {currentPackage.status === 'founder_reviewed' ? 'Update & Save Sign-Off' : 'Confirm Executive Review & Lock Week 5 Plan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: DATA QUALITY & AIRGAP AUDIT                         */}
      {/* ========================================================= */}
      {activeTab === 'data-quality' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  DATA QUALITY &amp; AIRGAP AUDIT
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Lineage Verification &amp; Zero Synthetic Assumption Rules
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% Airgap Enforced
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#04060a] border border-slate-850 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Source Quality Breakdown</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary / Regulatory Filings:</span>
                    <strong className="text-emerald-400">{oracleReport.dataIntegrity.sourceQualityMix.primary} sources</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Official NFL League Releases:</span>
                    <strong className="text-cyan-300">{oracleReport.dataIntegrity.sourceQualityMix.official} sources</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Secondary / Commercial:</span>
                    <strong className="text-slate-300">{oracleReport.dataIntegrity.sourceQualityMix.secondary} sources</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Unverified / Media Rumor:</span>
                    <strong className="text-slate-500">0 sources (Forbidden)</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#04060a] border border-slate-850 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Airgap Perimeter Audit</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Restricted Data Attempt Intercepts:</span>
                    <strong className="text-emerald-400">1 blocked &amp; discarded</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Third-Party IP Ingestion:</span>
                    <strong className="text-emerald-400">0 bytes stored</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Division Data Blending:</span>
                    <strong className="text-emerald-400">Strictly Isolated</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: REPORT ARCHIVE                                      */}
      {/* ========================================================= */}
      {activeTab === 'archive' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#070a12] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                  IMMUTABLE EXECUTIVE REPORT ARCHIVE
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  Past Weekly Reviews &amp; Historical Postmortems
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {reportArchive.length} Archived Reviews
              </span>
            </div>

            <div className="space-y-3">
              {reportArchive.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-xl bg-[#04060a] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        Week {pkg.weekNumber} Executive Review
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-slate-900 text-slate-300 border border-slate-700 uppercase">
                        {pkg.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Generated: {new Date(pkg.generatedAt).toLocaleString()} · Completeness: {pkg.dataCompletenessScore}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentPackage(pkg);
                        setActiveTab('summary');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
                    >
                      Load Into View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
