export type DataClassification = 
  | 'public' 
  | 'licensed' 
  | 'user-created' 
  | 'customer-provided' 
  | 'private' 
  | 'restricted';

export type UserRole = 'admin' | 'future_analyst' | 'future_customer';

export interface AuditMetadata {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  reviewedBy?: string;
  reviewedAt?: string;
  sourceRunId?: string;
  modelVersion?: string;
}

export type DivisionId = 'oracle' | 'forge' | 'nexus';

// ==========================================
// ORACLE // NFL Forecast Intelligence Types
// ==========================================

export type TruthState = 'known' | 'inferred' | 'unknown' | 'stale' | 'conflicting' | 'needs_review';

export interface NFLTeam {
  id: string;
  name: string;
  abbr: string;
  conference: 'AFC' | 'NFC';
  division: 'East' | 'North' | 'South' | 'West';
  offensiveRank: number;
  defensiveRank: number;
  paceRating: number; // Plays per min
  injuryStatusSummary: string;
}

export interface NFLGameInjury {
  player: string;
  team: string;
  position: string;
  status: 'Out' | 'Doubtful' | 'Questionable' | 'Active';
  impactRating: 'Critical' | 'High' | 'Moderate' | 'Low';
  uncertaintyNotes: string;
}

export interface NFLGameDossier extends AuditMetadata {
  id: string;
  week: number;
  season: number;
  homeTeam: NFLTeam;
  awayTeam: NFLTeam;
  kickoffTime: string;
  venue: string;
  isDome: boolean;
  weatherCondition?: string;
  temperatureF?: number;
  windMph?: number;
  
  // Independent Model Forecast
  independentWinProbHome: number; // e.g. 0.582
  independentWinProbAway: number;
  projectedSpreadHome: number; // e.g. -3.5
  projectedTotal: number; // e.g. 48.5
  spreadDistribution: { spread: number; prob: number }[];
  totalDistribution: { total: number; prob: number }[];
  projectedPace: string; // e.g. 'Fast (68 plays)'
  projectedHomeScore: number;
  projectedAwayScore: number;
  
  // Confidence & Verification
  forecastConfidence: 'High' | 'Medium' | 'Low' | 'High Uncertainty';
  uncertaintyFactors: string[];
  injuries: NFLGameInjury[];
  
  // Fact vs Inference breakdown
  directDataFacts: string[];
  modelDerivedForecasts: string[];
  analystInferences: string[];
  marketBenchmarks: {
    marketSpread: number;
    marketTotal: number;
    marketMoneylineHome: number;
    marketMoneylineAway: number;
    source: string;
    timestamp: string;
    closingSpread?: number;
    closingTotal?: number;
  };
  unknownInputs: string[];
  
  // Status
  modelVersion: string;
  truthState: TruthState;
  changeLog: { timestamp: string; note: string }[];
  dataFreshnessTimestamp: string;
}

export type ModelStatus = 
  | 'research' 
  | 'baseline' 
  | 'candidate' 
  | 'preregistered' 
  | 'backtesting' 
  | 'active' 
  | 'retired';

export interface OracleModelRecord extends AuditMetadata {
  id: string;
  name: string;
  purpose: string;
  modelFamily: string; // e.g. 'Hierarchical Poisson + Bayesian Ridge'
  version: string;
  trainingPeriod: string;
  targetPrediction: string;
  featureSet: string[];
  assumptions: string[];
  knownLimitations: string[];
  status: ModelStatus;
  changeRationale?: string;
  expectedBenefit?: string;
  dataDependencies: string[];
  brierScore: number;
  logLoss: number;
  calibrationError: number;
  baselineComparison: string;
  rollbackPlan: string;
  owner: string;
  dateActivated?: string;
}

export interface ModelChangeRecord extends AuditMetadata {
  id: string;
  dateProposed: string;
  modelAffected: string;
  exactChangeDescription: string;
  hypothesis: string;
  expectedMetricImprovement: string;
  baselineMetric: string;
  candidateMetric: string;
  backtestPeriod: string;
  sampleSize: number;
  result: 'pass' | 'fail' | 'inconclusive';
  reviewer: string;
  activationDecision: 'approved' | 'rejected' | 'pending';
  notes: string;
  linkedCommit?: string;
  evalArtifactId?: string;
}

export type ParlayLegType = 'moneyline' | 'spread' | 'total' | 'team_total' | 'player_prop' | 'first_td' | 'other';
export type CorrelationType = 'positive' | 'negative' | 'independent' | 'unknown';

export interface ParlayLeg {
  id: string;
  gameId: string;
  matchup: string;
  legType: ParlayLegType;
  description: string;
  modelProbRange: [number, number]; // e.g. [0.55, 0.61]
  modelProbPoint: number;
  marketImpliedProb: number;
  correlationRole: string; // Why this leg interacts
  uncertaintyLabel: string;
}

export interface ParlayAnalysisCard extends AuditMetadata {
  id: string;
  title: string;
  week: number;
  legs: ParlayLeg[];
  correlationType: CorrelationType;
  correlationExplanation: string;
  independentCombinedProb: number; // Multiplied
  correlationAdjustedProb: number; // Joint model
  concentrationRisk: string; // e.g. 'Heavy dependent on Chiefs passing script'
  sameGameDependency: boolean;
  marketContextNote: string;
  modelVersion: string;
  dataFreshness: string;
  scenarioNotes: string[];
  warnings: string[];
}

export interface WeeklyPostmortem extends AuditMetadata {
  id: string;
  week: number;
  season: number;
  forecastsIssued: number;
  outcomesTracked: number;
  brierScoreResult: number;
  closingLineBenchmarkDiff: number;
  majorForecastSuccesses: string[];
  majorForecastMisses: string[];
  dataFailures: string[];
  injuryNewsTimingIssues: string[];
  wasErrorForeseeable: boolean;
  recommendedAdjustments: string[];
  noiseDoNotChangeNotes: string[];
  analystSignoff: string;
}

// ==========================================
// FORGE LABS // Venture Deployment Types
// ==========================================

export type VentureStage = 
  | 'research' 
  | 'buyer_discovery' 
  | 'offer_validation' 
  | 'paid_pilot' 
  | 'productization' 
  | 'launch' 
  | 'growth' 
  | 'paused' 
  | 'killed';

export type SignalRadarStatus = 
  | 'inbox' 
  | 'triage' 
  | 'research' 
  | 'candidate' 
  | 'validated' 
  | 'converted_to_offer' 
  | 'archived';

export interface ForgeSignal extends AuditMetadata {
  id: string;
  title: string;
  sourceUrl: string;
  sourceType: 'forum' | 'filing' | 'review' | 'competitor' | 'buyer_quote' | 'job_post' | 'regulatory' | 'observation';
  sourceDate: string;
  organization: string;
  commercialRelevance: string;
  targetBuyer: string;
  potentialPain: string;
  dataClassification: DataClassification;
  status: SignalRadarStatus;
  notes?: string;
}

export interface BuyerInterviewRecord extends AuditMetadata {
  id: string;
  participantRole: string;
  participantType: 'enterprise' | 'operator' | 'consultant' | 'agency' | 'individual';
  dataClassification: DataClassification;
  interviewDate: string;
  jobToBeDone: string;
  painIntensity: number; // 1-10
  currentWorkaround: string;
  directQuotes: string[];
  recurringThemes: string[];
  priceReaction: string;
  keyObjections: string[];
  purchaseSignal: 'strong' | 'moderate' | 'weak' | 'none';
  followUpAction: string;
  linkedOpportunityId: string;
}

export interface OpportunityScorecard {
  painSeverity: number; // 1-5
  willingnessToPay: number; // 1-5
  buyerAccess: number; // 1-5
  distributionStrength: number; // 1-5
  differentiation: number; // 1-5
  recurringRevenuePotential: number; // 1-5
  grossMarginPotential: number; // 1-5
  automationPotential: number; // 1-5
  speedToValidation: number; // 1-5
  supportBurdenPenalty: number; // 1-5 (5 = heaviest penalty)
  operatingCostPenalty: number; // 1-5
  dataDependencyRisk: number; // 1-5
  legalConflictRisk: number; // 1-5
  platformDependencyRisk: number; // 1-5
}

export interface ForgeOpportunity extends AuditMetadata {
  id: string;
  name: string;
  market: string;
  buyer: string;
  jobToBeDone: string;
  problem: string;
  currentWorkaround: string;
  proposedOutcome: string;
  proposedOffer: string;
  pricingHypothesis: string;
  revenueModel: 'subscription' | 'one_time' | 'retainer' | 'usage';
  acquisitionChannel: string;
  distributionAdvantage: string;
  expectedMonthlyRevenue: number;
  expectedOperatingCost: number;
  expectedGrossMargin: number;
  expectedSupportBurden: 'Low' | 'Medium' | 'High';
  timeToFirstPaymentDays: number;
  stage: VentureStage;
  scorecard: OpportunityScorecard;
  commercialReadinessScore: number; // calculated 0-100
  revenuePotentialScore: number;
  riskAdjustedScore: number;
  feasibility750Target: boolean;
  killCriterion: string;
  nextDecisionDate: string;
  redTeamCritique: string;
  minimumEvidenceRequired: string;
  conflictOfInterestApproved: boolean;
}

export interface ForgeOffer extends AuditMetadata {
  id: string;
  linkedOpportunityId: string;
  name: string;
  offerType: 'paid_report' | 'digital_download' | 'template' | 'data_export' | 'subscription_monitor' | 'utility_micro_saas' | 'advisory';
  buyer: string;
  promisedOutcome: string;
  valueMetric: string;
  priceAmount: number;
  priceModel: 'monthly' | 'annual' | 'one_time';
  deliverableScope: string[];
  exclusions: string[];
  proofPoints: string[];
  deliveryTimeHours: number;
  onboardingSteps: string[];
  landingPageUrlPlaceholder: string;
  paymentLinkPlaceholder: string;
  activeStatus: boolean;
}

export interface ForgeProduct extends AuditMetadata {
  id: string;
  name: string;
  linkedOfferId: string;
  specification: string;
  mvpScope: string[];
  featureBacklog: { id: string; feature: string; buyerEvidence: string; approvedForBuild: boolean }[];
  deliveryWorkflow: string;
  operatingCostMonthly: number;
  buildStatus: 'planning' | 'in_development' | 'deployed' | 'paused';
  qaChecklistPassed: boolean;
}

export interface ForgeDistributionCampaign extends AuditMetadata {
  id: string;
  linkedProductId: string;
  targetBuyer: string;
  channel: 'outbound' | 'newsletter' | 'seo' | 'community' | 'referrals' | 'direct_sales';
  title: string;
  message: string;
  cta: string;
  dateLaunched: string;
  impressions: number;
  clicks: number;
  optIns: number;
  qualifiedLeads: number;
  conversations: number;
  sales: number;
  revenueGenerated: number;
  campaignCost: number;
  evidenceBasis: string;
}

export interface ForgeCustomer extends AuditMetadata {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  status: 'active_subscriber' | 'trial' | 'churned' | 'one_time_buyer';
  currentProduct: string;
  totalSpent: number;
  mrrContribution: number;
  healthScore: number; // 0-100
  notes: string;
}

export interface ForgeTransaction extends AuditMetadata {
  id: string;
  customerId: string;
  productName: string;
  amount: number;
  date: string;
  type: 'subscription' | 'one_time' | 'renewal';
  status: 'settled' | 'pending' | 'refunded';
}

// ==========================================
// SHARED SYSTEMS: MISSIONS, ASSETS, GOVERNANCE
// ==========================================

export interface SharedMission extends AuditMetadata {
  id: string;
  title: string;
  division: 'oracle' | 'forge';
  department: string;
  linkedEntity: string;
  purpose: string;
  expectedValue: string;
  effortHours: number;
  dueDate: string;
  evidenceRequired: string;
  completionDefinition: string;
  outcomeNotes?: string;
  nextDecision?: string;
  status: 'active' | 'completed' | 'deferred' | 'blocked';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface SharedAssetRecord extends AuditMetadata {
  id: string;
  title: string;
  primaryDivision: DivisionId;
  assetType: 'dataset' | 'methodology' | 'code_repo' | 'report_template' | 'automation_workflow' | 'distribution_list' | 'scoring_model';
  location: string;
  dataClassification: DataClassification;
  reuseCount: number;
  estimatedHoursSaved: number;
  crossDivisionUsage: boolean;
  compoundingScore: number; // 1-100
  lastUpdated: string;
  notes: string;
}

export interface AutomationJob extends AuditMetadata {
  id: string;
  name: string;
  division: DivisionId;
  trigger: string;
  inputsDescription: string;
  outputsDescription: string;
  schedule: string;
  status: 'active' | 'paused' | 'failed' | 'test_mode';
  lastRunTimestamp: string;
  estimatedMonthlyCost: number;
  hasHumanReviewGate: boolean;
  errorLog?: string;
}

export interface BlockedAttemptRecord {
  id: string;
  timestamp: string;
  attemptedDivision: DivisionId;
  reason: string;
  attemptedBy: string;
}
