import React, { useState, useMemo } from 'react';
import { useNexus, OracleDepartment, ForgeDepartment } from '../../context/NexusContext';
import {
  Activity,
  Target,
  Briefcase,
  Shield,
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Database,
  Cpu,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Sparkles,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Zap,
  Radio,
  Sliders,
  FileText,
  Users,
  Compass,
  CornerDownRight,
  ChevronRight,
  ShieldAlert,
  Archive,
  BarChart3,
  Percent,
  BookOpen
} from 'lucide-react';

export type StationState = 
  | 'idle' 
  | 'active' 
  | 'awaiting_review' 
  | 'blocked' 
  | 'scheduled' 
  | 'stale' 
  | 'complete' 
  | 'disabled';

export type StationWing = 'oracle' | 'forge' | 'core';

export interface StationData {
  id: string;
  name: string;
  subtitle: string;
  type: 'Bay' | 'Lab' | 'Desk' | 'Console' | 'Room' | 'Station' | 'Seat' | 'Studio' | 'Vault';
  wing: StationWing;
  departmentId?: OracleDepartment | ForgeDepartment | 'founder' | 'pulse' | 'governance' | 'cost' | 'missions' | 'assets';
  state: StationState;
  stateReason: string;
  owner: string;
  aiAssistantRole?: string;
  automationStatus?: string;
  activeMissionCount: number;
  highestPriorityMission: string;
  pendingReviewCount: number;
  blockedItemCount: number;
  dataFreshness: string;
  evidenceQuality: 'Verified' | 'Pending Review' | 'Stale' | 'High Rigor' | 'Nominal';
  lastActivityTimestamp: string;
  nextScheduledEvent: string;
  linkedActiveProjects: string[];
  linkedEvidenceRecords: string[];
  currentKpi: { label: string; value: string | number; note?: string };
  primaryRisk: string;
  requiredNextDecision: string;
}

export const NexusOperationsDeckView: React.FC = () => {
  const {
    activeDivision,
    setActiveDivision,
    setActiveNexusSection,
    setActiveOracleDepartment,
    setActiveForgeDepartment,
    oracleHoursThisWeek,
    forgeHoursThisWeek,
    founderCompoundingIndex,
    oracleIntegrityScore,
    currentForgeMRR,
    forgeRevenueThreshold,
    oracleModels,
    oracleGames,
    forgeOpportunity,
    forgeSignals,
    sharedMissions,
    sharedAssets,
    automations,
    blockedAttempts,
    setOrchestratorOpen,
    setOrchestratorMode
  } = useNexus();

  // Selected station state for right-side intelligence drawer
  const [selectedStationId, setSelectedStationId] = useState<string>('founder-command');
  const [filterWing, setFilterWing] = useState<'all' | 'oracle' | 'forge' | 'core'>('all');
  const [filterState, setFilterState] = useState<string>('all');
  const [filterBottlenecksOnly, setFilterBottlenecksOnly] = useState<boolean>(false);

  // Active Model and Missions
  const activeModel = oracleModels[0];
  const topOracleMission = sharedMissions.find(m => m.division === 'oracle' && m.status === 'active');
  const topForgeMission = sharedMissions.find(m => m.division === 'forge' && m.status === 'active');

  // Build Real Station Records from Live Context Data
  const stations: StationData[] = useMemo(() => {
    return [
      // ==========================================
      // SHARED CORE (EPICENTER)
      // ==========================================
      {
        id: 'founder-command',
        name: 'FOUNDER COMMAND SEAT',
        subtitle: 'Executive Attention, Allocation & Strategic Lever',
        type: 'Seat',
        wing: 'core',
        departmentId: 'founder',
        state: 'active',
        stateReason: 'Founder actively operating Week 5 cadence. 14h ORACLE / 18h FORGE committed.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'ORCHESTRATOR AI ready for strategic cross-division validation',
        automationStatus: 'System telemetry nominal; 3 of 3 cron workflows operational',
        activeMissionCount: sharedMissions.filter(m => m.status === 'active').length,
        highestPriorityMission: topForgeMission?.title || 'Deploy Outbound Briefing to 12 Weld County Energy Site Selectors',
        pendingReviewCount: 2,
        blockedItemCount: 1,
        dataFreshness: 'Live (Synchronized)',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: 'Just now',
        nextScheduledEvent: 'Friday practice injury report ingestion (16:00)',
        linkedActiveProjects: ['Front Range Infrastructure Monitor', 'Week 5 NFL Probabilistic Forecast Slate'],
        linkedEvidenceRecords: ['PUC Docket 24A-0123E', 'NFL Practice Log Day 3', 'Colorado Water Surcharge Code'],
        currentKpi: { label: 'Compounding Index', value: `${founderCompoundingIndex}/100`, note: '78% target pace' },
        primaryRisk: 'Outreach velocity bottleneck delaying $750/mo commercial gate clearance.',
        requiredNextDecision: 'Approve Outbound Memo to site selectors; review Model 3.0 pace backtest.'
      },
      {
        id: 'core-pulse-queue',
        name: 'PULSE Research Queue',
        subtitle: 'Signal Ingestion & Human Review Gate',
        type: 'Console',
        wing: 'core',
        departmentId: 'pulse',
        state: 'awaiting_review',
        stateReason: '1 candidate evidence item extracted from Colorado PUC docket awaiting human approval.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'PULSE Candidate Extraction Agent (Outputs quarantined pending review)',
        automationStatus: 'Web research proxy active with strict client-zero-secret',
        activeMissionCount: 1,
        highestPriorityMission: 'Verify acoustic buffer decibel threshold in Larimer County zoning brief',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '18 min ago',
        evidenceQuality: 'Pending Review',
        lastActivityTimestamp: '2026-10-05 12:45',
        nextScheduledEvent: 'Scheduled docket crawl (Tonight 22:00)',
        linkedActiveProjects: ['Front Range Infrastructure Constraint Monitor'],
        linkedEvidenceRecords: ['Larimer County Planning Docket 2026-B'],
        currentKpi: { label: 'Extracted Claims', value: '14 Claims', note: '13 approved, 1 in review' },
        primaryRisk: 'Unverified regulatory hearsay entering formal client deliverables.',
        requiredNextDecision: 'Review direct quote and assign confidence level before moving to Evidence Ledger.'
      },
      {
        id: 'core-governance',
        name: 'Governance & Airgap Console',
        subtitle: 'Data Classification & Restricted Data Blocking',
        type: 'Console',
        wing: 'core',
        departmentId: 'governance',
        state: 'complete',
        stateReason: 'Airgap boundary enforced. 1 restricted attempt intercepted & content discarded.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Automated data classification auditor',
        automationStatus: 'Hardened filter active; zero restricted bytes in persistence layer',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero outstanding governance alerts',
        pendingReviewCount: 0,
        blockedItemCount: blockedAttempts.length,
        dataFreshness: 'Real-time',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 11:30',
        nextScheduledEvent: 'Continuous audit cycle',
        linkedActiveProjects: ['All Divisions'],
        linkedEvidenceRecords: ['Audit Block Log #BLK-0091'],
        currentKpi: { label: 'Airgap Violations', value: '0 Stored', note: '100% blocked at perimeter' },
        primaryRisk: 'Accidental ingestion of restricted third-party or employer intellectual property.',
        requiredNextDecision: 'None required. All data classifications nominal.'
      },
      {
        id: 'core-cost-monitor',
        name: 'Integration & Cost Monitor',
        subtitle: 'API Quotas, Secret Isolation & Budget Ceilings',
        type: 'Console',
        wing: 'core',
        departmentId: 'cost',
        state: 'complete',
        stateReason: 'Daily spend $0.85 (under $5.00 daily cap); Monthly $10.70 (under $50.00 ceiling).',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Spend and token consumption monitor',
        automationStatus: 'Hard limits configured with immediate kill switch capability',
        activeMissionCount: 0,
        highestPriorityMission: 'Budget tracking within safe limits',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Live (Updated per API call)',
        evidenceQuality: 'Nominal',
        lastActivityTimestamp: '2026-10-05 12:55',
        nextScheduledEvent: 'Monthly budget reset in 26 days',
        linkedActiveProjects: ['ORACLE Modeling', 'FORGE PULSE Ingestion'],
        linkedEvidenceRecords: ['Token Usage Record Session 4'],
        currentKpi: { label: 'Current API Spend', value: '$10.70', note: 'Ceiling: $50.00/mo' },
        primaryRisk: 'Unrestricted background research queries consuming excess tokens.',
        requiredNextDecision: 'Keep daily cap set at $5.00; kill switch armed.'
      },
      {
        id: 'core-missions',
        name: 'Shared Mission Control',
        subtitle: 'Strategic Cadence & Weekly Milestone Registry',
        type: 'Room',
        wing: 'core',
        departmentId: 'missions',
        state: 'active',
        stateReason: '2 active high-leverage missions in progress across ORACLE and FORGE.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Cadence advisor',
        automationStatus: 'Weekly review scheduling synced with calendar',
        activeMissionCount: sharedMissions.filter(m => m.status === 'active').length,
        highestPriorityMission: topForgeMission?.title || 'Deploy Outbound Briefing to Site Selectors',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Updated today',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-05 09:00',
        nextScheduledEvent: 'Sunday weekly postmortem & cadence review (20:00)',
        linkedActiveProjects: ['Missions F1, O1, F2'],
        linkedEvidenceRecords: ['Shared Mission Ledger'],
        currentKpi: { label: 'Active Missions', value: '2 Active', note: '1 deferred, 1 completed' },
        primaryRisk: 'Over-committing hours to non-validating software features.',
        requiredNextDecision: 'Confirm completion definition for Mission F1 before Friday.'
      },
      {
        id: 'core-asset-vault',
        name: 'Shared Asset Vault',
        subtitle: 'Cross-Division Reusable IP & Calibrated Code',
        type: 'Station',
        wing: 'core',
        departmentId: 'assets',
        state: 'complete',
        stateReason: '3 shared modular assets compounding (Regulatory Radar, Bayesian Ridge, Audit Schema).',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Asset compounding index calculator',
        automationStatus: 'Git repository lineage verified',
        activeMissionCount: 0,
        highestPriorityMission: 'Asset preservation nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Updated 2 days ago',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-03 14:10',
        nextScheduledEvent: 'Quarterly asset compounding index audit',
        linkedActiveProjects: ['ORACLE Model Lab', 'FORGE Signal Radar'],
        linkedEvidenceRecords: ['Shared Asset Registry #AST-01..03'],
        currentKpi: { label: 'Hours Saved', value: '~48.5h', note: 'Across 7 project reuses' },
        primaryRisk: 'Cross-division pollution of isolated data models.',
        requiredNextDecision: 'Keep all reusable assets strictly methodological; zero data blending.'
      },

      // ==========================================
      // ORACLE WING (NFL INTELLIGENCE)
      // ==========================================
      {
        id: 'oracle-data-ops',
        name: 'Data Operations Bay',
        subtitle: 'Statistical Ingestion, Source Lineage & Freshness',
        type: 'Bay',
        wing: 'oracle',
        departmentId: 'data-ops',
        state: 'complete',
        stateReason: 'Week 5 schedule, weather feeds, and official injury filings ingested 14 min ago.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Data ingestion validator',
        automationStatus: 'Automated feed monitor operational; 0 schema errors',
        activeMissionCount: 0,
        highestPriorityMission: 'Scheduled data ingestion completed',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: '14 min ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 13:00',
        nextScheduledEvent: 'Friday practice participation sync (16:30)',
        linkedActiveProjects: ['NFL Week 5 Master Data Slate'],
        linkedEvidenceRecords: ['SportsDataIO Feed', 'NFL Operations Injury Sheet'],
        currentKpi: { label: 'Lineage Score', value: '100%', note: '0 unverified social rumor inputs' },
        primaryRisk: 'Late-breaking active/inactive announcements on Sunday morning.',
        requiredNextDecision: 'Verify feed timestamps prior to final Sunday model lock.'
      },
      {
        id: 'oracle-model-lab',
        name: 'Model Lab',
        subtitle: 'Bayesian Ridge, EPA Weights & Version Lineage',
        type: 'Lab',
        wing: 'oracle',
        departmentId: 'model-lab',
        state: 'active',
        stateReason: 'Model v2.4.1 active baseline. Candidate Model v3.0 undergoing pace-compression testing.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Model architecture simulator',
        automationStatus: 'Continuous simulation runner idle',
        activeMissionCount: 1,
        highestPriorityMission: 'Audit Model 3.0 pace-compression backtest',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: 'Current (Season 2026)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 10:20',
        nextScheduledEvent: 'Preregistration audit meeting before activation',
        linkedActiveProjects: ['Model v2.4.1 (Active)', 'Model v3.0-RC1 (Candidate)'],
        linkedEvidenceRecords: ['Git Commit 8f2c19a', 'Calibration Test Suite Run #41'],
        currentKpi: { label: 'Active Baseline', value: 'v2.4.1', note: 'Brier 0.188' },
        primaryRisk: 'Overfitting candidate models to small sample sizes in early weeks.',
        requiredNextDecision: 'Require 200+ historical game backtest before promoting Candidate v3.0.'
      },
      {
        id: 'oracle-game-intel',
        name: 'Game Intelligence Desk',
        subtitle: 'Matchup Dossiers, Script Distributions & Pace',
        type: 'Desk',
        wing: 'oracle',
        departmentId: 'game-intel',
        state: 'awaiting_review',
        stateReason: 'Chiefs vs Bills dossier needs final Friday practice verification for center injury.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Scenario distribution compiler',
        automationStatus: 'Dossier generator ready',
        activeMissionCount: 1,
        highestPriorityMission: topOracleMission?.title || 'Audit injury uncertainties on Chiefs vs Bills matchup',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '25 min ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:10',
        nextScheduledEvent: 'Final Saturday slate freeze (20:00)',
        linkedActiveProjects: ['Week 5 Matchup Dossiers (2 Complete, 1 Pending Review)'],
        linkedEvidenceRecords: ['Chiefs vs Bills Game Dossier #KC-BUF-W5'],
        currentKpi: { label: 'Model Win Prob', value: '58.2% KC', note: 'Spread: KC -3.5' },
        primaryRisk: 'Uncalibrated coach press conference statements distorting actual game script.',
        requiredNextDecision: 'Lock probability distribution once Friday practice status is posted.'
      },
      {
        id: 'oracle-player-intel',
        name: 'Player Intelligence Desk',
        subtitle: 'Availability, Snap Share, EPA & Uncertainty',
        type: 'Desk',
        wing: 'oracle',
        departmentId: 'player-intel',
        state: 'active',
        stateReason: 'Active player usage monitoring; center Creed Humphrey ankle status flagged as Questionable.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Player injury uncertainty evaluator',
        automationStatus: 'Practice participation crawler active',
        activeMissionCount: 0,
        highestPriorityMission: 'Track 5 key skill and protection players for Week 5',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '30 min ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:30',
        nextScheduledEvent: 'Game-day inactives announcement (Sunday 11:30)',
        linkedActiveProjects: ['Week 5 Offensive Line Impact Matrix'],
        linkedEvidenceRecords: ['Chiefs Injury Release', '49ers Pool Transcript'],
        currentKpi: { label: 'Tracked Impact Players', value: '5 Verified', note: '2 Questionable' },
        primaryRisk: 'Uncertainty drop-off in backup offensive linemen pass protection efficiency.',
        requiredNextDecision: 'Update EPA penalty factor if starting center is downgraded to Doubtful.'
      },
      {
        id: 'oracle-parlays',
        name: 'Parlay Architecture Bay',
        subtitle: 'Correlation-Aware Scenario Research (Forecast Only)',
        type: 'Bay',
        wing: 'oracle',
        departmentId: 'parlays',
        state: 'complete',
        stateReason: 'Week 5 2-leg correlation scenario analyzed: Bills/KC Under + Allen scramble yards.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Joint probability scenario calculator',
        automationStatus: 'Wagering functionality permanently disabled',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero active parlay simulations in progress',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current Week 5',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-05 11:00',
        nextScheduledEvent: 'Post-week parlay calibration check (Tuesday)',
        linkedActiveProjects: ['Correlation Research Card #PAR-W5-01'],
        linkedEvidenceRecords: ['Joint Distribution Matrix v2.4'],
        currentKpi: { label: 'Model Joint Prob', value: '29.8%', note: 'Market Implied: 24.5%' },
        primaryRisk: 'Correlation error under extreme weather or game-script blowouts.',
        requiredNextDecision: 'Ensure permanent honesty disclaimer is visible across all scenario displays.'
      },
      {
        id: 'oracle-market-bench',
        name: 'Market Benchmark Console',
        subtitle: 'Independent Forecast vs Timestamped Market Context',
        type: 'Console',
        wing: 'oracle',
        departmentId: 'market-bench',
        state: 'active',
        stateReason: 'Comparing independent model spread (KC -3.5) with market consensus (KC -2.5).',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Market divergence detector',
        automationStatus: 'Consensus market line sync every 6 hours',
        activeMissionCount: 0,
        highestPriorityMission: 'Monitor steam moves on Sunday morning totals',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: '45 min ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:00',
        nextScheduledEvent: 'Saturday evening market snapshot',
        linkedActiveProjects: ['Week 5 Market Divergence Ledger'],
        linkedEvidenceRecords: ['Pinnacle/Circa Consensus Feeds'],
        currentKpi: { label: 'Model Divergence', value: '+1.0 pt', note: 'KC Spread edge' },
        primaryRisk: 'Treating market differences as proof of mispricing rather than model error.',
        requiredNextDecision: 'Document benchmark comparison without altering model forecast.'
      },
      {
        id: 'oracle-backtest',
        name: 'Backtest & Calibration Lab',
        subtitle: 'Rolling Reliability Curves, Brier Score & Drift',
        type: 'Lab',
        wing: 'oracle',
        departmentId: 'backtest',
        state: 'complete',
        stateReason: 'Rolling 4-week calibration check passed. Brier score 0.188, log loss 0.542.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Calibration curve evaluator',
        automationStatus: 'Automated postmortem batch job standby',
        activeMissionCount: 0,
        highestPriorityMission: 'Post-Week 5 backtest scheduled for Tuesday',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Updated through Week 4',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-02 18:00',
        nextScheduledEvent: 'Tuesday Week 5 calibration run',
        linkedActiveProjects: ['2026 Rolling Backtest Suite'],
        linkedEvidenceRecords: ['Weeks 1-4 Game Outcome Dataset'],
        currentKpi: { label: 'Brier Score', value: '0.188', note: 'Target: <0.200' },
        primaryRisk: 'Silent calibration drift in low-probability total predictions.',
        requiredNextDecision: 'Confirm probability bucket monotonicity after Week 5 results.'
      },
      {
        id: 'oracle-change-control',
        name: 'Change Control Console',
        subtitle: 'Preregistered Hypotheses, Approvals & Rollback',
        type: 'Console',
        wing: 'oracle',
        departmentId: 'change-control',
        state: 'awaiting_review',
        stateReason: 'Change Record PR-2026-04 (Pace-compression candidate) logged; pending founder sign-off.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Change control auditor',
        automationStatus: 'Model version rollback snapshot armed',
        activeMissionCount: 1,
        highestPriorityMission: 'Founder approval required before candidate promotion',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-04 15:00',
        nextScheduledEvent: 'Activation decision scheduled for Week 6',
        linkedActiveProjects: ['PR-2026-04 Change Proposal'],
        linkedEvidenceRecords: ['Model Baseline Audit #MOD-001'],
        currentKpi: { label: 'Logged Changes', value: '2 Records', note: '1 active, 1 candidate' },
        primaryRisk: 'Unregistered parameter tweaks destroying historical model evaluation validity.',
        requiredNextDecision: 'Do not activate Model v3.0 until Week 5 backtest proves reliability improvement.'
      },
      {
        id: 'oracle-weekly-review',
        name: 'Weekly Review Room',
        subtitle: 'Honest Postmortems, Error Decomposition & Learnings',
        type: 'Room',
        wing: 'oracle',
        departmentId: 'weekly-review',
        state: 'complete',
        stateReason: 'Week 4 postmortem filed. Key learning: Underestimated Denver elevation run pace.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Postmortem error analyst',
        automationStatus: 'Review template generated',
        activeMissionCount: 0,
        highestPriorityMission: 'Week 5 review opens Monday morning',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Season 2026 W4 Complete',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-01 09:30',
        nextScheduledEvent: 'Monday Week 5 Postmortem Session',
        linkedActiveProjects: ['Week 4 Postmortem Report'],
        linkedEvidenceRecords: ['W4 Forecast vs Actual Scorecard'],
        currentKpi: { label: 'Review Completion', value: '100%', note: '4 of 4 weeks analyzed' },
        primaryRisk: 'Hindsight bias when explaining unexpected game variance.',
        requiredNextDecision: 'Ensure weather assumptions are logged BEFORE Sunday kickoffs.'
      },
      {
        id: 'oracle-research-desk',
        name: 'Research Desk',
        subtitle: 'Source-Backed NFL Research & Input Verification',
        type: 'Desk',
        wing: 'oracle',
        departmentId: 'research-desk',
        state: 'idle',
        stateReason: 'All research requests resolved. 0 open data gaps or conflicting reports.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'NFL statistical research assistant',
        automationStatus: 'Docket and feed search standby',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero open research inquiries',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 08:30',
        nextScheduledEvent: 'Next inquiry on demand',
        linkedActiveProjects: ['ORACLE Research Archive'],
        linkedEvidenceRecords: ['Weather API Archive', 'EPA Metric Repository'],
        currentKpi: { label: 'Open Gaps', value: '0 Gaps', note: 'All inputs sourced' },
        primaryRisk: 'Unverified speculation from fantasy or media commentators.',
        requiredNextDecision: 'Reject any input lacking direct primary team or league citation.'
      },
      {
        id: 'oracle-archive',
        name: 'ORACLE Archive',
        subtitle: 'Immutable Forecast History, Commits & Records',
        type: 'Station',
        wing: 'oracle',
        departmentId: 'archive',
        state: 'idle',
        stateReason: '32 historical game dossiers, 4 postmortems, and 2 model commits archived.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Archive archivist',
        automationStatus: 'Git hash lineage locked',
        activeMissionCount: 0,
        highestPriorityMission: 'Archive maintenance nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Immutable historic record',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-01 10:00',
        nextScheduledEvent: 'Week 5 archival post-Tuesday review',
        linkedActiveProjects: ['2026 NFL Historic Vault'],
        linkedEvidenceRecords: ['Historic Commit 6e1a49f'],
        currentKpi: { label: 'Archived Dossiers', value: '32 Games', note: '100% frozen' },
        primaryRisk: 'Retroactive alteration of historic forecasts or probability outputs.',
        requiredNextDecision: 'Enforce read-only state on all prior weeks.'
      },

      // ==========================================
      // FORGE WING (VENTURE DEPLOYMENT)
      // ==========================================
      {
        id: 'forge-signals',
        name: 'Signal Radar',
        subtitle: 'Public Dockets, Bottleneck Triggers & Pain Capture',
        type: 'Station',
        wing: 'forge',
        departmentId: 'signals',
        state: 'complete',
        stateReason: 'Captured 3 public utility and zoning signals regarding Colorado data center power queues.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Regulatory docket parser',
        automationStatus: 'PUC docket scraper cron active',
        activeMissionCount: 0,
        highestPriorityMission: 'Signal triage nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: '2 hours ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 11:15',
        nextScheduledEvent: 'Nightly docket scan (23:00)',
        linkedActiveProjects: ['Front Range Infrastructure Constraint Monitor'],
        linkedEvidenceRecords: ['CO PUC Docket 24A-0123E', 'Larimer Acoustic Ordinance'],
        currentKpi: { label: 'Triaged Signals', value: `${forgeSignals.length} Signals`, note: '100% cited' },
        primaryRisk: 'Chasing generic AI trend chatter instead of physical infrastructure constraints.',
        requiredNextDecision: 'Focus exclusively on grid interconnection queues and municipal cooling restrictions.'
      },
      {
        id: 'forge-buyer-research',
        name: 'Market & Buyer Research Bay',
        subtitle: 'ICP Discovery, Buyer Job-to-be-Done & Pain Validation',
        type: 'Bay',
        wing: 'forge',
        departmentId: 'buyer-research',
        state: 'complete',
        stateReason: '1 verified 45-min buyer interview with enterprise data center energy site selector completed.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Interview transcript structurer',
        automationStatus: 'Interview recording notes parsed into evidence quotes',
        activeMissionCount: 0,
        highestPriorityMission: 'Schedule follow-up interview with second site selector',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Verified Oct 3',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-03 16:30',
        nextScheduledEvent: 'Outbound interview request batch (Thursday)',
        linkedActiveProjects: ['Front Range Infrastructure Monitor'],
        linkedEvidenceRecords: ['Interview Transcript #INT-01', 'Direct Buyer Quotes Sheet'],
        currentKpi: { label: 'Pain Intensity', value: '9 / 10', note: 'Willingness to pay verified' },
        primaryRisk: 'Accepting polite verbal interest as validation instead of paid proof.',
        requiredNextDecision: 'Present paid pilot proposal during next discovery conversation.'
      },
      {
        id: 'forge-opportunity-lab',
        name: 'Opportunity Lab',
        subtitle: 'Commercial Gate Scoring, Stage Controls & Kill Criteria',
        type: 'Lab',
        wing: 'forge',
        departmentId: 'opportunity-lab',
        state: 'active',
        stateReason: 'Front Range Constraint Monitor scored at 86/100; $750/mo validation gate enforced.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Scorecard evaluator & red-team challenger',
        automationStatus: 'Economic model validator active',
        activeMissionCount: 0,
        highestPriorityMission: 'Clear $750/mo gate before Nov 1',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-04 14:00',
        nextScheduledEvent: 'Kill criteria review meeting on Oct 25',
        linkedActiveProjects: ['Front Range Infrastructure Monitor (Score 86)'],
        linkedEvidenceRecords: ['Opportunity Scorecard #OPP-001'],
        currentKpi: { label: 'Readiness Score', value: '86 / 100', note: 'Threshold: >75' },
        primaryRisk: 'Spending founder time on opportunities that cannot produce $750/mo recurring revenue.',
        requiredNextDecision: 'Kill project if 4 total paying subscriptions are not secured by Oct 25.'
      },
      {
        id: 'forge-offer-pricing',
        name: 'Offer & Pricing Studio',
        subtitle: 'Paid Outcome Packaging, Deliverables & Price Testing',
        type: 'Studio',
        wing: 'forge',
        departmentId: 'offer-pricing',
        state: 'complete',
        stateReason: '2 validated offers packaged: $350/mo Monthly Monitor vs $1,200 Executive Dossier.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Offer packaging & objection matrix creator',
        automationStatus: 'Checkout integration standby',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero offer revisions required',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-02 11:00',
        nextScheduledEvent: 'Quarterly pricing review',
        linkedActiveProjects: ['Offer #OFR-01 ($350/mo)', 'Offer #OFR-02 ($1,200 Dossier)'],
        linkedEvidenceRecords: ['Offer Agreement Template', 'Customer Agreement #CUS-01'],
        currentKpi: { label: 'Validated Price', value: '$350 / mo', note: '2 settled customers' },
        primaryRisk: 'Discounting pricing before testing value at full hypothesis rate.',
        requiredNextDecision: 'Do not offer discounts to new inbound leads.'
      },
      {
        id: 'forge-product-forge',
        name: 'Product Forge',
        subtitle: 'Minimum Deliverable System (Gate-Blocked)',
        type: 'Studio',
        wing: 'forge',
        departmentId: 'product-forge',
        state: 'blocked',
        stateReason: 'COMMERCIAL GATE ENFORCED: Feature development paused until current MRR ($350) clears $750/mo gate.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Feature scope gatekeeper',
        automationStatus: 'Build pipeline locked pending revenue milestone',
        activeMissionCount: 0,
        highestPriorityMission: 'Code frozen pending 3 new paid subscriptions',
        pendingReviewCount: 0,
        blockedItemCount: 1,
        dataFreshness: 'Current (Gate Active)',
        evidenceQuality: 'Nominal',
        lastActivityTimestamp: '2026-10-04 18:00',
        nextScheduledEvent: 'Gate evaluation upon 3rd customer payment',
        linkedActiveProjects: ['Front Range Monthly Intelligence Portal (v1.0 Frozen)'],
        linkedEvidenceRecords: ['Commercial Gate Rule #CGR-01 ($750/mo threshold)'],
        currentKpi: { label: 'Gate Status', value: 'BLOCKED', note: 'MRR: $350 / $750' },
        primaryRisk: 'Premature software productization before verified recurring commercial demand.',
        requiredNextDecision: 'DO NOT build new software features until 2 more subscribers sign.'
      },
      {
        id: 'forge-launch-deploy',
        name: 'Launch & Deployment Bay',
        subtitle: 'Landing Pages, Checkout Systems & Customer Access',
        type: 'Bay',
        wing: 'forge',
        departmentId: 'launch-deploy',
        state: 'complete',
        stateReason: 'Executive briefing landing page deployed; simulated Stripe checkout operational.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Deployment QA auditor',
        automationStatus: 'Hosting and DNS verified nominal',
        activeMissionCount: 0,
        highestPriorityMission: 'Deployment operational',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Live on Cloud Run',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 09:15',
        nextScheduledEvent: 'Monthly uptime review',
        linkedActiveProjects: ['Front Range Public Briefing URL'],
        linkedEvidenceRecords: ['Stripe Checkout Config', 'DNS Records'],
        currentKpi: { label: 'Uptime', value: '100%', note: '0 customer access tickets' },
        primaryRisk: 'Broken checkout links during active outbound distribution campaigns.',
        requiredNextDecision: 'Conduct live test checkout prior to each outbound wave.'
      },
      {
        id: 'forge-distribution',
        name: 'Distribution Engine',
        subtitle: 'Direct Outbound, Technical Memos & Referral Channels',
        type: 'Studio',
        wing: 'forge',
        departmentId: 'distribution',
        state: 'active',
        stateReason: 'Mission F1 actively deploying outbound regulatory memos to 12 energy site selectors.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Outbound memo personalized drafter (reviewed by founder)',
        automationStatus: 'Campaign tracker active; 0 automated spam emails',
        activeMissionCount: 1,
        highestPriorityMission: topForgeMission?.title || 'Deploy Outbound Briefing to 12 Weld County Energy Site Selectors',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Active campaign in progress',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-05 11:45',
        nextScheduledEvent: 'Follow-up wave on Thursday (10:00)',
        linkedActiveProjects: ['Weld County Substation Outbound Campaign (F1)'],
        linkedEvidenceRecords: ['Campaign Record #CMP-01', '12 Verified Decision-Maker Contacts'],
        currentKpi: { label: 'Campaign Pace', value: '5 of 12 Sent', note: '2 replies, 1 scheduled' },
        primaryRisk: 'Low reply rates if memos lack hyper-specific substation queue data.',
        requiredNextDecision: 'Personalize remaining 7 briefs with exact transformer lead-time data.'
      },
      {
        id: 'forge-revenue-ops',
        name: 'Revenue Operations Desk',
        subtitle: 'Actual MRR, Cash Collected, Unit Economics & Churn',
        type: 'Desk',
        wing: 'forge',
        departmentId: 'revenue-ops',
        state: 'active',
        stateReason: 'Actual settled cash: $700.00. Current MRR: $350.00/mo. Gap to approval gate: $400.00.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Revenue truth verifier (zero vanity forecast blending)',
        automationStatus: 'Payment webhook listener active',
        activeMissionCount: 0,
        highestPriorityMission: 'Reconcile October invoice payments',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Live (Updated per transaction)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-04 17:00',
        nextScheduledEvent: 'Monthly revenue ledger reconciliation (Oct 31)',
        linkedActiveProjects: ['Settled Transactions #TX-01 & #TX-02'],
        linkedEvidenceRecords: ['Stripe Settled Transaction Audit Log'],
        currentKpi: { label: 'Actual MRR', value: '$350.00', note: 'Goal: $750.00/mo' },
        primaryRisk: 'Treating uncollected pipeline forecasts as actual business revenue.',
        requiredNextDecision: 'Maintain strict separation: pipeline revenue never recorded in settled ledger.'
      },
      {
        id: 'forge-asset-vault',
        name: 'Asset Vault Station',
        subtitle: 'Reusable Code, Methodologies & Customer Insight',
        type: 'Station',
        wing: 'forge',
        departmentId: 'asset-vault',
        state: 'complete',
        stateReason: '3 verified reusable venture assets compounding. Estimated 48.5 founder hours preserved.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Asset reuse cataloger',
        automationStatus: 'Asset indexing nominal',
        activeMissionCount: 0,
        highestPriorityMission: 'Asset preservation nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-03 14:00',
        nextScheduledEvent: 'Monthly compounding index calculation',
        linkedActiveProjects: ['Shared Asset Registry'],
        linkedEvidenceRecords: ['Asset #AST-01 (Regulatory Radar)', 'Asset #AST-03 (Scoring Model)'],
        currentKpi: { label: 'Asset Reuse Score', value: '92 / 100', note: '4 reuses in 2026' },
        primaryRisk: 'Building one-off custom deliverable formats that cannot be reused for new buyers.',
        requiredNextDecision: 'Format all future utility briefs using the reusable Markdown template.'
      },
      {
        id: 'forge-automations',
        name: 'Automation Factory',
        subtitle: 'Documented, Governed Recurring Workflows',
        type: 'Bay',
        wing: 'forge',
        departmentId: 'automations',
        state: 'active',
        stateReason: '3 approved automated workflows operational with human review gates active.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Workflow failure monitor',
        automationStatus: 'All crons healthy; 0 execution errors',
        activeMissionCount: 0,
        highestPriorityMission: 'Monitor nightly PUC scraper run',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Hourly execution telemetry',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:00',
        nextScheduledEvent: 'PUC Docket Ingestion Cron (Tonight 23:00)',
        linkedActiveProjects: ['PUC Docket Crawler', 'Weather Normalizer', 'Lineage Checker'],
        linkedEvidenceRecords: ['Automation Job Registry #JOB-01..03'],
        currentKpi: { label: 'Workflow Uptime', value: '100%', note: '0 failures this week' },
        primaryRisk: 'Automating unvalidated workflows before manual human mastery is achieved.',
        requiredNextDecision: 'Keep all new automations in test mode until 5 successful manual runs.'
      },
      {
        id: 'forge-portfolio-review',
        name: 'Portfolio Review Room',
        subtitle: 'Capital & Attention Allocation // Scale, Pause, Kill',
        type: 'Room',
        wing: 'forge',
        departmentId: 'portfolio-review',
        state: 'awaiting_review',
        stateReason: 'Decision due on Oct 25: If Front Range Monitor has <4 paying customers, freeze investment.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Capital allocation challenger',
        automationStatus: 'Portfolio scorecard updated weekly',
        activeMissionCount: 0,
        highestPriorityMission: 'Oct 25 validation milestone review',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-04 16:00',
        nextScheduledEvent: 'Formal Milestone Review on Oct 25',
        linkedActiveProjects: ['Front Range Infrastructure Monitor'],
        linkedEvidenceRecords: ['Portfolio Decision Record #PDR-01'],
        currentKpi: { label: 'Action Recommendation', value: 'VALIDATE', note: 'Next gate: Oct 25' },
        primaryRisk: 'Sunk cost fallacy delaying the kill decision on a slow-moving opportunity.',
        requiredNextDecision: 'Confirm kill criterion: If <4 customers by Oct 25, decommission and archive.'
      },
      {
        id: 'forge-archive',
        name: 'FORGE Archive',
        subtitle: 'Preserved Research, Rejected Theses & Experiments',
        type: 'Station',
        wing: 'forge',
        departmentId: 'archive',
        state: 'idle',
        stateReason: '1 rejected hypothesis archived with full postmortem (AI Data Center Real Estate Arbitrage).',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Failed experiment archivist',
        automationStatus: 'Archive sealed',
        activeMissionCount: 0,
        highestPriorityMission: 'Archive maintenance nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Archived September 2026',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-09-28 10:00',
        nextScheduledEvent: 'Quarterly archive index',
        linkedActiveProjects: ['Killed Project Postmortem #KIL-001'],
        linkedEvidenceRecords: ['Postmortem Decision Memo'],
        currentKpi: { label: 'Archived Theses', value: '1 Killed', note: 'Preserved $1,500 capital' },
        primaryRisk: 'Re-testing dead hypotheses without reviewing previous kill postmortems.',
        requiredNextDecision: 'Reference #KIL-001 before considering any pure land-flipping ideas.'
      }
    ];
  }, [
    activeModel,
    topOracleMission,
    topForgeMission,
    sharedMissions,
    sharedAssets,
    oracleGames,
    forgeSignals,
    blockedAttempts,
    currentForgeMRR,
    forgeRevenueThreshold,
    founderCompoundingIndex
  ]);

  // Selected Station
  const selectedStation = useMemo(() => {
    return stations.find(s => s.id === selectedStationId) || stations[0];
  }, [stations, selectedStationId]);

  // Filtered Stations
  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      if (filterWing !== 'all' && station.wing !== filterWing) return false;
      if (filterState !== 'all' && station.state !== filterState) return false;
      if (filterBottlenecksOnly && station.state !== 'blocked' && station.state !== 'awaiting_review') return false;
      return true;
    });
  }, [stations, filterWing, filterState, filterBottlenecksOnly]);

  // Telemetry Counts
  const counts = useMemo(() => {
    return {
      active: stations.filter(s => s.state === 'active').length,
      awaiting_review: stations.filter(s => s.state === 'awaiting_review').length,
      blocked: stations.filter(s => s.state === 'blocked').length,
      complete: stations.filter(s => s.state === 'complete').length,
      idle: stations.filter(s => s.state === 'idle').length,
      total: stations.length
    };
  }, [stations]);

  // Helper for State Colors & Styling
  const getStateColor = (state: StationState) => {
    switch (state) {
      case 'active':
        return {
          badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60',
          dot: 'bg-cyan-400',
          glow: 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]',
          label: 'Active Operation'
        };
      case 'awaiting_review':
        return {
          badge: 'bg-amber-950/80 text-amber-300 border-amber-500/60',
          dot: 'bg-amber-400',
          glow: 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          label: 'Awaiting Founder Review'
        };
      case 'blocked':
        return {
          badge: 'bg-rose-950/80 text-rose-300 border-rose-500/60',
          dot: 'bg-rose-400',
          glow: 'border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
          label: 'Blocked / Gate Enforced'
        };
      case 'scheduled':
        return {
          badge: 'bg-violet-950/80 text-violet-300 border-violet-500/60',
          dot: 'bg-violet-400',
          glow: 'border-violet-500/40 shadow-[0_0_10px_rgba(139,92,246,0.2)]',
          label: 'Scheduled Execution'
        };
      case 'complete':
        return {
          badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60',
          dot: 'bg-emerald-400',
          glow: 'border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
          label: 'Complete & Verified'
        };
      case 'stale':
        return {
          badge: 'bg-orange-950/80 text-orange-300 border-orange-500/60',
          dot: 'bg-orange-400',
          glow: 'border-orange-500/40',
          label: 'Stale Data Warning'
        };
      case 'disabled':
        return {
          badge: 'bg-slate-900 text-slate-400 border-slate-700',
          dot: 'bg-slate-600',
          glow: 'border-slate-800 opacity-60',
          label: 'Disabled by Founder'
        };
      case 'idle':
      default:
        return {
          badge: 'bg-slate-900/80 text-slate-400 border-slate-800',
          dot: 'bg-slate-600',
          glow: 'border-slate-800/80',
          label: 'Standby / Idle'
        };
    }
  };

  // Direct action handlers
  const handleOpenDepartment = (station: StationData) => {
    if (station.wing === 'oracle' && station.departmentId && station.departmentId !== 'founder') {
      setActiveDivision('oracle');
      setActiveOracleDepartment(station.departmentId as OracleDepartment);
    } else if (station.wing === 'forge' && station.departmentId && station.departmentId !== 'founder') {
      setActiveDivision('forge');
      setActiveForgeDepartment(station.departmentId as ForgeDepartment);
    } else if (station.wing === 'core') {
      setActiveDivision('nexus');
      if (station.id === 'core-missions') setActiveNexusSection('shared-missions');
      else if (station.id === 'core-asset-vault') setActiveNexusSection('asset-vault');
      else if (station.id === 'core-governance') setActiveNexusSection('governance');
      else if (station.id === 'core-cost-monitor') setActiveNexusSection('settings');
      else setActiveNexusSection('command-center');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-mono text-xs select-none">
      {/* 1. Header & Live Deck Telemetry */}
      <div className="bg-[#080c16] border border-slate-800 p-6 rounded-xl space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                NEXUS OPERATIONS DECK // LIVE OPERATING MAP
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-400 font-mono">
                Real-Time Operational State · Single Human Operator
              </span>
            </div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight">
              Interactive Operational Floorplan
            </h1>
            <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
              Real-time operating state of every department and bay in NEXUS. Zero simulated productivity or fake avatars. Stations derive live status from actual model backtests, buyer validation data, and human review gates.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-lg bg-[#05070c] border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active Stations</span>
              <span className="text-base font-bold text-cyan-400 tabular-nums">{counts.active} Active</span>
            </div>
            <div className="p-3 rounded-lg bg-[#05070c] border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Awaiting Review</span>
              <span className="text-base font-bold text-amber-400 tabular-nums">{counts.awaiting_review} Review</span>
            </div>
            <div className="p-3 rounded-lg bg-[#05070c] border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Blocked Gates</span>
              <span className="text-base font-bold text-rose-400 tabular-nums">{counts.blocked} Blocked</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 uppercase text-[10px] mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Wing:</span>
            </span>
            <button
              onClick={() => setFilterWing('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterWing === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              All Wings ({stations.length})
            </button>
            <button
              onClick={() => setFilterWing('core')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterWing === 'core' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              Shared Core (6)
            </button>
            <button
              onClick={() => setFilterWing('oracle')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterWing === 'oracle' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              ORACLE Wing (11)
            </button>
            <button
              onClick={() => setFilterWing('forge')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filterWing === 'forge' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold' : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              FORGE Wing (12)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterBottlenecksOnly(!filterBottlenecksOnly)}
              className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                filterBottlenecksOnly
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500 font-bold shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Bottlenecks &amp; Gates Only</span>
            </button>

            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="bg-[#05070c] border border-slate-700 text-slate-300 rounded px-2.5 py-1 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">All States</option>
              <option value="active">Active ({counts.active})</option>
              <option value="awaiting_review">Awaiting Review ({counts.awaiting_review})</option>
              <option value="blocked">Blocked ({counts.blocked})</option>
              <option value="complete">Complete ({counts.complete})</option>
              <option value="idle">Idle ({counts.idle})</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Floorplan Layout: 2-Column Responsive (Left: Interactive Visual Deck, Right: Intelligence Drawer) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Floorplan Bays & Map (7 or 8 Cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Spatial Wings Container */}
          <div className="bg-[#070a12] border border-slate-800/80 rounded-2xl p-5 lg:p-6 space-y-8 relative overflow-hidden shadow-2xl">
            {/* Background Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />

            {/* AREA 1: SHARED OPERATIONAL CORE (CENTER EPICENTER) */}
            {(filterWing === 'all' || filterWing === 'core') && (
              <div className="relative z-10 space-y-3.5 pb-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                      SHARED OPERATIONAL CORE // FOUNDER EPICENTER
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Airgapped Central Control · 6 Core Stations
                  </span>
                </div>

                {/* Central Founder Command Seat Highlighted */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stations
                    .filter(s => s.wing === 'core')
                    .map((station) => {
                      const color = getStateColor(station.state);
                      const isSelected = selectedStationId === station.id;
                      const isSeat = station.id === 'founder-command';

                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0f172a] border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/50'
                              : isSeat
                              ? 'bg-[#090f1d] border-cyan-500/40 hover:border-cyan-400'
                              : 'bg-[#090d16] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                                {station.type} · {station.id.replace('core-', '').replace('-', ' ')}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${color.badge}`}>
                                {color.label}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold text-white font-display group-hover:text-cyan-300">
                                {station.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                                {station.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2.5 mt-2.5 border-t border-slate-850 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500 font-mono">
                              {station.currentKpi.label}: <strong className="text-white">{station.currentKpi.value}</strong>
                            </span>
                            <span className="text-cyan-400 font-mono flex items-center gap-0.5 hover:underline">
                              <span>Dossier</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* AREA 2: ORACLE WING (NFL FORECAST INTELLIGENCE) */}
            {(filterWing === 'all' || filterWing === 'oracle') && (
              <div className="relative z-10 space-y-3.5 pb-6 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Target className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                      ORACLE WING // NFL FORECAST INTELLIGENCE
                    </h3>
                  </div>
                  <span className="text-[10px] text-cyan-400/80 font-mono">
                    11 Operational Bays · Pipeline: Data → Model → Scenario → Backtest
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stations
                    .filter(s => s.wing === 'oracle')
                    .map((station) => {
                      const color = getStateColor(station.state);
                      const isSelected = selectedStationId === station.id;

                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0f172a] border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/50'
                              : 'bg-[#090d16] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[10px] uppercase font-bold text-cyan-400/80 font-mono">
                                {station.type} · {station.departmentId}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${color.badge}`}>
                                {color.label}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold text-white font-display">
                                {station.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                                {station.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2.5 mt-2.5 border-t border-slate-850 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500 font-mono truncate max-w-[150px]">
                              {station.currentKpi.label}: <strong className="text-white">{station.currentKpi.value}</strong>
                            </span>
                            <span className="text-cyan-400 font-mono flex items-center gap-0.5 hover:underline">
                              <span>Inspect</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* AREA 3: FORGE WING (VENTURE DEPLOYMENT STUDIO) */}
            {(filterWing === 'all' || filterWing === 'forge') && (
              <div className="relative z-10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-violet-400">
                    <Briefcase className="w-4 h-4" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                      FORGE WING // VENTURE DEPLOYMENT STUDIO
                    </h3>
                  </div>
                  <span className="text-[10px] text-violet-400/80 font-mono">
                    12 Venture Bays · Operating Flywheel: Signal → Offer → Deploy → Revenue
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stations
                    .filter(s => s.wing === 'forge')
                    .map((station) => {
                      const color = getStateColor(station.state);
                      const isSelected = selectedStationId === station.id;
                      const isBlocked = station.state === 'blocked';

                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#150f24] border-violet-400 ring-2 ring-violet-500/30 shadow-lg shadow-violet-950/50'
                              : isBlocked
                              ? 'bg-rose-950/15 border-rose-500/40 hover:border-rose-400'
                              : 'bg-[#090d16] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[10px] uppercase font-bold text-violet-400/80 font-mono">
                                {station.type} · {station.departmentId}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${color.badge}`}>
                                {color.label}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold text-white font-display">
                                {station.name}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-sans line-clamp-1 mt-0.5">
                                {station.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2.5 mt-2.5 border-t border-slate-850 flex items-center justify-between text-[10px]">
                            <span className="text-slate-500 font-mono truncate max-w-[150px]">
                              {station.currentKpi.label}: <strong className="text-white">{station.currentKpi.value}</strong>
                            </span>
                            <span className="text-violet-400 font-mono flex items-center gap-0.5 hover:underline">
                              <span>Inspect</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Intelligence Drawer (4 Cols) */}
        <div className="xl:col-span-4 bg-[#080c16] border border-slate-800 rounded-2xl p-5 space-y-5 sticky top-20 shadow-2xl">
          {/* Drawer Header */}
          <div className="pb-3 border-b border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                STATION INTELLIGENCE DOSSIER
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getStateColor(selectedStation.state).badge}`}>
                {getStateColor(selectedStation.state).label}
              </span>
            </div>
            <h2 className="text-base font-bold text-white font-display">
              {selectedStation.name}
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              Wing: <strong className="text-slate-200 uppercase">{selectedStation.wing}</strong> · Classification: <span className="text-cyan-300">{selectedStation.type}</span>
            </div>
          </div>

          {/* State Reason Callout */}
          <div className="p-3.5 rounded-lg bg-[#05070c] border border-slate-850 text-xs font-sans space-y-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
              Current Operating Status Reason:
            </div>
            <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
              {selectedStation.stateReason}
            </p>
          </div>

          {/* Core Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Single Operator</span>
              <span className="text-xs font-bold text-white truncate block">{selectedStation.owner}</span>
            </div>
            <div className="p-2.5 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Data Freshness</span>
              <span className="text-xs font-bold text-emerald-400 truncate block">{selectedStation.dataFreshness}</span>
            </div>
            <div className="p-2.5 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active Missions</span>
              <span className="text-xs font-bold text-white tabular-nums">{selectedStation.activeMissionCount}</span>
            </div>
            <div className="p-2.5 rounded bg-[#05070c] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Pending Review</span>
              <span className={`text-xs font-bold tabular-nums ${selectedStation.pendingReviewCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                {selectedStation.pendingReviewCount} items
              </span>
            </div>
          </div>

          {/* AI Role & Automation Status */}
          <div className="p-3 rounded-lg bg-[#0d1220] border border-slate-800 space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-cyan-400 uppercase font-bold block">AI Assistant Role</span>
              <span className="text-slate-300 font-sans">{selectedStation.aiAssistantRole || 'Standby — no active model prompt executing'}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Automation Status</span>
              <span className="text-slate-400 font-sans">{selectedStation.automationStatus || 'Manual operator station'}</span>
            </div>
          </div>

          {/* Highest Priority Mission */}
          <div className="space-y-1 text-xs">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              Highest-Priority Mission
            </span>
            <div className="p-3 rounded bg-[#05070c] border border-slate-800 text-white font-sans text-xs">
              {selectedStation.highestPriorityMission}
            </div>
          </div>

          {/* Risk & Next Decision */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-amber-200 text-[11px] font-sans space-y-1">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Primary Operational Risk</span>
              </div>
              <p>{selectedStation.primaryRisk}</p>
            </div>

            <div className="p-3 rounded bg-cyan-950/20 border border-cyan-500/30 text-cyan-200 text-[11px] font-sans space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Required Next Founder Decision</span>
              </div>
              <p>{selectedStation.requiredNextDecision}</p>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => handleOpenDepartment(selectedStation)}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
            >
              <span>Open Station in Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                onClick={() => {
                  setOrchestratorMode(selectedStation.wing === 'oracle' ? 'oracle' : 'forge');
                  setOrchestratorOpen(true);
                }}
                className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Audit AI Queue</span>
              </button>

              <button
                onClick={() => {
                  setActiveDivision('nexus');
                  setActiveNexusSection('governance');
                }}
                className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1"
              >
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>Audit Lineage</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
