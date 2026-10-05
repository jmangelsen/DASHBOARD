import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Activity, 
  Target, 
  Calendar, 
  Wind, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  FileText, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

export const GameIntelligenceView: React.FC = () => {
  const { oracleGames, selectedGame, setSelectedGameId } = useNexus();
  const game = selectedGame || oracleGames[0];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Game Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest pl-1 shrink-0">
          Week 5 Dossiers:
        </span>
        {oracleGames.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGameId(g.id)}
            className={`px-3 py-1.5 rounded transition-all whitespace-nowrap text-xs ${
              game.id === g.id
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'bg-[#090d16] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {g.awayTeam.abbr} @ {g.homeTeam.abbr} (Win: {(g.independentWinProbHome * 100).toFixed(0)}%)
          </button>
        ))}
      </div>

      {/* Main Dossier Header */}
      <div className="p-5 bg-[#0a0e1a] border border-cyan-500/30 rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
              OFFICIAL FORECAST DOSSIER // {game.id.toUpperCase()}
            </div>
            <h1 className="text-xl font-bold font-display text-white mt-0.5">
              {game.awayTeam.name} vs. {game.homeTeam.name}
            </h1>
            <div className="text-xs text-slate-400 font-sans mt-0.5">
              {game.venue} · Kickoff: {new Date(game.kickoffTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} MT
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Model Version</span>
              <span className="text-xs font-bold text-cyan-400">{game.modelVersion}</span>
            </div>
            <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Confidence</span>
              <span className="text-xs font-bold text-emerald-400">{game.forecastConfidence}</span>
            </div>
          </div>
        </div>

        {/* Primary Model Distribution Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Win Probability</span>
            <div className="text-lg font-bold text-cyan-400 tabular-nums">
              {(game.independentWinProbHome * 100).toFixed(1)}% {game.homeTeam.abbr}
            </div>
            <span className="text-[10px] text-slate-400">
              {(game.independentWinProbAway * 100).toFixed(1)}% {game.awayTeam.abbr}
            </span>
          </div>

          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Projected Score</span>
            <div className="text-lg font-bold text-white tabular-nums">
              {game.projectedHomeScore} - {game.projectedAwayScore}
            </div>
            <span className="text-[10px] text-slate-400">
              Margin: {game.homeTeam.abbr} by {Math.abs(game.projectedSpreadHome).toFixed(1)}
            </span>
          </div>

          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Projected Total</span>
            <div className="text-lg font-bold text-white tabular-nums">{game.projectedTotal} pts</div>
            <span className="text-[10px] text-cyan-400">Pace: {game.projectedPace.split('(')[0]}</span>
          </div>

          <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">Market Benchmark</span>
            <div className="text-lg font-bold text-slate-300 tabular-nums">
              {game.homeTeam.abbr} {game.marketBenchmarks.marketSpread}
            </div>
            <span className="text-[10px] text-slate-400">
              Market Total: {game.marketBenchmarks.marketTotal} pts
            </span>
          </div>
        </div>
      </div>

      {/* 5-PART EPISTEMIC SEPARATION: FACTS, FORECASTS, INFERENCES, BENCHMARKS, UNKNOWNS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SECTION 1: DIRECT DATA FACTS */}
        <div className="p-4 bg-[#090d16] border border-emerald-500/30 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase pb-1 border-b border-slate-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Directly Supported Data Facts</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
            {game.directDataFacts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400 shrink-0">•</span>
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: MODEL-DERIVED FORECAST */}
        <div className="p-4 bg-[#090d16] border border-cyan-500/30 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase pb-1 border-b border-slate-800">
            <Activity className="w-4 h-4" />
            <span>2. Model-Derived Forecast Distributions</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
            {game.modelDerivedForecasts.map((forecast, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-cyan-400 shrink-0">•</span>
                <span>{forecast}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: HUMAN ANALYST INFERENCES */}
        <div className="p-4 bg-[#090d16] border border-violet-500/30 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-violet-400 font-bold uppercase pb-1 border-b border-slate-800">
            <FileText className="w-4 h-4" />
            <span>3. Analyst Inferences &amp; Game Scripts</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
            {game.analystInferences.map((inf, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-violet-400 shrink-0">•</span>
                <span>{inf}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: UNKNOWNS & EVIDENCE GAPS */}
        <div className="p-4 bg-[#090d16] border border-amber-500/30 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase pb-1 border-b border-slate-800">
            <AlertTriangle className="w-4 h-4" />
            <span>4. Unknowns &amp; Unresolved Inputs</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
            {game.unknownInputs.map((unk, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 shrink-0">⚠</span>
                <span>{unk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INJURY & LINEUP SENSITIVITY TABLE */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Injury &amp; Lineup Availability Telemetry</span>
          <span className="text-xs text-slate-400 font-normal">Source: Official League Friday Ingestion</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {game.injuries.map((inj, idx) => (
            <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-white font-sans flex items-center gap-2">
                  <span>{inj.player}</span>
                  <span className="text-cyan-400">({inj.team} · {inj.position})</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
                    inj.status === 'Out' ? 'bg-rose-950 text-rose-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {inj.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  {inj.uncertaintyNotes}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-500 uppercase block">Positional Impact</span>
                <span className={`font-bold uppercase text-xs ${
                  inj.impactRating === 'High' || inj.impactRating === 'Critical' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {inj.impactRating} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
