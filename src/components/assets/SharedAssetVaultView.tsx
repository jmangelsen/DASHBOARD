import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Database, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

export const SharedAssetVaultView: React.FC = () => {
  const { sharedAssets, setActiveNexusSection } = useNexus();

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Database className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              NEXUS ASSET VAULT // CROSS-DIVISION COMPOUNDING IP
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Reusable code repositories, probabilistic calibration engines, and extraction pipelines that compound across divisions.
          </p>
        </div>

        <button
          onClick={() => setActiveNexusSection('workspace')}
          className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
        >
          <span>Sync to Drive & Sheets</span>
        </button>
      </div>

      <div className="space-y-3">
        {sharedAssets.map((asset) => (
          <div key={asset.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-sans text-sm">{asset.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                  asset.primaryDivision === 'oracle' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-violet-950 text-violet-300 border border-violet-800'
                }`}>
                  Origin: {asset.primaryDivision.toUpperCase()}
                </span>
                {asset.crossDivisionUsage && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                    Active Cross-Division Reuse
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Projects Reused</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{asset.reuseCount} Times</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Hours Preserved</span>
                  <span className="text-emerald-400 font-bold tabular-nums">~{asset.estimatedHoursSaved}h</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {asset.notes}
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-850 pt-2 font-mono">
              <span>Location: <code className="text-slate-300">{asset.location}</code></span>
              <span>Compounding Score: <strong className="text-cyan-400">{asset.compoundingScore}/100</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
