"use client";

import type { Score } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ScoreBreakdownPanelProps {
  score: Score;
}

const ScoreRow = ({ label, value, isPenalty = false }: { label: string, value: number, isPenalty?: boolean }) => (
  <div className="flex justify-between items-baseline text-sm">
    <p className="text-muted-foreground">{label}</p>
    <p className={`font-medium ${isPenalty ? 'text-destructive' : 'text-success'}`}>{isPenalty || value === 0 ? '' : '+'}{value} pts</p>
  </div>
);

export function ScoreBreakdownPanel({ score }: ScoreBreakdownPanelProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-headline">Score Breakdown</CardTitle>
        <CardDescription>Final score based on performance and efficiency.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Final Score</p>
          <p className="text-7xl font-extrabold text-primary font-headline tracking-tight">{score.total}</p>
        </div>
        <div className="space-y-2 pt-4">
            <ScoreRow label="Base Score" value={score.base} />
            <ScoreRow label="Speed Bonus" value={score.speedBonus} />
            <ScoreRow label="Efficiency Penalty" value={-score.efficiencyPenalty} isPenalty={score.efficiencyPenalty > 0} />
        </div>
        <div className="pt-2">
            <Progress value={score.total > 100 ? 100 : score.total < 0 ? 0 : score.total} className="w-full h-3" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>50</span>
                <span>100+</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
