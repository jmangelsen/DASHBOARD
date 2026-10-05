import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { TruthState } from '../../types/nexus';
import { 
  Target, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Percent, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

export const OracleCommandView: React.FC = () => {
  const { 
    oracleGames, 
    oracleModels, 
    weeklyPostmortem, 
    setActiveOracleDepartment, 
    setSelectedGameId,
    oracleIntegrityScore 
  } = useNexus();

  const activeModel = oracleModels[0];

  // Truth State counter
  const truthStates: { state: TruthState; label: string; count: number; color: string; desc: string }[] = [
    { state: 'known', label: 'Known Facts', count: 18, color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60', desc: 'Verified EPA, snap counts, official injury participations' },
    { state: 'inferred', label: 'Inferred Estimates', count: 12, color: 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60', desc: 'Game scripts, secondary safety shell tendencies' },
    { state: 'unknown', label: 'Unknowns', count: 4, color: 'text-amber-400 bg-amber-950/40 border-amber-800/60', desc: 'Game-time inactives, late wind gust thresholds' },
    { state: 'stale', label: 'Stale Inputs', count: 0, color: 'text-slate-400 bg-slate-900 border-slate-800', desc: 'All data feeds updated within 4 hours' },
    { state: 'conflicting', label: 'Conflicting Signals', count: 1, color: 'text-rose-400 bg-rose-950/40 border-rose-800/60', desc: 'Market steam divergence on Rams spread (+3.5 vs -2.1)' },
    { state: 'needs_review', label: 'Needs Human Review', count: 2, color: 'text-violet-400 bg-violet-950/40 border-violet-800/60', desc: 'Backup tackle WAR drop-off adjustments' }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Mission Control Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">NFL Calendar</span>
          <div className="text-base font-bold text-white">Week 5 Slate</div>
          <span className="text-[10px] text-cyan-400">Regular Season 2026</span>
        </div>

        <div className="p-3 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Active Model</span>
          <div className="text-base font-bold text-white truncate">{activeModel.name.split('(')[0]}</div>
          <span className="text-[10px] text-emerald-400">Status: Active Serving</span>
        </div>

        <div className="p-3 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Rolling Brier Score</span>
          <div className="text-base font-bold text-emerald-400 tabular-nums">{activeModel.brierScore}</div>
          <span className="text-[10px] text-slate-400">Baseline: 0.208</span>
        </div>

        <div className="p-3 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Log Loss</span>
          <div className="text-base font-bold text-cyan-300 tabular-nums">{activeModel.logLoss}</div>
          <span className="text-[10px] text-slate-400">Calibration Error: 3.4%</span>
        </div>

        <div className="p-3 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Forecast Completeness</span>
          <div className="text-base font-bold text-white tabular-nums">100%</div>
          <span className="text-[10px] text-emerald-400">All games covered</span>
        </div>

        <div className="p-3 bg-[#090d16] border border-slate-800 rounded space-y-1">
          <span className="text-[10px] text-slate-400 uppercase block">Integrity Index</span>
          <div className="text-base font-bold text-cyan-400 tabular-nums">{oracleIntegrityScore}/100</div>
          <span className="text-[10px] text-slate-400">Level: Model Steward</span>
        </div>
      </div>

      {/* TRUTH STATE COMPONENT */}
      <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Truth State Breakdown // Epistemic Clarity
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Categorized inputs across active Week 5 slate
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {truthStates.map((ts) => (
            <div 
              key={ts.state}
              className={`p-2.5 rounded border ${ts.color} space-y-1`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold">{ts.label}</span>
                <span className="text-sm font-bold tabular-nums">{ts.count}</span>
              </div>
              <p className="text-[9px] text-slate-300 font-sans leading-tight">
                {ts.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING GAME DOSSIERS SLATE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Week 5 Dossiers // Independent Probability Distributions
            </h3>
          </div>
          <button
            onClick={() => setActiveOracleDepartment('game-intel')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Open Game Intelligence Dossier Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {oracleGames.map((game) => (
            <div
              key={game.id}
              onClick={() => {
                setSelectedGameId(game.id);
                setActiveOracleDepartment('game-intel');
              }}
              className="p-4 bg-[#0a0e19] border border-slate-800 hover:border-cyan-500/50 rounded-lg cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-850 pb-2">
                <span className="font-bold text-cyan-400">{game.venue}</span>
                <span>{game.isDome ? 'Controlled Indoor Dome' : `${game.temperatureF}°F · ${game.weatherCondition}`}</span>
              </div>

              {/* Matchup Header */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-base font-bold text-white font-sans group-hover:text-cyan-300 transition-colors">
                    {game.awayTeam.name} @ {game.homeTeam.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Kickoff: {new Date(game.kickoffTime).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 uppercase block">Model Win Prob</span>
                  <div className="text-base font-bold text-cyan-400 tabular-nums">
                    {(game.independentWinProbHome * 100).toFixed(1)}% {game.homeTeam.abbr}
                  </div>
                </div>
              </div>

              {/* Model vs Market Comparison */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded bg-[#06080e] border border-slate-850 text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Model Spread</span>
                  <span className="text-white font-bold tabular-nums">
                    {game.homeTeam.abbr} {game.projectedSpreadHome > 0 ? `+${game.projectedSpreadHome}` : game.projectedSpreadHome}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Market Line</span>
                  <span className="text-slate-300 font-medium tabular-nums">
                    {game.homeTeam.abbr} {game.marketBenchmarks.marketSpread > 0 ? `+${game.marketBenchmarks.marketSpread}` : game.marketBenchmarks.marketSpread}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Projected Total</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{game.projectedTotal} pts</span>
                </div>
              </div>

              {/* Injury / Uncertainty Preview */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Confidence: <strong className="text-emerald-400">{game.forecastConfidence}</strong></span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:underline">
                  <span>View Dossier &amp; Fact Separation</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
