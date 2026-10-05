import { OracleDepartment, ForgeDepartment } from '../context/NexusContext';

export type SystemMapState = 
  | 'idle' 
  | 'active' 
  | 'awaiting_review' 
  | 'blocked' 
  | 'scheduled' 
  | 'stale' 
  | 'complete' 
  | 'disabled';

export type SystemLane = 'oracle' | 'forge' | 'shared';

export interface SystemModuleNode {
  id: string;
  stageNumber?: number; // 1-7 for primary critical-path stages
  name: string;
  functionDescription: string;
  lane: SystemLane;
  departmentId?: OracleDepartment | ForgeDepartment | 'founder' | 'advisor' | 'pulse' | 'governance' | 'automation' | 'assets' | 'missions';
  state: SystemMapState;
  stateReason: string;
  isCriticalPathNode?: boolean;
  isCriticalPathBlocked?: boolean;
  criticalPathReason?: string;
  isDownstreamBlocked?: boolean;
  owner: string;
  activeMissionCount: number;
  highestPriorityMission: string;
  pendingReviewCount: number;
  blockedItemCount: number;
  dataFreshness: string;
  sourceVerificationCoverage?: string;
  evidenceQuality: 'Verified' | 'Pending Review' | 'Direct Evidence' | 'Derived Calculation' | 'Model Output' | 'AI Inference' | 'Founder Hypothesis' | 'Stale' | 'Missing Source' | 'Demo Data';
  lastActivityTimestamp: string;
  nextDeadline: string;
  linkedActiveMission?: string;
  linkedRecords: string[];
  currentKpi: { label: string; value: string | number; note?: string };
  primaryRisk: string;
  recommendedAction: string;
  auditTrail: string[];
  isSupportingModule?: boolean;
  upstreamIds?: string[];
  downstreamIds?: string[];
}

export interface ReviewQueueItem {
  id: string;
  title: string;
  division: 'ORACLE' | 'FORGE' | 'SHARED';
  department: string;
  category: 'evidence_approval' | 'model_forecast' | 'venture_revenue' | 'governance_conflict' | 'automation_alert';
  status: 'Awaiting Sign-off' | 'Quarantined' | 'Action Required' | 'Review Ready';
  age: string;
  riskLevel: 'high' | 'medium' | 'low';
  linkedRecord: string;
  actionLabel: string;
  actionTarget: { division?: 'oracle' | 'forge' | 'nexus'; section?: string; department?: string };
}
