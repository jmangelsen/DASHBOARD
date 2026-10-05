import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EvidenceRecord, SignalSourceType, EvidenceConfidence, ApprovalStatus, DataClassification } from '../../types';
import { DataClassificationBadge } from '../common/DataClassificationBadge';
import { 
  Scale, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  FileText,
  ShieldAlert,
  ChevronDown,
  Globe
} from 'lucide-react';

export const EvidenceLedger: React.FC = () => {
  const { evidence, addEvidence, updateEvidence, setActiveSection } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // New Evidence Form State
  const [formData, setFormData] = useState({
    claim: '',
    claimCategory: 'Grid & Transmission Constraints',
    sourceTitle: '',
    sourceUrl: '',
    directEvidenceExcerpt: '',
    sourcePublicationDate: new Date().toISOString().split('T')[0],
    dateAccessed: new Date().toISOString().split('T')[0],
    sourceTier: 'official' as SignalSourceType,
    confidence: 'high' as EvidenceConfidence,
    geography: 'Adams & Weld Counties, Colorado',
    associatedEntity: 'Xcel Energy (PSCo)',
    associatedProject: 'Front Range Infrastructure Constraint Monitor',
    associatedOpportunity: 'opp-front-range-monitor',
    associatedProduct: 'prod-001',
    riskCategory: 'Schedule & Capital Risk',
    commercialImplication: '',
    dataClassification: 'public' as DataClassification,
    approvalStatus: 'approved' as ApprovalStatus,
    isUnsupportedInference: false,
    notes: '',
  });

  // Source Gap Detection
  const sourceGaps = evidence.filter(e => 
    !e.sourceUrl || 
    e.isUnsupportedInference || 
    (e.confidence === 'high' && e.sourceTier !== 'official' && e.sourceTier !== 'primary')
  );

  const filteredEvidence = evidence.filter(e => {
    const matchesSearch = e.claim.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.sourceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.geography.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || e.sourceTier === tierFilter;
    const matchesStatus = statusFilter === 'all' || e.approvalStatus === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Rule: No high confidence claim without official or primary source
    if (formData.confidence === 'high' && formData.sourceTier !== 'official' && formData.sourceTier !== 'primary') {
      setFormError('Rule Violation: High-confidence claims require an Official Regulatory or Primary Utility source.');
      return;
    }

    const res = addEvidence({
      ...formData,
      reviewedBy: 'Founder (Admin)',
      reviewedAt: new Date().toISOString(),
    });

    if (!res.success) {
      setFormError(res.error || 'Failed to add evidence.');
      return;
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Scale className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 02 // SOURCE-GROUNDED CLAIMS</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Evidence Ledger
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Traceable claims verified against primary dockets. No customer-facing intelligence may be published without audited source citations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('pulse-agent')}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-md transition-colors"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Verify / Ingest via PULSE</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Grounded Claim</span>
          </button>
        </div>
      </div>

      {/* SOURCE GAP PANEL */}
      {sourceGaps.length > 0 && (
        <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-lg space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-300">
            <div className="flex items-center gap-2 font-bold uppercase">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>SOURCE GAP IDENTIFIER ({sourceGaps.length} Actionable Items)</span>
            </div>
            <span className="text-[11px] text-amber-400/80">Governed by Zero-Unverified-Claims Rule</span>
          </div>
          <div className="space-y-2 text-xs">
            {sourceGaps.map((gap) => (
              <div 
                key={gap.id}
                className="p-3 bg-[#0d121c] border border-amber-500/30 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-amber-200 font-medium font-sans">
                    "{gap.claim}"
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>Source: {gap.sourceTitle}</span>
                    <span>·</span>
                    <span className="text-amber-400">
                      {gap.isUnsupportedInference ? 'UNSUPPORTED INFERENCE' : 'INSUFFICIENT SOURCE TIER FOR CONFIDENCE'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveSection('pulse-agent')}
                    className="px-2.5 py-1 text-[11px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 rounded transition-colors flex items-center gap-1"
                  >
                    <Globe className="w-3 h-3" />
                    <span>Investigate with PULSE</span>
                  </button>
                  <button
                    onClick={() => updateEvidence(gap.id, { approvalStatus: 'rejected', isUnsupportedInference: false })}
                    className="px-2.5 py-1 text-[11px] bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 rounded transition-colors"
                  >
                    Reject Claim
                  </button>
                  <button
                    onClick={() => updateEvidence(gap.id, { confidence: 'low', isUnsupportedInference: false })}
                    className="px-2.5 py-1 text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 rounded transition-colors"
                  >
                    Demote to Low Confidence
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search claims by keyword, entity, docket, or geography..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#0a0e17] border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 p-0.5 bg-[#0a0e17] border border-slate-800 rounded">
            {['all', 'approved', 'draft', 'rejected'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                  statusFilter === st ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-2.5 py-1 bg-[#0a0e17] border border-slate-800 rounded text-slate-300 text-xs focus:outline-none"
          >
            <option value="all">All Tiers</option>
            <option value="official">Official Regulatory</option>
            <option value="primary">Primary Utility</option>
            <option value="secondary">Secondary Journal</option>
            <option value="commentary">Commentary</option>
          </select>
        </div>
      </div>

      {/* Evidence Table */}
      <div className="space-y-4">
        {filteredEvidence.map((evi) => (
          <div
            key={evi.id}
            className="p-5 bg-[#0a0e17] border border-slate-800/90 rounded-lg space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                {/* Unboxed Metadata Line */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                  <DataClassificationBadge classification={evi.dataClassification} />
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan-400 font-medium">{evi.claimCategory}</span>
                  <span aria-hidden="true">·</span>
                  <span>{evi.geography}</span>
                  <span aria-hidden="true">·</span>
                  <span className={`font-semibold uppercase ${
                    evi.confidence === 'high' ? 'text-emerald-400' :
                    evi.confidence === 'medium' ? 'text-cyan-400' : 'text-amber-400'
                  }`}>
                    {evi.confidence} Confidence
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-300 uppercase text-[10px]">{evi.sourceTier} Source</span>
                </div>

                <h3 className="text-sm font-semibold font-sans text-slate-100 leading-snug">
                  {evi.claim}
                </h3>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  evi.approvalStatus === 'approved' 
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                    : evi.approvalStatus === 'draft'
                    ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                    : 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                }`}>
                  {evi.approvalStatus.toUpperCase()}
                </span>

                {evi.approvalStatus !== 'approved' && (
                  <button
                    onClick={() => updateEvidence(evi.id, { approvalStatus: 'approved' })}
                    className="p-1.5 text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                    title="Approve Evidence"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                {evi.approvalStatus !== 'rejected' && (
                  <button
                    onClick={() => updateEvidence(evi.id, { approvalStatus: 'rejected' })}
                    className="p-1.5 text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    title="Reject Evidence"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Direct Excerpt Blockquote */}
            <div className="p-3.5 bg-[#0d121c] border-l-2 border-cyan-500/70 text-xs font-mono text-slate-300 leading-relaxed">
              <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">
                Direct Stamped Excerpt:
              </div>
              <p className="italic font-sans">
                {evi.directEvidenceExcerpt}
              </p>
            </div>

            {/* Grounding & Commercial Implication Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2 border-t border-slate-850">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Source Document</span>
                <div className="text-slate-200 font-sans flex items-center gap-1.5">
                  <span>{evi.sourceTitle}</span>
                  {evi.sourceUrl && (
                    <a 
                      href={evi.sourceUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  Published: {evi.sourcePublicationDate} · Accessed: {evi.dateAccessed}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Commercial &amp; Capital Implication</span>
                <p className="text-slate-300 font-sans leading-relaxed">
                  {evi.commercialImplication}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Grounded Claim Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>ADD VERIFIED EVIDENCE CLAIM</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/60 rounded text-xs text-rose-300 font-mono">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Synthesized Claim Statement *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Front Range Xcel territory has 3,200 MW in queued large-load requests facing 54-month delays..."
                  value={formData.claim}
                  onChange={(e) => setFormData({ ...formData, claim: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Direct Evidence Excerpt (Word-for-Word Stamped Quote) *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste exact quote from regulatory filing or engineer report..."
                  value={formData.directEvidenceExcerpt}
                  onChange={(e) => setFormData({ ...formData, directEvidenceExcerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Source Title / Exhibit Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Colorado PUC Docket 24A-0899E, Exhibit PSCo-T1"
                    value={formData.sourceTitle}
                    onChange={(e) => setFormData({ ...formData, sourceTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Source Docket URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://puc.colorado.gov/..."
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Source Tier *</label>
                  <select
                    value={formData.sourceTier}
                    onChange={(e) => setFormData({ ...formData, sourceTier: e.target.value as SignalSourceType })}
                    className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200"
                  >
                    <option value="official">Official Regulatory</option>
                    <option value="primary">Primary Utility</option>
                    <option value="secondary">Secondary Journal</option>
                    <option value="commentary">Commentary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Confidence Rating *</label>
                  <select
                    value={formData.confidence}
                    onChange={(e) => setFormData({ ...formData, confidence: e.target.value as EvidenceConfidence })}
                    className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200"
                  >
                    <option value="high">High (Official Only)</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low (Requires Verification)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Data Classification *</label>
                  <select
                    value={formData.dataClassification}
                    onChange={(e) => setFormData({ ...formData, dataClassification: e.target.value as DataClassification })}
                    className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200"
                  >
                    <option value="public">Public</option>
                    <option value="licensed">Licensed</option>
                    <option value="customer-provided">Customer Provided</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Commercial &amp; Capital Implication *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="How does this translate into decision-useful insight for buyers?"
                  value={formData.commercialImplication}
                  onChange={(e) => setFormData({ ...formData, commercialImplication: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded"
                >
                  Save to Evidence Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
