import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Percent
} from 'lucide-react';

export const MarketBenchmarkView: React.FC = () => {
  const { oracleGames } = useNexus();

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Permanent Notice */}
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-slate-300 font-sans">
          <strong className="text-white block font-mono text-xs uppercase tracking-wide">
            MARKET BENCHMARK DISCIPLINE // NON-CONVERGENCE POLICY
          </strong>
          <p className="text-xs leading-relaxed text-slate-400">
            Market lines are external contextual benchmarks reflecting public capital flow and bookmaker risk management. ORACLE forecasts do not adapt to market lines, nor do we claim market differences imply guaranteed mispricing.
          </p>
        </div>
      </div>

      {/* Benchmark Comparison Table */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Week 5 Model vs. Consensus Market Benchmarks</span>
          <span className="text-xs text-slate-400 font-normal">Consensus Timestamp: 2026-10-05 12:00 UTC</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {oracleGames.map((game) => {
            const spreadDiff = Math.abs(game.projectedSpreadHome - game.marketBenchmarks.marketSpread);
            const totalDiff = Math.abs(game.projectedTotal - game.marketBenchmarks.marketTotal);
            const isSpreadDivergent = spreadDiff >= 1.0;

            return (
              <div key={game.id} className="p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
                  <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <span>{game.awayTeam.name} @ {game.homeTeam.name}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">({game.id})</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Venue: {game.venue}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  {/* Point Spread Benchmark */}
                  <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Spread: Model vs Market</span>
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span className="text-cyan-300">Model: {game.homeTeam.abbr} {game.projectedSpreadHome}</span>
                      <span className="text-slate-400">Mkt: {game.homeTeam.abbr} {game.marketBenchmarks.marketSpread}</span>
                    </div>
                    <span className={`text-[10px] block ${isSpreadDivergent ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                      Divergence: {spreadDiff.toFixed(1)} pts {isSpreadDivergent ? '(Investigate)' : '(Aligned)'}
                    </span>
                  </div>

                  {/* Total Benchmark */}
                  <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Total: Model vs Market</span>
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span className="text-cyan-300">Model: {game.projectedTotal}</span>
                      <span className="text-slate-400">Mkt: {game.marketBenchmarks.marketTotal}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Divergence: {totalDiff.toFixed(1)} pts
                    </span>
                  </div>

                  {/* Moneyline Implied Benchmark */}
                  <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Win Probability Comparison</span>
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span className="text-emerald-400">{(game.independentWinProbHome * 100).toFixed(1)}%</span>
                      <span className="text-slate-400">Mkt: ~58.5%</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Market Moneyline: {game.marketBenchmarks.marketMoneylineHome}
                    </span>
                  </div>

                  {/* Epistemic Action Note */}
                  <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase block">Analytical Status</span>
                    <span className="text-xs text-white font-medium block">
                      {isSpreadDivergent ? 'Divergence to Investigate' : 'Consensus Convergence'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans block">
                      {isSpreadDivergent ? 'Check Rams offensive surge weight vs SF historical trend.' : 'Model confirms current market efficiency.'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
