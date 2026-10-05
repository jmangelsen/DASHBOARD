import {
  NFLGameDossier,
  OracleModelRecord,
  ModelChangeRecord,
  ParlayAnalysisCard,
  WeeklyPostmortem,
  ForgeSignal,
  BuyerInterviewRecord,
  ForgeOpportunity,
  ForgeOffer,
  ForgeProduct,
  ForgeDistributionCampaign,
  ForgeCustomer,
  ForgeTransaction,
  SharedMission,
  SharedAssetRecord,
  AutomationJob,
  BlockedAttemptRecord
} from '../types/nexus';

// ============================================================================
// ORACLE // NFL FORECAST INTELLIGENCE SEED DATA (DEMO DATA - FICTIONAL AUDIT)
// ============================================================================

export const SEED_ORACLE_MODELS: OracleModelRecord[] = [
  {
    id: 'model-v2.4',
    name: 'ORACLE Ensemble 2.4 (Active)',
    purpose: 'Predicts NFL game win probability, pace, and score distributions using EPA/play, drive efficiency, and opponent-adjusted success rates.',
    modelFamily: 'Hierarchical Bayesian Regression + Gradient Boosting',
    version: '2.4.1',
    trainingPeriod: '2021 - 2025 Regular Seasons (1,360 Games)',
    targetPrediction: 'Possession-adjusted game scoring margin & total possessions',
    featureSet: [
      'Early-down offensive EPA/play',
      'Pass rush win rate vs opponent pass block win rate',
      'Neutral-pace play frequency',
      'Adjusted net yards per pass attempt (ANY/A) differential',
      'Rolling 6-week explosive play suppression',
      'Wind speed and temperature friction'
    ],
    assumptions: [
      'Injury impacts scale with positional WAR and backup drop-off metrics',
      'Home field advantage decays in dome environments to +1.4 points',
      'Turnover luck regresses toward league median by 45% week-over-week'
    ],
    knownLimitations: [
      'Sensitive to sudden Thursday night short-week travel anomalies',
      'Does not model in-game coordinator play-calling adjustments after halftime'
    ],
    status: 'active',
    changeRationale: 'Integrated offensive line pressure-to-sack regression to improve underdog spread coverage calibration.',
    expectedBenefit: '-0.012 reduction in Brier score on divisional away underdogs',
    dataDependencies: ['Official Play-by-Play Ingestion', 'Weekly NFL Injury Registry', 'Weather Radar Feeds'],
    brierScore: 0.188,
    logLoss: 0.542,
    calibrationError: 0.034,
    baselineComparison: '+4.1% calibration improvement over v2.1 baseline',
    rollbackPlan: 'Revert serving pointer to artifact snapshot ORACLE-v2.1-Ridge-EPA in Model Registry.',
    owner: 'Lead Forecaster (Founder)',
    dateActivated: '2026-09-01',
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-09-28T14:30:00Z',
    createdBy: 'Founder (Admin)',
    reviewedBy: 'Founder (Admin)',
    reviewedAt: '2026-08-28T16:00:00Z',
  },
  {
    id: 'model-v2.1',
    name: 'ORACLE Ridge-EPA (Baseline)',
    purpose: 'Standard regularized linear model predicting scoring differentials from offensive and defensive EPA splits.',
    modelFamily: 'L2 Ridge Regression',
    version: '2.1.0',
    trainingPeriod: '2019 - 2024 Regular Seasons',
    targetPrediction: 'Point spread margin',
    featureSet: ['Net EPA/play', 'Turnover margin', 'Rest days', 'Home field proxy'],
    assumptions: ['Linear relationship between EPA margin and point differential'],
    knownLimitations: ['Underestimates tail variance in extreme high-wind outdoor games'],
    status: 'baseline',
    dataDependencies: ['Weekly Play-by-Play Aggregates'],
    brierScore: 0.208,
    logLoss: 0.598,
    calibrationError: 0.052,
    baselineComparison: 'Original Benchmark',
    rollbackPlan: 'Default baseline container',
    owner: 'Lead Forecaster (Founder)',
    dateActivated: '2025-09-05',
    createdAt: '2025-08-10T10:00:00Z',
    updatedAt: '2026-09-01T08:00:00Z',
    createdBy: 'Founder (Admin)',
  },
  {
    id: 'model-v3.0-cand',
    name: 'ORACLE Neural Drive-State (Candidate)',
    purpose: 'Sequence-to-sequence drive simulator predicting distribution of scoring drives under red-zone efficiency constraints.',
    modelFamily: 'Recurrent Transformer Drive Architecture',
    version: '3.0.0-rc1',
    trainingPeriod: '2020 - 2025 All Games',
    targetPrediction: 'Drive-by-drive score distribution & exact margin curve',
    featureSet: ['Drive starting field position', 'Down-and-distance transition matrix', 'Personnel grouping tendencies'],
    assumptions: ['Drive efficiency is stationary within game quarters'],
    knownLimitations: ['High computational latency; requires full play-by-play live feed'],
    status: 'preregistered',
    changeRationale: 'Test whether non-linear drive modeling out-predicts linear EPA in tight 3-point games.',
    expectedBenefit: 'Superior total points distribution calibration in weather-affected games',
    dataDependencies: ['High-frequency drive telemetry'],
    brierScore: 0.184,
    logLoss: 0.531,
    calibrationError: 0.029,
    baselineComparison: '+2.1% improvement over v2.4 in backtests; awaiting 40-game sample size verification',
    rollbackPlan: 'Currently in shadow test mode only; no production routing.',
    owner: 'Lead Forecaster (Founder)',
    createdAt: '2026-09-20T11:00:00Z',
    updatedAt: '2026-10-02T16:00:00Z',
    createdBy: 'Founder (Admin)',
  }
];

export const SEED_MODEL_CHANGES: ModelChangeRecord[] = [
  {
    id: 'chg-2026-04',
    dateProposed: '2026-09-22',
    modelAffected: 'ORACLE Ensemble 2.4.1',
    exactChangeDescription: 'Adjusted defensive pass rush win rate decay weight from 0.85 to 0.72 when starting offensive tackle is confirmed Out.',
    hypothesis: 'Pre-registered hypothesis: Backups at left tackle experience non-linear pressure surrender against top-5 edge rushers, resulting in -0.45 EPA/pass on 3rd down.',
    expectedMetricImprovement: 'Reduce Brier score by 0.008 on games featuring offensive line injury mismatches.',
    baselineMetric: 'Brier score on tackle-injury sample: 0.224',
    candidateMetric: 'Candidate Brier score: 0.209',
    backtestPeriod: '2022 - 2025 Seasons (84 injury-affected games)',
    sampleSize: 84,
    result: 'pass',
    reviewer: 'Founder (Admin)',
    activationDecision: 'approved',
    notes: 'Preregistration filed on Sep 22 prior to Week 4 kickoff. Backtest validated hypothesis without degrading overall calibration.',
    linkedCommit: 'git:oracle/eng/c94b21e',
    evalArtifactId: 'eval-art-2026-09-w4',
    createdAt: '2026-09-22T08:30:00Z',
    updatedAt: '2026-09-29T11:15:00Z',
    createdBy: 'Founder (Admin)',
    reviewedBy: 'Founder (Admin)',
    reviewedAt: '2026-09-29T11:00:00Z'
  },
  {
    id: 'chg-2026-05',
    dateProposed: '2026-09-30',
    modelAffected: 'ORACLE Neural Drive-State 3.0',
    exactChangeDescription: 'Attempted to add social media sentiment and line steam velocity features into pre-game probability weights.',
    hypothesis: 'Hypothesis: Sharp betting syndicates impart early predictive signal through market line velocity.',
    expectedMetricImprovement: 'Improve market divergence detection.',
    baselineMetric: 'Log Loss: 0.542',
    candidateMetric: 'Candidate Log Loss: 0.568 (Degraded)',
    backtestPeriod: '2024 - 2025 Weeks 1-8',
    sampleSize: 128,
    result: 'fail',
    reviewer: 'Founder (Admin)',
    activationDecision: 'rejected',
    notes: 'REJECTED: Severe overfitting detected. Market steam noise diluted fundamental efficiency metrics. Rule enforced: Do not chase market noise.',
    linkedCommit: 'git:oracle/eng/revert-f810',
    createdAt: '2026-09-30T14:00:00Z',
    updatedAt: '2026-10-01T17:30:00Z',
    createdBy: 'Founder (Admin)',
    reviewedBy: 'Founder (Admin)',
    reviewedAt: '2026-10-01T17:00:00Z'
  }
];

export const SEED_ORACLE_GAMES: NFLGameDossier[] = [
  {
    id: 'game-w5-01',
    week: 5,
    season: 2026,
    homeTeam: {
      id: 'kc',
      name: 'Kansas City Chiefs',
      abbr: 'KC',
      conference: 'AFC',
      division: 'West',
      offensiveRank: 2,
      defensiveRank: 4,
      paceRating: 64.8,
      injuryStatusSummary: 'Starting Center Questionable (ankle); CB2 Out.'
    },
    awayTeam: {
      id: 'buf',
      name: 'Buffalo Bills',
      abbr: 'BUF',
      conference: 'AFC',
      division: 'East',
      offensiveRank: 3,
      defensiveRank: 8,
      paceRating: 66.2,
      injuryStatusSummary: 'LT Active (limited); Starting Safety Out.'
    },
    kickoffTime: '2026-10-11T16:25:00-05:00',
    venue: 'GEHA Field at Arrowhead Stadium, Kansas City, MO',
    isDome: false,
    weatherCondition: 'Clear, cool',
    temperatureF: 54,
    windMph: 8,
    independentWinProbHome: 0.568,
    independentWinProbAway: 0.432,
    projectedSpreadHome: -2.8,
    projectedTotal: 49.2,
    spreadDistribution: [
      { spread: -7, prob: 0.18 },
      { spread: -3, prob: 0.32 },
      { spread: 0, prob: 0.22 },
      { spread: 3, prob: 0.18 },
      { spread: 7, prob: 0.10 }
    ],
    totalDistribution: [
      { total: 44, prob: 0.15 },
      { total: 47, prob: 0.28 },
      { total: 50, prob: 0.34 },
      { total: 54, prob: 0.16 },
      { total: 58, prob: 0.07 }
    ],
    projectedPace: 'High Neutral Pace (66.5 estimated offensive plays)',
    projectedHomeScore: 26.1,
    projectedAwayScore: 23.3,
    forecastConfidence: 'High',
    uncertaintyFactors: [
      'KC Center pre-game warmup assessment',
      'BUF Safety depth communication vs 12-personnel formations'
    ],
    injuries: [
      {
        player: 'Creed Humphrey (Hypothetical)',
        team: 'KC',
        position: 'C',
        status: 'Questionable',
        impactRating: 'Moderate',
        uncertaintyNotes: 'Ankle sprain; limited in Friday practice.'
      },
      {
        player: 'Taylor Rapp (Hypothetical)',
        team: 'BUF',
        position: 'S',
        status: 'Out',
        impactRating: 'High',
        uncertaintyNotes: 'Deep coverage vulnerability against post-corner routes.'
      }
    ],
    directDataFacts: [
      'Chiefs are +0.14 EPA/play on early downs over past 4 weeks (2nd in NFL).',
      'Bills defense allows 5.8 yards per carry to shotgun zone runs when nickel personnel is on field.',
      'Arrowhead historic home scoring margin in October non-division games is +3.1 points.'
    ],
    modelDerivedForecasts: [
      'ORACLE v2.4 estimates Chiefs win probability at 56.8% (median margin: KC by 2.8).',
      'Projected median total is 49.2 points, with a 54% likelihood of clearing 48 points based on combined red-zone touchdown conversion rates.'
    ],
    analystInferences: [
      'Expect Bills to prioritize 2-high safety shells to eliminate explosive deep passes, conceding short underneath routes to Kelce and running backs.',
      'Chiefs pass rush should generate pressure against Buffalo right tackle in late-down obvious pass situations.'
    ],
    marketBenchmarks: {
      marketSpread: -3.0,
      marketTotal: 48.0,
      marketMoneylineHome: -160,
      marketMoneylineAway: +135,
      source: 'Consensus Market Composite Benchmark',
      timestamp: '2026-10-05T12:00:00Z',
      closingSpread: undefined,
      closingTotal: undefined
    },
    unknownInputs: [
      'Final status of Chiefs starting center Humphrey at 90-minute inactives window.',
      'Whether late afternoon gusts exceed 12 mph.'
    ],
    modelVersion: 'ORACLE-v2.4.1',
    truthState: 'known',
    changeLog: [
      { timestamp: '2026-10-03', note: 'Initial baseline dossier generated from Week 4 snap counts.' },
      { timestamp: '2026-10-05', note: 'Updated injury parameters following Monday injury disclosure.' }
    ],
    dataFreshnessTimestamp: '2026-10-05T11:45:00Z',
    createdAt: '2026-10-03T10:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z',
    createdBy: 'ORACLE Data Pipeline',
  },
  {
    id: 'game-w5-02',
    week: 5,
    season: 2026,
    homeTeam: {
      id: 'lar',
      name: 'Los Angeles Rams',
      abbr: 'LAR',
      conference: 'NFC',
      division: 'West',
      offensiveRank: 6,
      defensiveRank: 18,
      paceRating: 62.4,
      injuryStatusSummary: 'Starting WR Active; CB1 Questionable.'
    },
    awayTeam: {
      id: 'sf',
      name: 'San Francisco 49ers',
      abbr: 'SF',
      conference: 'NFC',
      division: 'West',
      offensiveRank: 5,
      defensiveRank: 5,
      paceRating: 61.0,
      injuryStatusSummary: 'RB1 Limited; TE1 Full practice.'
    },
    kickoffTime: '2026-10-11T13:05:00-07:00',
    venue: 'SoFi Stadium, Inglewood, CA',
    isDome: true,
    weatherCondition: 'Controlled Indoor Environment',
    temperatureF: 72,
    windMph: 0,
    independentWinProbHome: 0.442,
    independentWinProbAway: 0.558,
    projectedSpreadHome: +2.1,
    projectedTotal: 46.8,
    spreadDistribution: [
      { spread: -4, prob: 0.16 },
      { spread: -1, prob: 0.24 },
      { spread: 2, prob: 0.30 },
      { spread: 5, prob: 0.20 },
      { spread: 9, prob: 0.10 }
    ],
    totalDistribution: [
      { total: 42, prob: 0.20 },
      { total: 45, prob: 0.32 },
      { total: 48, prob: 0.30 },
      { total: 52, prob: 0.14 },
      { total: 56, prob: 0.04 }
    ],
    projectedPace: 'Methodical Pace (61.7 estimated offensive plays)',
    projectedHomeScore: 22.4,
    projectedAwayScore: 24.5,
    forecastConfidence: 'Medium',
    uncertaintyFactors: [
      '49ers offensive line continuity vs Rams interior defensive tackle penetration'
    ],
    injuries: [
      {
        player: 'TreDavious White (Hypothetical)',
        team: 'LAR',
        position: 'CB',
        status: 'Questionable',
        impactRating: 'Moderate',
        uncertaintyNotes: 'Groin tightness during Friday scrimmage.'
      }
    ],
    directDataFacts: [
      '49ers have won 8 of past 10 regular season meetings against Rams.',
      'SoFi Stadium turf creates zero weather friction; pass completion percentages average +2.4% above outdoor marks.',
      'Rams offense ranks 4th in play-action passing efficiency.'
    ],
    modelDerivedForecasts: [
      'ORACLE v2.4 projects 49ers win probability at 55.8% with an expected margin of SF -2.1.',
      'Model spread (SF -2.1) differs slightly from market benchmark (SF -3.5), reflecting Rams offensive rebound.'
    ],
    analystInferences: [
      'The 1.4-point variance between ORACLE (-2.1) and Market (-3.5) stems from market weighting of historical division dominance vs our model giving more weight to Rams current-year red-zone scoring efficiency.'
    ],
    marketBenchmarks: {
      marketSpread: +3.5,
      marketTotal: 45.5,
      marketMoneylineHome: +145,
      marketMoneylineAway: -170,
      source: 'Consensus Market Composite Benchmark',
      timestamp: '2026-10-05T12:00:00Z'
    },
    unknownInputs: [
      'Whether 49ers will deploy full committee backfield or feature primary running back.'
    ],
    modelVersion: 'ORACLE-v2.4.1',
    truthState: 'known',
    changeLog: [
      { timestamp: '2026-10-04', note: 'Initial dossier compiled.' }
    ],
    dataFreshnessTimestamp: '2026-10-05T11:45:00Z',
    createdAt: '2026-10-04T09:00:00Z',
    updatedAt: '2026-10-05T12:00:00Z',
    createdBy: 'ORACLE Data Pipeline'
  }
];

export const SEED_PARLAY_CARD: ParlayAnalysisCard = {
  id: 'parlay-w5-01',
  title: 'AFC Game-Script Correlation Matrix: KC vs BUF',
  week: 5,
  legs: [
    {
      id: 'leg-1',
      gameId: 'game-w5-01',
      matchup: 'BUF @ KC',
      legType: 'spread',
      description: 'Kansas City Chiefs -2.5 (Alternate Spread)',
      modelProbRange: [0.55, 0.60],
      modelProbPoint: 0.575,
      marketImpliedProb: 0.524,
      correlationRole: 'Anchor Result: Chiefs win by a field goal or more',
      uncertaintyLabel: 'Moderate: Depends on red zone conversion efficiency'
    },
    {
      id: 'leg-2',
      gameId: 'game-w5-01',
      matchup: 'BUF @ KC',
      legType: 'total',
      description: 'Game Total Over 47.5 Points',
      modelProbRange: [0.52, 0.57],
      modelProbPoint: 0.545,
      marketImpliedProb: 0.505,
      correlationRole: 'Game Pace Driver: High play-count pace correlates +0.42 with Chiefs covering -2.5',
      uncertaintyLabel: 'Low: Mild wind, neutral field condition'
    },
    {
      id: 'leg-3',
      gameId: 'game-w5-01',
      matchup: 'BUF @ KC',
      legType: 'player_prop',
      description: 'P. Mahomes Over 265.5 Passing Yards',
      modelProbRange: [0.56, 0.62],
      modelProbPoint: 0.590,
      marketImpliedProb: 0.535,
      correlationRole: 'Execution Driver: Correlates +0.51 with game total over 47.5 against 2-high safety shell',
      uncertaintyLabel: 'High: Game script dependent on Buffalo keeping pace'
    }
  ],
  correlationType: 'positive',
  correlationExplanation: 'Strong intra-game structural correlation (+0.46 joint covariance). When Kansas City wins in a shootout scenario (Over 47.5), Mahomes passing yardage volume increases in tandem. Treating these legs as statistically independent underestimates true joint likelihood.',
  independentCombinedProb: 0.185, // 0.575 * 0.545 * 0.590 = ~18.5%
  correlationAdjustedProb: 0.248, // Joint model simulation = ~24.8%
  concentrationRisk: 'Heavy Single-Game Script Dependency: If Buffalo establishes a ball-control ground game and controls time of possession, all 3 legs will fail simultaneously.',
  sameGameDependency: true,
  marketContextNote: 'Bookmakers price this combined ticket at implied ~19.5% (+410). Note: Market books already apply internal correlation haircuts.',
  modelVersion: 'ORACLE-v2.4.1-CorrelatedSim',
  dataFreshness: '2026-10-05T12:00:00Z',
  scenarioNotes: [
    'Scenario A (High Pace): Chiefs build 7-10 point lead, forcing Allen to pass, increasing KC drive count.',
    'Scenario B (Ground Game): Buffalo runs 34+ times, bleeding clock; total drops under 44, passing props fail.'
  ],
  warnings: [
    'FORECAST ANALYSIS ONLY — STRICTLY NOT WAGERING ADVICE.',
    'Do not assume mathematical model difference equals a guaranteed edge.',
    'Same-game parlays contain severe compounding variance and tail risk.'
  ],
  createdAt: '2026-10-05T11:00:00Z',
  updatedAt: '2026-10-05T12:00:00Z',
  createdBy: 'Founder (Admin)',
  reviewedBy: 'Founder (Admin)',
  reviewedAt: '2026-10-05T12:05:00Z'
};

export const SEED_WEEKLY_POSTMORTEM: WeeklyPostmortem = {
  id: 'postmortem-w4',
  week: 4,
  season: 2026,
  forecastsIssued: 16,
  outcomesTracked: 16,
  brierScoreResult: 0.184,
  closingLineBenchmarkDiff: -0.014, // Outperformed closing line calibration
  majorForecastSuccesses: [
    'Correctly projected Detroit Lions offensive pace suppression against Seattle (predicted 43 points, final 42).',
    'Model spread on Minnesota Vikings (+2.5 vs GB) accurately modeled pressure-to-turnover margin.'
  ],
  majorForecastMisses: [
    'Baltimore Ravens vs Buffalo Bills: Model projected BAL -2.5; Ravens won by 25 points due to 3 anomalous first-half turnovers.'
  ],
  dataFailures: [
    'Late Friday weather report for Denver outdoor game missed sudden 25 mph crosswind shear; manual weather refresh was delayed 2 hours.'
  ],
  injuryNewsTimingIssues: [
    'Miami Dolphins backup quarterback announcement came 45 minutes before kickoff, leaving 1 forecast run stale for 20 minutes.'
  ],
  wasErrorForeseeable: false,
  recommendedAdjustments: [
    'Implement automated webhook for rapid depth-chart status updates at 90-minute inactives window.',
    'Maintain baseline weights; do not overreact to Week 4 blowout margins (turnovers are non-stationary noise).'
  ],
  noiseDoNotChangeNotes: [
    'Do NOT adjust Buffalo defensive baseline after single blowout game against Derrick Henry; sample size is 1 game.',
    'Do NOT alter field goal probability curves after kicker miss in 50+ yard range.'
  ],
  analystSignoff: 'Lead Forecaster (Founder) — Approved for Week 5 deployment without parameter drift.',
  createdAt: '2026-10-02T10:00:00Z',
  updatedAt: '2026-10-02T14:00:00Z',
  createdBy: 'Founder (Admin)',
  reviewedBy: 'Founder (Admin)',
  reviewedAt: '2026-10-02T14:30:00Z'
};

// ============================================================================
// FORGE LABS // VENTURE DEPLOYMENT SEED DATA (DEMO DATA - FICTIONAL AUDIT)
// ============================================================================

export const SEED_FORGE_OPPORTUNITY: ForgeOpportunity = {
  id: 'opp-front-range-monitor',
  name: 'Front Range Infrastructure Constraint Monitor',
  market: 'Industrial AI Compute & Power Infrastructure (Colorado Corridor)',
  buyer: 'Data Center Site Selectors, Energy Developers & Transmission Planning Consultants',
  jobToBeDone: 'Identify substation interconnect queue delays, transformer lead times, and municipal water cooling surcharges before committing capital to industrial land options.',
  problem: 'Hyperscale site developers waste 9-18 months and $150k+ in earnest money optioning land parcels that face 54-month utility substation queue delays or municipal water moratoriums.',
  currentWorkaround: 'Manually scraping hundreds of delayed utility docket filings, Colorado PUC transcripts, and county commissioner zoning minutes.',
  proposedOutcome: 'Weekly proprietary intelligence monitor tracking exact substation queue positions, water volumetric surcharge caps, and permitting bottlenecks in Adams, Weld, and Arapahoe Counties.',
  proposedOffer: 'Weekly Briefing & Queue Telemetry Monitor ($175/mo subscription) + One-Time Substation Queue Index Report ($350).',
  pricingHypothesis: '$175 / month per seat, or $1,750 / year prepaid annual enterprise license.',
  revenueModel: 'subscription',
  acquisitionChannel: 'Direct executive memos to regional utility engineering consultants + LinkedIn research briefs citing primary dockets.',
  distributionAdvantage: 'First-party regulatory docket extraction pipeline with direct citations to Exhibit PSCo-T1 and municipal codes.',
  expectedMonthlyRevenue: 1400,
  expectedOperatingCost: 120,
  expectedGrossMargin: 0.91,
  expectedSupportBurden: 'Low',
  timeToFirstPaymentDays: 14,
  stage: 'paid_pilot',
  scorecard: {
    painSeverity: 5,
    willingnessToPay: 5,
    buyerAccess: 4,
    distributionStrength: 4,
    differentiation: 5,
    recurringRevenuePotential: 4,
    grossMarginPotential: 5,
    automationPotential: 4,
    speedToValidation: 4,
    supportBurdenPenalty: 1, // Low penalty
    operatingCostPenalty: 1,
    dataDependencyRisk: 2,
    legalConflictRisk: 1,
    platformDependencyRisk: 1
  },
  commercialReadinessScore: 88,
  revenuePotentialScore: 84,
  riskAdjustedScore: 86,
  feasibility750Target: true,
  killCriterion: 'If fewer than 4 paid recurring subscriptions are secured by Day 45 (Oct 25), freeze weekly monitor production and pivot solely to custom advisory memos.',
  nextDecisionDate: '2026-10-25',
  redTeamCritique: 'High buyer urgency exists, but target audience is small (~60 qualified firms in region). Expansion to Wyoming/Utah corridors will be necessary within 6 months.',
  minimumEvidenceRequired: 'At least 2 prepaid customer commitments confirmed through invoice settlement.',
  conflictOfInterestApproved: true,
  createdAt: '2026-09-01T09:00:00Z',
  updatedAt: '2026-10-05T10:00:00Z',
  createdBy: 'Founder (Admin)',
  reviewedBy: 'Founder (Admin)',
  reviewedAt: '2026-09-05T14:00:00Z'
};

export const SEED_FORGE_SIGNALS: ForgeSignal[] = [
  {
    id: 'sig-01',
    title: 'Colorado PUC Docket 24A-0899E Transmission Congestion Filing',
    sourceUrl: 'https://puc.colorado.gov/dockets/24A-0899E',
    sourceType: 'filing',
    sourceDate: '2026-08-14',
    organization: 'Colorado Public Utilities Commission',
    commercialRelevance: 'Confirms 14 large-load data center interconnect applications totaling 3,200 MW facing minimum 54-month transformer delivery delays.',
    targetBuyer: 'Transmission Planning Directors, Hyperscale Land Acquirers',
    potentialPain: 'Blindly buying land in Weld County without power delivery commitment.',
    dataClassification: 'public',
    status: 'converted_to_offer',
    notes: 'Converted into core evidentiary pillar for Substation Interconnect Delay Index.',
    createdAt: '2026-08-15T08:00:00Z',
    updatedAt: '2026-09-02T12:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'sig-02',
    title: 'City of Aurora Water Department Tier 3 Industrial Surcharge Ordinance',
    sourceUrl: 'https://auroragov.org/departments/water/industrial_allocations_2026',
    sourceType: 'regulatory',
    sourceDate: '2026-09-02',
    organization: 'Aurora City Council',
    commercialRelevance: 'Enacted $18.40 per 1,000 gallon surcharge on peak evaporative cooling >500k gal/day.',
    targetBuyer: 'Data Center Mechanical Engineers & Site Selectors',
    potentialPain: 'Operators face unexpected $2.8M-$3.4M in annual water operating costs.',
    dataClassification: 'public',
    status: 'validated',
    notes: 'Primary municipal ordinance verified; published in Research Memo #02.',
    createdAt: '2026-09-03T11:00:00Z',
    updatedAt: '2026-09-10T15:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'sig-03',
    title: 'Weld County Acoustic Setback Buffer Chapter 23 Amendment',
    sourceUrl: 'https://weldgov.com/departments/planning_zoning/ordinances/2026-11',
    sourceType: 'filing',
    sourceDate: '2026-06-22',
    organization: 'Weld County Commissioners',
    commercialRelevance: 'Requires 1,500-foot acoustic buffer from agricultural boundaries for generator yards >25MW.',
    targetBuyer: 'Civil Engineering Planners, Site Developers',
    potentialPain: 'Forces acquisition of 40-65 extra acres just to meet property-line noise buffers.',
    dataClassification: 'public',
    status: 'research',
    notes: 'Analyzing variance precedent with local land use counsel.',
    createdAt: '2026-09-12T09:30:00Z',
    updatedAt: '2026-09-25T14:00:00Z',
    createdBy: 'Founder (Admin)'
  }
];

export const SEED_BUYER_INTERVIEWS: BuyerInterviewRecord[] = [
  {
    id: 'int-001',
    participantRole: 'VP of Infrastructure Site Acquisition',
    participantType: 'enterprise',
    dataClassification: 'user-created',
    interviewDate: '2026-09-18',
    jobToBeDone: 'Qualify 3 Front Range substation parcels before submitting $450k non-refundable land options to investment committee.',
    painIntensity: 9,
    currentWorkaround: 'Retaining utility engineering consultants at $385/hour who take 6 weeks to pull public docket filings.',
    directQuotes: [
      'If you can tell me whether Xcel substation transformer lead times are 3 years or 5 years before I tie up capital, that is worth $5,000 to me in 5 minutes.',
      'We almost put earnest money down on an Adams County parcel last month until we found out the transmission corridor was already at 100% capacity.'
    ],
    recurringThemes: [
      'Time-to-energization matters more than raw land acquisition cost.',
      'Municipal water boards are quietly denying cooling tap permits without public announcement.'
    ],
    priceReaction: 'Called $175/mo a "rounding error" and offered to prepay $1,500 annually immediately.',
    keyObjections: [
      'Needs confirmation that data updates within 48 hours of any public docket filing.'
    ],
    purchaseSignal: 'strong',
    followUpAction: 'Send Substation Delay Index teaser and convert to Pilot Subscriber #01.',
    linkedOpportunityId: 'opp-front-range-monitor',
    createdAt: '2026-09-18T16:00:00Z',
    updatedAt: '2026-09-19T10:00:00Z',
    createdBy: 'Founder (Admin)',
    reviewedBy: 'Founder (Admin)',
    reviewedAt: '2026-09-19T10:30:00Z'
  }
];

export const SEED_FORGE_OFFERS: ForgeOffer[] = [
  {
    id: 'offer-01',
    linkedOpportunityId: 'opp-front-range-monitor',
    name: 'Front Range Infrastructure Weekly Monitor',
    offerType: 'subscription_monitor',
    buyer: 'Site Selectors & Infrastructure Capital Partners',
    promisedOutcome: 'Weekly verified telemetry on Colorado substation interconnection queues, transformer lead times, and water cooling ordinances.',
    valueMetric: 'Avoids 9-18 month energization delays and millions in stranded land capital.',
    priceAmount: 175,
    priceModel: 'monthly',
    deliverableScope: [
      'Weekly PDF Briefing (every Monday 07:00 MT)',
      'Substation Interconnection Status Database Access',
      'Direct Regulatory Docket Citation Index'
    ],
    exclusions: ['Custom engineering feasibility stamps', 'Legal representation before Colorado PUC'],
    proofPoints: ['Direct quotes from Colorado PUC Docket 24A-0899E', 'Aurora Water Resolution R26-44 analysis'],
    deliveryTimeHours: 1,
    onboardingSteps: ['Welcome email with latest queue telemetry table', 'Add to private subscriber roster'],
    landingPageUrlPlaceholder: 'https://thephysicallayer.net/monitor/front-range',
    paymentLinkPlaceholder: 'https://buy.stripe.com/demo_front_range_monitor_175',
    activeStatus: true,
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-01T12:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'offer-02',
    linkedOpportunityId: 'opp-front-range-monitor',
    name: 'Substation Interconnect Delay Index (Q3 2026)',
    offerType: 'paid_report',
    buyer: 'Energy Project Developers & Private Equity Site Planners',
    promisedOutcome: 'Comprehensive 24-page analytical dossier mapping 14 queued substations across Adams, Weld, and Arapahoe Counties.',
    valueMetric: 'Immediate diligence asset for investment committees.',
    priceAmount: 350,
    priceModel: 'one_time',
    deliverableScope: ['24-page PDF Intelligence Report', 'Excel Spreadsheet with transformer delivery timeline projections'],
    exclusions: ['Ongoing updates (requires subscription)'],
    proofPoints: ['Official PSCo exhibits and Western Energy Imbalance Market data'],
    deliveryTimeHours: 0,
    onboardingSteps: ['Instant download link provided upon checkout completion'],
    landingPageUrlPlaceholder: 'https://thephysicallayer.net/reports/substation-index',
    paymentLinkPlaceholder: 'https://buy.stripe.com/demo_substation_report_350',
    activeStatus: true,
    createdAt: '2026-09-24T14:00:00Z',
    updatedAt: '2026-10-02T16:00:00Z',
    createdBy: 'Founder (Admin)'
  }
];

export const SEED_FORGE_CUSTOMERS: ForgeCustomer[] = [
  {
    id: 'cust-01',
    name: 'Mark Henderson',
    company: 'Apex Interconnect Advisory LLC',
    role: 'Managing Principal',
    email: 'mhenderson@apexinterconnect.example.com',
    status: 'active_subscriber',
    currentProduct: 'Front Range Infrastructure Weekly Monitor',
    totalSpent: 350, // 2 months
    mrrContribution: 175,
    healthScore: 95,
    notes: 'Highly engaged; opens briefing within 15 minutes of distribution on Monday mornings.',
    createdAt: '2026-09-02T11:00:00Z',
    updatedAt: '2026-10-02T09:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'cust-02',
    name: 'Elena Rostova',
    company: 'Peak Mountain Capital Infrastructure Fund',
    role: 'Director of Site Diligence',
    email: 'erostova@peakmountaincap.example.com',
    status: 'active_subscriber',
    currentProduct: 'Front Range Infrastructure Weekly Monitor',
    totalSpent: 525, // 1 month + one-time report
    mrrContribution: 175,
    healthScore: 90,
    notes: 'Purchased Q3 report first ($350), converted to recurring weekly subscriber ($175/mo) within 4 days.',
    createdAt: '2026-09-26T14:30:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
    createdBy: 'Founder (Admin)'
  }
];

export const SEED_FORGE_TRANSACTIONS: ForgeTransaction[] = [
  {
    id: 'tx-101',
    customerId: 'cust-01',
    productName: 'Front Range Weekly Monitor (Month 1)',
    amount: 175,
    date: '2026-09-02',
    type: 'subscription',
    status: 'settled',
    createdAt: '2026-09-02T11:05:00Z',
    updatedAt: '2026-09-02T11:05:00Z',
    createdBy: 'Stripe Webhook (Simulated)'
  },
  {
    id: 'tx-102',
    customerId: 'cust-02',
    productName: 'Substation Interconnect Delay Index (Q3 2026)',
    amount: 350,
    date: '2026-09-26',
    type: 'one_time',
    status: 'settled',
    createdAt: '2026-09-26T14:35:00Z',
    updatedAt: '2026-09-26T14:35:00Z',
    createdBy: 'Stripe Webhook (Simulated)'
  },
  {
    id: 'tx-103',
    customerId: 'cust-02',
    productName: 'Front Range Weekly Monitor (Month 1)',
    amount: 175,
    date: '2026-09-30',
    type: 'subscription',
    status: 'settled',
    createdAt: '2026-09-30T10:15:00Z',
    updatedAt: '2026-09-30T10:15:00Z',
    createdBy: 'Stripe Webhook (Simulated)'
  },
  {
    id: 'tx-104',
    customerId: 'cust-01',
    productName: 'Front Range Weekly Monitor (Month 2 Renewal)',
    amount: 175,
    date: '2026-10-02',
    type: 'renewal',
    status: 'settled',
    createdAt: '2026-10-02T11:00:00Z',
    updatedAt: '2026-10-02T11:00:00Z',
    createdBy: 'Stripe Webhook (Simulated)'
  }
];

export const SEED_FORGE_DISTRIBUTION: ForgeDistributionCampaign[] = [
  {
    id: 'camp-01',
    linkedProductId: 'offer-01',
    targetBuyer: 'Transmission Planning Consultants & Site Selectors',
    channel: 'outbound',
    title: 'Executive Docket Memo: Substation Lead Times in Adams County',
    message: 'Direct 1-page executive summary analyzing Exhibit PSCo-T1 transmission congestion with link to monitor.',
    cta: 'View the Substation Interconnect Queue Monitor ($175/mo)',
    dateLaunched: '2026-09-15',
    impressions: 24,
    clicks: 18,
    optIns: 6,
    qualifiedLeads: 4,
    conversations: 3,
    sales: 2,
    revenueGenerated: 700,
    campaignCost: 0,
    evidenceBasis: 'Grounded in Colorado PUC Docket 24A-0899E sworn witness testimony.',
    createdAt: '2026-09-14T10:00:00Z',
    updatedAt: '2026-10-02T12:00:00Z',
    createdBy: 'Founder (Admin)'
  }
];

// ============================================================================
// SHARED SEED DATA: MISSIONS, ASSETS, AUTOMATIONS, GOVERNANCE
// ============================================================================

export const SEED_SHARED_MISSIONS: SharedMission[] = [
  {
    id: 'msn-o1',
    title: 'Audit Week 5 Injury Uncertainties on Chiefs vs Bills Matchup',
    division: 'oracle',
    department: 'Game Intelligence',
    linkedEntity: 'KC vs BUF (Game #01)',
    purpose: 'Validate backup tackle drop-off metrics before freezing model probability distribution.',
    expectedValue: 'Prevents miscalibrated point spread recommendation on top game of the week.',
    effortHours: 2.5,
    dueDate: '2026-10-09',
    evidenceRequired: 'Confirmed practice participation report from Friday NFL media release.',
    completionDefinition: 'All injury status fields in dossier updated with verified source tier citation.',
    status: 'active',
    riskLevel: 'medium',
    createdAt: '2026-10-04T09:00:00Z',
    updatedAt: '2026-10-05T10:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'msn-o2',
    title: 'Backtest Proposed Second-Half Pace Adjustment in Model 3.0',
    division: 'oracle',
    department: 'Model Lab',
    linkedEntity: 'Model 3.0 Candidate',
    purpose: 'Run 120-game historical backtest on multi-score blowouts to test pace compression.',
    expectedValue: 'Verify whether -0.015 Brier score reduction holds across high-variance games.',
    effortHours: 3.0,
    dueDate: '2026-10-14',
    evidenceRequired: 'Comparison table against v2.4 baseline on identical game slices.',
    completionDefinition: 'Model change control record submitted with pass/fail decision.',
    status: 'active',
    riskLevel: 'low',
    createdAt: '2026-10-03T11:00:00Z',
    updatedAt: '2026-10-05T09:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'msn-f1',
    title: 'Deploy Outbound Briefing to 12 Weld County Energy Site Selectors',
    division: 'forge',
    department: 'Distribution Engine',
    linkedEntity: 'Front Range Infrastructure Monitor',
    purpose: 'Secure 2 additional paid pilot subscribers ($175/mo) to clear $700/mo towards $750 threshold.',
    expectedValue: '+$350 MRR to reach $700 MRR (93% of commercial threshold).',
    effortHours: 4.0,
    dueDate: '2026-10-10',
    evidenceRequired: 'Documented email send receipts and follow-up conversation notes.',
    completionDefinition: 'Minimum 2 calls scheduled or 1 direct Stripe checkout completed.',
    status: 'active',
    riskLevel: 'high',
    createdAt: '2026-10-04T10:00:00Z',
    updatedAt: '2026-10-05T11:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'msn-f2',
    title: 'Synthesize City of Greeley Water Tap Allocation Moratorium Ruling',
    division: 'forge',
    department: 'Signal Radar',
    linkedEntity: 'Front Range Infrastructure Monitor',
    purpose: 'Extract verified C-BT senior water right dedication requirements into Research Brief #03.',
    expectedValue: 'Increases conversion by demonstrating proprietary local regulatory depth.',
    effortHours: 2.0,
    dueDate: '2026-10-12',
    evidenceRequired: 'City of Greeley engineering council minutes cited with resolution number.',
    completionDefinition: 'New evidence record added and cited in next Monday monitor draft.',
    status: 'active',
    riskLevel: 'medium',
    createdAt: '2026-10-05T08:00:00Z',
    updatedAt: '2026-10-05T08:00:00Z',
    createdBy: 'Founder (Admin)'
  }
];

export const SEED_SHARED_ASSETS: SharedAssetRecord[] = [
  {
    id: 'ast-01',
    title: 'Regulatory Docket & Web Research Extraction Pipeline',
    primaryDivision: 'forge',
    assetType: 'automation_workflow',
    location: '/src/pipelines/docket_extractor.ts',
    dataClassification: 'user-created',
    reuseCount: 8,
    estimatedHoursSaved: 36,
    crossDivisionUsage: true, // Adapted for NFL regulatory/legal stadium lease tracking
    compoundingScore: 92,
    lastUpdated: '2026-10-01',
    notes: 'Used to ingest Colorado PUC filings for FORGE; also adapted in ORACLE for parsing municipal stadium authority lease dockets.',
    createdAt: '2026-08-20T10:00:00Z',
    updatedAt: '2026-10-01T14:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'ast-02',
    title: 'Probabilistic Calibration & Brier Score Evaluation Library',
    primaryDivision: 'oracle',
    assetType: 'code_repo',
    location: '/src/analytics/calibration_engine.ts',
    dataClassification: 'user-created',
    reuseCount: 14,
    estimatedHoursSaved: 48,
    crossDivisionUsage: true, // Used in FORGE Opportunity Lab for scoring accuracy
    compoundingScore: 95,
    lastUpdated: '2026-10-03',
    notes: 'Core statistical calibration routines shared between NFL probability buckets and FORGE venture conversion rate estimations.',
    createdAt: '2026-08-10T09:00:00Z',
    updatedAt: '2026-10-03T16:00:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'ast-03',
    title: 'Executive Intelligence Briefing Layout & PDF Template',
    primaryDivision: 'nexus',
    assetType: 'report_template',
    location: '/src/templates/executive_brief.md',
    dataClassification: 'user-created',
    reuseCount: 22,
    estimatedHoursSaved: 55,
    crossDivisionUsage: true,
    compoundingScore: 89,
    lastUpdated: '2026-09-28',
    notes: 'Crisp typographical markdown template used for weekly NFL game postmortems and Monday venture monitor issues.',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-09-28T10:00:00Z',
    createdBy: 'Founder (Admin)'
  }
];

export const SEED_AUTOMATIONS: AutomationJob[] = [
  {
    id: 'auto-01',
    name: 'Weekly NFL Official Injury Telemetry Sync',
    division: 'oracle',
    trigger: 'Cron Schedule (Every Fri & Sun 09:00 MT)',
    inputsDescription: 'Official league injury practice participation registers and status reports',
    outputsDescription: 'Parsed player status changes and alert flags in Game Dossiers',
    schedule: '0 9 * * 5,0',
    status: 'active',
    lastRunTimestamp: '2026-10-04T09:00:00Z',
    estimatedMonthlyCost: 4.50,
    hasHumanReviewGate: true,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-10-04T09:05:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'auto-02',
    name: 'Colorado PUC Large-Load Transmission Docket Scraper',
    division: 'forge',
    trigger: 'Daily at 06:00 MT',
    inputsDescription: 'Colorado Public Utilities Commission E-Filings search on transmission dockets',
    outputsDescription: 'Draft records deposited in Signal Radar with status: triage',
    schedule: '0 6 * * *',
    status: 'active',
    lastRunTimestamp: '2026-10-05T06:00:00Z',
    estimatedMonthlyCost: 6.20,
    hasHumanReviewGate: true,
    createdAt: '2026-09-05T11:00:00Z',
    updatedAt: '2026-10-05T06:02:00Z',
    createdBy: 'Founder (Admin)'
  },
  {
    id: 'auto-03',
    name: 'Stripe Subscription Settlement Webhook Handler',
    division: 'forge',
    trigger: 'Webhook (invoice.payment_succeeded)',
    inputsDescription: 'Stripe transaction payload with customer ID and product metadata',
    outputsDescription: 'Settled transaction logged in Revenue Operations and MRR updated',
    schedule: 'Event-driven',
    status: 'active',
    lastRunTimestamp: '2026-10-02T11:00:00Z',
    estimatedMonthlyCost: 0.00,
    hasHumanReviewGate: false,
    createdAt: '2026-09-10T14:00:00Z',
    updatedAt: '2026-10-02T11:01:00Z',
    createdBy: 'Founder (Admin)'
  }
];

export const SEED_BLOCKED_ATTEMPTS: BlockedAttemptRecord[] = [
  {
    id: 'blk-001',
    timestamp: '2026-09-28T14:22:10Z',
    attemptedDivision: 'forge',
    reason: 'Policy Violation: Upload attempted with classification "restricted". File ingestion blocked immediately without persistent storage.',
    attemptedBy: 'Founder (Admin)'
  }
];
