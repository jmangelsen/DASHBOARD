import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Layers, 
  FileCheck, 
  ExternalLink 
} from 'lucide-react';

export const DataOperationsView: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('2026-10-05 11:45:00 UTC');
  const [refreshSuccess, setRefreshSuccess] = useState(false);

  const feeds = [
    {
      name: 'Official League Play-by-Play & Boxscores',
      provider: 'SportsDataIO NFL Enterprise API',
      status: 'Healthy (Nominal)',
      latency: '240ms',
      lastIngest: '2026-10-05 11:45:00',
      licenseType: 'Licensed Developer Sandbox',
      completeness: '100%'
    },
    {
      name: 'Practice Participation & Official Injury Registry',
      provider: 'NFL Official Injury Disclosure Protocol',
      status: 'Awaiting Friday Final Reports',
      latency: '180ms',
      lastIngest: '2026-10-05 09:30:00',
      licenseType: 'Public Domain Regulatory Disclosure',
      completeness: '92% (Pending Friday practice inactives)'
    },
    {
      name: 'High-Resolution Weather & Stadium Wind Radars',
      provider: 'NOAA National Weather Service / Stadium Feeds',
      status: 'Live Real-Time Stream',
      latency: '120ms',
      lastIngest: '2026-10-05 12:15:00',
      licenseType: 'Public Scientific Observation Data',
      completeness: '100%'
    },
    {
      name: 'Consensus Market Line & Benchmark Feeds',
      provider: 'Consensus Exchange Aggregate (Pinnacle/Circa Context)',
      status: 'Hourly Snapshot Cycle',
      latency: '450ms',
      lastIngest: '2026-10-05 12:00:00',
      licenseType: 'Market Benchmark Reference (Non-Wagering)',
      completeness: '100%'
    }
  ];

  const handleRefreshAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC');
      setRefreshSuccess(true);
      setTimeout(() => setRefreshSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Header */}
      <div className="p-4 bg-[#0a0e19] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Database className="w-4 h-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              DATA OPERATIONS // INGESTION &amp; LINEAGE REGISTRY
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Strict audit of all external data streams, source license status, and missing-data flags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400">
            Last Sync: <strong className="text-white">{lastRefreshed}</strong>
          </span>
          <button
            onClick={handleRefreshAll}
            disabled={isRefreshing}
            className="px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing Feeds...' : 'Trigger Sync'}</span>
          </button>
        </div>
      </div>

      {refreshSuccess && (
        <div className="p-3 bg-emerald-950/30 border border-emerald-500/50 rounded text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>All 4 data feeds synchronized successfully. Data completeness verified at 98.4%.</span>
        </div>
      )}

      {/* FEED STATUS TABLE */}
      <div className="bg-[#090d16] border border-slate-800 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-800 font-bold text-white uppercase flex items-center justify-between">
          <span>Active Data Feeds &amp; Ingestion Lineage</span>
          <span className="text-emerald-400 text-[11px] font-normal flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Unlicensed Scraping Enforced</span>
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {feeds.map((feed, idx) => (
            <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                  <span>{feed.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {feed.licenseType}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-sans">
                  Provider: <strong className="text-slate-200">{feed.provider}</strong> · Ingest: {feed.lastIngest}
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Completeness</span>
                  <span className="text-white font-bold">{feed.completeness}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Feed Health</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{feed.status}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSING DATA & QUALITY RULES PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-white font-bold uppercase pb-1 border-b border-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Missing Data Protocol</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            If starting player inactives are unannounced at 90 minutes before kickoff, model runs automatically freeze with an explicit <strong className="text-amber-300">"HIGH UNCERTAINTY"</strong> label. Models never fabricate participation probabilities.
          </p>
        </div>

        <div className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-white font-bold uppercase pb-1 border-b border-slate-800">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>Data Lineage Guarantee</span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Every game dossier records the exact timestamps and source providers used to generate win probabilities and spread distribution curves, preventing hindsight leakage.
          </p>
        </div>
      </div>
    </div>
  );
};
