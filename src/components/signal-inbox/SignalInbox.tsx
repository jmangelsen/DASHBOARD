import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SignalRecord, SignalSourceType, SignalStatus, DataClassification } from '../../types';
import { DataClassificationBadge } from '../common/DataClassificationBadge';
import { 
  Inbox, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Globe
} from 'lucide-react';

export const SignalInbox: React.FC = () => {
  const { signals, addSignal, updateSignal, addEvidence, setActiveSection } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceTypeFilter, setSourceTypeFilter] = useState<string>('all');
  const [showCaptureModal, setShowCaptureModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    organization: '',
    publicationDate: new Date().toISOString().split('T')[0],
    dateCaptured: new Date().toISOString().split('T')[0],
    location: '',
    category: 'Grid & Power Queues',
    associatedEntity: '',
    associatedProject: 'Front Range Infrastructure Constraint Monitor',
    rawObservation: '',
    whyItMightMatter: '',
    sourceType: 'official' as SignalSourceType,
    dataClassification: 'public' as DataClassification,
    reviewStatus: 'inbox' as SignalStatus,
    notes: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const filteredSignals = signals.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rawObservation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.reviewStatus === statusFilter;
    const matchesType = sourceTypeFilter === 'all' || s.sourceType === sourceTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const res = addSignal(formData);
    if (!res.success) {
      setFormError(res.error || 'Failed to capture signal.');
      return;
    }
    setShowCaptureModal(false);
    setFormData({
      title: '',
      url: '',
      organization: '',
      publicationDate: new Date().toISOString().split('T')[0],
      dateCaptured: new Date().toISOString().split('T')[0],
      location: '',
      category: 'Grid & Power Queues',
      associatedEntity: '',
      associatedProject: 'Front Range Infrastructure Constraint Monitor',
      rawObservation: '',
      whyItMightMatter: '',
      sourceType: 'official',
      dataClassification: 'public',
      reviewStatus: 'inbox',
      notes: '',
    });
  };

  const convertToEvidence = (signal: SignalRecord) => {
    addEvidence({
      claim: signal.rawObservation,
      claimCategory: signal.category,
      sourceTitle: `${signal.organization}: ${signal.title}`,
      sourceUrl: signal.url,
      directEvidenceExcerpt: signal.rawObservation,
      sourcePublicationDate: signal.publicationDate,
      dateAccessed: signal.dateCaptured,
      sourceTier: signal.sourceType,
      confidence: signal.sourceType === 'official' || signal.sourceType === 'primary' ? 'high' : 'medium',
      geography: signal.location || 'Colorado Front Range',
      associatedEntity: signal.associatedEntity || signal.organization,
      associatedProject: signal.associatedProject,
      associatedOpportunity: 'opp-front-range-monitor',
      riskCategory: 'Operational & Grid Lead Time Risk',
      commercialImplication: signal.whyItMightMatter,
      dataClassification: signal.dataClassification,
      approvalStatus: 'approved',
      isUnsupportedInference: signal.sourceType === 'unverified',
      notes: `Converted directly from Signal Inbox (${signal.id})`,
    });

    updateSignal(signal.id, { reviewStatus: 'converted_to_asset' });
    setActiveSection('evidence-ledger');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Inbox className="w-4 h-4" />
            <span className="uppercase tracking-widest font-semibold">STAGE 01 // SIGNAL TRIAGE</span>
          </div>
          <h1 className="text-xl font-bold font-display text-white tracking-tight mt-1">
            Signal Inbox
          </h1>
          <p className="text-xs text-slate-400 font-sans max-w-xl">
            Capture raw public filings, utility dockets, and local ordinances before they become decisions. 
            All items require strict data classification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('pulse-agent')}
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-md transition-colors"
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Launch PULSE Agent</span>
          </button>
          <button
            onClick={() => setShowCaptureModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Capture Signal</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search signals by keyword, agency, or docket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#0a0e17] border border-slate-800 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 p-0.5 bg-[#0a0e17] border border-slate-800 rounded">
            {['all', 'inbox', 'triage', 'verified', 'converted_to_asset'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                  statusFilter === st ? 'bg-slate-800 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Source Type Filter */}
          <select
            value={sourceTypeFilter}
            onChange={(e) => setSourceTypeFilter(e.target.value)}
            className="px-2.5 py-1 bg-[#0a0e17] border border-slate-800 rounded text-slate-300 text-xs focus:outline-none"
          >
            <option value="all">All Source Tiers</option>
            <option value="official">Official Government</option>
            <option value="primary">Primary Utility</option>
            <option value="secondary">Secondary</option>
            <option value="commentary">Commentary</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>
      </div>

      {/* Signal Cards List */}
      <div className="space-y-3">
        {filteredSignals.length === 0 ? (
          <div className="p-8 text-center bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-mono text-slate-300">No signals match current filter</div>
            <p className="text-xs text-slate-500 font-sans">
              Adjust your search keywords or capture a new regulatory observation.
            </p>
          </div>
        ) : (
          filteredSignals.map((signal) => (
            <div
              key={signal.id}
              className="p-4 bg-[#0a0e17] border border-slate-800/90 hover:border-slate-700 rounded-lg space-y-3 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <DataClassificationBadge classification={signal.dataClassification} />
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400 font-medium">{signal.organization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{signal.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>Captured: {signal.dateCaptured}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-[10px] text-slate-300">{signal.sourceType} Tier</span>
                  </div>

                  <h3 className="text-sm font-semibold font-sans text-slate-100 flex items-center gap-2">
                    <span>{signal.title}</span>
                    {signal.url && (
                      <a
                        href={signal.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-cyan-300"
                        title="View official filing URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {signal.reviewStatus !== 'converted_to_asset' ? (
                    <button
                      onClick={() => convertToEvidence(signal)}
                      className="px-3 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 rounded transition-colors flex items-center gap-1.5"
                    >
                      <span>Convert to Evidence</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Converted to Evidence
                    </span>
                  )}
                </div>
              </div>

              {/* Observation Content */}
              <div className="p-3 bg-[#0d121c] border border-slate-850 rounded text-xs font-sans text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-200">Raw Observation: </span>
                {signal.rawObservation}
              </div>

              {/* Why it might matter */}
              <div className="text-xs font-sans text-slate-400 flex items-start gap-2">
                <span className="font-semibold text-cyan-400/90 font-mono text-[11px] uppercase tracking-wider shrink-0">
                  Commercial Implication:
                </span>
                <span>{signal.whyItMightMatter}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Capture Modal */}
      {showCaptureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090d16] border border-cyan-500/40 rounded-lg shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <Inbox className="w-4 h-4 text-cyan-400" />
                <span>QUICK CAPTURE MARKET SIGNAL</span>
              </h2>
              <button
                onClick={() => setShowCaptureModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-950/40 border border-rose-500/60 rounded text-xs text-rose-300 font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Source Title / Filing Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Colorado PUC Docket 24A-0899E..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Filing / Document URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://puc.colorado.gov/..."
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Issuing Agency / Entity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Colorado Public Utilities Commission"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Source Tier *</label>
                  <select
                    value={formData.sourceType}
                    onChange={(e) => setFormData({ ...formData, sourceType: e.target.value as SignalSourceType })}
                    className="w-full px-2 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-200"
                  >
                    <option value="official">Official Regulatory</option>
                    <option value="primary">Primary Utility</option>
                    <option value="secondary">Secondary Journal</option>
                    <option value="commentary">Commentary</option>
                    <option value="unverified">Unverified Speculation</option>
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
                    <option value="private">Private Studio</option>
                    <option value="restricted">Restricted (BLOCKED)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Location / Geography</label>
                  <input
                    type="text"
                    placeholder="e.g. Adams County, CO"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Raw Observation (Direct Excerpt / Facts) *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Paste the factual excerpt from the filing..."
                  value={formData.rawObservation}
                  onChange={(e) => setFormData({ ...formData, rawObservation: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Why It Might Matter (Commercial Bottleneck) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="How does this constrain land, substation power, water, or capital?"
                  value={formData.whyItMightMatter}
                  onChange={(e) => setFormData({ ...formData, whyItMightMatter: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070a10] border border-slate-800 rounded text-slate-100 font-sans focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCaptureModal(false)}
                  className="px-4 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded"
                >
                  Capture to Inbox
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
