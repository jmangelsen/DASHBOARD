import React, { useState, useMemo } from 'react';
import { useNexus, OracleDepartment, ForgeDepartment } from '../../context/NexusContext';
import {
  Target,
  Briefcase,
  Shield,
  Activity,
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
  FileText,
  Users,
  Compass,
  ChevronRight,
  ShieldAlert,
  Archive,
  BarChart3,
  Percent,
  BookOpen,
  ChevronLeft,
  ChevronDown,
  Info,
  Maximize2
} from 'lucide-react';

export type StationState = 
  | 'idle' 
  | 'active' 
  | 'awaiting_review' 
  | 'blocked' 
  | 'scheduled' 
  | 'stale' 
  | 'complete' 
  | 'disabled'
  | 'report_due'
  | 'preparing'
  | 'awaiting_founder_review'
  | 'blocked_by_missing_data';

export type StationWing = 'oracle' | 'forge' | 'core';

export interface StationNode {
  id: string;
  name: string;
  subtitle: string;
  type: 'Bay' | 'Lab' | 'Desk' | 'Console' | 'Room' | 'Studio' | 'Vault' | 'Seat' | 'Chamber';
  wing: StationWing;
  departmentId?: OracleDepartment | ForgeDepartment | 'founder' | 'pulse' | 'governance' | 'automation' | 'cadence' | 'assets' | 'advisor';
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
  linkedProjects: string[];
  linkedEvidence: string[];
  currentKpi: { label: string; value: string | number; note?: string };
  primaryRisk: string;
  requiredNextDecision: string;
  auditTrail: string[];
}

export const NexusFloorView: React.FC = () => {
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
    setOrchestratorMode,
    setCommandPaletteOpen
  } = useNexus();

  // Floor Selection & Drawer state
  const [selectedStationId, setSelectedStationId] = useState<string>('founder-command');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showLegend, setShowLegend] = useState<boolean>(false);

  // Active Model & Missions
  const activeModel = oracleModels[0];
  const topOracleMission = sharedMissions.find(m => m.division === 'oracle' && m.status === 'active');
  const topForgeMission = sharedMissions.find(m => m.division === 'forge' && m.status === 'active');

  // Build Real Stations Data Driven from Active App State
  const stations: StationNode[] = useMemo(() => {
    return [
      // ==========================================
      // SHARED CORE (CENTRAL HUB)
      // ==========================================
      {
        id: 'founder-command',
        name: 'FOUNDER COMMAND SEAT',
        subtitle: 'Executive Attention, Allocation & Strategic Lever',
        type: 'Seat',
        wing: 'core',
        departmentId: 'founder',
        state: 'active',
        stateReason: 'Founder active in single-operator session. Allocating 14h ORACLE / 18h FORGE. Top leverage: Mission F1.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'NEXUS ORCHESTRATOR ready for strategic synthesis',
        automationStatus: '3 of 3 automated pipelines operating within $5.00 daily cap',
        activeMissionCount: sharedMissions.filter(m => m.status === 'active').length,
        highestPriorityMission: topForgeMission?.title || 'Deploy Outbound Briefing to 12 Weld County Energy Site Selectors',
        pendingReviewCount: 2,
        blockedItemCount: 1,
        dataFreshness: 'Live (Real-time)',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: 'Active session',
        nextScheduledEvent: 'Friday practice participation ingestion (16:30)',
        linkedProjects: ['Front Range Infrastructure Monitor', 'Week 5 NFL Probabilistic Forecast Slate'],
        linkedEvidence: ['CO PUC Docket 24A-0123E', 'NFL Practice Log Day 3', 'Larimer Acoustic Code'],
        currentKpi: { label: 'Compounding Index', value: `${founderCompoundingIndex}/100`, note: 'Disciplined compounding' },
        primaryRisk: 'Outreach velocity bottleneck delaying $750/mo commercial gate clearance.',
        requiredNextDecision: 'Personalize remaining 7 site selector executive briefs with transformer lead times.',
        auditTrail: ['Session authenticated as Research@aiphysicallayer.net', 'Allocated 32 founder hours for Week 5']
      },
      {
        id: 'core-pulse-queue',
        name: 'PULSE Research Queue',
        subtitle: 'Signal-to-Evidence Processing & Review Gate',
        type: 'Console',
        wing: 'core',
        departmentId: 'pulse',
        state: 'awaiting_review',
        stateReason: '1 candidate evidence item extracted from Colorado PUC docket awaiting human approval.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'PULSE Candidate Extraction Agent (Outputs quarantined pending review)',
        automationStatus: 'Client-zero-secret proxy active on server.ts',
        activeMissionCount: 1,
        highestPriorityMission: 'Verify acoustic buffer decibel threshold in Larimer County zoning brief',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '18 min ago',
        evidenceQuality: 'Pending Review',
        lastActivityTimestamp: '2026-10-05 12:45',
        nextScheduledEvent: 'Nightly regulatory crawl (Tonight 22:00)',
        linkedProjects: ['Front Range Infrastructure Constraint Monitor'],
        linkedEvidence: ['Larimer County Planning Docket 2026-B'],
        currentKpi: { label: 'Candidate Claims', value: '14 Claims', note: '13 approved, 1 in review' },
        primaryRisk: 'Unverified regulatory hearsay entering formal client deliverables.',
        requiredNextDecision: 'Review exact quote excerpt and assign confidence before ledger approval.',
        auditTrail: ['PULSE Run #PL-491 executed via server proxy', '1 candidate claim quarantined for review']
      },
      {
        id: 'core-governance',
        name: 'Governance Console',
        subtitle: 'Data Classification, Source Traceability & Airgap',
        type: 'Console',
        wing: 'core',
        departmentId: 'governance',
        state: 'complete',
        stateReason: 'Airgap boundary enforced. 1 restricted attempt intercepted & content discarded immediately.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Automated data classification auditor',
        automationStatus: 'Perimeter filtering active; zero restricted bytes in persistence layer',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero outstanding governance policy alerts',
        pendingReviewCount: 0,
        blockedItemCount: blockedAttempts.length,
        dataFreshness: 'Real-time',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 11:30',
        nextScheduledEvent: 'Continuous audit cycle',
        linkedProjects: ['All Divisions'],
        linkedEvidence: ['Audit Block Log #BLK-0091'],
        currentKpi: { label: 'Airgap Enforced', value: '100%', note: '0 restricted data stored' },
        primaryRisk: 'Accidental ingestion of restricted third-party or employer intellectual property.',
        requiredNextDecision: 'None required. All data classifications nominal.',
        auditTrail: ['Policy check passed', 'Blocked attempt #BLK-0091 logged without retaining content']
      },
      {
        id: 'core-automation',
        name: 'Automation Control',
        subtitle: 'Workflow Schedules, Health, Cost & Kill Switches',
        type: 'Console',
        wing: 'core',
        departmentId: 'automation',
        state: 'complete',
        stateReason: '3 approved automated crons operational. Daily spend $0.85 / $5.00 cap. Global kill switch armed.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Workflow spend and execution auditor',
        automationStatus: 'All workflows monitored with review gates',
        activeMissionCount: 0,
        highestPriorityMission: 'Maintain 100% cron health',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Hourly execution telemetry',
        evidenceQuality: 'Nominal',
        lastActivityTimestamp: '2026-10-05 12:55',
        nextScheduledEvent: 'PUC Docket Ingestion Cron (Tonight 23:00)',
        linkedProjects: ['ORACLE Modeling Feeds', 'FORGE Regulatory Ingestion'],
        linkedEvidence: ['Automation Job Registry #JOB-01..03'],
        currentKpi: { label: 'Active Crons', value: '3 / 3 Active', note: '0 failures this week' },
        primaryRisk: 'Unrestricted background research queries consuming excess tokens.',
        requiredNextDecision: 'Keep daily cap set at $5.00; kill switch armed.',
        auditTrail: ['Hourly cron health check nominal', 'Kill switch state: ARMED & READY']
      },
      {
        id: 'core-shared-assets',
        name: 'Shared Asset Vault',
        subtitle: 'Explicitly Approved Cross-Division Reusable IP',
        type: 'Vault',
        wing: 'core',
        departmentId: 'assets',
        state: 'complete',
        stateReason: '3 cross-division assets compounding (Regulatory Radar, Bayesian Ridge, Audit Schema).',
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
        linkedProjects: ['ORACLE Model Lab', 'FORGE Signal Radar'],
        linkedEvidence: ['Shared Asset Registry #AST-01..03'],
        currentKpi: { label: 'Hours Saved', value: '~48.5h', note: 'Across 7 project reuses' },
        primaryRisk: 'Cross-division pollution of isolated data models.',
        requiredNextDecision: 'Keep all reusable assets strictly methodological; zero data blending.',
        auditTrail: ['Asset #AST-01 reused in Front Range Monitor', 'Compounding score verified at 92/100']
      },
      {
        id: 'core-cadence',
        name: 'Founder Cadence',
        subtitle: 'Weekly Priorities, Deep-Work Blocks & Commitments',
        type: 'Room',
        wing: 'core',
        departmentId: 'cadence',
        state: 'active',
        stateReason: 'Week 5 priority commitments locked: 14h ORACLE analytics, 18h FORGE distribution.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Time allocation auditor',
        automationStatus: 'Cadence calendar sync nominal',
        activeMissionCount: 2,
        highestPriorityMission: 'Execute Mission F1 before Friday',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current Week 5',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: '2026-10-05 09:00',
        nextScheduledEvent: 'Sunday weekly postmortem & cadence review (20:00)',
        linkedProjects: ['Mission F1', 'Mission O1'],
        linkedEvidence: ['Weekly Founder Cadence Schedule'],
        currentKpi: { label: 'Committed Time', value: '32h / wk', note: '14h ORACLE · 18h FORGE' },
        primaryRisk: 'Context switching between NFL statistical math and enterprise buyer sales.',
        requiredNextDecision: 'Dedicate morning deep-work blocks exclusively to Mission F1 outbound.',
        auditTrail: ['Cadence locked for Week 5', 'Founder hours allocated: 14h ORACLE / 18h FORGE']
      },
      {
        id: 'core-advisor',
        name: 'NEXUS ADVISOR // Executive Review Chamber',
        subtitle: 'Weekly reports, red-team analysis, bottleneck diagnosis, and founder decisions.',
        type: 'Chamber',
        wing: 'core',
        departmentId: 'advisor',
        state: 'awaiting_founder_review',
        stateReason: 'Week 5 Executive Review drafted: ORACLE readiness conditionally ready, FORGE commercial gate active ($350 MRR), 2 founder decisions pending.',
        owner: 'Founder / Administrator',
        aiAssistantRole: 'Private Chief of Staff, Red-Team Reviewer & Evidence Quality Auditor',
        automationStatus: 'Scheduled Sunday 18:00 cutoff review compiler',
        activeMissionCount: 1,
        highestPriorityMission: 'Complete Monday 12:00 founder review sign-off and decision log lock',
        pendingReviewCount: 2,
        blockedItemCount: 1,
        dataFreshness: 'Sunday 18:00 cutoff (Current)',
        evidenceQuality: 'High Rigor',
        lastActivityTimestamp: 'Current session',
        nextScheduledEvent: 'Founder Review Target: Monday 12:00',
        linkedProjects: ['Week 5 Executive Report Package', 'ORACLE Forecast Review', 'FORGE Venture Review', 'Founder Allocation Memo'],
        linkedEvidence: ['Model Registry #MOD-001', 'Revenue Ledger #TX-01..02', 'Buyer Interview #INT-01'],
        currentKpi: { label: 'Data Completeness', value: '92.5%', note: '2 partial flags' },
        primaryRisk: 'Acting on unverified inferences or premature feature building before $750/mo revenue gate.',
        requiredNextDecision: 'Review 3 connected weekly reports and lock founder decision log in Workspace.',
        auditTrail: ['Review draft compiled from real application records', 'Quarantined candidate model v3.0']
      },

      // ==========================================
      // ORACLE WING (NFL INTELLIGENCE DIVISION)
      // ==========================================
      {
        id: 'oracle-data-ops',
        name: 'DATA OPERATIONS BAY',
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
        dataFreshness: '14 min ago (98%)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 13:00',
        nextScheduledEvent: 'Friday practice participation sync (16:30)',
        linkedProjects: ['NFL Week 5 Master Data Slate'],
        linkedEvidence: ['SportsDataIO Feed', 'NFL Operations Injury Sheet'],
        currentKpi: { label: 'Lineage Score', value: '100%', note: '0 unverified social rumor inputs' },
        primaryRisk: 'Late-breaking active/inactive announcements on Sunday morning.',
        requiredNextDecision: 'Verify feed timestamps prior to final Sunday model lock.',
        auditTrail: ['Ingestion batch #W5-04 completed', 'Zero missing dockets detected']
      },
      {
        id: 'oracle-model-lab',
        name: 'MODEL LAB',
        subtitle: 'Model Versioning, EPA Weights & Rollback Controls',
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
        linkedProjects: ['Model v2.4.1 (Active)', 'Model v3.0-RC1 (Candidate)'],
        linkedEvidence: ['Git Commit 8f2c19a', 'Calibration Test Suite Run #41'],
        currentKpi: { label: 'Active Baseline', value: 'v2.4.1', note: 'Brier 0.188' },
        primaryRisk: 'Overfitting candidate models to small sample sizes in early weeks.',
        requiredNextDecision: 'Require 200+ historical game backtest before promoting Candidate v3.0.',
        auditTrail: ['Baseline v2.4.1 frozen', 'Candidate v3.0 backtest logged']
      },
      {
        id: 'oracle-game-intel',
        name: 'GAME INTELLIGENCE DESK',
        subtitle: 'Game Dossiers, Scenario Distributions & Matchups',
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
        linkedProjects: ['Week 5 Matchup Dossiers (2 Complete, 1 Pending Review)'],
        linkedEvidence: ['Chiefs vs Bills Game Dossier #KC-BUF-W5'],
        currentKpi: { label: 'Model Win Prob', value: '58.2% KC', note: 'Spread: KC -3.5' },
        primaryRisk: 'Uncalibrated coach press conference statements distorting actual game script.',
        requiredNextDecision: 'Lock probability distribution once Friday practice status is posted.',
        auditTrail: ['Dossier #KC-BUF-W5 generated', 'Flagged center injury uncertainty factor']
      },
      {
        id: 'oracle-player-intel',
        name: 'PLAYER INTELLIGENCE DESK',
        subtitle: 'Player Context, Usage, Snap Share & Injury Drop-off',
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
        linkedProjects: ['Week 5 Offensive Line Impact Matrix'],
        linkedEvidence: ['Chiefs Injury Release', '49ers Pool Transcript'],
        currentKpi: { label: 'Tracked Impact Players', value: '5 Verified', note: '2 Questionable' },
        primaryRisk: 'Uncertainty drop-off in backup offensive linemen pass protection efficiency.',
        requiredNextDecision: 'Update EPA penalty factor if starting center is downgraded to Doubtful.',
        auditTrail: ['Player record #P-02 updated to Questionable', 'Mahomes practice verified FP']
      },
      {
        id: 'oracle-parlays',
        name: 'PARLAY ARCHITECTURE BAY',
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
        linkedProjects: ['Correlation Research Card #PAR-W5-01'],
        linkedEvidence: ['Joint Distribution Matrix v2.4'],
        currentKpi: { label: 'Model Joint Prob', value: '29.8%', note: 'Market Implied: 24.5%' },
        primaryRisk: 'Correlation error under extreme weather or game-script blowouts.',
        requiredNextDecision: 'Ensure permanent honesty disclaimer is visible across all scenario displays.',
        auditTrail: ['Correlation scenario #PAR-W5-01 verified', 'Honesty protocol badge enforced']
      },
      {
        id: 'oracle-market-bench',
        name: 'MARKET BENCHMARK CONSOLE',
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
        linkedProjects: ['Week 5 Market Divergence Ledger'],
        linkedEvidence: ['Pinnacle/Circa Consensus Feeds'],
        currentKpi: { label: 'Model Divergence', value: '+1.0 pt', note: 'KC Spread edge' },
        primaryRisk: 'Treating market differences as proof of mispricing rather than model error.',
        requiredNextDecision: 'Document benchmark comparison without altering model forecast.',
        auditTrail: ['Market snapshot #MS-W5-02 recorded', 'Divergence logged at 1.0 point']
      },
      {
        id: 'oracle-backtest',
        name: 'BACKTEST & CALIBRATION LAB',
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
        linkedProjects: ['2026 Rolling Backtest Suite'],
        linkedEvidence: ['Weeks 1-4 Game Outcome Dataset'],
        currentKpi: { label: 'Brier Score', value: '0.188', note: 'Target: <0.200' },
        primaryRisk: 'Silent calibration drift in low-probability total predictions.',
        requiredNextDecision: 'Confirm probability bucket monotonicity after Week 5 results.',
        auditTrail: ['4-week calibration run completed', 'Reliability curve plotted']
      },
      {
        id: 'oracle-change-control',
        name: 'CHANGE CONTROL CONSOLE',
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
        linkedProjects: ['PR-2026-04 Change Proposal'],
        linkedEvidence: ['Model Baseline Audit #MOD-001'],
        currentKpi: { label: 'Logged Changes', value: '2 Records', note: '1 active, 1 candidate' },
        primaryRisk: 'Unregistered parameter tweaks destroying historical model evaluation validity.',
        requiredNextDecision: 'Do not activate Model v3.0 until Week 5 backtest proves reliability improvement.',
        auditTrail: ['PR-2026-04 submitted by analyst', 'Awaiting founder activation sign-off']
      },
      {
        id: 'oracle-weekly-review',
        name: 'WEEKLY REVIEW ROOM',
        subtitle: 'Post-Week Accountability & Forecast vs Outcome',
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
        linkedProjects: ['Week 4 Postmortem Report'],
        linkedEvidence: ['W4 Forecast vs Actual Scorecard'],
        currentKpi: { label: 'Review Completion', value: '100%', note: '4 of 4 weeks analyzed' },
        primaryRisk: 'Hindsight bias when explaining unexpected game variance.',
        requiredNextDecision: 'Ensure weather assumptions are logged BEFORE Sunday kickoffs.',
        auditTrail: ['Week 4 postmortem signed off', 'Elevation pace parameter adjusted']
      },
      {
        id: 'oracle-research-desk',
        name: 'ORACLE RESEARCH DESK',
        subtitle: 'Source-Backed Research, Data Gaps & Conflicts',
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
        linkedProjects: ['ORACLE Research Archive'],
        linkedEvidence: ['Weather API Archive', 'EPA Metric Repository'],
        currentKpi: { label: 'Open Gaps', value: '0 Gaps', note: 'All inputs sourced' },
        primaryRisk: 'Unverified speculation from fantasy or media commentators.',
        requiredNextDecision: 'Reject any input lacking direct primary team or league citation.',
        auditTrail: ['Morning inquiry completed', 'Zero gaps outstanding']
      },
      {
        id: 'oracle-archive',
        name: 'ORACLE ARCHIVE',
        subtitle: 'Historic Forecasts, Model Versions & Postmortems',
        type: 'Vault',
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
        linkedProjects: ['2026 NFL Historic Vault'],
        linkedEvidence: ['Historic Commit 6e1a49f'],
        currentKpi: { label: 'Archived Dossiers', value: '32 Games', note: '100% frozen' },
        primaryRisk: 'Retroactive alteration of historic forecasts or probability outputs.',
        requiredNextDecision: 'Enforce read-only state on all prior weeks.',
        auditTrail: ['Commit 6e1a49f verified', 'Archive integrity verified']
      },

      // ==========================================
      // FORGE WING (VENTURE DEPLOYMENT DIVISION)
      // ==========================================
      {
        id: 'forge-signals',
        name: 'SIGNAL RADAR',
        subtitle: 'Market Signals, Buyer Pain & Bottlenecks',
        type: 'Console',
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
        linkedProjects: ['Front Range Infrastructure Constraint Monitor'],
        linkedEvidence: ['CO PUC Docket 24A-0123E', 'Larimer Acoustic Ordinance'],
        currentKpi: { label: 'Triaged Signals', value: `${forgeSignals.length} Signals`, note: '100% cited' },
        primaryRisk: 'Chasing generic AI trend chatter instead of physical infrastructure constraints.',
        requiredNextDecision: 'Focus exclusively on grid interconnection queues and municipal cooling restrictions.',
        auditTrail: ['Docket 24A-0123E signal approved', 'Added to Front Range Monitor']
      },
      {
        id: 'forge-buyer-research',
        name: 'MARKET & BUYER RESEARCH BAY',
        subtitle: 'Verify ICP, Job to be Done & Purchase Triggers',
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
        linkedProjects: ['Front Range Infrastructure Monitor'],
        linkedEvidence: ['Interview Transcript #INT-01', 'Direct Buyer Quotes Sheet'],
        currentKpi: { label: 'Pain Intensity', value: '9 / 10', note: 'Willingness to pay verified' },
        primaryRisk: 'Accepting polite verbal interest as validation instead of paid proof.',
        requiredNextDecision: 'Present paid pilot proposal during next discovery conversation.',
        auditTrail: ['Interview #INT-01 completed', 'Verified willingness to pay $350/mo']
      },
      {
        id: 'forge-opportunity-lab',
        name: 'OPPORTUNITY LAB',
        subtitle: 'Score, Test, Stage Controls & Kill Criteria',
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
        linkedProjects: ['Front Range Infrastructure Monitor (Score 86)'],
        linkedEvidence: ['Opportunity Scorecard #OPP-001'],
        currentKpi: { label: 'Readiness Score', value: '86 / 100', note: 'Threshold: >75' },
        primaryRisk: 'Spending founder time on opportunities that cannot produce $750/mo recurring revenue.',
        requiredNextDecision: 'Kill project if 4 total paying subscriptions are not secured by Oct 25.',
        auditTrail: ['Scorecard evaluated at 86/100', 'Stage: Paid Pilot approved']
      },
      {
        id: 'forge-offer-pricing',
        name: 'OFFER & PRICING STUDIO',
        subtitle: 'Paid Outcome Packaging, Positioning & Price Testing',
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
        linkedProjects: ['Offer #OFR-01 ($350/mo)', 'Offer #OFR-02 ($1,200 Dossier)'],
        linkedEvidence: ['Offer Agreement Template', 'Customer Agreement #CUS-01'],
        currentKpi: { label: 'Validated Price', value: '$350 / mo', note: '2 settled customers' },
        primaryRisk: 'Discounting pricing before testing value at full hypothesis rate.',
        requiredNextDecision: 'Do not offer discounts to new inbound leads.',
        auditTrail: ['Offer #OFR-01 published', 'Payment terms verified']
      },
      {
        id: 'forge-product-forge',
        name: 'PRODUCT FORGE',
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
        linkedProjects: ['Front Range Monthly Intelligence Portal (v1.0 Frozen)'],
        linkedEvidence: ['Commercial Gate Rule #CGR-01 ($750/mo threshold)'],
        currentKpi: { label: 'Gate Status', value: 'BLOCKED', note: 'MRR: $350 / $750' },
        primaryRisk: 'Premature software productization before verified recurring commercial demand.',
        requiredNextDecision: 'DO NOT build new software features until 2 more subscribers sign.',
        auditTrail: ['Gate #CGR-01 engaged: code freeze', 'Focus shifted to Distribution']
      },
      {
        id: 'forge-launch-deploy',
        name: 'LAUNCH & DEPLOYMENT BAY',
        subtitle: 'Landing Pages, Checkout, Access & Support',
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
        linkedProjects: ['Front Range Public Briefing URL'],
        linkedEvidence: ['Stripe Checkout Config', 'DNS Records'],
        currentKpi: { label: 'Uptime', value: '100%', note: '0 customer access tickets' },
        primaryRisk: 'Broken checkout links during active outbound distribution campaigns.',
        requiredNextDecision: 'Conduct live test checkout prior to each outbound wave.',
        auditTrail: ['Live build verified', 'Customer access link tested']
      },
      {
        id: 'forge-distribution',
        name: 'DISTRIBUTION ENGINE',
        subtitle: 'Measured Outbound, SEO, Referrals & Memos',
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
        linkedProjects: ['Weld County Substation Outbound Campaign (F1)'],
        linkedEvidence: ['Campaign Record #CMP-01', '12 Verified Decision-Maker Contacts'],
        currentKpi: { label: 'Campaign Pace', value: '5 of 12 Sent', note: '2 replies, 1 scheduled' },
        primaryRisk: 'Low reply rates if memos lack hyper-specific substation queue data.',
        requiredNextDecision: 'Personalize remaining 7 briefs with exact transformer lead-time data.',
        auditTrail: ['Campaign #CMP-01 launched', '5 briefs delivered to site selectors']
      },
      {
        id: 'forge-revenue-ops',
        name: 'REVENUE OPERATIONS DESK',
        subtitle: 'Actual MRR, Cash Collected, Margin & Churn',
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
        linkedProjects: ['Settled Transactions #TX-01 & #TX-02'],
        linkedEvidence: ['Stripe Settled Transaction Audit Log'],
        currentKpi: { label: 'Actual MRR', value: '$350.00', note: 'Goal: $750.00/mo' },
        primaryRisk: 'Treating uncollected pipeline forecasts as actual business revenue.',
        requiredNextDecision: 'Maintain strict separation: pipeline revenue never recorded in settled ledger.',
        auditTrail: ['Transaction #TX-02 settled: $350.00', 'MRR recalculated to $350.00']
      },
      {
        id: 'forge-asset-vault',
        name: 'ASSET VAULT',
        subtitle: 'Reusable Research, Code, Templates & Data',
        type: 'Vault',
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
        linkedProjects: ['Shared Asset Registry'],
        linkedEvidence: ['Asset #AST-01 (Regulatory Radar)', 'Asset #AST-03 (Scoring Model)'],
        currentKpi: { label: 'Asset Reuse Score', value: '92 / 100', note: '4 reuses in 2026' },
        primaryRisk: 'Building one-off custom deliverable formats that cannot be reused for new buyers.',
        requiredNextDecision: 'Format all future utility briefs using the reusable Markdown template.',
        auditTrail: ['Asset #AST-01 verified', 'Hours saved incremented by 12h']
      },
      {
        id: 'forge-automations',
        name: 'AUTOMATION FACTORY',
        subtitle: 'Validated Workflows, Budget Controls & Logging',
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
        linkedProjects: ['PUC Docket Crawler', 'Weather Normalizer', 'Lineage Checker'],
        linkedEvidence: ['Automation Job Registry #JOB-01..03'],
        currentKpi: { label: 'Workflow Uptime', value: '100%', note: '0 failures this week' },
        primaryRisk: 'Automating unvalidated workflows before manual human mastery is achieved.',
        requiredNextDecision: 'Keep all new automations in test mode until 5 successful manual runs.',
        auditTrail: ['Hourly health check passed', '0 errors recorded']
      },
      {
        id: 'forge-portfolio-review',
        name: 'PORTFOLIO REVIEW ROOM',
        subtitle: 'Allocate Founder Time & Capital // Scale, Pause, Kill',
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
        linkedProjects: ['Front Range Infrastructure Monitor'],
        linkedEvidence: ['Portfolio Decision Record #PDR-01'],
        currentKpi: { label: 'Action Recommendation', value: 'VALIDATE', note: 'Next gate: Oct 25' },
        primaryRisk: 'Sunk cost fallacy delaying the kill decision on a slow-moving opportunity.',
        requiredNextDecision: 'Confirm kill criterion: If <4 customers by Oct 25, decommission and archive.',
        auditTrail: ['Portfolio review memo #PDR-01 filed', 'Awaiting Oct 25 milestone']
      },
      {
        id: 'forge-archive',
        name: 'FORGE ARCHIVE',
        subtitle: 'Preserved Research, Failed Hypotheses & Postmortems',
        type: 'Vault',
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
        linkedProjects: ['Killed Project Postmortem #KIL-001'],
        linkedEvidence: ['Postmortem Decision Memo'],
        currentKpi: { label: 'Archived Theses', value: '1 Killed', note: 'Preserved $1,500 capital' },
        primaryRisk: 'Re-testing dead hypotheses without reviewing previous kill postmortems.',
        requiredNextDecision: 'Reference #KIL-001 before considering any pure land-flipping ideas.',
        auditTrail: ['Hypothesis #KIL-001 moved to archive', 'Postmortem verified']
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
      if (activeFilter === 'all') return true;
      if (activeFilter === 'oracle') return station.wing === 'oracle';
      if (activeFilter === 'forge') return station.wing === 'forge';
      if (activeFilter === 'core') return station.wing === 'core';
      if (activeFilter === 'active') return station.state === 'active';
      if (activeFilter === 'awaiting_review') return station.state === 'awaiting_review';
      if (activeFilter === 'blocked') return station.state === 'blocked';
      if (activeFilter === 'scheduled') return station.state === 'scheduled';
      if (activeFilter === 'complete') return station.state === 'complete';
      if (activeFilter === 'stale') return station.state === 'stale';
      if (activeFilter === 'bottlenecks') return station.state === 'blocked' || station.state === 'awaiting_review';
      if (activeFilter === 'automations') return station.id.includes('automation') || station.id.includes('data-ops') || station.id.includes('signals');
      return true;
    });
  }, [stations, activeFilter]);

  // Live Counts for Status Indicators
  const counts = useMemo(() => {
    return {
      active: stations.filter(s => s.state === 'active').length,
      awaiting_review: stations.filter(s => s.state === 'awaiting_review').length,
      blocked: stations.filter(s => s.state === 'blocked').length,
      complete: stations.filter(s => s.state === 'complete').length,
      idle: stations.filter(s => s.state === 'idle').length,
      scheduled: stations.filter(s => s.state === 'scheduled').length,
      stale: stations.filter(s => s.state === 'stale').length,
      total: stations.length
    };
  }, [stations]);

  // Visual state color mappings
  const getStateStyle = (state: StationState) => {
    switch (state) {
      case 'active':
        return {
          pill: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/70',
          dot: 'bg-cyan-400',
          pulse: 'animate-pulse',
          border: 'border-cyan-500/40 hover:border-cyan-400',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)]',
          label: 'Active Operation'
        };
      case 'awaiting_review':
        return {
          pill: 'bg-amber-950/80 text-amber-300 border-amber-500/70',
          dot: 'bg-amber-400',
          pulse: 'animate-pulse',
          border: 'border-amber-500/40 hover:border-amber-400',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          label: 'Awaiting Review'
        };
      case 'blocked':
        return {
          pill: 'bg-rose-950/80 text-rose-300 border-rose-500/70',
          dot: 'bg-rose-400',
          pulse: 'animate-pulse',
          border: 'border-rose-500/50 hover:border-rose-400',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
          label: 'Blocked / Gate Enforced'
        };
      case 'scheduled':
        return {
          pill: 'bg-violet-950/80 text-violet-300 border-violet-500/70',
          dot: 'bg-violet-400',
          pulse: '',
          border: 'border-violet-500/40 hover:border-violet-400',
          glow: 'shadow-[0_0_10px_rgba(139,92,246,0.2)]',
          label: 'Scheduled Execution'
        };
      case 'complete':
        return {
          pill: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/70',
          dot: 'bg-emerald-400',
          pulse: '',
          border: 'border-emerald-500/40 hover:border-emerald-400',
          glow: 'shadow-[0_0_10px_rgba(16,185,129,0.2)]',
          label: 'Complete & Verified'
        };
      case 'report_due':
        return {
          pill: 'bg-amber-950/80 text-amber-300 border-amber-500/70',
          dot: 'bg-amber-400',
          pulse: 'animate-pulse',
          border: 'border-amber-500/40 hover:border-amber-400',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          label: 'Report Due'
        };
      case 'preparing':
        return {
          pill: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/70',
          dot: 'bg-cyan-400',
          pulse: 'animate-pulse',
          border: 'border-cyan-500/40 hover:border-cyan-400',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.25)]',
          label: 'Preparing Review'
        };
      case 'awaiting_founder_review':
        return {
          pill: 'bg-amber-950/80 text-amber-300 border-amber-500/70',
          dot: 'bg-amber-400',
          pulse: 'animate-pulse',
          border: 'border-amber-500/40 hover:border-amber-400',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
          label: 'Awaiting Founder Review'
        };
      case 'blocked_by_missing_data':
        return {
          pill: 'bg-rose-950/80 text-rose-300 border-rose-500/70',
          dot: 'bg-rose-400',
          pulse: 'animate-pulse',
          border: 'border-rose-500/50 hover:border-rose-400',
          glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
          label: 'Blocked by Missing Data'
        };
      case 'stale':
        return {
          pill: 'bg-orange-950/80 text-orange-300 border-orange-500/70',
          dot: 'bg-orange-400',
          pulse: '',
          border: 'border-orange-500/40',
          glow: '',
          label: 'Stale Data Warning'
        };
      case 'disabled':
        return {
          pill: 'bg-slate-900 text-slate-500 border-slate-700',
          dot: 'bg-slate-600',
          pulse: '',
          border: 'border-slate-800 opacity-50',
          glow: '',
          label: 'Disabled'
        };
      case 'idle':
      default:
        return {
          pill: 'bg-slate-900/80 text-slate-400 border-slate-800',
          dot: 'bg-slate-600',
          pulse: '',
          border: 'border-slate-800/80 hover:border-slate-700',
          glow: '',
          label: 'Standby / Idle'
        };
    }
  };

  // Direct action: Navigate directly into department page
  const handleOpenDepartment = (station: StationNode) => {
    if (station.wing === 'oracle' && station.departmentId && station.departmentId !== 'founder') {
      setActiveDivision('oracle');
      setActiveOracleDepartment(station.departmentId as OracleDepartment);
    } else if (station.wing === 'forge' && station.departmentId && station.departmentId !== 'founder') {
      setActiveDivision('forge');
      setActiveForgeDepartment(station.departmentId as ForgeDepartment);
    } else if (station.wing === 'core') {
      setActiveDivision('nexus');
      if (station.id === 'core-advisor') setActiveNexusSection('advisor');
      else if (station.id === 'core-missions' || station.id === 'core-cadence') setActiveNexusSection('shared-missions');
      else if (station.id === 'core-shared-assets') setActiveNexusSection('asset-vault');
      else if (station.id === 'core-governance') setActiveNexusSection('governance');
      else if (station.id === 'core-automation') setActiveNexusSection('automation-control');
      else setActiveNexusSection('command-center');
    }
  };

  return (
    <div className="space-y-6 pb-16 font-mono text-xs select-none">
      {/* 1. Header Telemetry & System State */}
      <div className="bg-[#080c16] border border-slate-800 p-6 rounded-2xl space-y-4 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                NEXUS FLOOR // LIVE OPERATING MAP
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-400">
                Central Interactive Operating Plan · Single-Operator Mode
              </span>
            </div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight">
              Real-Time Visual Operations Floor
            </h1>
            <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
              Live status derived from actual statistical models, buyer research, and commercial review gates. Zero simulated activity or fictional employees. Click any station to inspect its operational dossier or navigate directly into its workflow.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active Stations</span>
              <span className="text-base font-bold text-cyan-400 tabular-nums">{counts.active} Active</span>
              <span className="text-[9px] text-slate-400 block font-sans">Real work executing</span>
            </div>
            <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Awaiting Review</span>
              <span className="text-base font-bold text-amber-400 tabular-nums">{counts.awaiting_review} Review</span>
              <span className="text-[9px] text-amber-400/80 block font-sans">Founder sign-off needed</span>
            </div>
            <div className="p-3 rounded-xl bg-[#04060a] border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Blocked Gates</span>
              <span className="text-base font-bold text-rose-400 tabular-nums">{counts.blocked} Blocked</span>
              <span className="text-[9px] text-rose-400/80 block font-sans">Commercial gate ($750)</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Filter & Legend Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-800/80 text-[11px]">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 uppercase text-[10px] mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Filter Floor:</span>
            </span>
            {[
              { id: 'all', label: `All Stations (${stations.length})` },
              { id: 'core', label: 'Shared Core (6)' },
              { id: 'oracle', label: 'ORACLE Wing (11)' },
              { id: 'forge', label: 'FORGE Wing (12)' },
              { id: 'bottlenecks', label: `Bottlenecks (${counts.blocked + counts.awaiting_review})` },
              { id: 'active', label: `Active (${counts.active})` },
              { id: 'complete', label: `Complete (${counts.complete})` }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeFilter === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <Info className="w-3 h-3" />
              <span>{showLegend ? 'Hide State Legend' : 'View State Legend'}</span>
            </button>

            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="px-2.5 py-1 rounded bg-[#0b101d] hover:bg-[#10182b] text-cyan-300 border border-cyan-500/40 text-[11px] flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            >
              <Search className="w-3 h-3 text-cyan-400" />
              <span>Command Palette</span>
              <kbd className="text-[9px] px-1 py-0.2 bg-slate-800 rounded text-slate-400">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* Expandable Visual State Legend */}
        {showLegend && (
          <div className="p-4 rounded-xl bg-[#05070c] border border-slate-800 text-[11px] font-mono grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300"><strong>Active:</strong> Founder working or approved AI/cron running</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-slate-300"><strong>Awaiting Review:</strong> Needs founder sign-off</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-slate-300"><strong>Blocked:</strong> Missing dependency or commercial gate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300"><strong>Complete:</strong> Verified human-approved outcome</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span className="text-slate-300"><strong>Scheduled:</strong> Approved future job queued</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span className="text-slate-300"><strong>Stale:</strong> Data exceeds freshness threshold</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="text-slate-400"><strong>Idle:</strong> Standby, no active workflow</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="text-slate-500"><strong>Disabled:</strong> Paused by founder</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Main Floorplan Canvas & Intelligence Drawer (2-Column Desktop Grid) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left / Center Floor Canvas (8 Columns) */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-[#070a12] border border-slate-800/90 rounded-2xl p-5 lg:p-7 space-y-8 relative overflow-hidden shadow-2xl">
            {/* Blueprint Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1322_1px,transparent_1px),linear-gradient(to_bottom,#0c1322_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-35 pointer-events-none" />

            {/* ==================================================== */}
            {/* ZONE 1: SHARED OPERATIONAL CORE (CENTER EPICENTER)  */}
            {/* ==================================================== */}
            {(activeFilter === 'all' || activeFilter === 'core' || activeFilter === 'active' || activeFilter === 'bottlenecks') && (
              <div className="relative z-10 space-y-4 pb-8 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                      SHARED OPERATIONAL CORE // FOUNDER COMMAND EPICENTER
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Airgapped Boundary · Zero Data Blending
                  </span>
                </div>

                {/* Central Founder Command Seat (Large Visual Anchor) */}
                <div 
                  onClick={() => setSelectedStationId('founder-command')}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                    selectedStationId === 'founder-command'
                      ? 'bg-[#0f172a] border-cyan-400 shadow-xl shadow-cyan-950/60 ring-2 ring-cyan-500/40'
                      : 'bg-[#090f1d] border-cyan-500/40 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50 uppercase tracking-widest">
                          CENTRAL OPERATING NODE
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Founder / Admin Active
                        </span>
                      </div>
                      <h2 className="text-lg font-black text-white font-display tracking-tight">
                        FOUNDER COMMAND SEAT
                      </h2>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-xl">
                        Executive attention allocation, cross-division governance, and primary decision authority. No automated decision executes without human sign-off.
                      </p>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Next Highest Leverage:</span>
                      <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold">
                        Mission F1 Outbound
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Pills inside Founder Seat */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px]">
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase">Current Focus</span>
                      <span className="text-white font-bold">FORGE (18h) · ORACLE (14h)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase">Pending Approvals</span>
                      <span className="text-amber-400 font-bold tabular-nums">2 Awaiting Sign-off</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase">Blocked Workflows</span>
                      <span className="text-rose-400 font-bold tabular-nums">1 (Product Forge Gate)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block uppercase">Today / Month API</span>
                      <span className="text-emerald-400 font-bold tabular-nums">$0.85 / $10.70</span>
                    </div>
                  </div>
                </div>

                {/* 6 Connected Core Stations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2.5 pt-1">
                  {stations
                    .filter(s => s.wing === 'core' && s.id !== 'founder-command')
                    .map((station) => {
                      const style = getStateStyle(station.state);
                      const isSelected = selectedStationId === station.id;

                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0f172a] border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                              : 'bg-[#080d17] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] uppercase font-bold text-slate-500">
                                {station.type}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${style.dot} ${style.pulse}`} />
                            </div>
                            <h4 className="text-xs font-bold text-white font-display truncate">
                              {station.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-sans line-clamp-1">
                              {station.subtitle}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-850 flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 truncate">
                              {station.currentKpi.value}
                            </span>
                            <span className="text-cyan-400 flex items-center">
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* ZONE 2: ORACLE WING (NFL INTELLIGENCE DIVISION)     */}
            {/* ==================================================== */}
            {(activeFilter === 'all' || activeFilter === 'oracle' || activeFilter === 'active' || activeFilter === 'bottlenecks') && (
              <div className="relative z-10 space-y-4 pb-8 border-b border-slate-800">
                {/* Wing Header & Summary Panel */}
                <div className="p-4 rounded-xl bg-[#090e1a] border border-cyan-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                            01 // ORACLE WING
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase">
                            NFL INTELLIGENCE DIVISION
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white font-display">
                          “Forecast with rigor.”
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-bold border border-cyan-800/60">
                        Integrity Index: {oracleIntegrityScore}/100
                      </span>
                      <button
                        onClick={() => {
                          setActiveDivision('oracle');
                          setActiveOracleDepartment('command');
                        }}
                        className="px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold transition-all flex items-center gap-1"
                      >
                        <span>Enter ORACLE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Summary Panel with all 9 Live Indicators */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 pt-2 border-t border-slate-800 text-[10px]">
                    <div>
                      <span className="text-slate-500 block uppercase">Slate</span>
                      <span className="text-white font-bold">Week 5</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Freshness</span>
                      <span className="text-emerald-400 font-bold">98% Live</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Active Model</span>
                      <span className="text-white font-bold">v2.4.1 EPA</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Review Queue</span>
                      <span className="text-amber-400 font-bold">1 Forecast</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Brier Score</span>
                      <span className="text-emerald-400 font-bold">0.188 (Good)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Source Audit</span>
                      <span className="text-cyan-300 font-bold">1 Pending</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Model Changes</span>
                      <span className="text-amber-300 font-bold">1 Candidate</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 block uppercase">Next Objective</span>
                      <span className="text-slate-300 font-sans truncate block">Chiefs center practice</span>
                    </div>
                  </div>
                </div>

                {/* Connected Flow Line Notice */}
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Directional Flow: Data Ops → Model Lab → Game Intel → Player Intel → Parlays → Benchmarks → Calibration → Change Control → Review → Archive</span>
                </div>

                {/* 11 ORACLE Stations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stations
                    .filter(s => s.wing === 'oracle')
                    .map((station) => {
                      const style = getStateStyle(station.state);
                      const isSelected = selectedStationId === station.id;

                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#0f172a] border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                              : 'bg-[#080d18] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <span className="text-[10px] uppercase font-bold text-cyan-400/80">
                                {station.type} · {station.departmentId}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${style.pill}`}>
                                {style.label}
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
                            <span className="text-slate-500 truncate max-w-[160px]">
                              {station.currentKpi.label}: <strong className="text-white">{station.currentKpi.value}</strong>
                            </span>
                            <span className="text-cyan-400 flex items-center gap-0.5 hover:underline">
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

            {/* ==================================================== */}
            {/* ZONE 3: FORGE WING (VENTURE DEPLOYMENT DIVISION)    */}
            {/* ==================================================== */}
            {(activeFilter === 'all' || activeFilter === 'forge' || activeFilter === 'active' || activeFilter === 'bottlenecks') && (
              <div className="relative z-10 space-y-4">
                {/* Wing Header & Summary Panel */}
                <div className="p-4 rounded-xl bg-[#120d1f] border border-violet-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-violet-950 text-violet-400 border border-violet-800/60">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                            02 // FORGE WING
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase">
                            VENTURE DEPLOYMENT DIVISION
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white font-display">
                          “Find signal. Validate demand. Deploy revenue systems.”
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 text-[10px] font-bold border border-violet-800/60">
                        Compounding Index: {founderCompoundingIndex}/100
                      </span>
                      <button
                        onClick={() => {
                          setActiveDivision('forge');
                          setActiveForgeDepartment('command');
                        }}
                        className="px-3 py-1 rounded bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/40 text-[11px] font-bold transition-all flex items-center gap-1"
                      >
                        <span>Enter FORGE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Summary Panel with 10 Live Indicators (Revenue Truth Strictly Enforced) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-slate-800 text-[10px]">
                    <div>
                      <span className="text-slate-500 block uppercase">Active Ventures</span>
                      <span className="text-white font-bold truncate block">Front Range Mon.</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Validation Stage</span>
                      <span className="text-violet-400 font-bold">Paid Pilot (2)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Actual MRR</span>
                      <span className="text-emerald-400 font-bold tabular-nums">${currentForgeMRR}/mo</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Settled Cash</span>
                      <span className="text-emerald-400 font-bold tabular-nums">$700.00</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Pipeline (Unpaid)</span>
                      <span className="text-slate-400 font-bold tabular-nums">$4,200.00</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase">Target Gate</span>
                      <span className="text-amber-300 font-bold tabular-nums">${forgeRevenueThreshold}/mo</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 block uppercase">Bottleneck</span>
                      <span className="text-rose-400 font-bold truncate block">Code frozen until $750/mo</span>
                    </div>
                  </div>
                </div>

                {/* Connected Flywheel Flow Notice */}
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span>Flywheel Flow: Signal Radar → Buyer Research → Opportunity Lab → Offer &amp; Pricing → Product Forge → Launch &amp; Deploy → Distribution → Revenue Ops → Portfolio Review → Archive</span>
                </div>

                {/* 12 FORGE Stations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stations
                    .filter(s => s.wing === 'forge')
                    .map((station) => {
                      const style = getStateStyle(station.state);
                      const isSelected = selectedStationId === station.id;
                      const isBlocked = station.state === 'blocked';

                      return (
                        <div
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#181126] border-violet-400 shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/40'
                              : isBlocked
                              ? 'bg-rose-950/20 border-rose-500/50 hover:border-rose-400'
                              : 'bg-[#0c0915] border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <span className="text-[10px] uppercase font-bold text-violet-400/80">
                                {station.type} · {station.departmentId}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${style.pill}`}>
                                {style.label}
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
                            <span className="text-slate-500 truncate max-w-[160px]">
                              {station.currentKpi.label}: <strong className="text-white">{station.currentKpi.value}</strong>
                            </span>
                            <span className="text-violet-400 flex items-center gap-0.5 hover:underline">
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

        {/* Right Intelligence Drawer (4 Columns) */}
        <div className="xl:col-span-4 bg-[#080c16] border border-slate-800 rounded-2xl p-5 space-y-5 sticky top-20 shadow-2xl">
          {/* Drawer Header */}
          <div className="pb-3 border-b border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                STATION INTELLIGENCE DOSSIER
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getStateStyle(selectedStation.state).pill}`}>
                {getStateStyle(selectedStation.state).label}
              </span>
            </div>
            <h2 className="text-base font-bold text-white font-display">
              {selectedStation.name}
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              Wing: <strong className="text-slate-200 uppercase">{selectedStation.wing}</strong> · Type: <span className="text-cyan-300">{selectedStation.type}</span>
            </div>
          </div>

          {/* Drawer Content */}
          {selectedStation.id === 'core-advisor' ? (
            /* Dedicated NEXUS ADVISOR Intelligence Drawer */
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-[#04060a] border border-cyan-500/40 text-xs space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  Advisor State Reason:
                </div>
                <p className="text-slate-200 font-mono text-[11px] leading-relaxed">
                  {selectedStation.stateReason}
                </p>
              </div>

              {/* Specific Advisor Metadata Fields */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Last Report Date</span>
                  <span className="text-xs font-bold text-white truncate block">2026-09-28 (W4)</span>
                </div>
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Next Scheduled</span>
                  <span className="text-xs font-bold text-cyan-400 truncate block">Monday 08:00 Due</span>
                </div>
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Data Completeness</span>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">92.5% Complete</span>
                </div>
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Pending Decisions</span>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">3 Decisions</span>
                </div>
              </div>

              {/* Primary Bottlenecks in ORACLE and FORGE */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-[#090e1a] border border-cyan-500/30 space-y-1">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Primary Bottleneck in ORACLE</span>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Friday practice status for starting center C. Humphrey creates ±4.2% spread probability uncertainty.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-[#0c0915] border border-violet-500/30 space-y-1">
                  <span className="text-[10px] text-violet-400 uppercase font-bold block">Primary Bottleneck in FORGE</span>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Founder outbound execution velocity: 7 prepared site selector briefs awaiting personalized dispatch.
                  </p>
                </div>
              </div>

              {/* Current Recommended Time Allocation */}
              <div className="p-3 rounded-lg bg-[#04060a] border border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Recommended Time Allocation</span>
                <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px]">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">ORACLE</span>
                    <span className="text-cyan-300 font-bold">40% (14h)</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">FORGE</span>
                    <span className="text-violet-300 font-bold">50% (18h)</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block">SHARED</span>
                    <span className="text-slate-300 font-bold">10% (4h)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => setActiveNexusSection('advisor')}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Weekly Executive Review</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <button
                    onClick={() => setActiveNexusSection('advisor')}
                    className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3 h-3 text-cyan-400" />
                    <span>View Latest Report</span>
                  </button>
                  <button
                    onClick={() => setActiveNexusSection('advisor')}
                    className="py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Archive className="w-3 h-3 text-purple-400" />
                    <span>View Archive</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-[9px] text-center">
                  <button
                    onClick={() => setActiveNexusSection('settings')}
                    className="py-1.5 px-1 rounded bg-[#04060a] hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  >
                    Schedule
                  </button>
                  <button
                    onClick={() => setActiveNexusSection('advisor')}
                    className="py-1.5 px-1 rounded bg-[#04060a] hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  >
                    Missing Data
                  </button>
                  <button
                    onClick={() => setActiveNexusSection('advisor')}
                    className="py-1.5 px-1 rounded bg-[#04060a] hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                  >
                    Decision Log
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Standard Station Drawer */
            <div className="space-y-4">
              {/* Exact Reason for Current State */}
              <div className="p-3.5 rounded-xl bg-[#04060a] border border-slate-850 text-xs font-sans space-y-1">
                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
                  Operational State Reason:
                </div>
                <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
                  {selectedStation.stateReason}
                </p>
              </div>

              {/* Key Parameters Matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Single Operator</span>
                  <span className="text-xs font-bold text-white truncate block">{selectedStation.owner}</span>
                </div>
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Data Freshness</span>
                  <span className="text-xs font-bold text-emerald-400 truncate block">{selectedStation.dataFreshness}</span>
                </div>
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active Missions</span>
                  <span className="text-xs font-bold text-white tabular-nums">{selectedStation.activeMissionCount}</span>
                </div>
                <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
                  <span className="text-[9px] text-slate-500 uppercase block font-semibold">Review Pending</span>
                  <span className={`text-xs font-bold tabular-nums ${selectedStation.pendingReviewCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                    {selectedStation.pendingReviewCount} items
                  </span>
                </div>
              </div>

              {/* AI Assistant Role & Automation Status */}
              <div className="p-3 rounded-lg bg-[#0d1220] border border-slate-800 space-y-1.5 text-[11px]">
                <div>
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">AI Assistant Role</span>
                  <span className="text-slate-300 font-sans">{selectedStation.aiAssistantRole || 'Standby'}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Automation Status</span>
                  <span className="text-slate-400 font-sans">{selectedStation.automationStatus || 'Manual station'}</span>
                </div>
              </div>

              {/* Highest Priority Mission */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  Highest-Priority Mission
                </span>
                <div className="p-3 rounded bg-[#04060a] border border-slate-800 text-white font-sans text-xs">
                  {selectedStation.highestPriorityMission}
                </div>
              </div>

              {/* Primary Risk & Required Next Decision */}
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

              {/* Action Buttons */}
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
          )}
        </div>
      </div>
    </div>
  );
};
