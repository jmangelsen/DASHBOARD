import React, { useState, useMemo } from 'react';
import { useNexus, OracleDepartment, ForgeDepartment } from '../../context/NexusContext';
import { SystemModuleNode, SystemMapState, SystemLane } from '../../types/systemMap';
import {
  Target,
  Briefcase,
  Layers,
  Activity,
  ArrowRight,
  Shield,
  Cpu,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ChevronRight,
  ChevronDown,
  Compass,
  FileText,
  DollarSign,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Info,
  Archive,
  Check,
  RefreshCw,
  GitBranch,
  Inbox,
  FlaskConical,
  Hammer,
  Rocket,
  Share2,
  Users,
  BarChart3,
  Percent,
  BookOpen,
  Database
} from 'lucide-react';

export const NexusSystemMapView: React.FC = () => {
  const {
    setActiveDivision,
    setActiveNexusSection,
    setActiveOracleDepartment,
    setActiveForgeDepartment,
    oracleGames,
    oracleModels,
    modelChanges,
    parlayCards,
    weeklyPostmortem,
    forgeOpportunity,
    forgeSignals,
    buyerInterviews,
    forgeOffers,
    forgeCustomers,
    forgeTransactions,
    forgeCampaigns,
    sharedMissions,
    sharedAssets,
    automations,
    blockedAttempts,
    currentForgeMRR,
    forgeRevenueThreshold,
    founderCompoundingIndex,
    oracleIntegrityScore,
    setOrchestratorOpen,
    setOrchestratorMode
  } = useNexus();

  // Active Selected Node for Right-Hand Intelligence Drawer
  const [selectedNodeId, setSelectedNodeId] = useState<string>('forge-dist');
  const [activeLaneFilter, setActiveLaneFilter] = useState<'all' | 'oracle' | 'forge' | 'shared'>('all');
  const [showCriticalPathOnly, setShowCriticalPathOnly] = useState<boolean>(false);

  // Active Missions
  const topOracleMission = sharedMissions.find(m => m.division === 'oracle' && m.status === 'active');
  const topForgeMission = sharedMissions.find(m => m.division === 'forge' && m.status === 'active');

  // Derive Real System Nodes from Live Application Data
  const modules: SystemModuleNode[] = useMemo(() => {
    return [
      // ==========================================
      // ORACLE FLOW LANE (7 Workflow Modules + Supporting)
      // ==========================================
      {
        id: 'oracle-data-ops',
        stageNumber: 1,
        name: 'DATA OPERATIONS',
        functionDescription: 'Ingest, verify, timestamp, and maintain NFL source and statistical inputs.',
        lane: 'oracle',
        departmentId: 'data-ops',
        state: 'complete',
        stateReason: 'Week 5 schedule, weather telemetry, and official injury filings ingested with 100% lineage.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Scheduled data ingestion nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: '14 min ago (98% feed coverage)',
        sourceVerificationCoverage: '94.2% verified against official filings',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 13:00',
        nextDeadline: 'Friday 16:30 (Practice Participation Sync)',
        linkedActiveMission: 'Automated SportsDataIO & League Filing Ingestion',
        linkedRecords: ['SportsDataIO Feed #W5-04', 'NFL Official Filing #W5-D2'],
        currentKpi: { label: 'Lineage Score', value: '100%', note: '0 unverified inputs' },
        primaryRisk: 'Late-breaking active/inactive announcements before kickoff.',
        recommendedAction: 'Verify feed timestamps prior to final Sunday model lock.',
        auditTrail: ['Batch #W5-04 completed', 'No missing dockets detected'],
        downstreamIds: ['oracle-model-lab']
      },
      {
        id: 'oracle-model-lab',
        stageNumber: 2,
        name: 'MODEL LAB',
        functionDescription: 'Build, version, test, compare, activate, and roll back forecasting models.',
        lane: 'oracle',
        departmentId: 'model-lab',
        state: 'active',
        stateReason: 'Baseline v2.4.1 locked. Candidate v3.0 quarantined pending 200+ game historical backtest.',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: 'Audit Model 3.0 pace-compression backtest',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: 'Current (2026 Season Baseline)',
        evidenceQuality: 'Model Output',
        lastActivityTimestamp: '2026-10-05 10:20',
        nextDeadline: 'Week 6 Activation Decision',
        linkedActiveMission: 'Candidate Model v3.0 Backtest Protocol',
        linkedRecords: ['Model Registry #MOD-001 (v2.4.1)', 'Change Control #PR-2026-04'],
        currentKpi: { label: 'Active Baseline', value: 'v2.4.1', note: 'Brier 0.188' },
        primaryRisk: 'Overfitting candidate models to small early-season samples (n=48 games).',
        recommendedAction: 'Require 200+ game backtest before baseline promotion.',
        auditTrail: ['Baseline v2.4.1 frozen', 'Candidate v3.0 backtest logged'],
        upstreamIds: ['oracle-data-ops'],
        downstreamIds: ['oracle-game-intel']
      },
      {
        id: 'oracle-game-intel',
        stageNumber: 3,
        name: 'GAME INTELLIGENCE',
        functionDescription: 'Build evidence-backed game dossiers, matchup context, scenario distributions, and uncertainty.',
        lane: 'oracle',
        departmentId: 'game-intel',
        state: 'awaiting_review',
        isCriticalPathNode: true,
        isCriticalPathBlocked: false,
        criticalPathReason: 'CURRENT CRITICAL PATH: Final Chiefs vs Bills probability lock is awaiting Friday practice participation confirmation.',
        stateReason: 'Chiefs vs Bills dossier needs final Friday practice status for starting center Creed Humphrey.',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: topOracleMission?.title || 'Audit injury uncertainties on Chiefs vs Bills matchup',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '25 min ago',
        evidenceQuality: 'Pending Review',
        lastActivityTimestamp: '2026-10-05 12:10',
        nextDeadline: 'Saturday 12:00 (Dossier Lock)',
        linkedActiveMission: 'Week 5 Headline Matchup Dossier #KC-BUF-W5',
        linkedRecords: ['Game Dossier #KC-BUF-W5', 'Official Injury Filing #KC-INJ-W5-02'],
        currentKpi: { label: 'Model Win Prob', value: '58.2% KC', note: 'Spread: KC -3.5' },
        primaryRisk: 'Offensive line injury uncertainty creates fat-tail pressure variance.',
        recommendedAction: 'Lock probability distribution once Friday practice status is published.',
        auditTrail: ['Dossier #KC-BUF-W5 generated', 'Flagged center injury factor'],
        upstreamIds: ['oracle-model-lab'],
        downstreamIds: ['oracle-parlay-arch']
      },
      {
        id: 'oracle-parlay-arch',
        stageNumber: 4,
        name: 'SCENARIO / PARLAY ARCHITECTURE',
        functionDescription: 'Analyze correlation-aware multi-leg scenarios. Forecast analysis only.',
        lane: 'oracle',
        departmentId: 'parlays',
        state: 'complete',
        stateReason: 'Week 5 2-leg correlation scenario analyzed (Bills/KC Under + Allen scramble yards). Zero wagering execution.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero active simulations in progress',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current Week 5',
        evidenceQuality: 'Derived Calculation',
        lastActivityTimestamp: '2026-10-05 11:00',
        nextDeadline: 'Tuesday (Post-Week Calibration)',
        linkedActiveMission: 'Correlation Scenario Card #PAR-W5-01',
        linkedRecords: ['Correlation Research Card #PAR-W5-01'],
        currentKpi: { label: 'Model Joint Prob', value: '29.8%', note: 'Market: 24.5%' },
        primaryRisk: 'Correlation error under extreme weather or game-script blowouts.',
        recommendedAction: 'Enforce permanent honesty disclaimer across all scenario cards.',
        auditTrail: ['Scenario #PAR-W5-01 verified', 'Honesty protocol badge enforced'],
        upstreamIds: ['oracle-game-intel'],
        downstreamIds: ['oracle-forecast-bench']
      },
      {
        id: 'oracle-forecast-bench',
        stageNumber: 5,
        name: 'FORECAST REVIEW & MARKET BENCHMARK',
        functionDescription: 'Review independent forecasts, uncertainty, and timestamped market comparison.',
        lane: 'oracle',
        departmentId: 'market-bench',
        state: 'active',
        stateReason: 'Comparing independent model spread (KC -3.5) with consensus market spread (KC -2.5). Divergence: +1.0 pt.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Monitor steam moves on Sunday morning totals',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: '45 min ago (Timestamped)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:00',
        nextDeadline: 'Saturday 20:00 (Closing Line Freeze)',
        linkedActiveMission: 'Week 5 Market Divergence Snapshot',
        linkedRecords: ['Circa/Pinnacle Benchmark Consensus #MS-W5-02'],
        currentKpi: { label: 'Model Edge', value: '+1.0 pt', note: 'KC Spread' },
        primaryRisk: 'Treating market differences as proof of mispricing rather than model error.',
        recommendedAction: 'Document benchmark comparison without altering model forecast.',
        auditTrail: ['Market snapshot #MS-W5-02 recorded', 'Divergence logged at 1.0 point'],
        upstreamIds: ['oracle-parlay-arch'],
        downstreamIds: ['oracle-backtest-cal']
      },
      {
        id: 'oracle-backtest-cal',
        stageNumber: 6,
        name: 'BACKTEST & CALIBRATION',
        functionDescription: 'Measure Brier score, log loss, calibration, reliability, and drift.',
        lane: 'oracle',
        departmentId: 'backtest',
        state: 'complete',
        stateReason: 'Rolling 4-week calibration check passed. Brier score 0.188, log loss 0.542.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Post-Week 5 backtest scheduled for Tuesday',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Updated through Week 4',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-02 18:00',
        nextDeadline: 'Tuesday Oct 7',
        linkedActiveMission: 'Rolling 2026 Season Backtest Suite',
        linkedRecords: ['Weeks 1-4 Game Outcome Dataset', 'Reliability Plot #REL-W4'],
        currentKpi: { label: 'Brier Score', value: '0.188', note: 'Target: <0.200' },
        primaryRisk: 'Silent calibration drift in low-probability total predictions.',
        recommendedAction: 'Confirm probability bucket monotonicity after Week 5 results.',
        auditTrail: ['4-week calibration run completed', 'Reliability curve plotted'],
        upstreamIds: ['oracle-forecast-bench'],
        downstreamIds: ['oracle-weekly-review']
      },
      {
        id: 'oracle-weekly-review',
        stageNumber: 7,
        name: 'WEEKLY ACCOUNTABILITY',
        functionDescription: 'Complete post-week review, identify model/data issues, and close the learning loop.',
        lane: 'oracle',
        departmentId: 'weekly-review',
        state: 'complete',
        stateReason: 'Week 4 postmortem filed. Major learning: Underestimated Denver elevation run pace.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Week 5 review opens Monday 08:00',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Season 2026 W4 Complete',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-01 09:30',
        nextDeadline: 'Monday Oct 6, 08:00',
        linkedActiveMission: 'Week 4 Postmortem Report & Learnings',
        linkedRecords: ['Week 4 Postmortem Report #POST-W4'],
        currentKpi: { label: 'Review Completion', value: '100%', note: '4 of 4 weeks analyzed' },
        primaryRisk: 'Hindsight bias when explaining unexpected game variance.',
        recommendedAction: 'Ensure weather assumptions are logged BEFORE Sunday kickoffs.',
        auditTrail: ['Week 4 postmortem signed off', 'Elevation pace parameter adjusted'],
        upstreamIds: ['oracle-backtest-cal']
      },

      // Supporting ORACLE Modules
      {
        id: 'oracle-player-intel',
        name: 'Player Intelligence',
        functionDescription: 'Context, snap share, injury drop-off rates, and depth chart impact.',
        lane: 'oracle',
        departmentId: 'player-intel',
        state: 'active',
        stateReason: 'Center Creed Humphrey ankle status flagged as Questionable.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Track 5 key skill players for Week 5',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '30 min ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:30',
        nextDeadline: 'Sunday 11:30 (Inactives)',
        linkedRecords: ['Player Record #P-02', 'Chiefs Injury Release'],
        currentKpi: { label: 'Tracked Impact Players', value: '5 Verified', note: '2 Questionable' },
        primaryRisk: 'Uncertainty drop-off in backup offensive linemen.',
        recommendedAction: 'Update EPA penalty factor if starting center is downgraded.',
        auditTrail: ['Player #P-02 updated to Questionable'],
        isSupportingModule: true,
        downstreamIds: ['oracle-game-intel']
      },
      {
        id: 'oracle-research-desk',
        name: 'ORACLE Research Desk',
        functionDescription: 'Source-backed deep research, data gap resolution, and domain citations.',
        lane: 'oracle',
        departmentId: 'research-desk',
        state: 'idle',
        stateReason: 'All Week 5 research inquiries resolved. Zero open data gaps.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero open research inquiries',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 08:30',
        nextDeadline: 'On demand',
        linkedRecords: ['Research Archive #RES-01'],
        currentKpi: { label: 'Open Gaps', value: '0 Gaps', note: 'All inputs sourced' },
        primaryRisk: 'Unverified speculation from media commentators.',
        recommendedAction: 'Reject any input lacking direct team/league citation.',
        auditTrail: ['Morning inquiry completed'],
        isSupportingModule: true,
        downstreamIds: ['oracle-data-ops', 'oracle-game-intel']
      },
      {
        id: 'oracle-change-control',
        name: 'Change Control',
        functionDescription: 'Preregistration, peer-level review gates, and rollback snapshots.',
        lane: 'oracle',
        departmentId: 'change-control',
        state: 'awaiting_review',
        stateReason: 'Change Record PR-2026-04 logged; pending founder sign-off.',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: 'Founder approval required before candidate promotion',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Pending Review',
        lastActivityTimestamp: '2026-10-04 15:00',
        nextDeadline: 'Week 6 Review',
        linkedRecords: ['PR-2026-04 Change Proposal', 'Model Baseline Audit #MOD-001'],
        currentKpi: { label: 'Logged Changes', value: '2 Records', note: '1 active, 1 candidate' },
        primaryRisk: 'Unregistered parameter tweaks destroying evaluation validity.',
        recommendedAction: 'Do not activate Model v3.0 until Week 5 backtest proves reliability improvement.',
        auditTrail: ['PR-2026-04 submitted by analyst'],
        isSupportingModule: true,
        downstreamIds: ['oracle-model-lab', 'oracle-forecast-bench']
      },
      {
        id: 'oracle-archive',
        name: 'ORACLE Archive',
        functionDescription: 'Immutable historical record of past forecasts, models, and reviews.',
        lane: 'oracle',
        departmentId: 'archive',
        state: 'idle',
        stateReason: '32 historical game dossiers, 4 postmortems, and 2 model commits archived.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Archive maintenance nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Immutable historic record',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-01 10:00',
        nextDeadline: 'Week 5 Archival (Post-Tuesday)',
        linkedRecords: ['Git Hash #6e1a49f', 'Historic Vault 2026'],
        currentKpi: { label: 'Archived Dossiers', value: '32 Games', note: '100% frozen' },
        primaryRisk: 'Retroactive alteration of historic forecasts.',
        recommendedAction: 'Enforce read-only state on all prior weeks.',
        auditTrail: ['Archive integrity verified'],
        isSupportingModule: true
      },

      // ==========================================
      // FORGE FLOW LANE (7 Workflow Modules + Supporting)
      // ==========================================
      {
        id: 'forge-radar',
        stageNumber: 1,
        name: 'SIGNAL RADAR',
        functionDescription: 'Capture verified market signals, buyer pain, competitor gaps, and opportunity triggers.',
        lane: 'forge',
        departmentId: 'signals',
        state: 'complete',
        stateReason: '3 public utility and zoning signals captured regarding Front Range substation bottlenecks.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Signal triage nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: '2 hours ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 11:15',
        nextDeadline: 'Nightly Docket Crawl (23:00)',
        linkedActiveMission: 'Front Range Infrastructure Constraint Monitor Feeds',
        linkedRecords: ['CO PUC Docket 24A-0123E', 'Larimer Acoustic Ordinance'],
        currentKpi: { label: 'Triaged Signals', value: `${forgeSignals.length} Signals`, note: '100% cited' },
        primaryRisk: 'Chasing generic AI trend chatter instead of physical constraints.',
        recommendedAction: 'Focus exclusively on grid interconnection queues and municipal cooling.',
        auditTrail: ['Docket 24A-0123E approved', 'Added to Front Range Monitor'],
        downstreamIds: ['forge-buyer-res']
      },
      {
        id: 'forge-buyer-res',
        stageNumber: 2,
        name: 'MARKET & BUYER RESEARCH',
        functionDescription: 'Verify buyer, job to be done, current workaround, purchase trigger, alternatives, and willingness-to-pay evidence.',
        lane: 'forge',
        departmentId: 'buyer-research',
        state: 'complete',
        stateReason: '1 verified 45-min buyer interview with enterprise data center energy site selector completed.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Schedule follow-up interview with second site selector',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Verified Oct 3',
        evidenceQuality: 'Direct Evidence',
        lastActivityTimestamp: '2026-10-03 16:30',
        nextDeadline: 'Thursday (Outbound Interview Wave)',
        linkedActiveMission: 'Direct Site Selector Qualitative Discovery',
        linkedRecords: ['Interview Transcript #INT-01', 'Direct Buyer Quotes Sheet'],
        currentKpi: { label: 'Buyer Interviews', value: `${buyerInterviews.length} Completed`, note: '100% quoted' },
        primaryRisk: 'Generalizing pain pattern from only 1 interview before validating across 3+ buyers.',
        recommendedAction: 'Conduct second interview to verify acoustic noise pain matches energy substation pain.',
        auditTrail: ['Interview #INT-01 transcribed', 'Evidence quotes verified'],
        upstreamIds: ['forge-radar'],
        downstreamIds: ['forge-opp-lab']
      },
      {
        id: 'forge-opp-lab',
        stageNumber: 3,
        name: 'OPPORTUNITY LAB',
        functionDescription: 'Score, validate, narrow, scale, pause, or kill business opportunities using evidence and economics.',
        lane: 'forge',
        departmentId: 'opportunity-lab',
        state: 'active',
        stateReason: 'Front Range Constraint Monitor scored at 86/100; $750/mo validation gate enforced.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Clear $750/mo gate before Nov 1',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Derived Calculation',
        lastActivityTimestamp: '2026-10-04 14:00',
        nextDeadline: 'Oct 25 (Kill Criteria Milestone Review)',
        linkedActiveMission: 'Front Range Infrastructure Monitor (Score 86)',
        linkedRecords: ['Opportunity Scorecard #OPP-001', 'Kill Rule #KR-01'],
        currentKpi: { label: 'Readiness Score', value: '86 / 100', note: 'Threshold: >75' },
        primaryRisk: 'Spending founder time on opportunities that cannot produce $750/mo recurring revenue.',
        recommendedAction: 'Kill project if 4 total paying subscriptions are not secured by Oct 25.',
        auditTrail: ['Scorecard evaluated at 86/100', 'Stage: Paid Pilot approved'],
        upstreamIds: ['forge-buyer-res'],
        downstreamIds: ['forge-offer-pricing']
      },
      {
        id: 'forge-offer-pricing',
        stageNumber: 4,
        name: 'OFFER & PRICING STUDIO',
        functionDescription: 'Turn buyer pain into a specific paid outcome, test price, and define delivery.',
        lane: 'forge',
        departmentId: 'offer-pricing',
        state: 'complete',
        stateReason: '2 validated offers packaged: $350/mo Monthly Monitor vs $1,200 Executive Dossier.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero offer revisions required',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-02 11:00',
        nextDeadline: 'Quarterly Pricing Review',
        linkedActiveMission: 'Front Range Executive Offering Packaging',
        linkedRecords: ['Offer #OFR-01 ($350/mo)', 'Customer Agreement #CUS-01'],
        currentKpi: { label: 'Validated Price', value: '$350 / mo', note: '2 settled customers' },
        primaryRisk: 'Discounting pricing before testing value at full hypothesis rate.',
        recommendedAction: 'Do not offer discounts to new inbound leads.',
        auditTrail: ['Offer #OFR-01 published', 'Payment terms verified'],
        upstreamIds: ['forge-opp-lab'],
        downstreamIds: ['forge-product']
      },
      {
        id: 'forge-product',
        stageNumber: 5,
        name: 'PRODUCT FORGE',
        functionDescription: 'Build only the smallest delivery system required to fulfill a validated paid outcome.',
        lane: 'forge',
        departmentId: 'product-forge',
        state: 'blocked',
        isCriticalPathNode: true,
        isCriticalPathBlocked: true,
        criticalPathReason: 'COMMERCIAL GATE ENFORCED: Software development is paused until current MRR ($350) clears $750/mo gate.',
        stateReason: 'COMMERCIAL GATE ENFORCED: Feature development paused until current MRR ($350) clears $750/mo gate.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Code frozen pending 2 new paid subscriptions',
        pendingReviewCount: 0,
        blockedItemCount: 1,
        dataFreshness: 'Current (Gate Active)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-04 18:00',
        nextDeadline: 'Gate evaluation upon 3rd customer payment',
        linkedActiveMission: 'Front Range Monthly Intelligence Portal (v1.0 Frozen)',
        linkedRecords: ['Commercial Gate Rule #CGR-01 ($750/mo threshold)'],
        currentKpi: { label: 'Gate Status', value: 'BLOCKED', note: 'MRR: $350 / $750' },
        primaryRisk: 'Premature software productization before verified recurring commercial demand.',
        recommendedAction: 'DO NOT build new software features until 2 more subscribers sign.',
        auditTrail: ['Gate #CGR-01 engaged: code freeze', 'Focus shifted to Distribution'],
        upstreamIds: ['forge-offer-pricing'],
        downstreamIds: ['forge-dist']
      },
      {
        id: 'forge-dist',
        stageNumber: 6,
        name: 'LAUNCH & DISTRIBUTION',
        functionDescription: 'Deploy offer, checkout, onboarding, acquisition channels, and measured campaigns.',
        lane: 'forge',
        departmentId: 'distribution',
        state: 'active',
        isCriticalPathNode: true,
        isCriticalPathBlocked: false,
        criticalPathReason: 'CURRENT ACTIVE FORGE LEVER: Outbound campaign F1 directly addresses the $400/mo MRR gap.',
        stateReason: 'Mission F1 actively deploying outbound regulatory memos to 12 energy site selectors (5 sent, 7 pending).',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: topForgeMission?.title || 'Deploy Outbound Briefing to 12 Weld County Energy Site Selectors',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Active campaign in progress',
        evidenceQuality: 'Direct Evidence',
        lastActivityTimestamp: '2026-10-05 11:45',
        nextDeadline: 'Thursday 15:00 (Send Remaining 7 Briefs)',
        linkedActiveMission: 'Weld County Substation Outbound Campaign (F1)',
        linkedRecords: ['Campaign Record #CMP-01', '12 Verified Decision-Maker Contacts'],
        currentKpi: { label: 'Campaign Pace', value: '5 of 12 Sent', note: '2 replies, 1 scheduled' },
        primaryRisk: 'Low reply rates if memos lack hyper-specific substation queue data.',
        recommendedAction: 'Personalize remaining 7 briefs with exact transformer lead-time data.',
        auditTrail: ['Campaign #CMP-01 launched', '5 briefs delivered to site selectors'],
        upstreamIds: ['forge-product'],
        downstreamIds: ['forge-rev-ops']
      },
      {
        id: 'forge-rev-ops',
        stageNumber: 7,
        name: 'REVENUE & PORTFOLIO REVIEW',
        functionDescription: 'Track actual revenue, MRR, margins, retention, and capital/time allocation.',
        lane: 'forge',
        departmentId: 'revenue-ops',
        state: 'active',
        stateReason: 'Actual settled cash: $700.00. Current MRR: $350.00/mo. Gap to approval gate: $400.00.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Reconcile October invoice payments',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Live (Updated per transaction)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-04 17:00',
        nextDeadline: 'Oct 31 (Monthly Reconciliation)',
        linkedActiveMission: 'Settled Transactions #TX-01 & #TX-02',
        linkedRecords: ['Stripe Settled Transaction Audit Log'],
        currentKpi: { label: 'Actual MRR', value: '$350.00', note: 'Goal: $750.00/mo' },
        primaryRisk: 'Treating uncollected pipeline forecasts as actual business revenue.',
        recommendedAction: 'Maintain strict separation: pipeline revenue never recorded in settled ledger.',
        auditTrail: ['Transaction #TX-02 settled: $350.00', 'MRR recalculated to $350.00'],
        upstreamIds: ['forge-dist']
      },

      // Supporting FORGE Modules
      {
        id: 'forge-pulse-evidence',
        name: 'PULSE Evidence Engine',
        functionDescription: 'Transform raw regulatory dockets into structured, cited candidate claims.',
        lane: 'forge',
        departmentId: 'pulse',
        state: 'awaiting_review',
        stateReason: '1 candidate evidence item extracted from Colorado PUC docket awaiting approval.',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: 'Verify acoustic buffer decibel threshold in Larimer County zoning brief',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '18 min ago',
        evidenceQuality: 'Pending Review',
        lastActivityTimestamp: '2026-10-05 12:45',
        nextDeadline: 'Tonight 22:00',
        linkedRecords: ['Larimer County Planning Docket 2026-B'],
        currentKpi: { label: 'Candidate Claims', value: '14 Claims', note: '13 approved, 1 in review' },
        primaryRisk: 'Unverified regulatory hearsay entering formal client deliverables.',
        recommendedAction: 'Review exact quote excerpt and assign confidence before ledger approval.',
        auditTrail: ['PULSE Run #PL-491 executed via server proxy'],
        isSupportingModule: true,
        downstreamIds: ['forge-radar', 'forge-buyer-res']
      },
      {
        id: 'forge-asset-vault',
        name: 'Asset Vault',
        functionDescription: 'Reusable research dossiers, code templates, models, and distribution lists.',
        lane: 'forge',
        departmentId: 'assets',
        state: 'complete',
        stateReason: '3 verified reusable venture assets compounding. Estimated 48.5 hours saved.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Asset preservation nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Current',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-03 14:00',
        nextDeadline: 'Monthly Compounding Calculation',
        linkedRecords: ['Asset #AST-01 (Regulatory Radar)', 'Asset #AST-03 (Scoring Model)'],
        currentKpi: { label: 'Asset Reuse Score', value: '92 / 100', note: '4 reuses in 2026' },
        primaryRisk: 'Building one-off custom formats that cannot be reused for new buyers.',
        recommendedAction: 'Format all future utility briefs using the reusable Markdown template.',
        auditTrail: ['Asset #AST-01 verified'],
        isSupportingModule: true
      },
      {
        id: 'forge-automations',
        name: 'Automation Factory',
        functionDescription: 'Automated scraping pipelines, daily spend caps, and failure logging.',
        lane: 'forge',
        departmentId: 'automation',
        state: 'active',
        stateReason: '3 approved automated workflows operational with human review gates active.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Monitor nightly PUC scraper run',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Hourly execution telemetry',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:00',
        nextDeadline: 'Tonight 23:00 (PUC Docket Cron)',
        linkedRecords: ['Automation Job Registry #JOB-01..03'],
        currentKpi: { label: 'Workflow Uptime', value: '100%', note: '0 failures this week' },
        primaryRisk: 'Automating unvalidated workflows before manual human mastery.',
        recommendedAction: 'Keep all new automations in test mode until 5 successful manual runs.',
        auditTrail: ['Hourly health check passed'],
        isSupportingModule: true,
        downstreamIds: ['forge-product', 'forge-dist', 'forge-rev-ops']
      },
      {
        id: 'forge-archive',
        name: 'FORGE Archive',
        functionDescription: 'Preserved research, failed hypotheses, and kill postmortems.',
        lane: 'forge',
        departmentId: 'archive',
        state: 'idle',
        stateReason: '1 rejected hypothesis archived with full postmortem (AI Data Center Land Flipping).',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Archive maintenance nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Archived September 2026',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-09-28 10:00',
        nextDeadline: 'Quarterly Archive Index',
        linkedRecords: ['Killed Project Postmortem #KIL-001'],
        currentKpi: { label: 'Archived Theses', value: '1 Killed', note: 'Preserved $1,500 capital' },
        primaryRisk: 'Re-testing dead hypotheses without reviewing previous kill postmortems.',
        recommendedAction: 'Reference #KIL-001 before considering any pure land-flipping ideas.',
        auditTrail: ['Hypothesis #KIL-001 moved to archive'],
        isSupportingModule: true
      },

      // ==========================================
      // SHARED CONTROL LAYER (Central Spine)
      // ==========================================
      {
        id: 'ctrl-founder',
        name: 'FOUNDER COMMAND',
        functionDescription: 'Priority selection, time allocation, decisions, and approval authority.',
        lane: 'shared',
        departmentId: 'founder',
        state: 'active',
        stateReason: 'Founder active in single-operator session. Highest-leverage action: Mission F1 Outbound.',
        owner: 'Founder / Administrator',
        activeMissionCount: sharedMissions.filter(m => m.status === 'active').length,
        highestPriorityMission: topForgeMission?.title || 'Deploy Outbound Briefing to 12 Weld County Energy Site Selectors',
        pendingReviewCount: 2,
        blockedItemCount: 1,
        dataFreshness: 'Live (Real-time)',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: 'Active session',
        nextDeadline: 'Monday 12:00 (Cadence Review)',
        linkedActiveMission: 'Single-Operator Weekly Operating Session',
        linkedRecords: ['Weekly Founder Cadence Schedule'],
        currentKpi: { label: 'Compounding Index', value: `${founderCompoundingIndex}/100`, note: 'Disciplined compounding' },
        primaryRisk: 'Context switching between NFL statistical math and enterprise buyer sales.',
        recommendedAction: 'Dedicate morning deep-work blocks exclusively to Mission F1 outbound.',
        auditTrail: ['Session authenticated as Research@aiphysicallayer.net']
      },
      {
        id: 'ctrl-advisor',
        name: 'NEXUS ADVISOR',
        functionDescription: 'Weekly executive review, red-team analysis, critical-path assessment, and decision support.',
        lane: 'shared',
        departmentId: 'advisor',
        state: 'awaiting_review',
        stateReason: 'Week 5 Executive Review drafted: ORACLE readiness conditionally ready, FORGE commercial gate active.',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: 'Complete Monday 12:00 founder review sign-off and decision log lock',
        pendingReviewCount: 2,
        blockedItemCount: 1,
        dataFreshness: 'Sunday 18:00 cutoff (Current)',
        evidenceQuality: 'Derived Calculation',
        lastActivityTimestamp: 'Current session',
        nextDeadline: 'Monday 12:00 (Founder Sign-Off Target)',
        linkedActiveMission: 'Week 5 Executive Report Package',
        linkedRecords: ['ORACLE Forecast Review', 'FORGE Venture Review', 'Founder Allocation Memo'],
        currentKpi: { label: 'Data Completeness', value: '92.5%', note: '2 partial flags' },
        primaryRisk: 'Acting on unverified inferences or premature feature building before $750/mo gate.',
        recommendedAction: 'Review 3 connected weekly reports and lock founder decision log in Workspace.',
        auditTrail: ['Review draft compiled from real application records']
      },
      {
        id: 'ctrl-pulse',
        name: 'PULSE // RESEARCH & EVIDENCE',
        functionDescription: 'Transform raw sources into editable candidate evidence with citations and review gates.',
        lane: 'shared',
        departmentId: 'pulse',
        state: 'awaiting_review',
        stateReason: '1 candidate evidence item extracted from Colorado PUC docket awaiting approval.',
        owner: 'Founder / Administrator',
        activeMissionCount: 1,
        highestPriorityMission: 'Verify acoustic buffer decibel threshold in Larimer County zoning brief',
        pendingReviewCount: 1,
        blockedItemCount: 0,
        dataFreshness: '18 min ago',
        evidenceQuality: 'Pending Review',
        lastActivityTimestamp: '2026-10-05 12:45',
        nextDeadline: 'Tonight 22:00',
        linkedActiveMission: 'Front Range Infrastructure Constraint Monitor Feeds',
        linkedRecords: ['CO PUC Docket 24A-0123E', 'Larimer Acoustic Ordinance'],
        currentKpi: { label: 'Candidate Claims', value: '14 Claims', note: '13 approved, 1 in review' },
        primaryRisk: 'Unverified regulatory hearsay entering formal client deliverables.',
        recommendedAction: 'Review exact quote excerpt and assign confidence before ledger approval.',
        auditTrail: ['PULSE Run #PL-491 executed via server proxy']
      },
      {
        id: 'ctrl-governance',
        name: 'GOVERNANCE & AUDIT',
        functionDescription: 'Data classification, evidence integrity, conflict checks, policy status, and immutable audit logs.',
        lane: 'shared',
        departmentId: 'governance',
        state: 'complete',
        stateReason: 'Airgap boundary enforced. 1 restricted attempt intercepted & content discarded immediately.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Zero outstanding governance policy alerts',
        pendingReviewCount: 0,
        blockedItemCount: blockedAttempts.length,
        dataFreshness: 'Real-time',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 11:30',
        nextDeadline: 'Continuous Audit Cycle',
        linkedActiveMission: 'Perimeter Airgap Enforcement',
        linkedRecords: ['Audit Block Log #BLK-0091'],
        currentKpi: { label: 'Airgap Enforced', value: '100%', note: '0 restricted data stored' },
        primaryRisk: 'Accidental ingestion of restricted third-party or employer intellectual property.',
        recommendedAction: 'None required. All data classifications nominal.',
        auditTrail: ['Policy check passed', 'Blocked attempt #BLK-0091 logged without retaining content']
      },
      {
        id: 'ctrl-automation',
        name: 'AUTOMATION CONTROL',
        functionDescription: 'Schedules, automation health, cost controls, approvals, errors, and kill switches.',
        lane: 'shared',
        departmentId: 'automation',
        state: 'complete',
        stateReason: '3 approved automated crons operational. Daily spend $0.85 / $5.00 cap. Global kill switch armed.',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Maintain 100% cron health',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Hourly execution telemetry',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-05 12:55',
        nextDeadline: 'PUC Docket Ingestion Cron (Tonight 23:00)',
        linkedActiveMission: 'Continuous Background Scraper Infrastructure',
        linkedRecords: ['Automation Job Registry #JOB-01..03'],
        currentKpi: { label: 'Active Crons', value: '3 / 3 Active', note: '0 failures this week' },
        primaryRisk: 'Unrestricted background research queries consuming excess tokens.',
        recommendedAction: 'Keep daily cap set at $5.00; kill switch armed.',
        auditTrail: ['Hourly cron health check nominal', 'Kill switch state: ARMED & READY']
      },
      {
        id: 'ctrl-assets',
        name: 'SHARED ASSET VAULT',
        functionDescription: 'Explicitly approved reusable assets shared across divisions.',
        lane: 'shared',
        departmentId: 'assets',
        state: 'complete',
        stateReason: '3 cross-division assets compounding (Regulatory Radar, Bayesian Ridge, Audit Schema).',
        owner: 'Founder / Administrator',
        activeMissionCount: 0,
        highestPriorityMission: 'Asset preservation nominal',
        pendingReviewCount: 0,
        blockedItemCount: 0,
        dataFreshness: 'Updated 2 days ago',
        evidenceQuality: 'Verified',
        lastActivityTimestamp: '2026-10-03 14:10',
        nextDeadline: 'Quarterly Compounding Audit',
        linkedActiveMission: 'Cross-Division Reusable IP Preservation',
        linkedRecords: ['Shared Asset Registry #AST-01..03'],
        currentKpi: { label: 'Hours Saved', value: '~48.5h', note: 'Across 7 project reuses' },
        primaryRisk: 'Cross-division pollution of isolated data models.',
        recommendedAction: 'Keep all reusable assets strictly methodological; zero data blending.',
        auditTrail: ['Asset #AST-01 reused in Front Range Monitor']
      }
    ];
  }, [
    oracleGames,
    oracleModels,
    modelChanges,
    sharedMissions,
    forgeSignals,
    buyerInterviews,
    forgeOffers,
    forgeCampaigns,
    sharedAssets,
    automations,
    blockedAttempts,
    currentForgeMRR,
    forgeRevenueThreshold,
    founderCompoundingIndex,
    oracleIntegrityScore,
    topOracleMission,
    topForgeMission
  ]);

  // Selected Node
  const selectedNode = useMemo(() => {
    return modules.find(m => m.id === selectedNodeId) || modules[0];
  }, [modules, selectedNodeId]);

  // State Color & Lighting Style Mapping
  const getNodeVisuals = (node: SystemModuleNode) => {
    const isSelected = selectedNodeId === node.id;
    const isCritical = node.isCriticalPathNode;
    const isBlocked = node.state === 'blocked' || node.isCriticalPathBlocked;

    switch (node.state) {
      case 'active':
        return {
          cardBg: isSelected ? 'bg-[#0b1426] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400' : 'bg-[#080d19] border-cyan-500/40 hover:border-cyan-400',
          pathColor: 'border-cyan-500/80',
          pathGlow: 'shadow-[0_0_8px_rgba(6,182,212,0.5)]',
          badgeBg: 'bg-cyan-950/90 text-cyan-300 border-cyan-500/60',
          dot: 'bg-cyan-400 animate-pulse',
          label: 'Active Operation'
        };
      case 'awaiting_review':
        return {
          cardBg: isSelected ? 'bg-[#1a1408] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400' : 'bg-[#100d06] border-amber-500/50 hover:border-amber-400',
          pathColor: 'border-amber-500/80',
          pathGlow: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]',
          badgeBg: 'bg-amber-950/90 text-amber-300 border-amber-500/60',
          dot: 'bg-amber-400 animate-pulse',
          label: 'Awaiting Review'
        };
      case 'blocked':
        return {
          cardBg: isSelected ? 'bg-[#20090d] border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)] ring-1 ring-rose-400' : 'bg-[#140608] border-rose-500/60 hover:border-rose-400',
          pathColor: 'border-rose-500/80',
          pathGlow: 'shadow-[0_0_8px_rgba(244,63,94,0.5)]',
          badgeBg: 'bg-rose-950/90 text-rose-300 border-rose-500/60',
          dot: 'bg-rose-400 animate-pulse',
          label: 'Blocked / Gate Enforced'
        };
      case 'scheduled':
        return {
          cardBg: isSelected ? 'bg-[#160d26] border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-1 ring-violet-400' : 'bg-[#0d0718] border-violet-500/40 hover:border-violet-400',
          pathColor: 'border-violet-500/70',
          pathGlow: 'shadow-[0_0_8px_rgba(139,92,246,0.3)]',
          badgeBg: 'bg-violet-950/90 text-violet-300 border-violet-500/60',
          dot: 'bg-violet-400',
          label: 'Scheduled Execution'
        };
      case 'complete':
        return {
          cardBg: isSelected ? 'bg-[#081812] border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400' : 'bg-[#050f0b] border-emerald-500/40 hover:border-emerald-400',
          pathColor: 'border-emerald-500/70',
          pathGlow: 'shadow-[0_0_8px_rgba(16,185,129,0.3)]',
          badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60',
          dot: 'bg-emerald-400',
          label: 'Complete & Verified'
        };
      case 'stale':
        return {
          cardBg: isSelected ? 'bg-[#181008] border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)]' : 'bg-[#0f0a05] border-orange-500/40',
          pathColor: 'border-orange-500/60',
          pathGlow: '',
          badgeBg: 'bg-orange-950 text-orange-300 border-orange-500/50',
          dot: 'bg-orange-400',
          label: 'Stale Data Warning'
        };
      case 'disabled':
        return {
          cardBg: 'bg-[#07090e] border-slate-800 opacity-40',
          pathColor: 'border-slate-800',
          pathGlow: '',
          badgeBg: 'bg-slate-900 text-slate-500 border-slate-800',
          dot: 'bg-slate-600',
          label: 'Disabled'
        };
      case 'idle':
      default:
        return {
          cardBg: isSelected ? 'bg-[#0e1320] border-slate-500 shadow-md' : 'bg-[#07090e] border-slate-800/90 hover:border-slate-700',
          pathColor: 'border-slate-800',
          pathGlow: '',
          badgeBg: 'bg-slate-900 text-slate-400 border-slate-800',
          dot: 'bg-slate-600',
          label: 'Standby / Idle'
        };
    }
  };

  // Direct action: Navigate directly into department page
  const handleOpenDepartment = (module: SystemModuleNode) => {
    if (module.lane === 'oracle' && module.departmentId && module.departmentId !== 'founder') {
      setActiveDivision('oracle');
      setActiveOracleDepartment(module.departmentId as OracleDepartment);
    } else if (module.lane === 'forge' && module.departmentId && module.departmentId !== 'founder') {
      setActiveDivision('forge');
      setActiveForgeDepartment(module.departmentId as ForgeDepartment);
    } else if (module.lane === 'shared') {
      setActiveDivision('nexus');
      if (module.id === 'ctrl-advisor') setActiveNexusSection('advisor');
      else if (module.id === 'ctrl-pulse') setActiveNexusSection('shared-missions');
      else if (module.id === 'ctrl-governance') setActiveNexusSection('governance');
      else if (module.id === 'ctrl-automation') setActiveNexusSection('automation-control');
      else if (module.id === 'ctrl-assets') setActiveNexusSection('asset-vault');
      else setActiveNexusSection('command-center');
    }
  };

  // Split primary workflow modules vs supporting modules
  const oracleWorkflow = useMemo(() => modules.filter(m => m.lane === 'oracle' && !m.isSupportingModule).sort((a, b) => (a.stageNumber || 0) - (b.stageNumber || 0)), [modules]);
  const oracleSupporting = useMemo(() => modules.filter(m => m.lane === 'oracle' && m.isSupportingModule), [modules]);

  const forgeWorkflow = useMemo(() => modules.filter(m => m.lane === 'forge' && !m.isSupportingModule).sort((a, b) => (a.stageNumber || 0) - (b.stageNumber || 0)), [modules]);
  const forgeSupporting = useMemo(() => modules.filter(m => m.lane === 'forge' && m.isSupportingModule), [modules]);

  const sharedControl = useMemo(() => modules.filter(m => m.lane === 'shared'), [modules]);

  return (
    <div className="space-y-6 pb-20 font-mono text-xs select-none">
      {/* 1. Header: Operating Map Title & Direct Switcher */}
      <div className="bg-[#080c16] border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">
                NEXUS SYSTEM MAP // CONNECTED OPERATING FLOWS
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[10px] text-slate-400">
                Primary Visual Navigation Architecture
              </span>
            </div>
            <h1 className="text-2xl font-black text-white font-display tracking-tight">
              AI Operating Stack Architecture
            </h1>
            <p className="text-xs text-slate-300 font-sans max-w-3xl leading-relaxed">
              Workflow sequencing across ORACLE (NFL forecast rigor), FORGE (venture deployment), and the Shared Control Spine. Click any module to inspect real-time state, resolve blockers, or navigate into its operating workspace.
            </p>
          </div>

          {/* Quick Actions & View Controls */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveNexusSection('command-center')}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-1.5"
            >
              <span>Switch to Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter & Critical Path Highlights Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 uppercase text-[10px]">Filter Lane:</span>
            {[
              { id: 'all', label: 'All Lanes' },
              { id: 'oracle', label: 'ORACLE Flow' },
              { id: 'shared', label: 'Shared Control' },
              { id: 'forge', label: 'FORGE Flow' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveLaneFilter(f.id as any)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeLaneFilter === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Active Work</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Awaiting Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Blocked Gate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Verified / Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. System Architecture Main Grid: 8 Cols Flow Diagram, 4 Cols Insight Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: 3 Horizontal Operating Lanes */}
        <div className="xl:col-span-8 space-y-6">
          {/* ==================================================== */}
          {/* LANE 1: ORACLE FLOW LANE                            */}
          {/* ==================================================== */}
          {(activeLaneFilter === 'all' || activeLaneFilter === 'oracle') && (
            <div className="bg-[#070a12] border border-cyan-900/40 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="p-1 rounded bg-cyan-950 border border-cyan-800">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block">
                      LANE 01 // ORACLE FLOW LANE (NFL INTELLIGENCE)
                    </span>
                    <h2 className="text-sm font-bold text-white font-display">
                      Sequential Forecast Architecture // Slate → Dossier → Calibration
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                    Integrity: {oracleIntegrityScore}/100
                  </span>
                  <button
                    onClick={() => {
                      setActiveDivision('oracle');
                      setActiveOracleDepartment('command');
                    }}
                    className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center gap-1"
                  >
                    <span>Enter Division</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 7 Workflow Modules in Horizontal Sequence with Illuminated Connecting Pathways */}
              <div className="space-y-3">
                <div className="text-[10px] text-slate-500 uppercase font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Sequential Critical Path: Stages 01 through 07</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 relative">
                  {oracleWorkflow.map((node, index) => {
                    const visuals = getNodeVisuals(node);
                    const isSelected = selectedNodeId === node.id;
                    const isCritical = node.isCriticalPathNode;

                    return (
                      <div key={node.id} className="relative flex flex-col">
                        <div
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full ${visuals.cardBg}`}
                        >
                          {/* Critical Path Badge Indicator */}
                          {isCritical && (
                            <div className="mb-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider block text-center border ${
                                node.isCriticalPathBlocked
                                  ? 'bg-rose-950 text-rose-300 border-rose-500'
                                  : 'bg-amber-950 text-amber-300 border-amber-500 animate-pulse'
                              }`}>
                                CRITICAL PATH
                              </span>
                            </div>
                          )}

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-bold text-slate-500">
                                0{node.stageNumber}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${visuals.dot}`} />
                            </div>

                            <h3 className="text-[11px] font-bold text-white font-display leading-tight">
                              {node.name}
                            </h3>

                            <p className="text-[9px] text-slate-400 font-sans line-clamp-2 leading-tight">
                              {node.functionDescription}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-850 flex items-center justify-between text-[9px]">
                            <span className="text-slate-400 truncate max-w-[80px]">
                              {node.currentKpi.value}
                            </span>
                            <span className="text-cyan-400 flex items-center">
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>

                        {/* Visual Directional Flow Indicator (Desktop arrow to next node) */}
                        {index < oracleWorkflow.length - 1 && (
                          <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-600">
                            <ArrowRight className="w-3.5 h-3.5 text-cyan-500/50" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supporting Modules Strip */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">
                  Supporting ORACLE Systems:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {oracleSupporting.map((node) => {
                    const visuals = getNodeVisuals(node);
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer text-[10px] ${
                          isSelected
                            ? 'bg-[#0f172a] border-cyan-400 shadow-md'
                            : 'bg-[#050810] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white truncate">{node.name}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${visuals.dot}`} />
                        </div>
                        <span className="text-[9px] text-slate-500 block truncate mt-0.5">
                          {node.currentKpi.label}: {node.currentKpi.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* LANE 2: SHARED CONTROL LAYER (Central Operating Spine) */}
          {/* ==================================================== */}
          {(activeLaneFilter === 'all' || activeLaneFilter === 'shared') && (
            <div className="bg-[#080d19] border-2 border-slate-700/80 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="p-1 rounded bg-slate-800 border border-slate-700">
                    <Compass className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                      CENTRAL OPERATING LAYER // SHARED CONTROL SPINE
                    </span>
                    <h2 className="text-sm font-bold text-white font-display">
                      Executive Governance, Strategic Decisions &amp; Core Control
                    </h2>
                  </div>
                </div>

                <span className="text-[10px] text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Airgapped Single Operator
                </span>
              </div>

              {/* 6 Large Shared Control Modules in Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
                {sharedControl.map((node) => {
                  const visuals = getNodeVisuals(node);
                  const isSelected = selectedNodeId === node.id;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0f172a] border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                          : 'bg-[#05070e] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase font-bold text-slate-500">
                            SHARED
                          </span>
                          <span className={`w-2 h-2 rounded-full ${visuals.dot}`} />
                        </div>

                        <h3 className="text-[11px] font-bold text-white font-display leading-tight truncate">
                          {node.name}
                        </h3>

                        <p className="text-[9px] text-slate-400 font-sans line-clamp-2 leading-tight">
                          {node.functionDescription}
                        </p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-850 flex items-center justify-between text-[9px]">
                        <span className="text-slate-300 font-bold truncate">
                          {node.currentKpi.value}
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
          {/* LANE 3: FORGE FLOW LANE (VENTURE DEPLOYMENT)        */}
          {/* ==================================================== */}
          {(activeLaneFilter === 'all' || activeLaneFilter === 'forge') && (
            <div className="bg-[#070a12] border border-violet-900/40 rounded-2xl p-5 space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-violet-400">
                  <div className="p-1 rounded bg-violet-950 border border-violet-800">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400 block">
                      LANE 03 // FORGE FLOW LANE (VENTURE DEPLOYMENT)
                    </span>
                    <h2 className="text-sm font-bold text-white font-display">
                      Sequential Venture Architecture // Signal → Buyer Proof → Revenue Gate
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800 text-[10px] font-bold">
                    Actual MRR: ${currentForgeMRR.toFixed(2)}
                  </span>
                  <button
                    onClick={() => {
                      setActiveDivision('forge');
                      setActiveForgeDepartment('command');
                    }}
                    className="px-2.5 py-1 rounded bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/40 text-[10px] font-bold flex items-center gap-1"
                  >
                    <span>Enter Division</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 7 Workflow Modules in Horizontal Sequence */}
              <div className="space-y-3">
                <div className="text-[10px] text-slate-500 uppercase font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>Sequential Critical Path: Stages 01 through 07</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 relative">
                  {forgeWorkflow.map((node, index) => {
                    const visuals = getNodeVisuals(node);
                    const isSelected = selectedNodeId === node.id;
                    const isCritical = node.isCriticalPathNode;
                    const isBlocked = node.isCriticalPathBlocked;

                    return (
                      <div key={node.id} className="relative flex flex-col">
                        <div
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-full ${visuals.cardBg}`}
                        >
                          {/* Critical Path Badge Indicator */}
                          {isCritical && (
                            <div className="mb-1.5">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider block text-center border ${
                                isBlocked
                                  ? 'bg-rose-950 text-rose-300 border-rose-500 font-black'
                                  : 'bg-cyan-950 text-cyan-300 border-cyan-500 animate-pulse'
                              }`}>
                                {isBlocked ? 'GATE BLOCKED' : 'ACTIVE LEVER'}
                              </span>
                            </div>
                          )}

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono font-bold text-slate-500">
                                0{node.stageNumber}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${visuals.dot}`} />
                            </div>

                            <h3 className="text-[11px] font-bold text-white font-display leading-tight">
                              {node.name}
                            </h3>

                            <p className="text-[9px] text-slate-400 font-sans line-clamp-2 leading-tight">
                              {node.functionDescription}
                            </p>
                          </div>

                          <div className="pt-2 mt-2 border-t border-slate-850 flex items-center justify-between text-[9px]">
                            <span className="text-slate-400 truncate max-w-[80px]">
                              {node.currentKpi.value}
                            </span>
                            <span className="text-violet-400 flex items-center">
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>

                        {/* Directional Flow Arrow */}
                        {index < forgeWorkflow.length - 1 && (
                          <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-slate-600">
                            <ArrowRight className="w-3.5 h-3.5 text-violet-500/50" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supporting FORGE Modules Strip */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-mono block">
                  Supporting FORGE Systems:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {forgeSupporting.map((node) => {
                    const visuals = getNodeVisuals(node);
                    const isSelected = selectedNodeId === node.id;
                    return (
                      <div
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-2.5 rounded-lg border transition-all cursor-pointer text-[10px] ${
                          isSelected
                            ? 'bg-[#181126] border-violet-400 shadow-md'
                            : 'bg-[#050810] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white truncate">{node.name}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${visuals.dot}`} />
                        </div>
                        <span className="text-[9px] text-slate-500 block truncate mt-0.5">
                          {node.currentKpi.label}: {node.currentKpi.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: System Module Insight Panel */}
        <div className="xl:col-span-4 bg-[#080c16] border border-slate-800 rounded-2xl p-5 space-y-5 sticky top-20 shadow-2xl">
          {/* Drawer Header */}
          <div className="pb-3 border-b border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                SYSTEM MODULE DOSSIER
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getNodeVisuals(selectedNode).badgeBg}`}>
                {getNodeVisuals(selectedNode).label}
              </span>
            </div>
            <h2 className="text-base font-bold text-white font-display">
              {selectedNode.name}
            </h2>
            <div className="text-[11px] text-slate-400 font-sans">
              Lane: <strong className="text-slate-200 uppercase">{selectedNode.lane}</strong> · Function: <span className="text-cyan-300">{selectedNode.functionDescription}</span>
            </div>
          </div>

          {/* Critical Path Warning (if active) */}
          {selectedNode.criticalPathReason && (
            <div className={`p-3 rounded-xl border text-xs font-sans space-y-1 ${
              selectedNode.isCriticalPathBlocked
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                : 'bg-amber-950/30 border-amber-500/50 text-amber-200'
            }`}>
              <div className="text-[10px] font-mono uppercase font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Path Status</span>
              </div>
              <p className="font-mono text-[11px] leading-relaxed">
                {selectedNode.criticalPathReason}
              </p>
            </div>
          )}

          {/* Exact Reason for Current Node State */}
          <div className="p-3.5 rounded-xl bg-[#04060a] border border-slate-850 text-xs font-sans space-y-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">
              Operational State Reason:
            </div>
            <p className="text-slate-200 leading-relaxed font-mono text-[11px]">
              {selectedNode.stateReason}
            </p>
          </div>

          {/* Key Parameters Matrix */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Single Operator</span>
              <span className="text-xs font-bold text-white truncate block">{selectedNode.owner}</span>
            </div>
            <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Data Freshness</span>
              <span className="text-xs font-bold text-emerald-400 truncate block">{selectedNode.dataFreshness}</span>
            </div>
            <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Active Missions</span>
              <span className="text-xs font-bold text-white tabular-nums">{selectedNode.activeMissionCount}</span>
            </div>
            <div className="p-2.5 rounded bg-[#04060a] border border-slate-850">
              <span className="text-[9px] text-slate-500 uppercase block font-semibold">Review Pending</span>
              <span className={`text-xs font-bold tabular-nums ${selectedNode.pendingReviewCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                {selectedNode.pendingReviewCount} items
              </span>
            </div>
          </div>

          {/* Relevant KPI */}
          <div className="p-3 rounded-lg bg-[#0d1220] border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{selectedNode.currentKpi.label}</span>
              <span className="text-sm font-bold text-cyan-300 font-mono">{selectedNode.currentKpi.value}</span>
            </div>
            {selectedNode.currentKpi.note && (
              <span className="text-[10px] text-slate-400 font-sans">{selectedNode.currentKpi.note}</span>
            )}
          </div>

          {/* Primary Risk & Recommended Action */}
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-amber-200 text-[11px] font-sans space-y-1">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Primary Operational Risk</span>
              </div>
              <p>{selectedNode.primaryRisk}</p>
            </div>

            <div className="p-3 rounded bg-cyan-950/20 border border-cyan-500/30 text-cyan-200 text-[11px] font-sans space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Recommended Founder Action</span>
              </div>
              <p>{selectedNode.recommendedAction}</p>
            </div>
          </div>

          {/* Direct Navigation & Actions */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => handleOpenDepartment(selectedNode)}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
            >
              <span>Open Department Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                onClick={() => {
                  setOrchestratorMode(selectedNode.lane === 'oracle' ? 'oracle' : 'forge');
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
