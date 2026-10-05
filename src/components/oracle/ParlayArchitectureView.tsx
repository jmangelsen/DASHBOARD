import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { ParlayLeg, CorrelationType, ParlayLegType } from '../../types/nexus';
import { 
  Layers, 
  AlertTriangle, 
  ShieldCheck, 
  Plus, 
  ArrowRight, 
  Percent, 
  Sliders, 
  CheckCircle2, 
  X 
} from 'lucide-react';

export const ParlayArchitectureView: React.FC = () => {
  const { parlayCards, saveParlayCard, oracleGames } = useNexus();
  const [selectedCard, setSelectedCard] = useState(parlayCards[0]);

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Permanent Anti-Gambling / Analytical Integrity Banner */}
      <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-slate-300 font-sans">
          <strong className="text-white block font-mono text-xs uppercase tracking-wide">
            PARLAY CORRELATION ARCHITECTURE // STRICTLY NOT WAGERING ADVICE
          </strong>
          <p className="text-xs leading-relaxed text-slate-400">
            Multi-leg combinations are analyzed strictly as joint probability distributions with intra-game covariance. ORACLE never provides betting advice, stakes, locks, or profit guarantees. Bookmaker lines incorporate correlation haircuts that often exceed analytical edge.
          </p>
        </div>
      </div>

      {/* Main Card View */}
      <div className="p-5 bg-[#0a0e19] border border-cyan-500/30 rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
              CORRELATED PROBABILITY MATRIX // WEEK {selectedCard.week}
            </div>
            <h1 className="text-lg font-bold font-display text-white mt-0.5">
              {selectedCard.title}
            </h1>
            <div className="text-xs text-slate-400 font-sans mt-0.5">
              Model: <span className="text-white font-mono">{selectedCard.modelVersion}</span> · Updated: {selectedCard.dataFreshness}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-bold uppercase">
              Covariance: {selectedCard.correlationType.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Probability Comparison: Independent vs Joint Model */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Independent Multiplication</span>
            <div className="text-xl font-bold text-slate-300 tabular-nums">
              {(selectedCard.independentCombinedProb * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-slate-500">Assuming zero correlation (naive multiplication)</span>
          </div>

          <div className="p-3.5 rounded bg-[#06080e] border border-cyan-500/40 space-y-1">
            <span className="text-[10px] text-cyan-400 uppercase block font-bold">Joint Correlated Simulation</span>
            <div className="text-xl font-bold text-cyan-300 tabular-nums">
              {(selectedCard.correlationAdjustedProb * 100).toFixed(1)}%
            </div>
            <span className="text-[10px] text-cyan-400/80">+6.3% joint probability boost from script covariance</span>
          </div>

          <div className="p-3.5 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Market Implied Comparison</span>
            <div className="text-xl font-bold text-slate-300 tabular-nums">
              ~19.5% (+410)
            </div>
            <span className="text-[10px] text-amber-400/80">Market applies internal correlation tax</span>
          </div>
        </div>

        {/* Concentration Risk Warning */}
        <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 font-sans">
          <strong>Concentration Risk Diagnostic:</strong> {selectedCard.concentrationRisk}
        </div>
      </div>

      {/* LEGS BREAKDOWN TABLE */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Component Legs &amp; Individual Probability Ranges</span>
          <span className="text-xs text-slate-400 font-normal">Joint Simulation: 10,000 Iterations</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {selectedCard.legs.map((leg, idx) => (
            <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1 max-w-xl">
                <div className="font-bold text-white font-sans text-sm flex items-center gap-2">
                  <span className="text-cyan-400 font-mono text-xs">Leg 0{idx + 1}</span>
                  <span>{leg.description}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300 uppercase">
                    {leg.legType.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 font-sans">
                  <strong>Covariance Role:</strong> {leg.correlationRole}
                </div>
                <div className="text-[10px] text-slate-400">
                  Uncertainty Factor: {leg.uncertaintyLabel}
                </div>
              </div>

              <div className="flex items-center gap-4 text-right shrink-0">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Model Probability</span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {(leg.modelProbPoint * 100).toFixed(1)}%
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    [{(leg.modelProbRange[0] * 100).toFixed(0)}% - {(leg.modelProbRange[1] * 100).toFixed(0)}%]
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Market Benchmark</span>
                  <span className="text-slate-300 font-medium tabular-nums">
                    {(leg.marketImpliedProb * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SCENARIO BREAKDOWN */}
      <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2">
        <span className="font-bold text-white uppercase text-xs block pb-1 border-b border-slate-800">
          Game Script Scenario Sensitivity
        </span>
        <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
          {selectedCard.scenarioNotes.map((note, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-cyan-400 shrink-0">•</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
