import React, { useState } from 'react';
import { CandidateEvidenceItem, EvidenceConfidence } from '../../types';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, FileText, Check } from 'lucide-react';

interface Props {
  candidate: CandidateEvidenceItem;
  runId: string;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (runId: string, candidateId: string, reviewNotes: string, confidence: EvidenceConfidence) => void;
  onReject: (runId: string, candidateId: string, reason: string) => void;
}

export const HumanReviewModal: React.FC<Props> = ({
  candidate,
  runId,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) => {
  const [mode, setMode] = useState<'approve' | 'reject'>('approve');
  const [confidence, setConfidence] = useState<EvidenceConfidence>(candidate.confidence || 'high');
  const [reviewNotes, setReviewNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApproveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!reviewNotes.trim()) {
      setError('A mandatory human verification note is required before approving evidence.');
      return;
    }
    // High-confidence rule: if source is not official/primary, warn
    if (confidence === 'high' && candidate.source_quality !== 'official' && candidate.source_quality !== 'primary') {
      setError('Rule Violation: High-confidence claims require an Official Regulatory or Primary Utility source.');
      return;
    }

    onApprove(runId, candidate.id, reviewNotes, confidence);
    onClose();
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!rejectionReason.trim()) {
      setError('Please provide a documented reason for rejecting this candidate claim.');
      return;
    }
    onReject(runId, candidate.id, rejectionReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              HUMAN REVIEW GATE // CANDIDATE VERIFICATION
            </h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        {/* Mandatory Gate Notice */}
        <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded text-[11px] text-cyan-200 font-sans leading-relaxed">
          <strong>Human Review Policy:</strong> No PULSE output can enter customer reports, public content, 
          risk scorecards, or paid products without explicit founder review and documented verification notes.
        </div>

        {/* Claim Overview */}
        <div className="p-3.5 bg-[#0d121c] border border-slate-850 rounded space-y-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Candidate Claim</span>
          <p className="text-xs text-white font-sans font-semibold leading-snug">
            {candidate.claim}
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
            <span className="text-slate-400 block text-[10px] uppercase">Exact Supporting Excerpt:</span>
            <blockquote className="italic font-sans text-slate-300 mt-0.5">
              "{candidate.evidence_excerpt}"
            </blockquote>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 pt-1">
            <span>Publisher: <strong className="text-cyan-400">{candidate.source_publisher}</strong></span>
            <span>·</span>
            <span>Source Tier: <strong className="text-slate-200 uppercase">{candidate.source_quality}</strong></span>
            <span>·</span>
            <span>Classification: <strong className="text-slate-200 uppercase">{candidate.classification}</strong></span>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded">
          <button
            type="button"
            onClick={() => setMode('approve')}
            className={`flex-1 py-1.5 rounded transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'approve' ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-700/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approve to Evidence Ledger</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('reject')}
            className={`flex-1 py-1.5 rounded transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'reject' ? 'bg-rose-950 text-rose-300 font-bold border border-rose-700/60' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reject Candidate Claim</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/60 rounded text-rose-300 text-xs">
            {error}
          </div>
        )}

        {mode === 'approve' ? (
          <form onSubmit={handleApproveSubmit} className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">
                Assigned Confidence Level *
              </label>
              <select
                value={confidence}
                onChange={(e) => setConfidence(e.target.value as EvidenceConfidence)}
                className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
              >
                <option value="high">High Confidence (Official/Primary Dockets)</option>
                <option value="medium">Medium Confidence (Corroborated Reporting)</option>
                <option value="low">Low Confidence (Unverified / Provisional)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">
                Mandatory Reviewer Verification Notes *
              </label>
              <textarea
                required
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="e.g. Cross-referenced with Colorado PUC Docket Exhibit PSCo-T1. Stamped excerpt verified against original docket filing..."
                className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            <div className="p-3 bg-[#0d121c] border border-slate-850 rounded text-[11px] text-slate-400 space-y-1">
              <div>Reviewer: <strong className="text-slate-200">Founder (Admin)</strong></div>
              <div>Audit Timestamp: <strong className="text-slate-200">{new Date().toISOString()}</strong></div>
              <div>Destination: <strong className="text-emerald-400">Approved Evidence Ledger (+20 Signal Credits)</strong></div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-emerald-400 text-black font-semibold rounded hover:bg-emerald-300 transition-colors"
              >
                Confirm Approval &amp; Ingest
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRejectSubmit} className="space-y-3">
            <div>
              <label className="block text-slate-400 mb-1">
                Documented Rejection Reason *
              </label>
              <textarea
                required
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Speculative forum commentary lacking primary regulatory filing corroboration..."
                className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-rose-400 text-black font-semibold rounded hover:bg-rose-300 transition-colors"
              >
                Formally Reject Candidate
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
