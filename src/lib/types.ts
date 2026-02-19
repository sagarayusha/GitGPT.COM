export type Fix = {
  file: string;
  bugType: 'LINTING' | 'SYNTAX' | 'LOGIC' | 'TYPE_ERROR' | 'IMPORT' | 'INDENTATION';
  lineNumber: number;
  commitMessage: string;
  status: 'Fixed' | 'Failed';
};

export type CiCdRun = {
  iteration: number;
  status: 'PASSED' | 'FAILED';
  timestamp: string;
};

export type RunSummary = {
  repoUrl: string;
  teamName: string;
  teamLeader: string;
  branchName: string;
  totalFailures: number;
  totalFixes: number;
  finalCiCdStatus: 'PASSED' | 'FAILED';
  totalTime: string;
};

export type Score = {
  base: number;
  speedBonus: number;
  efficiencyPenalty: number;
  total: number;
};

export type AnalysisResult = {
  summary: RunSummary;
  score: Score;
  fixes: Fix[];
  ciCdTimeline: CiCdRun[];
};
