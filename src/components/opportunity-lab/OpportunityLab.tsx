import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OpportunityRecord, OpportunityScorecard, OpportunityStage } from '../../types';
import { 
  FlaskConical, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronRight, 
  Sliders, 
  DollarSign, 
  Target,
  FileCheck
} from 'lucide-react';

export const OpportunityLab: React.FC = () => {
  const { opportunity, updateOpportunity, onboarding } = useApp();
  const [scorecard, setScorecard] = useState<OpportunityScorecard>(opportunity.scorecard);
  const [activeTab, setActiveTab] = useState<'overview' | 'scorecard' | 'kill_gate'>('overview');
  const [stage, setStage] = useState<OpportunityStage>(opportunity.stage);

  const threshold = onboarding.defaultApprovalThreshold || 750;

  // Calculate scores
  const calculateScores = (sc: OpportunityScorecard) => {
    // Upside components (max 45): pain(5), wtp(5), freq(5), access(5), diff(5), dist(5), recur(5), margin(5), auto(5)
    const upside = sc.painSeverity + sc.buyerWillingnessToPay + sc.frequencyOfUse +
      sc.accessToBuyers + sc.differentiation + sc.distributionStrength +
      sc.recurringRevenuePotential + sc.grossMarginPotential + sc.automationPotential;

    // Downside penalties (max 20): timeToFirstPaymentSpeed inverted? Here 5 is fastest so add to upside!
    // Penalties: supportBurden (5 max), operatingCost (5 max), legalConflictRisk (5 max), dataDependencyRisk (5 max)
    const penalties = sc.supportBurden + sc.operatingCost + sc.legalConflictRisk + sc.dataDependencyRisk;

    const readiness = Math.round(((upside + sc.timeToFirstPayment) / 50) * 100);
    const revenuePot = Math.round(((sc.buyerWillingnessToPay + sc.recurringRevenuePotential + sc.grossMarginPotential + sc.distributionStrength) / 20) * 100);
    const riskAdjusted = Math.max(10, Math.min(99, Math.round(readiness * 0.7 + (20 - penalties) * 1.5)));

    return { readiness, revenuePot, riskAdjusted };
  };

  const currentScores = calculateScores(scorecard);

  const handleScoreChange = (field: keyof OpportunityScorecard, val: number) => {
    const updated = { ...scorecard, [field]: val };
    setScorecard(updated);
    const scores = calculateScores(updated);
    updateOpportunity({
      scorecard: updated,
      commercialReadinessScore: scores.readiness,
      revenuePotentialScore: scores.revenuePot,
      riskAdjustedOpportunityScore: scores.riskAdjusted,
    });
  };

  const handleStageChange = (newStage: OpportunityStage) => {
    setStage(newStage);
    updateOpportunity({ stage: newStage });
  };

  const stages: { id: OpportunityStage; label: string }[] = [
    { id: 'research', label: '1. Research' },
    { id: 'customer_discovery', label: '2. Customer Discovery' },
    { id: 'validation', label: '3. Offer Validation' },
    { id: 'paid_pilot', label: '4. Paid Pilot' },
    { id: 'productization', label: '5. Productization' },
    { id: 'growth', label: '6. Scale' },
    { id: 'paused', label: 'Paused' },
    { id: 'killed', label: 'Killed' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <FlaskConical className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 03 // OPPORTUNITY SCORING</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Opportunity Lab
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Turn evidence into structured commercial experiments. Enforce the $750/mo minimum approval threshold 
            and mandatory kill criteria before building software.
          </p>
        </div>

        {/* Commercial Stage Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0a0e17] border border-slate-800 rounded-md text-xs font-mono">
          <span className="text-slate-400 px-2 text-[11px]">Stage:</span>
          <select
            value={stage}
            onChange={(e) => handleStageChange(e.target.value as OpportunityStage)}
            className="bg-slate-800 text-cyan-300 font-semibold px-2 py-1 rounded border border-slate-700 focus:outline-none"
          >
            {stages.map((st) => (
              <option key={st.id} value={st.id}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* MANDATORY COMMERCIAL GATE NOTICE */}
      <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 font-mono text-xs">
          <div className="text-cyan-300 font-bold uppercase tracking-wider">
            MANDATORY PRODUCTIZATION GATE
          </div>
          <p className="text-slate-300 font-sans leading-relaxed">
            "No project advances to product build without a buyer, an offer, a price hypothesis, a distribution channel, a validation action, and an explicit kill criterion."
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
            activeTab === 'overview' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Experiment Blueprint
        </button>
        <button
          onClick={() => setActiveTab('scorecard')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
            activeTab === 'scorecard' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          14-Point Opportunity Scorecard ({currentScores.riskAdjusted}/100)
        </button>
        <button
          onClick={() => setActiveTab('kill_gate')}
          className={`pb-2 px-1 border-b-2 font-medium transition-colors ${
            activeTab === 'kill_gate' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Kill Criteria &amp; Decision Gate
        </button>
      </div>

      {/* TAB 1: EXPERIMENT BLUEPRINT */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Expected Monthly Revenue</span>
              <div className="text-lg font-bold text-white tabular-nums">${opportunity.expectedMonthlyRevenue}/mo</div>
              <span className="text-emerald-400 text-[10px]">Threshold: ${threshold}/mo</span>
            </div>

            <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Gross Margin Hypothesis</span>
              <div className="text-lg font-bold text-emerald-400 tabular-nums">{opportunity.expectedGrossMargin}%</div>
              <span className="text-slate-400 text-[10px]">Op Cost: ${opportunity.expectedMonthlyOperatingCost}/mo</span>
            </div>

            <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Commercial Readiness</span>
              <div className="text-lg font-bold text-cyan-300 tabular-nums">{currentScores.readiness}/100</div>
              <span className="text-slate-400 text-[10px]">Time to Pay: {opportunity.timeToFirstPaymentDays}d</span>
            </div>

            <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
              <span className="text-slate-400 text-[10px] uppercase">Next Decision Date</span>
              <div className="text-lg font-bold text-amber-400 tabular-nums">{opportunity.nextDecisionDate}</div>
              <span className="text-slate-400 text-[10px]">Decision: Scale or Kill</span>
            </div>
          </div>

          {/* Blueprint Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                Buyer &amp; Value Proposition
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Target Buyer / ICP</span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {opportunity.targetBuyer}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Severe Buyer Pain</span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {opportunity.buyerPain}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Current Suboptimal Workaround</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {opportunity.currentWorkaround}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Proposed Offer &amp; Pricing</span>
                <p className="text-xs text-cyan-300 font-mono leading-relaxed">
                  {opportunity.proposedOffer} — <strong className="text-white">{opportunity.pricingHypothesis}</strong>
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                Acquisition &amp; Validation Engine
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Acquisition Channel &amp; Advantage</span>
                <p className="text-xs text-slate-200 font-sans leading-relaxed">
                  {opportunity.acquisitionChannel}. Advantage: {opportunity.distributionAdvantage}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Evidence of Real Demand</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {opportunity.evidenceOfDemand}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Active Experiment</span>
                <div className="p-2.5 bg-[#0d121c] border border-cyan-500/30 rounded text-xs text-slate-200 font-sans">
                  {opportunity.nextExperiment}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase">Success Criteria</span>
                <p className="text-xs text-emerald-400 font-sans">
                  {opportunity.successCriteria}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 14-POINT OPPORTUNITY SCORECARD */}
      {activeTab === 'scorecard' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white uppercase">
                Risk-Adjusted Opportunity Score: <span className="text-cyan-400 tabular-nums text-sm">{currentScores.riskAdjusted} / 100</span>
              </div>
              <p className="text-slate-400 font-sans text-[11px]">
                High score requires high pain, buyer access, defensible margins, and zero employer conflict. 
                Scores are reduced by support burdens, tool costs, and fragile dependencies.
              </p>
            </div>
            <div className="text-right">
              <span className={`px-2.5 py-1 text-xs font-semibold rounded border ${
                opportunity.meetsApprovalThreshold 
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                  : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
              }`}>
                {opportunity.meetsApprovalThreshold ? 'CLEARS $750 THRESHOLD' : 'BELOW THRESHOLD'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Upside Dimensions */}
            <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider pb-2 border-b border-slate-800">
                Commercial Upside Factors (1-5 Rating)
              </div>

              {[
                { key: 'painSeverity', label: 'Pain Severity', desc: 'Is solving this urgent or tied to capital loss?' },
                { key: 'buyerWillingnessToPay', label: 'Willingness to Pay', desc: 'Does the buyer have discretionary corporate budget?' },
                { key: 'frequencyOfUse', label: 'Frequency of Use', desc: 'Is the data referenced weekly/monthly or once?' },
                { key: 'accessToBuyers', label: 'Access to Buyers', desc: 'Can you reach decision-makers directly?' },
                { key: 'differentiation', label: 'Differentiation', desc: 'Are claims grounded in primary evidence vs generic?' },
                { key: 'distributionStrength', label: 'Distribution Strength', desc: 'Do you have an organic channel or audience reach?' },
                { key: 'recurringRevenuePotential', label: 'Recurring Potential', desc: 'Does the customer need ongoing updates?' },
                { key: 'grossMarginPotential', label: 'Gross Margin Potential', desc: 'Are marginal fulfillment costs near zero?' },
                { key: 'automationPotential', label: 'Automation Potential', desc: 'Can data ingestion and drafting be automated?' },
                { key: 'timeToFirstPayment', label: 'Time to Payment Speed', desc: '5 = under 14 days, 1 = >90 days' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-300 font-medium">{label}</span>
                    <span className="text-cyan-400 font-bold tabular-nums">
                      {scorecard[key as keyof OpportunityScorecard]} / 5
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">{desc}</div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={scorecard[key as keyof OpportunityScorecard]}
                    onChange={(e) => handleScoreChange(key as keyof OpportunityScorecard, Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Downside & Risk Penalties */}
            <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider pb-2 border-b border-slate-800">
                Friction &amp; Risk Penalties (1-5 Rating, 5 = Heavy Penalty)
              </div>

              {[
                { key: 'supportBurden', label: 'Support & Fulfillment Burden', desc: '5 = high custom consulting time, 1 = purely digital/async' },
                { key: 'operatingCost', label: 'Operating & Software Cost', desc: '5 = expensive APIs/servers, 1 = ultra-lean stack' },
                { key: 'legalConflictRisk', label: 'Legal & Conflict Risk', desc: '5 = employment/regulatory hazard, 1 = 100% public airgapped' },
                { key: 'dataDependencyRisk', label: 'Data Dependency Risk', desc: '5 = fragile single API, 1 = open statutory filings' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-300 font-medium">{label}</span>
                    <span className="text-amber-400 font-bold tabular-nums">
                      {scorecard[key as keyof OpportunityScorecard]} / 5
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-sans">{desc}</div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={scorecard[key as keyof OpportunityScorecard]}
                    onChange={(e) => handleScoreChange(key as keyof OpportunityScorecard, Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KILL CRITERIA & DECISION GATE */}
      {activeTab === 'kill_gate' && (
        <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-800">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>EXPLICIT KILL CRITERIA PROTOCOL</span>
          </div>

          <div className="p-4 bg-rose-950/20 border border-rose-500/40 rounded space-y-2">
            <div className="text-rose-300 font-bold text-xs uppercase">
              Non-Negotiable Threshold Rule
            </div>
            <p className="text-slate-200 font-sans leading-relaxed text-xs">
              Every project must demonstrate a verified commercial trajectory toward <strong>${threshold}/month</strong> within 45 days of launch. If evidence disproves buyer willingness to pay, the project must be intentionally killed to preserve founder focus.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-slate-400 uppercase text-[10px] block">Project Specific Kill Criteria</span>
              <p className="text-sm text-slate-100 font-sans font-semibold mt-1">
                "{opportunity.killCriteria}"
              </p>
            </div>

            <div>
              <span className="text-slate-400 uppercase text-[10px] block">Decision Date</span>
              <p className="text-sm text-amber-400 font-mono font-bold mt-1">
                {opportunity.nextDecisionDate} (19 days remaining)
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => handleStageChange('killed')}
                className="px-4 py-2 text-xs font-mono font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/80 hover:bg-rose-900/60 rounded transition-colors"
              >
                Kill Project Immediately (Award +35 SC)
              </button>
              <button
                onClick={() => handleStageChange('paused')}
                className="px-4 py-2 text-xs font-mono text-amber-300 bg-amber-950/60 border border-amber-800/80 hover:bg-amber-900/60 rounded transition-colors"
              >
                Pause Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
