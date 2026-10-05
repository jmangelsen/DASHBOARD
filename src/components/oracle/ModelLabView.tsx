import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { OracleModelRecord } from '../../types/nexus';
import { 
  GitBranch, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ArrowRight, 
  FileCode, 
  Percent,
  Sliders,
  History
} from 'lucide-react';

export const ModelLabView: React.FC = () => {
  const { oracleModels, modelChanges, addModelChange, activateModelChange } = useNexus();
  const [selectedModelId, setSelectedModelId] = useState<string>(oracleModels[0].id);
  const [showProposeModal, setShowProposeModal] = useState<boolean>(false);

  // Form State for new proposed model change
  const [proposedChange, setProposedChange] = useState({
    modelAffected: oracleModels[0].name,
    exactChangeDescription: '',
    hypothesis: '',
    expectedMetricImprovement: '',
    baselineMetric: 'Brier Score: 0.188 / LogLoss: 0.542',
    candidateMetric: '',
    backtestPeriod: '2023 - 2025 Regular Seasons (540 Games)',
    sampleSize: 540,
    result: 'pass' as 'pass' | 'fail' | 'inconclusive',
    reviewer: 'Founder (Admin)',
    activationDecision: 'pending' as 'approved' | 'rejected' | 'pending',
    notes: '',
    linkedCommit: 'git:oracle/feat/pace-refactor',
    dateProposed: new Date().toISOString().split('T')[0]
  });

  const [formError, setFormError] = useState<string | null>(null);

  const selectedModel = oracleModels.find(m => m.id === selectedModelId) || oracleModels[0];

  const handleProposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const res = addModelChange(proposedChange);
    if (!res.success) {
      setFormError(res.error || 'Failed to submit proposal.');
      return;
    }

    setShowProposeModal(false);
    setProposedChange({
      modelAffected: oracleModels[0].name,
      exactChangeDescription: '',
      hypothesis: '',
      expectedMetricImprovement: '',
      baselineMetric: 'Brier Score: 0.188 / LogLoss: 0.542',
      candidateMetric: '',
      backtestPeriod: '2023 - 2025 Regular Seasons (540 Games)',
      sampleSize: 540,
      result: 'pass',
      reviewer: 'Founder (Admin)',
      activationDecision: 'pending',
      notes: '',
      linkedCommit: 'git:oracle/feat/pace-refactor',
      dateProposed: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Permanent Model Honesty Notice */}
      <div className="p-4 bg-cyan-950/20 border border-cyan-500/40 rounded-lg flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-slate-300 font-sans">
          <strong className="text-white block font-mono text-xs uppercase tracking-wide">
            PERMANENT MODEL HONESTY NOTICE
          </strong>
          <p className="text-xs leading-relaxed text-slate-400">
            Model outputs are probabilistic estimates. Historical accuracy does not guarantee future performance. Market benchmarks can reflect information not captured by this model.
          </p>
        </div>
      </div>

      {/* Header and Propose Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span>MODEL LAB // PREREGISTERED VERSION REGISTRY</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Strict change control: Hypotheses must be preregistered before viewing candidate evaluation output.
          </p>
        </div>

        <button
          onClick={() => setShowProposeModal(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Preregister Model Change</span>
        </button>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {oracleModels.map((model) => (
          <div
            key={model.id}
            onClick={() => setSelectedModelId(model.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all space-y-2 ${
              selectedModelId === model.id
                ? 'bg-[#0f172a] border-cyan-400 text-white shadow-md'
                : 'bg-[#090d16] border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                model.status === 'active'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : model.status === 'baseline'
                  ? 'bg-slate-800 text-slate-300'
                  : 'bg-violet-950 text-violet-300 border border-violet-800'
              }`}>
                {model.status.toUpperCase()}
              </span>
              <span className="text-[11px] text-cyan-400 font-bold">{model.version}</span>
            </div>

            <div className="text-sm font-bold text-white font-sans">{model.name}</div>
            <div className="text-[10px] text-slate-400 font-sans line-clamp-2">{model.purpose}</div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span>Brier Score: <strong className="text-white">{model.brierScore}</strong></span>
              <span>Log Loss: <strong className="text-cyan-300">{model.logLoss}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Model Dossier Details */}
      <div className="p-5 bg-[#090d16] border border-slate-800 rounded-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div>
            <h3 className="text-base font-bold text-white font-sans">{selectedModel.name}</h3>
            <span className="text-[11px] text-cyan-400">{selectedModel.modelFamily}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Training Period: <strong className="text-white">{selectedModel.trainingPeriod}</strong></span>
            <span>·</span>
            <span>Owner: <strong className="text-slate-200">{selectedModel.owner}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Feature Set</span>
              <div className="space-y-1">
                {selectedModel.featureSet.map((feat, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-[#06080e] border border-slate-850 text-slate-300 text-[11px]">
                    • {feat}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Key Assumptions</span>
              <div className="space-y-1">
                {selectedModel.assumptions.map((assump, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-[#06080e] border border-slate-850 text-slate-300 text-[11px]">
                    • {assump}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Known Limitations</span>
              <div className="space-y-1">
                {selectedModel.knownLimitations.map((limit, idx) => (
                  <div key={idx} className="p-1.5 rounded bg-amber-950/20 border border-amber-900/40 text-amber-200 text-[11px]">
                    ⚠ {limit}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded bg-[#06080e] border border-slate-850 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Rollback Strategy</span>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {selectedModel.rollbackPlan}
              </p>
              <div className="text-[10px] text-cyan-400 font-mono">
                {selectedModel.baselineComparison}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PREREGISTERED MODEL CHANGE LOG */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Preregistered Change Ledger ({modelChanges.length} Records)
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Non-destructive evaluation audit</span>
        </div>

        <div className="space-y-3">
          {modelChanges.map((change) => (
            <div key={change.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400">{change.id}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-white font-bold">{change.modelAffected}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">{change.dateProposed}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                    change.result === 'pass' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    Result: {change.result.toUpperCase()}
                  </span>
                  <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                    change.activationDecision === 'approved' ? 'bg-cyan-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Status: {change.activationDecision}
                  </span>
                </div>
              </div>

              <div className="text-xs text-white font-sans font-medium">
                "{change.exactChangeDescription}"
              </div>

              <div className="text-[11px] text-slate-300 font-sans bg-[#06080e] p-2.5 rounded border border-slate-850">
                <span className="text-cyan-400 font-mono block text-[10px] uppercase font-bold">Preregistered Hypothesis:</span>
                {change.hypothesis}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400 pt-1">
                <div>Sample Size: <strong className="text-white">{change.sampleSize} Games</strong></div>
                <div>Baseline: <strong className="text-slate-300">{change.baselineMetric}</strong></div>
                <div>Candidate: <strong className="text-emerald-400">{change.candidateMetric}</strong></div>
                <div>Commit: <strong className="text-cyan-400">{change.linkedCommit}</strong></div>
              </div>

              {change.result === 'pass' && change.activationDecision === 'pending' && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => activateModelChange(change.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-xs transition-colors"
                  >
                    Activate Model Change in Production
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PREREGISTER MODAL */}
      {showProposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090d16] border border-cyan-500/40 rounded-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Preregister Model Hypothesis // Change Control
                </h3>
              </div>
              <button onClick={() => setShowProposeModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded text-[11px] text-cyan-200 font-sans">
              <strong>Preregistration Rule:</strong> State your exact hypothesis before running candidate evaluation output. This prevents p-hacking and retrofitting historical noise.
            </div>

            {formError && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/50 rounded text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleProposeSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Model Affected</label>
                <input
                  type="text"
                  value={proposedChange.modelAffected}
                  onChange={(e) => setProposedChange({ ...proposedChange, modelAffected: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Exact Change Description</label>
                <input
                  type="text"
                  placeholder="e.g. Weight red-zone passing EPA more heavily when temperature < 32F"
                  value={proposedChange.exactChangeDescription}
                  onChange={(e) => setProposedChange({ ...proposedChange, exactChangeDescription: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Preregistered Hypothesis</label>
                <textarea
                  rows={3}
                  placeholder="State the theoretical reason why this feature improves generalized out-of-sample calibration..."
                  value={proposedChange.hypothesis}
                  onChange={(e) => setProposedChange({ ...proposedChange, hypothesis: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Expected Metric Improvement</label>
                  <input
                    type="text"
                    placeholder="-0.008 Brier Score"
                    value={proposedChange.expectedMetricImprovement}
                    onChange={(e) => setProposedChange({ ...proposedChange, expectedMetricImprovement: e.target.value })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Candidate Metric in Backtest</label>
                  <input
                    type="text"
                    placeholder="Brier: 0.182 / LogLoss: 0.528"
                    value={proposedChange.candidateMetric}
                    onChange={(e) => setProposedChange({ ...proposedChange, candidateMetric: e.target.value })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowProposeModal(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold"
                >
                  Log Preregistered Change
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
