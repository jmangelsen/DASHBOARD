import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  FlaskConical, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  DollarSign 
} from 'lucide-react';

export const ForgeOpportunityLabView: React.FC = () => {
  const { forgeOpportunity, updateScorecard, setOpportunityStage } = useNexus();
  const { scorecard } = forgeOpportunity;

  const handleScoreChange = (field: keyof typeof scorecard, val: number) => {
    updateScorecard({
      ...scorecard,
      [field]: val
    });
  };

  const hardGateChecklist = [
    { label: 'Identified Buyer', val: forgeOpportunity.buyer, passed: Boolean(forgeOpportunity.buyer) },
    { label: 'Stated Job to be Done', val: forgeOpportunity.jobToBeDone, passed: Boolean(forgeOpportunity.jobToBeDone) },
    { label: 'Defined Offer', val: forgeOpportunity.proposedOffer, passed: Boolean(forgeOpportunity.proposedOffer) },
    { label: 'Price Hypothesis', val: forgeOpportunity.pricingHypothesis, passed: Boolean(forgeOpportunity.pricingHypothesis) },
    { label: 'Acquisition Path', val: forgeOpportunity.acquisitionChannel, passed: Boolean(forgeOpportunity.acquisitionChannel) },
    { label: 'Paid-Validation Experiment', val: 'Direct memo outbound to 12 site directors', passed: true },
    { label: 'Success Threshold', val: '$750/mo verified MRR', passed: true },
    { label: 'Kill Criterion Defined', val: forgeOpportunity.killCriterion, passed: Boolean(forgeOpportunity.killCriterion) },
    { label: 'Conflict of Interest Review', val: 'Personal research only; no employer data overlap', passed: forgeOpportunity.conflictOfInterestApproved }
  ];

  const allGatesPassed = hardGateChecklist.every(g => g.passed);

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Hard Gate Banner */}
      <div className="p-4 bg-[#0a0e19] border border-violet-500/40 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-violet-400">
            <FlaskConical className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              OPPORTUNITY LAB // 14-DIMENSION EVALUATION SCORECARD
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Grounded commercial qualification. No code may be written until the 9-part hard gate is fully cleared.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
            allGatesPassed ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300'
          }`}>
            {allGatesPassed ? 'BUILD GATE: APPROVED' : 'BUILD GATE: LOCKED'}
          </span>
        </div>
      </div>

      {/* Primary Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Commercial Readiness</span>
          <div className="text-2xl font-bold text-white tabular-nums">
            {forgeOpportunity.commercialReadinessScore} / 100
          </div>
          <span className="text-[10px] text-emerald-400">Buyer problem &amp; willingness confirmed</span>
        </div>

        <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Revenue Potential Score</span>
          <div className="text-2xl font-bold text-cyan-300 tabular-nums">
            {forgeOpportunity.revenuePotentialScore} / 100
          </div>
          <span className="text-[10px] text-slate-400">Gross Margin: 91% · Recurring</span>
        </div>

        <div className="p-4 bg-[#090d16] border border-violet-500/40 rounded-lg space-y-1 bg-[#100b20]">
          <span className="text-[10px] text-violet-400 uppercase block font-bold">Risk-Adjusted Opportunity</span>
          <div className="text-2xl font-bold text-violet-300 tabular-nums">
            {forgeOpportunity.riskAdjustedScore} / 100
          </div>
          <span className="text-[10px] text-violet-400/80">$750/mo Feasibility: Highly Realistic</span>
        </div>
      </div>

      {/* 9-PART HARD GATE CHECKLIST */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="font-bold text-white uppercase text-xs">
            Mandatory Build Approval Gate (9 Criteria)
          </span>
          <span className="text-emerald-400 text-[11px] font-bold">
            9 of 9 Criteria Satisfied
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {hardGateChecklist.map((gate, idx) => (
            <div key={idx} className="p-2.5 rounded bg-[#06080e] border border-slate-850 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{gate.label}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans truncate">
                {gate.val}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE 14-DIMENSION SCORECARD SLIDERS */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="font-bold text-white uppercase text-xs flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-violet-400" />
            <span>Scorecard Dimensions (Adjust 1 - 5 Scale)</span>
          </span>
          <span className="text-slate-500 text-[10px]">Changes recalculate risk score live</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <span className="text-[10px] text-violet-400 uppercase font-bold block">Positive Drivers</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Pain Severity</span>
                <span className="text-white font-bold">{scorecard.painSeverity}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.painSeverity}
                onChange={(e) => handleScoreChange('painSeverity', Number(e.target.value))}
                className="w-full accent-violet-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Willingness to Pay</span>
                <span className="text-white font-bold">{scorecard.willingnessToPay}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.willingnessToPay}
                onChange={(e) => handleScoreChange('willingnessToPay', Number(e.target.value))}
                className="w-full accent-violet-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Buyer Access</span>
                <span className="text-white font-bold">{scorecard.buyerAccess}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.buyerAccess}
                onChange={(e) => handleScoreChange('buyerAccess', Number(e.target.value))}
                className="w-full accent-violet-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Differentiation</span>
                <span className="text-white font-bold">{scorecard.differentiation}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.differentiation}
                onChange={(e) => handleScoreChange('differentiation', Number(e.target.value))}
                className="w-full accent-violet-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Recurring Potential</span>
                <span className="text-white font-bold">{scorecard.recurringRevenuePotential}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.recurringRevenuePotential}
                onChange={(e) => handleScoreChange('recurringRevenuePotential', Number(e.target.value))}
                className="w-full accent-violet-500" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">Friction &amp; Risk Penalties</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Support Burden Penalty</span>
                <span className="text-amber-400 font-bold">{scorecard.supportBurdenPenalty}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.supportBurdenPenalty}
                onChange={(e) => handleScoreChange('supportBurdenPenalty', Number(e.target.value))}
                className="w-full accent-amber-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Operating Cost Penalty</span>
                <span className="text-amber-400 font-bold">{scorecard.operatingCostPenalty}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.operatingCostPenalty}
                onChange={(e) => handleScoreChange('operatingCostPenalty', Number(e.target.value))}
                className="w-full accent-amber-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Legal / Conflict Risk</span>
                <span className="text-emerald-400 font-bold">{scorecard.legalConflictRisk}/5 (Low)</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.legalConflictRisk}
                onChange={(e) => handleScoreChange('legalConflictRisk', Number(e.target.value))}
                className="w-full accent-emerald-500" 
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-300">Data Dependency Risk</span>
                <span className="text-slate-300 font-bold">{scorecard.dataDependencyRisk}/5</span>
              </div>
              <input 
                type="range" min="1" max="5" value={scorecard.dataDependencyRisk}
                onChange={(e) => handleScoreChange('dataDependencyRisk', Number(e.target.value))}
                className="w-full accent-violet-500" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Red-Team Critique */}
      <div className="p-4 rounded bg-amber-950/20 border border-amber-500/30 text-slate-300 space-y-1 text-xs">
        <span className="font-bold text-amber-300 block uppercase text-[11px] flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Red-Team Independent Critique:</span>
        </span>
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
          {forgeOpportunity.redTeamCritique}
        </p>
      </div>
    </div>
  );
};
