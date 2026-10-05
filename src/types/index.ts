export type DataClassification = 'public' | 'licensed' | 'customer-provided' | 'private' | 'restricted';

export type UserRole = 'admin' | 'future_member' | 'future_paid_customer';

export interface AuditFields {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export type SignalSourceType = 'official' | 'primary' | 'secondary' | 'commentary' | 'unverified';
export type SignalStatus = 'inbox' | 'triage' | 'research' | 'verified' | 'converted_to_asset' | 'archived';

export interface SignalRecord extends AuditFields {
  id: string;
  title: string;
  url: string;
  organization: string;
  publicationDate: string;
  dateCaptured: string;
  location: string;
  category: string;
  associatedEntity: string;
  associatedProject: string;
  rawObservation: string;
  whyItMightMatter: string;
  sourceType: SignalSourceType;
  dataClassification: DataClassification;
  reviewStatus: SignalStatus;
  notes?: string;
}

export type EvidenceConfidence = 'high' | 'medium' | 'low';
export type ApprovalStatus = 'draft' | 'approved' | 'rejected';

export interface EvidenceRecord extends AuditFields {
  id: string;
  claim: string;
  claimCategory: string;
  sourceTitle: string;
  sourceUrl: string;
  directEvidenceExcerpt: string;
  sourcePublicationDate: string;
  dateAccessed: string;
  sourceTier: SignalSourceType;
  confidence: EvidenceConfidence;
  geography: string;
  associatedEntity: string;
  associatedProject: string;
  associatedOpportunity?: string;
  associatedProduct?: string;
  riskCategory: string;
  commercialImplication: string;
  dataClassification: DataClassification;
  approvalStatus: ApprovalStatus;
  isUnsupportedInference?: boolean;
  notes?: string;
}

export type OpportunityStage = 
  | 'research' 
  | 'customer_discovery' 
  | 'validation' 
  | 'paid_pilot' 
  | 'productization' 
  | 'growth' 
  | 'paused' 
  | 'killed';

export interface OpportunityScorecard {
  painSeverity: number; // 1-5
  buyerWillingnessToPay: number; // 1-5
  frequencyOfUse: number; // 1-5
  accessToBuyers: number; // 1-5
  differentiation: number; // 1-5
  distributionStrength: number; // 1-5
  recurringRevenuePotential: number; // 1-5
  grossMarginPotential: number; // 1-5
  automationPotential: number; // 1-5
  timeToFirstPayment: number; // 1-5 (5 = fastest)
  supportBurden: number; // 1-5 (5 = heaviest penalty)
  operatingCost: number; // 1-5 (5 = most expensive penalty)
  legalConflictRisk: number; // 1-5 (5 = highest risk penalty)
  dataDependencyRisk: number; // 1-5 (5 = highest penalty)
}

export interface OpportunityRecord extends AuditFields {
  id: string;
  name: string;
  market: string;
  targetBuyer: string;
  jobToBeDone: string;
  buyerPain: string;
  currentWorkaround: string;
  proposedOffer: string;
  pricingHypothesis: string;
  revenueModel: 'subscription' | 'one_time' | 'retainer' | 'usage';
  acquisitionChannel: string;
  distributionAdvantage: string;
  expectedMonthlyRevenue: number;
  expectedGrossMargin: number; // percentage e.g. 85
  expectedMonthlyOperatingCost: number;
  supportBurden: 'low' | 'moderate' | 'high';
  timeToFirstPaymentDays: number;
  primaryRisk: string;
  legalConflictCheck: 'passed' | 'review_required' | 'blocked';
  evidenceOfDemand: string;
  requiredAssets: string[];
  nextExperiment: string;
  successCriteria: string;
  killCriteria: string;
  nextDecisionDate: string;
  stage: OpportunityStage;
  scorecard: OpportunityScorecard;
  dataClassification: DataClassification;
  // Computed values
  commercialReadinessScore: number;
  revenuePotentialScore: number;
  riskAdjustedOpportunityScore: number;
  meetsApprovalThreshold: boolean; // default $750/mo
}

export type ProductBillingModel = 'one-time' | 'subscription' | 'annual' | 'usage-based';
export type ProductStage = 'concept' | 'offer_testing' | 'mvp_active' | 'scaling';

export interface ProductChecklist {
  buyerEvidenceConfirmed: boolean;
  offerWritten: boolean;
  priceTested: boolean;
  landingPageCreated: boolean;
  paymentMechanismCreated: boolean;
  deliveryWorkflowDocumented: boolean;
  onboardingDrafted: boolean;
  supportPathDefined: boolean;
  analyticsDefined: boolean;
  firstAcquisitionChannelActive: boolean;
  firstPaidCustomerGoalEstablished: boolean;
  dataAndLegalReviewComplete: boolean;
}

export interface ProductRecord extends AuditFields {
  id: string;
  name: string;
  linkedOpportunityId: string;
  productType: string;
  buyer: string;
  promisedOutcome: string;
  price: number;
  billingModel: ProductBillingModel;
  valueMetric: string;
  productStage: ProductStage;
  mvpDefinition: string;
  featureBacklog: string[];
  deliveryWorkflow: string;
  fulfillmentTimeHours: number;
  estimatedSupportLoad: string;
  customerOnboarding: string;
  operatingCostMonthly: number;
  currentMonthlyRevenue: number;
  targetMonthlyRevenue: number;
  customerFeedbackCount: number;
  retentionSignal: 'positive' | 'neutral' | 'negative' | 'unknown';
  sourceOfTruthAssets: string[];
  roadmap: string;
  knownRisks: string;
  checklist: ProductChecklist;
  dataClassification: DataClassification;
}

export type DistributionAssetType = 
  | 'content' 
  | 'landing_page' 
  | 'lead_magnet' 
  | 'email_sequence' 
  | 'outreach_campaign' 
  | 'partner_channel' 
  | 'case_study' 
  | 'referral';

export interface DistributionRecord extends AuditFields {
  id: string;
  title: string;
  linkedOfferId: string;
  targetAudience: string;
  channel: string;
  cta: string;
  assetType: DistributionAssetType;
  stage: 'draft' | 'live' | 'paused' | 'archived';
  dateLaunched: string;
  views: number;
  clicks: number;
  emailCaptures: number;
  qualifiedLeads: number;
  callsBooked: number;
  purchases: number;
  revenueAttributed: number;
  notes?: string;
  nextOptimizationAction: string;
  dataClassification: DataClassification;
}

export interface RevenueTransaction extends AuditFields {
  id: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  productId: string;
  productName: string;
  amount: number;
  type: 'one-time' | 'subscription_initial' | 'subscription_renewal' | 'refund';
  date: string;
  channel: string;
  status: 'paid' | 'pending' | 'refunded';
  founderHoursSpent: number;
  notes?: string;
}

export interface CustomerRecord extends AuditFields {
  id: string;
  name: string;
  email: string;
  company: string;
  activeProductId: string;
  activeProductName: string;
  status: 'qualified_lead' | 'pilot_user' | 'active_subscriber' | 'churned';
  mrrContribution: number;
  totalPaid: number;
  joinedDate: string;
  nextRenewalDate?: string;
  onboardingCompleted: boolean;
  notes?: string;
}

export type AssetType = 
  | 'source_library'
  | 'research_methodology'
  | 'dataset'
  | 'map_layer'
  | 'code_repository'
  | 'automation_workflow'
  | 'report_template'
  | 'landing_page'
  | 'email_sequence'
  | 'customer_insight'
  | 'scoring_framework'
  | 'distribution_channel'
  | 'audience_list'
  | 'partner_relationship'
  | 'case_study'
  | 'reusable_component';

export interface ReusableAssetRecord extends AuditFields {
  id: string;
  name: string;
  type: AssetType;
  linkedProject: string;
  linkedProducts: string[];
  locationOrUrl: string;
  owner: string;
  valueCreatedDescription: string;
  reuseCount: number;
  status: 'active' | 'in_development' | 'needs_update' | 'orphaned';
  lastUpdated: string;
  accessClassification: DataClassification;
  dependencyRisk: 'low' | 'medium' | 'high';
  compoundingScore: number; // 1-100
  estimatedHoursSaved: number;
  notes?: string;
}

export interface AutomationRecord extends AuditFields {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  inputDescription: string;
  outputDescription: string;
  status: 'active' | 'paused' | 'testing';
  owner: string;
  schedule: string;
  failureMode: string;
  lastRunTime: string;
  lastStatus: 'success' | 'warning' | 'failed' | 'idle';
  errorLog?: string;
  approvalRequirement: boolean;
  dataClassification: DataClassification;
  linkedProduct: string;
  linkedAsset: string;
  linkedRevenueMetric: string;
  runsCount: number;
}

export interface IntelligenceItem extends AuditFields {
  id: string;
  title: string;
  type: 'brief' | 'insight' | 'report' | 'market_map' | 'case_study' | 'buyer_interview' | 'rejected_hypothesis' | 'decision_log' | 'postmortem';
  summary: string;
  fullContent: string;
  keyTakeaways: string[];
  tags: string[];
  entities: string[];
  linkedProject: string;
  sourceTier: SignalSourceType;
  confidence: EvidenceConfidence;
  evidenceStatus: ApprovalStatus;
  dataClassification: DataClassification;
}

export interface MissionAction {
  id: string;
  title: string;
  linkedProject: string;
  expectedCommercialImpact: string;
  reasonItMatters: string;
  estimatedEffortHours: number;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'deferred';
  evidenceRequired: string;
  rewardCredits: number;
  completedAt?: string;
}

export interface BossBattle {
  id: string;
  title: string;
  description: string;
  requirement: string;
  status: 'locked' | 'in_progress' | 'conquered';
  unlockedAt?: string;
  conqueredAt?: string;
  signalCreditsReward: number;
}

export interface MissionChainStep {
  stepNumber: number;
  title: string;
  outcome: string;
  completed: boolean;
}

export interface MissionChain {
  id: string;
  name: string;
  tagline: string;
  steps: MissionChainStep[];
  status: 'not_started' | 'active' | 'completed';
}

export type FounderLevelName = 
  | 'Signal Scout'
  | 'Research Operator'
  | 'Validation Builder'
  | 'Product Architect'
  | 'Revenue Systems Operator'
  | 'Portfolio Builder'
  | 'Compounding Founder'
  | 'Intelligence Platform Owner';

export interface FounderLevelInfo {
  levelNumber: number;
  name: FounderLevelName;
  minCredits: number;
  revenueGate: string;
  evidenceGate: string;
  current: boolean;
}

export interface ConflictOfInterestCheck {
  id: string;
  targetName: string;
  targetType: 'signal' | 'evidence' | 'project' | 'product';
  personalPublicSourcesOnly: boolean;
  zeroEmployerDataOrTime: boolean;
  noEmploymentObligationOverlap: boolean;
  documentedSourceAndMethod: boolean;
  commercialUsePermitted: boolean;
  reviewResult: 'approved' | 'needs_review' | 'blocked';
  reviewedBy: string;
  reviewDate: string;
  notes: string;
}

export interface OnboardingAnswers {
  commercialGoal: string;
  incomeTarget12Months: number;
  defaultApprovalThreshold: number; // e.g. 750
  productTypes: string[];
  buyerGroups: string;
  expertiseAdvantage: string;
  maxMonthlyToolBudget: number;
  strictlyOutsideScopeNotice: string;
  firstOpportunity: string;
  nextCustomerAction: string;
  completed: boolean;
}

// ==========================================
// PULSE // Web Research & Evidence Agent Types
// ==========================================

export type PulseResearchType = 
  | 'market_signal' 
  | 'source_verification' 
  | 'evidence_extraction' 
  | 'competitor_research' 
  | 'buyer_hypothesis' 
  | 'red_team' 
  | 'report_refresh';

export type PulseResearchMode = 
  | 'signal_scout' 
  | 'source_extractor' 
  | 'market_analyst' 
  | 'red_team' 
  | 'report_refresh';

export type PulseDepth = 'quick' | 'standard' | 'deep';
export type PulseSourcePreference = 'official_only' | 'official_plus_reputable' | 'broad_web';

export interface CandidateEvidenceItem {
  id: string;
  claim: string;
  classification: 'direct_fact' | 'inference' | 'assumption' | 'unknown';
  evidence_excerpt: string;
  source_title: string;
  source_publisher: string;
  source_url: string;
  publication_date: string;
  source_quality: 'primary' | 'official' | 'secondary' | 'commentary' | 'unverified';
  confidence: 'high' | 'medium' | 'low';
  entity: string;
  project: string;
  geography: string;
  risk_category: string;
  caveats: string;
  recommended_human_verification: string;
  // Human review state
  reviewStatus: 'pending' | 'approved' | 'rejected' | 'deeper_verification_requested';
  reviewNotes?: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface PulseResearchOutput {
  research_summary: string;
  direct_facts: string[];
  inferences: string[];
  assumptions: string[];
  unknowns: string[];
  conflicts: string[];
  candidate_evidence: CandidateEvidenceItem[];
  recommended_next_steps: string[];
  cost_and_scope_note: string;
}

export interface PulseRunRecord {
  runId: string;
  userId: string;
  timestamp: string;
  query: string;
  researchType: PulseResearchType;
  mode: PulseResearchMode;
  geography: string;
  entity: string;
  project: string;
  dateRange: string;
  sourcePreference: PulseSourcePreference;
  domainAllowlist: string[];
  domainBlocklist: string[];
  depth: PulseDepth;
  status: 'completed' | 'failed' | 'running';
  errorState?: string;
  estimatedCost: number;
  actualCost?: number;
  modelPreset: string;
  toolUsage: string[];
  output?: PulseResearchOutput;
  reviewStatus: 'unreviewed' | 'partially_reviewed' | 'approved' | 'rejected';
  approvedClaimsCount: number;
  rejectedClaimsCount: number;
}

export interface PulseSettings {
  killSwitchActive: boolean;
  dailyRequestsUsed: number;
  dailyLimit: number;
  monthlyRequestsUsed: number;
  monthlyLimit: number;
  monthlyBudgetCap: number;
  currentMonthlySpend: number;
  requiresApprovalForDeep: boolean;
  hasPerplexityKey: boolean;
}

