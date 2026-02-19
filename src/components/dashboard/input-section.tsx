"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  repoUrl: z.string().url({ message: "Please enter a valid GitHub repository URL." }).refine(
    (url) => url.startsWith("https://github.com/"),
    "URL must be a GitHub repository."
  ),
  teamName: z.string().min(1, { message: "Team name is required." }),
  teamLeader: z.string().min(1, { message: "Team leader name is required." }),
});

export type InputFormData = z.infer<typeof formSchema>;

interface InputSectionProps {
  onRunAgent: (data: InputFormData) => void;
  isLoading: boolean;
}

export function InputSection({ onRunAgent, isLoading }: InputSectionProps) {
  const form = useForm<InputFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repoUrl: "https://github.com/Rift-Organisers/sample-repo",
      teamName: "RIFT ORGANISERS",
      teamLeader: "Saiyam Kumar",
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-primary">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl">Autonomous DevOps Agent</CardTitle>
        <CardDescription>Enter repository details to begin analysis and auto-fixing.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRunAgent)} className="space-y-6">
            <FormField
              control={form.control}
              name="repoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repository URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/user/repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Code Wizards" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamLeader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Leader Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Ada Lovelace" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Analyzing Repository..." : "Run Agent"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
