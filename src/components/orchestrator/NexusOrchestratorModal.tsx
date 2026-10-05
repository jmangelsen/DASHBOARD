import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { DivisionId } from '../../types/nexus';
import { 
  Sparkles, 
  X, 
  Send, 
  Target, 
  Briefcase, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCw,
  HelpCircle,
  Clock
} from 'lucide-react';

export const NexusOrchestratorModal: React.FC = () => {
  const { 
    orchestratorOpen, 
    setOrchestratorOpen, 
    orchestratorMode, 
    setOrchestratorMode, 
    orchestratorMessages, 
    orchestratorLoading, 
    sendOrchestratorQuery 
  } = useNexus();

  const [inputQuery, setInputQuery] = useState('');

  if (!orchestratorOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || orchestratorLoading) return;
    const q = inputQuery;
    setInputQuery('');
    await sendOrchestratorQuery(q, orchestratorMode);
  };

  const quickPrompts: { label: string; query: string; division: DivisionId }[] = [
    {
      label: 'Week 5 Spread Calibration Audit',
      query: 'Audit the spread and total probability distributions for Chiefs vs Bills and Rams vs 49ers. Are market divergence signals statistically meaningful?',
      division: 'oracle'
    },
    {
      label: 'Model 3.0 Backtest Evaluation',
      query: 'Review preregistered candidate Model 3.0 pace-compression backtest metrics. Does out-of-sample data justify production activation?',
      division: 'oracle'
    },
    {
      label: '$750 Threshold Bottleneck Review',
      query: 'What is the single highest-leverage commercial action to secure 3 additional subscribers for the Front Range Monitor before the Day 45 deadline?',
      division: 'forge'
    },
    {
      label: 'Weekly Attention Allocation Balance',
      query: 'Audit current founder hours allocation (14h ORACLE vs 18h FORGE). Are we under-allocating to venture distribution?',
      division: 'nexus'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono text-xs">
      <div className="w-full max-w-3xl bg-[#080c14] border border-cyan-500/40 rounded-xl shadow-2xl flex flex-col h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-[#0a0f1d] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/50 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>NEXUS ORCHESTRATOR // DUAL-DIVISION ASSISTANT</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                  {orchestratorMode.toUpperCase()} ROUTING
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-sans">
                Probabilistic forecast rigor for ORACLE · Commercial viability &amp; unit economics for FORGE.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Division Switcher in Assistant */}
            <div className="hidden sm:flex items-center gap-1 bg-[#06080e] p-1 rounded border border-slate-800 text-[10px]">
              <button
                onClick={() => setOrchestratorMode('nexus')}
                className={`px-2 py-0.5 rounded ${orchestratorMode === 'nexus' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'}`}
              >
                NEXUS
              </button>
              <button
                onClick={() => setOrchestratorMode('oracle')}
                className={`px-2 py-0.5 rounded ${orchestratorMode === 'oracle' ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold' : 'text-slate-400'}`}
              >
                ORACLE
              </button>
              <button
                onClick={() => setOrchestratorMode('forge')}
                className={`px-2 py-0.5 rounded ${orchestratorMode === 'forge' ? 'bg-violet-950 text-violet-300 border border-violet-700 font-bold' : 'text-slate-400'}`}
              >
                FORGE
              </button>
            </div>

            <button
              onClick={() => setOrchestratorOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#07090f]">
          {orchestratorMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[10px] text-slate-500">
                <span className="uppercase font-bold">
                  {msg.sender === 'user' ? 'Founder (Admin)' : `NEXUS [${msg.division.toUpperCase()}]`}
                </span>
                <span>·</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <div
                className={`max-w-2xl p-4 rounded-lg space-y-3 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white font-sans text-xs'
                    : 'bg-[#0d121f] border border-cyan-500/30 text-slate-200'
                }`}
              >
                <div className="font-sans text-xs leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>

                {/* Structured Output 5-Part Separation */}
                {msg.structuredOutput && (
                  <div className="space-y-3 pt-2 border-t border-slate-800 text-xs font-sans">
                    {/* 1. Known Facts */}
                    {msg.structuredOutput.knownFacts.length > 0 && (
                      <div className="p-2.5 rounded bg-[#06080e] border border-emerald-500/30 space-y-1">
                        <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block">
                          1. Directly Supported Facts:
                        </span>
                        {msg.structuredOutput.knownFacts.map((f, i) => (
                          <div key={i} className="text-[11px] text-slate-300">• {f}</div>
                        ))}
                      </div>
                    )}

                    {/* 2. Model Estimates */}
                    {msg.structuredOutput.modelEstimates.length > 0 && (
                      <div className="p-2.5 rounded bg-[#06080e] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">
                          2. Model Probability Estimates:
                        </span>
                        {msg.structuredOutput.modelEstimates.map((m, i) => (
                          <div key={i} className="text-[11px] text-slate-300">• {m}</div>
                        ))}
                      </div>
                    )}

                    {/* 3. Analyst Inferences */}
                    {msg.structuredOutput.analystInferences.length > 0 && (
                      <div className="p-2.5 rounded bg-[#06080e] border border-violet-500/30 space-y-1">
                        <span className="text-[10px] text-violet-400 font-mono font-bold uppercase block">
                          3. Analyst Inferences:
                        </span>
                        {msg.structuredOutput.analystInferences.map((inf, i) => (
                          <div key={i} className="text-[11px] text-slate-300">• {inf}</div>
                        ))}
                      </div>
                    )}

                    {/* 4. Unknowns & Gaps */}
                    {msg.structuredOutput.unknowns.length > 0 && (
                      <div className="p-2.5 rounded bg-[#06080e] border border-amber-500/30 space-y-1">
                        <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">
                          4. Unknowns &amp; Evidence Gaps:
                        </span>
                        {msg.structuredOutput.unknowns.map((u, i) => (
                          <div key={i} className="text-[11px] text-amber-200">⚠ {u}</div>
                        ))}
                      </div>
                    )}

                    {/* 5. Recommendation */}
                    {msg.structuredOutput.recommendation && (
                      <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 font-semibold text-xs">
                        <strong className="text-[10px] uppercase font-mono block text-cyan-300 mb-0.5">
                          Actionable Next Decision:
                        </strong>
                        {msg.structuredOutput.recommendation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {orchestratorLoading && (
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs p-2">
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>NEXUS ORCHESTRATOR evaluating division context...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-2 bg-[#090d16] border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[10px]">
          <span className="text-slate-500 uppercase tracking-widest pl-1 shrink-0">Inquiries:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOrchestratorMode(p.division);
                sendOrchestratorQuery(p.query, p.division);
              }}
              className="px-2.5 py-1 rounded bg-[#06080e] hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-[#0a0f1d] border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask NEXUS ORCHESTRATOR regarding ${orchestratorMode.toUpperCase()} operations...`}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 p-2.5 bg-[#06080e] border border-slate-800 rounded text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-xs"
          />
          <button
            type="submit"
            disabled={orchestratorLoading || !inputQuery.trim()}
            className="px-4 py-2.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <span>Execute</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
