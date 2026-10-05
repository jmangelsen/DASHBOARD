import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Archive, Calendar, History, FileText, CheckCircle2 } from 'lucide-react';

export const OracleArchiveView: React.FC = () => {
  const archives = [
    {
      season: 2025,
      title: '2025 Complete Regular Season Archive',
      gamesTracked: 272,
      finalBrier: 0.194,
      modelUsed: 'ORACLE v2.1 Ridge-EPA',
      status: 'Archived & Verified'
    },
    {
      season: 2024,
      title: '2024 Regular Season Archive',
      gamesTracked: 272,
      finalBrier: 0.201,
      modelUsed: 'ORACLE v1.8 Baseline',
      status: 'Archived & Verified'
    },
    {
      season: 2023,
      title: '2023 Exploratory Calibration Archive',
      gamesTracked: 272,
      finalBrier: 0.214,
      modelUsed: 'ORACLE v1.0 Pilot',
      status: 'Archived & Verified'
    }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Archive className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              HISTORICAL ORACLE ARCHIVE // PAST SEASONS &amp; RETIRED MODELS
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Preserved historical backtests, past calibration reports, and retired baseline snapshots.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {archives.map((item) => (
          <div key={item.season} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <span>{item.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Season {item.season}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Primary Model: <strong className="text-cyan-400">{item.modelUsed}</strong> · Games Tracked: {item.gamesTracked}
              </div>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Final Brier</span>
                <span className="text-sm font-bold text-emerald-400">{item.finalBrier}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Verification</span>
                <span className="text-slate-300 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.status}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
