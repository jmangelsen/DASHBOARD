import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  FileText, 
  TrendingUp,
  Percent,
  Clock
} from 'lucide-react';

export const EvidenceQualityDashboard: React.FC = () => {
  const { 
    pulseRuns, 
    pulseSettings, 
    evidence, 
    products, 
    distribution 
  } = useApp();

  // Aggregate all candidate claims from all runs
  const allCandidateClaims = pulseRuns.flatMap(r => r.output?.candidate_evidence || []);
  const totalCandidateClaims = allCandidateClaims.length;
  const approvedClaims = allCandidateClaims.filter(c => c.reviewStatus === 'approved');
  const rejectedClaims = allCandidateClaims.filter(c => c.reviewStatus === 'rejected');
  const pendingClaims = allCandidateClaims.filter(c => c.reviewStatus === 'pending');

  const conversionRate = totalCandidateClaims > 0
    ? Math.round((approvedClaims.length / totalCandidateClaims) * 100)
    : 0;

  // Sources by quality tier
  const sourcesByTier = {
    official: allCandidateClaims.filter(c => c.source_quality === 'official').length,
    primary: allCandidateClaims.filter(c => c.source_quality === 'primary').length,
    secondary: allCandidateClaims.filter(c => c.source_quality === 'secondary').length,
    commentary: allCandidateClaims.filter(c => c.source_quality === 'commentary').length,
    unverified: allCandidateClaims.filter(c => c.source_quality === 'unverified').length,
  };

  // Missing metadata quality alerts
  const missingDateAlerts = allCandidateClaims.filter(c => !c.publication_date).length;
  const missingUrlAlerts = allCandidateClaims.filter(c => !c.source_url).length;
  const unverifiedInferenceAlerts = evidence.filter(e => e.isUnsupportedInference).length;

  // Evidence used in paid products
  const evidenceInProducts = products.reduce((acc, p) => acc + (p.sourceOfTruthAssets?.length || 0), 0) + approvedClaims.length;
  const evidenceInContent = distribution.length;

  return (
    <div className="space-y-6">
      {/* Top Telemetry Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Runs This Week</span>
          <div className="text-xl font-bold text-white tabular-nums">{pulseRuns.length}</div>
          <span className="text-emerald-400 text-[10px]">100% Success Rate</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">API Spend / Cap</span>
          <div className="text-xl font-bold text-cyan-400 tabular-nums">
            ${pulseSettings.currentMonthlySpend.toFixed(2)}
          </div>
          <span className="text-slate-400 text-[10px]">Cap: ${pulseSettings.monthlyBudgetCap.toFixed(2)}</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Claims In Review</span>
          <div className="text-xl font-bold text-amber-400 tabular-nums">{pendingClaims.length}</div>
          <span className="text-slate-400 text-[10px]">Human gate pending</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Approved Claims</span>
          <div className="text-xl font-bold text-emerald-400 tabular-nums">{approvedClaims.length}</div>
          <span className="text-slate-400 text-[10px]">{rejectedClaims.length} rejected</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Conversion Rate</span>
          <div className="text-xl font-bold text-cyan-300 tabular-nums">{conversionRate}%</div>
          <span className="text-slate-400 text-[10px]">Candidate to Ledger</span>
        </div>

        <div className="p-3.5 bg-[#0a0e17] border border-slate-800 rounded-md space-y-1">
          <span className="text-slate-400 text-[10px] uppercase">Commercial Use</span>
          <div className="text-xl font-bold text-white tabular-nums">{evidenceInProducts}</div>
          <span className="text-emerald-400 text-[10px]">Paid report citations</span>
        </div>
      </div>

      {/* Quality Alerts */}
      {(missingDateAlerts > 0 || missingUrlAlerts > 0 || unverifiedInferenceAlerts > 0) && (
        <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg space-y-2 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold uppercase">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Active Evidence Integrity &amp; Quality Flags</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] text-slate-300 font-sans">
            <div>
              • <strong>{unverifiedInferenceAlerts}</strong> unsupported inference claim requires primary utility filing.
            </div>
            <div>
              • <strong>{missingDateAlerts}</strong> candidate items missing formal publication date.
            </div>
            <div>
              • <strong>{missingUrlAlerts}</strong> claims missing verified docket URL.
            </div>
          </div>
        </div>
      )}

      {/* Two-Column Grid: Source Quality Breakdown & Research Geographies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-xs">
        {/* Sources by Quality Tier (6 cols) */}
        <div className="lg:col-span-6 p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-white font-bold uppercase tracking-wider">
              Sources by Quality Tier
            </span>
            <span className="text-cyan-400 font-semibold">{totalCandidateClaims} Total Retrieved</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Official Regulatory / Government Agency', count: sourcesByTier.official, color: 'bg-emerald-400' },
              { label: 'Primary Utility Filings & Technical Schematics', count: sourcesByTier.primary, color: 'bg-cyan-400' },
              { label: 'Secondary Industry Journals & Legal Reports', count: sourcesByTier.secondary, color: 'bg-blue-400' },
              { label: 'Market Commentary & Executive Analysis', count: sourcesByTier.commentary, color: 'bg-amber-400' },
              { label: 'Unverified Speculative Claims (Blocked from Reports)', count: sourcesByTier.unverified, color: 'bg-rose-500' },
            ].map((tier, idx) => {
              const pct = totalCandidateClaims > 0 ? Math.round((tier.count / totalCandidateClaims) * 100) : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300">{tier.label}</span>
                    <span className="text-slate-200 tabular-nums font-bold">
                      {tier.count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${tier.color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-slate-400 font-sans pt-1">
            Studio policy requires at least 80% of published intelligence to originate from Official or Primary tiers.
          </p>
        </div>

        {/* Top Entities & Research Geographies (6 cols) */}
        <div className="lg:col-span-6 p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-white font-bold uppercase tracking-wider">
              Active Geographies &amp; Target Entities
            </span>
            <span className="text-slate-400 text-[10px]">Infrastructure Focus</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-1">
              <div className="flex justify-between items-center text-slate-200">
                <span className="font-bold text-xs text-white">Adams &amp; Weld Counties, Colorado</span>
                <span className="text-cyan-400 font-bold tabular-nums">54% of Claims</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Xcel Energy transmission substation backlogs, Pawnee-to-Cherokee 230kV terminal limits.
              </p>
            </div>

            <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-1">
              <div className="flex justify-between items-center text-slate-200">
                <span className="font-bold text-xs text-white">City of Aurora / Arapahoe County</span>
                <span className="text-cyan-400 font-bold tabular-nums">28% of Claims</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Municipal water utility cooling tariffs, $18.40/1k gal surcharge, closed-loop conversion requirements.
              </p>
            </div>

            <div className="p-3 bg-[#0d121c] border border-slate-850 rounded space-y-1">
              <div className="flex justify-between items-center text-slate-200">
                <span className="font-bold text-xs text-white">Northern Colorado (Fort Collins / Larimer)</span>
                <span className="text-cyan-400 font-bold tabular-nums">18% of Claims</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Platte River Power Authority 115kV dual-feed secondary interconnect arbitrage nodes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
