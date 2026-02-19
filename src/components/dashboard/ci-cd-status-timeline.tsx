"use client";

import type { CiCdRun } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CiCdStatusTimelineProps {
  timeline: CiCdRun[];
  retryLimit: number;
}

export function CiCdStatusTimeline({ timeline, retryLimit }: CiCdStatusTimelineProps) {
  return (
    <Card className="shadow-lg flex-1">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="font-headline">CI/CD Status</CardTitle>
          <span className="text-sm text-muted-foreground font-medium">
            {timeline.length}/{retryLimit} Iterations
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
          
          <ul className="space-y-8">
            {timeline.map((run) => (
              <li key={run.iteration} className="relative flex items-start gap-4">
                <div className={cn(
                  "absolute left-6 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-background",
                  run.status === "PASSED" ? "bg-success" : "bg-destructive"
                )}></div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-foreground">
                      Iteration {run.iteration}
                    </p>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-semibold",
                      run.status === "PASSED" ? "text-success" : "text-destructive"
                    )}>
                      {run.status === "PASSED" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      {run.status}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {run.timestamp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
