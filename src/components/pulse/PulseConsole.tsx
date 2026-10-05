import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PulseResearchType, 
  PulseResearchMode, 
  PulseDepth, 
  PulseSourcePreference 
} from '../../types';
import { 
  Globe, 
  Search, 
  AlertTriangle, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Filter, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  RotateCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

export const PulseConsole: React.FC<Props> = ({ onSuccess }) => {
  const { 
    opportunity, 
    runPulseResearch, 
    isPulseRunning, 
    pulseSettings,
    setActiveSection
  } = useApp();

  const [query, setQuery] = useState('Colorado Front Range transmission substation queue bottlenecks and transformer procurement lead times for >100MW compute loads');
  const [researchType, setResearchType] = useState<PulseResearchType>('market_signal');
  const [mode, setMode] = useState<PulseResearchMode>('signal_scout');
  const [geography, setGeography] = useState('Adams, Weld & Arapahoe Counties, Colorado');
  const [entity, setEntity] = useState('Xcel Energy (PSCo)');
  const [dateRange, setDateRange] = useState('Past 90 Days');
  const [sourcePreference, setSourcePreference] = useState<PulseSourcePreference>('official_only');
  const [domainAllowlist, setDomainAllowlist] = useState('puc.colorado.gov, xcelenergy.com, auroragov.org, weldgov.com');
  const [domainBlocklist, setDomainBlocklist] = useState('reddit.com, x.com, medium.com');
  const [depth, setDepth] = useState<PulseDepth>('standard');
  const [confirmedDeep, setConfirmedDeep] = useState(false);
  const [dataConfirmed, setDataConfirmed] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const costMap: Record<PulseDepth, number> = {
    quick: 0.04,
    standard: 0.12,
    deep: 0.35,
  };

  const estimatedCost = costMap[depth];

  const presets = [
    {
      label: 'Front Range Substation Bottlenecks',
      q: 'Colorado Front Range transmission substation queue bottlenecks and transformer procurement lead times for >100MW compute loads',
      mode: 'signal_scout' as PulseResearchMode,
      type: 'market_signal' as PulseResearchType,
      geo: 'Adams, Weld & Arapahoe Counties, Colorado',
      entity: 'Xcel Energy (PSCo)',
    },
    {
      label: 'Aurora Industrial Water Tariffs',
      q: 'Aurora Colorado municipal industrial water tariffs cooling allocations surcharge rates for data centers',
      mode: 'source_extractor' as PulseResearchMode,
      type: 'evidence_extraction' as PulseResearchType,
      geo: 'City of Aurora, Arapahoe County, Colorado',
      entity: 'Aurora Water Authority',
    },
    {
      label: 'Weld County Generator Setbacks',
      q: 'Weld County Colorado acoustic setback requirements standby diesel generator yards agricultural buffer zoning',
      mode: 'source_verification' as PulseResearchMode,
      type: 'source_verification' as PulseResearchType,
      geo: 'Weld County, Colorado',
      entity: 'Weld County Commissioners',
    },
    {
      label: 'Red-Team Demand Thesis',
      q: 'Counter-evidence to data center developers paying premium for Front Range land without confirmed substation interconnection agreements',
      mode: 'red_team' as PulseResearchMode,
      type: 'red_team' as PulseResearchType,
      geo: 'Colorado Front Range',
      entity: 'Regional Hyperscale Developers',
    }
  ];

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pulseSettings.killSwitchActive) {
      setError('PULSE research agent is currently disabled by studio kill switch. Re-enable in Agent Settings.');
      return;
    }

    if (!dataConfirmed) {
      setError('You must confirm that this query adheres to studio public data governance rules.');
      return;
    }

    if (depth === 'deep' && pulseSettings.requiresApprovalForDeep && !confirmedDeep) {
      setError('Deep research runs require explicit confirmation of estimated cost ($0.35).');
      return;
    }

    const allowlistArr = domainAllowlist.split(',').map(s => s.trim()).filter(Boolean);
    const blocklistArr = domainBlocklist.split(',').map(s => s.trim()).filter(Boolean);

    const res = await runPulseResearch({
      query,
      researchType,
      mode,
      geography,
      entity,
      project: opportunity.name,
      dateRange,
      sourcePreference,
      domainAllowlist: allowlistArr,
      domainBlocklist: blocklistArr,
      depth,
      confirmedDeepApproval: confirmedDeep,
    });

    if (!res.success) {
      setError(res.error || 'PULSE research execution failed.');
    } else {
      onSuccess();
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Shortcuts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-400 shrink-0 text-[11px]">Research Presets:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(preset.q);
              setMode(preset.mode);
              setResearchType(preset.type);
              setGeography(preset.geo);
              setEntity(preset.entity);
            }}
            className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700/60 rounded transition-colors whitespace-nowrap text-[11px]"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-rose-950/40 border border-rose-500/60 rounded-lg text-rose-300 text-xs font-mono flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Research Form */}
      <form onSubmit={handleRun} className="p-6 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-5 font-mono text-xs">
        {/* Research Query Input */}
        <div className="space-y-1.5">
          <label className="block text-slate-300 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Research Question / Scope *</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              Focus on specific infrastructure bottlenecks, dockets, or permits
            </span>
          </label>
          <textarea
            required
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Colorado Front Range transmission substation queue bottlenecks and transformer procurement lead times for >100MW compute loads"
            className="w-full px-3.5 py-2.5 bg-[#070a10] border border-slate-700/80 rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-sans text-xs resize-none"
          />
        </div>

        {/* Row 1: Mode & Research Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Research Mode *</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as PulseResearchMode)}
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="signal_scout">A. Signal Scout (New Public Dockets &amp; Queues)</option>
              <option value="source_extractor">B. Source Extractor (Parse Specific Document/URL)</option>
              <option value="market_analyst">C. Market Analyst (Buyer Pain &amp; Pricing Signals)</option>
              <option value="red_team">D. Red-Team (Falsify Thesis &amp; Find Contradictions)</option>
              <option value="report_refresh">E. Report Refresh (Detect Changed Public Filings)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Research Type *</label>
            <select
              value={researchType}
              onChange={(e) => setResearchType(e.target.value as PulseResearchType)}
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="market_signal">Market Signal Scan</option>
              <option value="source_verification">Source Verification</option>
              <option value="evidence_extraction">Evidence Extraction</option>
              <option value="competitor_research">Competitor Research</option>
              <option value="buyer_hypothesis">Buyer / Market Hypothesis Research</option>
              <option value="red_team">Red-Team Thesis Review</option>
              <option value="report_refresh">Report Source Refresh</option>
            </select>
          </div>
        </div>

        {/* Row 2: Geography, Entity, Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Target Geography</label>
            <input
              type="text"
              value={geography}
              onChange={(e) => setGeography(e.target.value)}
              placeholder="e.g. Adams & Weld Counties, CO"
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Associated Entity</label>
            <input
              type="text"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              placeholder="e.g. Xcel Energy (PSCo)"
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
            >
              <option value="Past 7 Days">Past 7 Days</option>
              <option value="Past 30 Days">Past 30 Days</option>
              <option value="Past 90 Days">Past 90 Days</option>
              <option value="Past Year">Past Year</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>

        {/* Row 3: Source Preferences & Domains */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Source Preference *</label>
            <select
              value={sourcePreference}
              onChange={(e) => setSourcePreference(e.target.value as PulseSourcePreference)}
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
            >
              <option value="official_only">Official Government &amp; Utility Only</option>
              <option value="official_plus_reputable">Official + Reputable Trade Reporting</option>
              <option value="broad_web">Broad Web Scan</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Domain Allowlist (Comma-separated)</label>
            <input
              type="text"
              value={domainAllowlist}
              onChange={(e) => setDomainAllowlist(e.target.value)}
              placeholder="puc.colorado.gov, xcelenergy.com"
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Domain Blocklist (Comma-separated)</label>
            <input
              type="text"
              value={domainBlocklist}
              onChange={(e) => setDomainBlocklist(e.target.value)}
              placeholder="reddit.com, twitter.com"
              className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
            />
          </div>
        </div>

        {/* Row 4: Research Depth Selection */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-slate-300 font-bold uppercase tracking-wider text-[11px]">
            Execution Depth &amp; Budget Allocation
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'quick', title: 'Quick Scan', cost: '$0.04', desc: '1 search iteration, rapid signal verification, lightweight overview.' },
              { id: 'standard', title: 'Standard Research', cost: '$0.12', desc: '3 multi-query searches, regulatory excerpt extraction, 3-5 candidate claims.' },
              { id: 'deep', title: 'Deep Research', cost: '$0.35', desc: 'Comprehensive multi-source docket synthesis, cross-verification, red-team analysis.' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDepth(d.id as PulseDepth)}
                className={`p-3 text-left rounded-md border transition-all ${
                  depth === d.id
                    ? 'bg-[#0d121f] border-cyan-400 text-cyan-300 font-semibold shadow-inner'
                    : 'bg-[#070a10] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{d.title}</span>
                  <span className="text-[11px] text-cyan-400 tabular-nums font-mono">{d.cost}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-sans mt-1 leading-normal">{d.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Deep Research Confirmation Warning */}
        {depth === 'deep' && (
          <div className="p-3 bg-amber-950/20 border border-amber-500/40 rounded flex items-center justify-between text-xs text-amber-200">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Deep Research executes recursive docket analysis (~$0.35 estimated cost).</span>
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmedDeep}
                onChange={(e) => setConfirmedDeep(e.target.checked)}
                className="accent-amber-400"
              />
              <span className="text-[11px] font-bold text-amber-300">Authorize Cost</span>
            </label>
          </div>
        )}

        {/* Governance & Draft Notice */}
        <div className="p-3 bg-[#0d121c] border border-slate-850 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={dataConfirmed}
              onChange={(e) => setDataConfirmed(e.target.checked)}
              className="accent-cyan-400"
            />
            <span className="font-sans">
              I certify this research uses public or licensed regulatory data only. Zero employer confidential data.
            </span>
          </label>
          <span className="text-[10px] text-cyan-400 font-mono shrink-0">
            NOTICE: Outputs are drafts pending human review.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>Est. Cost: <strong className="text-white">${estimatedCost.toFixed(2)}</strong></span>
            <span>·</span>
            <span>Monthly Budget: <strong className="text-emerald-400">${pulseSettings.currentMonthlySpend.toFixed(2)} / ${pulseSettings.monthlyBudgetCap.toFixed(2)}</strong></span>
            <span>·</span>
            <span>Quota: <strong className="text-slate-200">{pulseSettings.dailyRequestsUsed}/{pulseSettings.dailyLimit} today</strong></span>
          </div>

          <button
            type="submit"
            disabled={isPulseRunning}
            className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-bold rounded-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            {isPulseRunning ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-black" />
                <span>Retrieving Regulatory Dockets...</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-black" />
                <span>Execute PULSE Research</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
