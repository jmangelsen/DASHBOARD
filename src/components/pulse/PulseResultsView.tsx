import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  PulseRunRecord, 
  CandidateEvidenceItem, 
  EvidenceConfidence 
} from '../../types';
import { HumanReviewModal } from './HumanReviewModal';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  AlertTriangle, 
  HelpCircle, 
  Search, 
  ArrowRight,
  ShieldAlert,
  Clock,
  Download,
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface Props {
  run: PulseRunRecord | null;
}

export const PulseResultsView: React.FC<Props> = ({ run }) => {
  const { 
    approveCandidateEvidence, 
    rejectCandidateEvidence, 
    requestDeeperVerification,
    addIntelligence,
    setActiveSection
  } = useApp();

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateEvidenceItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [briefCreated, setBriefCreated] = useState(false);

  if (!run || !run.output) {
    return (
      <div className="p-12 text-center bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
        <FileText className="w-10 h-10 text-slate-600 mx-auto" />
        <div className="text-sm font-bold text-slate-300">No Research Run Output Selected</div>
        <p className="text-slate-400 font-sans max-w-md mx-auto">
          Execute a new query in the Research Console or select a prior historical run from the Run History tab.
        </p>
      </div>
    );
  }

  const { output } = run;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateBriefDraft = () => {
    addIntelligence({
      title: `PULSE Research Brief: ${run.query.slice(0, 60)}...`,
      type: 'brief',
      summary: output.research_summary,
      fullContent: `# PULSE Research Synthesis
**Query:** ${run.query}
**Geography:** ${run.geography}
**Source Quality Standard:** ${run.sourcePreference}
**Execution Depth:** ${run.depth}

## Executive Summary
${output.research_summary}

## Directly Supported Facts
${output.direct_facts.map(f => `- ${f}`).join('\n')}

## Inferences
${output.inferences.map(i => `- ${i}`).join('\n')}

## Assumptions
${output.assumptions.map(a => `- ${a}`).join('\n')}

## Unknowns & Evidence Gaps
${output.unknowns.map(u => `- ${u}`).join('\n')}

## Conflicting Evidence
${output.conflicts.map(c => `- ${c}`).join('\n')}

## Recommended Next Steps
${output.recommended_next_steps.map(s => `- ${s}`).join('\n')}
`,
      keyTakeaways: output.direct_facts.slice(0, 3),
      tags: ['PULSE', run.researchType, run.mode, run.geography],
      entities: [run.entity, run.project],
      linkedProject: run.project,
      sourceTier: 'official',
      confidence: 'high',
      evidenceStatus: 'draft',
      dataClassification: 'public',
    });

    setBriefCreated(true);
    setTimeout(() => setBriefCreated(false), 3000);
  };

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case 'direct_fact':
        return 'text-emerald-400 border-l-2 border-emerald-500/70 pl-1.5';
      case 'inference':
        return 'text-cyan-400 border-l-2 border-cyan-500/70 pl-1.5';
      case 'assumption':
        return 'text-amber-400 border-l-2 border-amber-500/70 pl-1.5';
      case 'unknown':
        return 'text-rose-400 border-l-2 border-rose-500/70 pl-1.5';
      default:
        return 'text-slate-400 border-l-2 border-slate-600 pl-1.5';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Run Telemetry and Export Actions */}
      <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-slate-400 text-[11px]">
            <span className="text-cyan-400 font-bold uppercase">{run.runId}</span>
            <span aria-hidden="true">·</span>
            <span>Mode: {run.mode}</span>
            <span aria-hidden="true">·</span>
            <span>Depth: {run.depth}</span>
            <span aria-hidden="true">·</span>
            <span>Cost: ${run.estimatedCost.toFixed(2)}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">{run.output.candidate_evidence.length} Candidate Claims</span>
          </div>
          <div className="text-white font-sans text-sm font-semibold truncate max-w-2xl">
            Query: "{run.query}"
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyJSON}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleCreateBriefDraft}
            className="px-3 py-1.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/20 rounded transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{briefCreated ? 'Brief Drafted!' : 'Create Research Brief Draft'}</span>
          </button>
        </div>
      </div>

      {/* Synthesis Overview Card */}
      <div className="p-5 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-3 font-mono text-xs">
        <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
          <span>Executive Regulatory Synthesis</span>
          <span className="text-[10px] text-slate-400 font-normal">Pending Human Approval</span>
        </div>
        <p className="text-slate-200 font-sans text-xs leading-relaxed">
          {output.research_summary}
        </p>
      </div>

      {/* Five-Fold Separation Grid (Facts, Inferences, Assumptions, Unknowns, Conflicts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
        {/* Facts */}
        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Directly Supported Facts</span>
            <span className="tabular-nums">({output.direct_facts.length})</span>
          </div>
          <ul className="space-y-1.5 font-sans text-slate-300 text-xs">
            {output.direct_facts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-mono mt-0.5">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Inferences */}
        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Reasonable Inferences</span>
            <span className="tabular-nums">({output.inferences.length})</span>
          </div>
          <ul className="space-y-1.5 font-sans text-slate-300 text-xs">
            {output.inferences.map((inf, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-mono mt-0.5">•</span>
                <span>{inf}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assumptions */}
        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Critical Assumptions</span>
            <span className="tabular-nums">({output.assumptions.length})</span>
          </div>
          <ul className="space-y-1.5 font-sans text-slate-300 text-xs">
            {output.assumptions.map((ass, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-mono mt-0.5">•</span>
                <span>{ass}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Unknowns / Evidence Gaps */}
        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2">
          <div className="text-rose-400 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Unknowns / Evidence Gaps</span>
            <span className="tabular-nums">({output.unknowns.length})</span>
          </div>
          <ul className="space-y-1.5 font-sans text-slate-300 text-xs">
            {output.unknowns.map((unk, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-mono mt-0.5">•</span>
                <span>{unk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conflicts */}
        <div className="p-4 bg-[#0a0e17] border border-slate-800 rounded-lg space-y-2 lg:col-span-2">
          <div className="text-amber-300 font-bold uppercase tracking-wider text-[11px] pb-1 border-b border-slate-800 flex items-center justify-between">
            <span>Conflicting Evidence / Trade Press Contradictions</span>
            <span className="tabular-nums">({output.conflicts.length})</span>
          </div>
          <ul className="space-y-1.5 font-sans text-slate-300 text-xs">
            {output.conflicts.map((conf, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-mono mt-0.5">⚠</span>
                <span>{conf}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CANDIDATE EVIDENCE ITEMS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold uppercase tracking-wider">
              Structured Candidate Evidence ({output.candidate_evidence.length} Claims)
            </span>
            <span className="text-slate-400">· Pending Human Review Gate</span>
          </div>
          <span className="text-[11px] text-amber-400">
            {output.candidate_evidence.filter(c => c.reviewStatus === 'pending').length} Awaiting Approval
          </span>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {output.candidate_evidence.map((candidate) => (
            <div
              key={candidate.id}
              className={`p-5 bg-[#0a0e17] border rounded-lg space-y-4 transition-all ${
                candidate.reviewStatus === 'approved' 
                  ? 'border-emerald-500/50 bg-emerald-950/10' 
                  : candidate.reviewStatus === 'rejected'
                  ? 'border-rose-900/50 bg-rose-950/10 opacity-75'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  {/* Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-2 text-slate-400 text-[11px]">
                    <span className={getClassificationBadge(candidate.classification)}>
                      {candidate.classification.replace('_', ' ')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-cyan-400 font-semibold">{candidate.source_publisher}</span>
                    <span aria-hidden="true">·</span>
                    <span>{candidate.geography}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-[10px] text-slate-300">{candidate.source_quality} tier</span>
                    <span aria-hidden="true">·</span>
                    <span className={`font-semibold uppercase ${
                      candidate.confidence === 'high' ? 'text-emerald-400' :
                      candidate.confidence === 'medium' ? 'text-cyan-400' : 'text-amber-400'
                    }`}>
                      {candidate.confidence} confidence
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold font-sans text-white leading-snug">
                    {candidate.claim}
                  </h3>
                </div>

                {/* Status Indicator */}
                <div className="shrink-0 flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border ${
                    candidate.reviewStatus === 'approved'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : candidate.reviewStatus === 'rejected'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : candidate.reviewStatus === 'deeper_verification_requested'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {candidate.reviewStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Exact Evidence Excerpt */}
              <div className="p-3.5 bg-[#0d121c] border-l-2 border-cyan-500/70 rounded text-xs text-slate-300">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Exact Supporting Excerpt:
                </span>
                <blockquote className="italic font-sans text-slate-200 leading-relaxed">
                  "{candidate.evidence_excerpt}"
                </blockquote>
              </div>

              {/* Source Document Details & Recommended Verification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] pt-1 border-t border-slate-850">
                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[10px] uppercase block">Source Document</span>
                  <div className="text-slate-200 font-sans flex items-center gap-1.5">
                    <span>{candidate.source_title}</span>
                    {candidate.source_url && (
                      <a 
                        href={candidate.source_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-cyan-400 hover:text-cyan-300 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Published: {candidate.publication_date || 'N/A'} · Entity: {candidate.entity}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-400 text-[10px] uppercase block">Recommended Human Verification Step</span>
                  <p className="text-amber-300 font-sans leading-normal">
                    {candidate.recommended_human_verification}
                  </p>
                </div>
              </div>

              {/* Audit Meta if Reviewed */}
              {candidate.reviewStatus === 'approved' && (
                <div className="p-2.5 bg-emerald-950/20 border border-emerald-800/40 rounded text-[11px] text-emerald-300 flex items-center justify-between">
                  <span>Approved By: <strong>{candidate.approvedBy}</strong> ({candidate.approvedAt?.split('T')[0]})</span>
                  <span className="text-slate-300">Note: {candidate.reviewNotes}</span>
                </div>
              )}

              {candidate.reviewStatus === 'rejected' && (
                <div className="p-2.5 bg-rose-950/20 border border-rose-800/40 rounded text-[11px] text-rose-300">
                  <span>Rejection Rationale: <strong>{candidate.rejectionReason}</strong></span>
                </div>
              )}

              {/* Action Buttons for Candidate */}
              <div className="pt-2 border-t border-slate-850 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {candidate.reviewStatus !== 'approved' && (
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 rounded transition-colors flex items-center gap-1.5 text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Review &amp; Approve to Ledger (+20 SC)</span>
                    </button>
                  )}

                  {candidate.reviewStatus !== 'rejected' && (
                    <button
                      onClick={() => {
                        setSelectedCandidate(candidate);
                      }}
                      className="px-3 py-1.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 rounded transition-colors flex items-center gap-1.5 text-xs"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => requestDeeperVerification(run.runId, candidate.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-xs"
                  >
                    Request Deeper Verification
                  </button>
                </div>

                <div className="text-[10px] text-slate-400">
                  Risk Category: <strong className="text-slate-300">{candidate.risk_category}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Human Review Modal Dialog */}
      {selectedCandidate && (
        <HumanReviewModal
          candidate={selectedCandidate}
          runId={run.runId}
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          onApprove={approveCandidateEvidence}
          onReject={rejectCandidateEvidence}
        />
      )}
    </div>
  );
};
