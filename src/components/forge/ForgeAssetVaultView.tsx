import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Database, Plus, CheckCircle2, TrendingUp, Layers, ExternalLink } from 'lucide-react';

export const ForgeAssetVaultView: React.FC = () => {
  const { sharedAssets } = useNexus();
  const forgeAssets = sharedAssets.filter(a => a.primaryDivision === 'forge' || a.crossDivisionUsage);

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Database className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              ASSET VAULT // REUSABLE INTELLECTUAL PROPERTY
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Proprietary datasets, extraction scripts, report templates, and scoring methodologies that compound across products.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {forgeAssets.map((asset) => (
          <div key={asset.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white font-sans text-sm">{asset.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 uppercase font-mono">
                  {asset.assetType.replace('_', ' ')}
                </span>
                {asset.crossDivisionUsage && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                    Cross-Division Reused
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Reuse Count</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{asset.reuseCount} Projects</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Hours Saved</span>
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
