"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/types";
import { Header } from "@/components/dashboard/header";
import { InputSection, type InputFormData } from "@/components/dashboard/input-section";
import { RunSummaryCard } from "@/components/dashboard/run-summary-card";
import { ScoreBreakdownPanel } from "@/components/dashboard/score-breakdown-panel";
import { FixesAppliedTable } from "@/components/dashboard/fixes-applied-table";
import { CiCdStatusTimeline } from "@/components/dashboard/ci-cd-status-timeline";

// Mock data generation
const generateMockData = (formData: InputFormData): AnalysisResult => {
    const totalFailures = Math.floor(Math.random() * 20) + 5;
    const fixesApplied = Math.floor(totalFailures * (Math.random() * 0.4 + 0.6)); // 60-100% of failures fixed
    const commits = Math.floor(fixesApplied * (Math.random() * 0.2 + 1)); // 1 to 1.2 commits per fix
    const timeTakenMs = Math.floor(Math.random() * 8 * 60 * 1000) + (2 * 60 * 1000); // 2-10 minutes
  
    const finalStatus = Math.random() > 0.2 ? "PASSED" : "FAILED";
    const iterations = Math.floor(Math.random() * 4) + 1;
  
    const bugTypes: AnalysisResult['fixes'][0]['bugType'][] = ['LINTING', 'SYNTAX', 'LOGIC', 'TYPE_ERROR', 'IMPORT', 'INDENTATION'];
  
    const fixes: AnalysisResult['fixes'] = Array.from({ length: fixesApplied }, (_, i) => ({
      file: `src/utils/file_${i}.py`,
      bugType: bugTypes[Math.floor(Math.random() * bugTypes.length)],
      lineNumber: Math.floor(Math.random() * 100) + 1,
      commitMessage: `[AI-AGENT] Fix bug in component logic`,
      status: Math.random() > 0.1 ? 'Fixed' : 'Failed',
    }));
  
    const ciCdTimeline: AnalysisResult['ciCdTimeline'] = Array.from({ length: iterations }, (_, i) => ({
      iteration: i + 1,
      status: i + 1 === iterations ? finalStatus : 'FAILED',
      timestamp: new Date(Date.now() - (iterations - i) * 60000).toLocaleString(),
    }));

    const speedBonus = timeTakenMs < 5 * 60 * 1000 ? 10 : 0;
    const efficiencyPenalty = commits > 20 ? (commits - 20) * 2 : 0;

    return {
      summary: {
        repoUrl: formData.repoUrl,
        teamName: formData.teamName,
        teamLeader: formData.teamLeader,
        branchName: `${formData.teamName.replace(/\s+/g, '_').toUpperCase()}_${formData.teamLeader.replace(/\s+/g, '_').toUpperCase()}_AI_Fix`,
        totalFailures,
        totalFixes: fixes.filter(f => f.status === 'Fixed').length,
        finalCiCdStatus: finalStatus,
        totalTime: `${Math.floor(timeTakenMs / 60000)}m ${Math.floor((timeTakenMs % 60000) / 1000)}s`,
      },
      score: {
        base: 100,
        speedBonus,
        efficiencyPenalty,
        total: 100 + speedBonus - efficiencyPenalty,
      },
      fixes,
      ciCdTimeline,
    };
};
const RETRY_LIMIT = 5;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleRunAgent = (data: InputFormData) => {
    setIsLoading(true);
    setAnalysisResult(null);

    // Simulate API call and analysis
    setTimeout(() => {
      const mockData = generateMockData(data);
      setAnalysisResult(mockData);
      setIsLoading(false);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        {!analysisResult && (
          <div className="flex flex-col items-center justify-center h-full pt-10 md:pt-20">
            <InputSection onRunAgent={handleRunAgent} isLoading={isLoading} />
          </div>
        )}
        
        {analysisResult && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
            <div className="lg:col-span-1 flex flex-col gap-6">
              <RunSummaryCard summary={analysisResult.summary} />
              <ScoreBreakdownPanel score={analysisResult.score} />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
                <FixesAppliedTable fixes={analysisResult.fixes} />
                <CiCdStatusTimeline timeline={analysisResult.ciCdTimeline} retryLimit={RETRY_LIMIT} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
