"use client";

import type { RunSummary } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Users, User, AlertCircle, CheckCircle2, Clock, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface RunSummaryCardProps {
  summary: RunSummary;
}

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
  <div className="flex items-start justify-between text-sm py-3 border-b">
    <div className="flex items-center gap-3 text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
    <span className="font-medium text-foreground text-right break-words max-w-[60%]">{value}</span>
  </div>
);

export function RunSummaryCard({ summary }: RunSummaryCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Run Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <InfoRow icon={Github} label="Repository" value={summary.repoUrl} />
        <InfoRow icon={Users} label="Team" value={summary.teamName} />
        <InfoRow icon={User} label="Leader" value={summary.teamLeader} />
        <InfoRow icon={GitBranch} label="Branch" value={<span className="font-mono text-xs bg-muted p-1 rounded-md">{summary.branchName}</span>} />
        <InfoRow icon={AlertCircle} label="Failures Detected" value={summary.totalFailures} />
        <InfoRow icon={CheckCircle2} label="Fixes Applied" value={summary.totalFixes} />
        <InfoRow icon={Clock} label="Total Time" value={summary.totalTime} />
        <div className="flex items-center justify-between text-sm pt-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            {summary.finalCiCdStatus === 'PASSED' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <span>Final Status</span>
          </div>
          <Badge className={cn(
            "font-bold border-transparent text-xs",
            summary.finalCiCdStatus === 'PASSED' 
              ? 'bg-success text-success-foreground hover:bg-success/90'
              : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
          )}>
            {summary.finalCiCdStatus}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
