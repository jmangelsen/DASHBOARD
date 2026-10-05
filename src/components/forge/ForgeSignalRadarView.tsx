import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { ForgeSignal, SignalRadarStatus, DataClassification } from '../../types/nexus';
import { 
  Inbox, 
  Plus, 
  Search, 
  Filter, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

export const ForgeSignalRadarView: React.FC = () => {
  const { forgeSignals, addSignal, setActiveForgeDepartment } = useNexus();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCaptureModal, setShowCaptureModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    sourceUrl: '',
    sourceType: 'filing' as ForgeSignal['sourceType'],
    sourceDate: new Date().toISOString().split('T')[0],
    organization: '',
    commercialRelevance: '',
    targetBuyer: 'Data Center Site Selectors & Energy Planners',
    potentialPain: '',
    dataClassification: 'public' as DataClassification,
    status: 'inbox' as SignalRadarStatus,
    notes: ''
  });

  const filteredSignals = forgeSignals.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.commercialRelevance.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const res = addSignal(formData);
    if (!res.success) {
      setFormError(res.error || 'Failed to capture signal due to governance policy.');
      return;
    }

    setShowCaptureModal(false);
    setFormData({
      title: '',
      sourceUrl: '',
      sourceType: 'filing',
      sourceDate: new Date().toISOString().split('T')[0],
      organization: '',
      commercialRelevance: '',
      targetBuyer: 'Data Center Site Selectors & Energy Planners',
      potentialPain: '',
      dataClassification: 'public',
      status: 'inbox',
      notes: ''
    });
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header and Quick Capture */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Inbox className="w-4 h-4 text-violet-400" />
            <span>SIGNAL RADAR // COMMERCIAL OPPORTUNITY INBOX</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-sans mt-0.5">
            Capture public filings, municipal dockets, forum observations, and competitor shifts before competitors notice.
          </p>
        </div>

        <button
          onClick={() => setShowCaptureModal(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Capture Raw Signal</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search signals by filing, entity, or pain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#090d16] border border-slate-800 rounded text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[11px] uppercase">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-1.5 bg-[#090d16] border border-slate-800 rounded text-slate-300 text-xs"
          >
            <option value="all">All Statuses ({forgeSignals.length})</option>
            <option value="inbox">Inbox</option>
            <option value="triage">Triage</option>
            <option value="research">Research</option>
            <option value="validated">Validated</option>
            <option value="converted_to_offer">Converted to Offer</option>
          </select>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-3">
        {filteredSignals.map((signal) => (
          <div key={signal.id} className="p-4 bg-[#090d16] border border-slate-800 rounded-lg space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-violet-400">{signal.organization}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 font-sans">Date: {signal.sourceDate}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 uppercase">{signal.sourceType}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  signal.status === 'converted_to_offer'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : signal.status === 'validated'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  Status: {signal.status.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#06080e] text-slate-400 border border-slate-800">
                  {signal.dataClassification}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white font-sans">
                {signal.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {signal.commercialRelevance}
              </p>
            </div>

            <div className="p-2.5 rounded bg-[#06080e] border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 font-sans">
              <div>
                <strong>Potential Buyer Pain:</strong> {signal.potentialPain}
              </div>
              {signal.sourceUrl && (
                <a
                  href={signal.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-1 font-mono shrink-0"
                >
                  <span>Source URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* QUICK CAPTURE MODAL WITH RESTRICTED DATA PROTECTION */}
      {showCaptureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#090d16] border border-violet-500/40 rounded-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Capture Raw Signal // Radar Ingestion
                </h3>
              </div>
              <button onClick={() => setShowCaptureModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/60 rounded text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>{formError}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Signal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Colorado PUC Docket 24A-0899E Transmission Filing"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Organization / Entity</label>
                  <input
                    type="text"
                    placeholder="e.g. Public Utilities Commission"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 uppercase text-[10px] block mb-1">Source URL</label>
                  <input
                    type="url"
                    placeholder="https://puc.colorado.gov/..."
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Commercial Relevance</label>
                <textarea
                  rows={2}
                  placeholder="What commercial consequence does this create for infrastructure developers?"
                  value={formData.commercialRelevance}
                  onChange={(e) => setFormData({ ...formData, commercialRelevance: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 uppercase text-[10px] block mb-1">Potential Buyer Pain</label>
                <input
                  type="text"
                  placeholder="e.g. Developers lose earnest money on land lacking transformer capacity"
                  value={formData.potentialPain}
                  onChange={(e) => setFormData({ ...formData, potentialPain: e.target.value })}
                  className="w-full p-2 bg-[#06080e] border border-slate-800 rounded text-white font-sans text-xs"
                  required
                />
              </div>

              <div className="p-3 bg-[#06080e] border border-slate-800 rounded space-y-1.5">
                <label className="text-cyan-400 font-bold uppercase text-[10px] block">
                  Mandatory Data Classification
                </label>
                <select
                  value={formData.dataClassification}
                  onChange={(e) => setFormData({ ...formData, dataClassification: e.target.value as DataClassification })}
                  className="w-full p-2 bg-[#090d16] border border-slate-800 rounded text-white text-xs font-mono"
                >
                  <option value="public">Public (Regulatory dockets, open web, press releases)</option>
                  <option value="licensed">Licensed (Commercial datasets, purchased feeds)</option>
                  <option value="user-created">User-Created (Founder research notes, synthesis)</option>
                  <option value="customer-provided">Customer-Provided (Consented interview transcripts)</option>
                  <option value="private">Private (Proprietary venture calculations)</option>
                  <option value="restricted">Restricted (Employer IP, confidential third-party data - BLOCKED)</option>
                </select>
                <p className="text-[10px] text-slate-500 font-sans">
                  Selecting "restricted" will immediately block storage under global data governance policy.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCaptureModal(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  Save Signal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
