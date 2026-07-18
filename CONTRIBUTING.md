# Contributing to Kanvus

Thanks for your interest in contributing! This document will help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a new branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Push to your fork and submit a pull request

## Development Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/kanvus.git
cd kanvus

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and other keys

# Run the dev server
npm run dev
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Login/Register pages
│   ├── (dashboard)/  # Dashboard, projects, settings
│   └── api/          # API routes
├── components/       # React components
│   ├── auth/         # Auth forms
│   ├── dashboard/    # Dashboard UI
│   └── ui/           # Shared UI components
├── lib/              # Utilities, auth, DB client
└── prisma/           # Database schema
```

## Tech Stack

- **Frontend**: React, Next.js 16, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth v5
- **Payments**: Stripe
- **AI**: OpenAI API

## Good First Issues

Look for issues tagged with [`good first issue`](https://github.com/Issei-Kun9/kanvus/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22). These are beginner-friendly tasks.

## Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing code patterns
- Use Tailwind CSS for styling
- Keep components small and focused

### Commit Messages

```
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting, missing semicolons
refactor: code restructuring
test: adding tests
chore: maintenance tasks
```

### Pull Requests

- Keep PRs focused on one change
- Add a clear description of what changed and why
- Make sure `npm run build` passes
- Add screenshots for UI changes

### Reporting Issues

- Use the issue templates
- Include steps to reproduce
- Include browser/OS info for UI bugs

## Need Help?

- Open an issue with the `question` label
- Comment on any issue you'd like to work on

## Code of Conduct

Be respectful and inclusive. We're here to learn and build together.
