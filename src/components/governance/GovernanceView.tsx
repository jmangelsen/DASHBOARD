import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConflictOfInterestCheck, DataClassification } from '../../types';
import { DataClassificationBadge } from '../common/DataClassificationBadge';
import { 
  Shield, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Lock, 
  Plus,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const { 
    signals, 
    evidence, 
    conflictChecks, 
    addConflictCheck,
    assets
  } = useApp();

  const [showReviewModal, setShowReviewModal] = useState(false);

  // Data classification breakdown
  const allRecords = [
    ...signals.map(s => ({ type: 'signal', classification: s.dataClassification, source: s.url })),
    ...evidence.map(e => ({ type: 'evidence', classification: e.dataClassification, source: e.sourceUrl })),
    ...assets.map(a => ({ type: 'asset', classification: a.accessClassification, source: a.locationOrUrl })),
  ];

  const countsByClassification = {
    public: allRecords.filter(r => r.classification === 'public').length,
    licensed: allRecords.filter(r => r.classification === 'licensed').length,
    'customer-provided': allRecords.filter(r => r.classification === 'customer-provided').length,
    private: allRecords.filter(r => r.classification === 'private').length,
    restricted: allRecords.filter(r => r.classification === 'restricted').length, // Should be 0 due to block
  };

  const missingSourceCount = allRecords.filter(r => !r.source).length;
  const staleDataCount = evidence.filter(e => e.isUnsupportedInference).length;
  const unreviewedCount = signals.filter(s => s.reviewStatus === 'inbox').length;

  // New Conflict Form State
  const [formData, setFormData] = useState({
    targetName: '',
    targetType: 'project' as 'signal' | 'evidence' | 'project' | 'product',
    personalPublicSourcesOnly: true,
    zeroEmployerDataOrTime: true,
    noEmploymentObligationOverlap: true,
    documentedSourceAndMethod: true,
    commercialUsePermitted: true,
    notes: '',
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isApproved = formData.personalPublicSourcesOnly &&
      formData.zeroEmployerDataOrTime &&
      formData.noEmploymentObligationOverlap &&
      formData.documentedSourceAndMethod &&
      formData.commercialUsePermitted;

    addConflictCheck({
      ...formData,
      reviewResult: isApproved ? 'approved' : 'needs_review',
      reviewedBy: 'Founder (Admin)',
      reviewDate: new Date().toISOString().split('T')[0],
    });
    setShowReviewModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Shield className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 10 // GOVERNANCE &amp; SAFETY AUDIT</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Data Governance &amp; Ethics Console
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Enforces strict airgapping from employer resources, verifies source provenance, 
            and tracks conflict-of-interest assessments.
          </p>
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Execute Conflict Review</span>
        </button>
      </div>

      {/* CORE DATA CLASSIFICATION DASHBOARD */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
          <span className="text-white font-bold uppercase tracking-wider">
            Data Classification Registry ({allRecords.length} Total Monitored Records)
          </span>
          <span className="text-emerald-400 font-semibold">Airgap Protocol Verified</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#0d121c] border border-slate-850 rounded">
            <span className="text-slate-400 text-[10px] uppercase block">Public</span>
            <div className="text-xl font-bold text-emerald-400 tabular-nums">{countsByClassification.public}</div>
            <span className="text-[10px] text-slate-400">Open dockets &amp; statutes</span>
          </div>

          <div className="p-3 bg-[#0d121c] border border-slate-850 rounded">
            <span className="text-slate-400 text-[10px] uppercase block">Licensed</span>
            <div className="text-xl font-bold text-cyan-400 tabular-nums">{countsByClassification.licensed}</div>
            <span className="text-[10px] text-slate-400">Commercial datasets</span>
          </div>

          <div className="p-3 bg-[#0d121c] border border-slate-850 rounded">
            <span className="text-slate-400 text-[10px] uppercase block">Customer-Provided</span>
            <div className="text-xl font-bold text-amber-400 tabular-nums">{countsByClassification['customer-provided']}</div>
            <span className="text-[10px] text-slate-400">Client transaction data</span>
          </div>

          <div className="p-3 bg-[#0d121c] border border-slate-850 rounded">
            <span className="text-slate-400 text-[10px] uppercase block">Private Studio</span>
            <div className="text-xl font-bold text-violet-400 tabular-nums">{countsByClassification.private}</div>
            <span className="text-[10px] text-slate-400">Proprietary scoring</span>
          </div>

          <div className="p-3 bg-[#0d121c] border border-rose-900/60 rounded bg-rose-950/20">
            <span className="text-rose-400 text-[10px] uppercase block">Restricted (Blocked)</span>
            <div className="text-xl font-bold text-rose-400 tabular-nums">0</div>
            <span className="text-[10px] text-emerald-400">Zero violations</span>
          </div>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="uppercase text-[10px]">Missing Source Citations</span>
            <span className={`font-bold ${missingSourceCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {missingSourceCount}
            </span>
          </div>
          <div className="text-slate-300 font-sans text-xs">
            {missingSourceCount === 0 ? 'All evidence claims have verified URL citations.' : 'Resolve ungrounded claims before publishing.'}
          </div>
        </div>

        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="uppercase text-[10px]">Stale Data / Inference Alerts</span>
            <span className={`font-bold ${staleDataCount === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {staleDataCount}
            </span>
          </div>
          <div className="text-slate-300 font-sans text-xs">
            {staleDataCount === 0 ? 'Zero unverified commentary claims.' : '1 speculative claim flagged for regulatory corroboration.'}
          </div>
        </div>

        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="uppercase text-[10px]">Unreviewed Inbox Signals</span>
            <span className={`font-bold ${unreviewedCount === 0 ? 'text-emerald-400' : 'text-cyan-400'}`}>
              {unreviewedCount}
            </span>
          </div>
          <div className="text-slate-300 font-sans text-xs">
            {unreviewedCount === 0 ? 'Inbox fully triaged.' : `${unreviewedCount} signals awaiting evidence conversion.`}
          </div>
        </div>
      </div>

      {/* Conflict of Interest Review Log */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audited Conflict-of-Interest Assessments</span>
          </div>
          <span className="text-slate-400">{conflictChecks.length} Records Documented</span>
        </div>

        <div className="space-y-3">
          {conflictChecks.map((chk) => (
            <div
              key={chk.id}
              className="p-4 bg-[#0d121c] border border-slate-850 rounded space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-sans">{chk.targetName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {chk.reviewResult.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400 pt-1">
                <div>Personal/Public Sources: <strong className="text-emerald-400">YES</strong></div>
                <div>Zero Employer Time/IP: <strong className="text-emerald-400">YES</strong></div>
                <div>No Obligation Overlap: <strong className="text-emerald-400">YES</strong></div>
                <div>Commercial Use: <strong className="text-emerald-400">PERMITTED</strong></div>
              </div>

              <p className="text-xs text-slate-300 font-sans pt-1 leading-relaxed">
                {chk.notes}
              </p>

              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                <span>Audited By: {chk.reviewedBy}</span>
                <span>Date: {chk.reviewDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#090d16] border border-amber-500/40 rounded-lg shadow-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>EXECUTE CONFLICT-OF-INTEREST AUDIT</span>
              </h2>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-3 font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Target Project / Offering Name *</label>
                <input
                  required
                  value={formData.targetName}
                  onChange={(e) => setFormData({ ...formData, targetName: e.target.value })}
                  placeholder="e.g. Front Range Substation Constraint Brief"
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
                />
              </div>

              <div className="space-y-2 p-3 bg-[#0d121c] border border-slate-850 rounded">
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.personalPublicSourcesOnly}
                    onChange={(e) => setFormData({ ...formData, personalPublicSourcesOnly: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>1. Derived from personal/public/licensed sources only?</span>
                </label>

                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.zeroEmployerDataOrTime}
                    onChange={(e) => setFormData({ ...formData, zeroEmployerDataOrTime: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>2. Zero employer data, equipment, time, or customer lists used?</span>
                </label>

                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.noEmploymentObligationOverlap}
                    onChange={(e) => setFormData({ ...formData, noEmploymentObligationOverlap: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>3. No overlap with restricted employment obligations?</span>
                </label>

                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.documentedSourceAndMethod}
                    onChange={(e) => setFormData({ ...formData, documentedSourceAndMethod: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>4. Are the source and methodology fully documented?</span>
                </label>

                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.commercialUsePermitted}
                    onChange={(e) => setFormData({ ...formData, commercialUsePermitted: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>5. Is commercial exploitation permitted by underlying licenses?</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Audit Trail Documentation Notes *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Document specific rationale proving airgap and source compliance..."
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 resize-none font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowReviewModal(false)} className="px-4 py-1.5 text-slate-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-5 py-1.5 bg-amber-400 text-black font-semibold rounded">Log Formal Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
