'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating targeted code fixes based on failed test results.
 *
 * - aiGeneratedCodeFixes - A function that orchestrates the generation of code fixes.
 * - AiGeneratedCodeFixesInput - The input type for the aiGeneratedCodeFixes function.
 * - AiGeneratedCodeFixesOutput - The return type for the aiGeneratedCodeFixes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the schema for a single failed test report
const FailedTestSchema = z.object({
  filePath: z.string().describe('The path to the file where the test failed.'),
  lineNumber: z.number().describe('The line number where the failure occurred.'),
  errorType: z.enum([
    'LINTING',
    'SYNTAX',
    'LOGIC',
    'TYPE_ERROR',
    'IMPORT',
    'INDENTATION'
  ]).describe('The type of bug detected.'),
  errorMessage: z.string().describe('The error message from the test runner.'),
  relevantCodeSnippet: z.string().describe('The code snippet around the error, containing a few lines before and after.'),
  fullFileContent: z.string().describe('The complete content of the file where the error occurred. This is crucial for context and applying fixes reliably.')
}).describe('Details of a single failed test, including error type and relevant code context.');

// Define the input schema for the flow
const AiGeneratedCodeFixesInputSchema = z.object({
  failedTests: z.array(FailedTestSchema).describe('An array of failed test reports that require fixing.')
}).describe('Input for generating code fixes based on failed tests.');

export type AiGeneratedCodeFixesInput = z.infer<typeof AiGeneratedCodeFixesInputSchema>;

// Define the schema for a single generated fix
const GeneratedFixSchema = z.object({
  filePath: z.string().describe('The path to the file that needs to be modified.'),
  bugType: z.enum([
    'LINTING',
    'SYNTAX',
    'LOGIC',
    'TYPE_ERROR',
    'IMPORT',
    'INDENTATION'
  ]).describe('The type of bug that was fixed.'),
  lineStart: z.number().describe('The starting line number (1-indexed) in the original file where the change begins.'),
  lineEnd: z.number().describe('The ending line number (1-indexed) in the original file where the change ends. If only one line is changed, this will be the same as lineStart.'),
  originalContent: z.string().describe('The exact content of the lines from lineStart to lineEnd in the original file, used for verification before applying the fix.'),
  fixedContent: z.string().describe('The new content that should replace the originalContent in the specified line range.'),
  commitMessage: z.string().describe('A concise and descriptive commit message for this specific fix.')
}).describe('A proposed code fix for a detected bug.');

// Define the output schema for the flow
const AiGeneratedCodeFixesOutputSchema = z.object({
  fixes: z.array(GeneratedFixSchema).describe('An array of generated code fixes, one for each identified issue.')
}).describe('Output containing an array of generated code fixes.');

export type AiGeneratedCodeFixesOutput = z.infer<typeof AiGeneratedCodeFixesOutputSchema>;

// Exported wrapper function
export async function aiGeneratedCodeFixes(
  input: AiGeneratedCodeFixesInput
): Promise<AiGeneratedCodeFixesOutput> {
  return aiGeneratedCodeFixesFlow(input);
}

// Define the prompt for the AI model
const codeFixPrompt = ai.definePrompt({
  name: 'codeFixPrompt',
  input: { schema: AiGeneratedCodeFixesInputSchema },
  output: { schema: AiGeneratedCodeFixesOutputSchema },
  prompt: `You are an expert software engineer specialized in debugging and fixing code issues.
Your task is to analyze a list of failed tests, understand the root cause of each failure, and propose a precise code fix for each.
You must provide the full content of the fixed lines, not just a diff.
Ensure the fixed content replaces the original content exactly, and the line numbers are accurate based on the provided full file content.
Also, provide a clear and concise commit message for each fix.

Here are the failed tests:

{{#each failedTests}}
--- Failed Test {{@index}}: ---
File: {{{filePath}}}
Line Number: {{{lineNumber}}}
Error Type: {{{errorType}}}
Error Message: {{{errorMessage}}}

Relevant Code Snippet:
\

{{{relevantCodeSnippet}}}
\

Full File Content for context:
\

{{{fullFileContent}}}
\

----------------------------------
{{/each}}

Based on the information above, generate a JSON array of fixes. Each fix object must contain:
- 'filePath': The path to the file that needs to be modified.
- 'bugType': The type of bug (LINTING, SYNTAX, LOGIC, TYPE_ERROR, IMPORT, INDENTATION).
- 'lineStart': The starting line number (1-indexed) in the original file where the change begins.
- 'lineEnd': The ending line number (1-indexed) in the original file where the change ends. If only one line is changed, this should be the same as lineStart.
- 'originalContent': The exact content of the lines from lineStart to lineEnd in the original file. This is crucial for verifying the fix.
- 'fixedContent': The new content that should replace the originalContent in the specified line range.
- 'commitMessage': A concise and descriptive commit message for this specific fix.

Your output must be a JSON object conforming to the AiGeneratedCodeFixesOutputSchema.
Do not include any other text or explanation outside the JSON object.
`
});

// Define the Genkit flow
const aiGeneratedCodeFixesFlow = ai.defineFlow(
  {
    name: 'aiGeneratedCodeFixesFlow',
    inputSchema: AiGeneratedCodeFixesInputSchema,
    outputSchema: AiGeneratedCodeFixesOutputSchema,
  },
  async (input) => {
    const { output } = await codeFixPrompt(input);
    if (!output) {
      throw new Error('Failed to generate code fixes: output was null or undefined.');
    }
    return output;
  }
);
