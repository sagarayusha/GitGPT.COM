"use client";

import type { Fix } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FixesAppliedTableProps {
  fixes: Fix[];
}

export function FixesAppliedTable({ fixes }: FixesAppliedTableProps) {
  return (
    <Card className="shadow-lg col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline">Fixes Applied</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto max-h-[400px]">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Bug Type</TableHead>
                <TableHead className="text-center">Line</TableHead>
                <TableHead>Commit Message</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fixes.map((fix, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium flex items-center gap-2 whitespace-nowrap">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{fix.file}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="whitespace-nowrap">{fix.bugType}</Badge>
                  </TableCell>
                  <TableCell className="text-center">{fix.lineNumber}</TableCell>
                  <TableCell className="text-muted-foreground truncate max-w-xs">{fix.commitMessage}</TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "flex items-center justify-end gap-2 font-medium whitespace-nowrap",
                      fix.status === "Fixed" ? "text-success" : "text-destructive"
                    )}>
                      {fix.status === "Fixed" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      {fix.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
