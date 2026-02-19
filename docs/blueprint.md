# **App Name**: GitGPT

## Core Features:

- Repository Analysis: Clone and analyze the structure of a provided GitHub repository URL.
- Automated Testing: Discover and automatically run all test files within the cloned repository.
- AI-Powered Fix Generation: Identify test failures and generate targeted fixes using an AI agent tool.
- Automated Commit & Branching: Commit generated fixes with the '[AI-AGENT]' prefix to a new branch named 'TEAM_NAME_LEADER_NAME_AI_Fix'.
- CI/CD Monitoring: Continuously monitor the CI/CD pipeline and iterate fix application until all tests pass or the retry limit is reached.
- Comprehensive Dashboard: Display results, score breakdown, fix status, and CI/CD timeline within a user-friendly React dashboard.
- Score Calculation: Based on speed and efficiency the total final score is displayed

## Style Guidelines:

- Primary color: Deep blue (#2E3192) to represent intelligence, stability and code.
- Background color: Very light gray (#F0F2F5), for a clean, unobtrusive backdrop that gives focus to content.
- Accent color: Violet (#736CED) to draw attention to key interactive elements without being distracting.
- Body and headline font: 'Inter', a sans-serif font, for its clean and modern aesthetic.
- Use minimalistic icons to represent repository status, test results, and AI actions.
- Implement a clean and responsive layout, optimized for both desktop and mobile viewing. Use clear visual hierarchy to guide the user through the analysis process.
- Employ subtle animations, such as progress loaders and status transitions, to provide feedback during long-running operations.