<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

<h1 align="center">FlowBoard</h1>

<p align="center">
  <strong>AI-Powered Project Management Platform</strong><br>
  A production-grade full-stack SaaS built with Next.js 16, TypeScript, PostgreSQL, and OpenAI.
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-features">Features</a> ·
  <a href="#-tech-stack">Tech Stack</a> ·
  <a href="#-architecture">Architecture</a> ·
  <a href="#-api-reference">API</a> ·
  <a href="#-deployment">Deployment</a>
</p>

---

## Overview

FlowBoard is a full-stack project management application that demonstrates real-world engineering across the entire stack — from database design and API architecture to responsive UI and AI integration. It's built to showcase skills that companies actively hire for in 2026.

### What It Does

- **Kanban boards** with drag-and-drop task management across 5 workflow stages
- **AI assistant** that analyzes tasks, suggests priorities, and provides project insights
- **Team collaboration** with workspaces, role-based access, and member management
- **Stripe billing** with Free/Pro subscription tiers and checkout flow
- **Analytics dashboard** with interactive bar charts and pie charts
- **Dark/light mode** with system-aware theme switching

---

## Features

### Core
- **Drag-and-drop Kanban** — Move tasks between Backlog, To Do, In Progress, In Review, and Done
- **Project management** — Create, organize, and track projects with custom colors
- **Task CRUD** — Full create/read/update/delete with status, priority, assignee, due dates, and labels
- **Comments** — Task-level discussion threads

### AI-Powered
- **Priority analysis** — GPT-4o-mini suggests task priorities based on title, description, and deadlines
- **Chat assistant** — Natural language interface for project insights and team recommendations

### Auth & Billing
- **NextAuth v5** — GitHub OAuth, Google OAuth, and email/password authentication
- **Stripe integration** — Subscription checkout with Free ($0) and Pro ($12/mo) plans
- **Workspace isolation** — Multi-tenant architecture with role-based access (Owner/Admin/Member)

### Engineering
- **Type-safe end-to-end** — TypeScript throughout with Zod validation at API boundaries
- **REST API** — 8 RESTful endpoints with proper HTTP methods and status codes
- **Database ORM** — Prisma 7 with PostgreSQL, typed queries, and migrations
- **CI/CD** — GitHub Actions pipeline with lint, typecheck, and build verification
- **Docker** — Multi-stage production Dockerfile + docker-compose with PostgreSQL and Redis
- **Responsive design** — Mobile-first with collapsible sidebar and touch-friendly interactions

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 (App Router) | Server components, API routes, file-based routing |
| **Language** | TypeScript 5 | End-to-end type safety |
| **Styling** | Tailwind CSS 4 | Utility-first CSS with design tokens |
| **Database** | PostgreSQL 16 | Relational data with JSON support |
| **ORM** | Prisma 7 | Type-safe database access, migrations, studio |
| **Auth** | NextAuth.js v5 | OAuth + credentials, JWT sessions |
| **AI** | OpenAI GPT-4o-mini | Task analysis and chat assistant |
| **Payments** | Stripe | Subscription billing, checkout sessions |
| **Charts** | Recharts | Declarative chart components |
| **DnD** | @hello-pangea/dnd | Accessible drag-and-drop |
| **Validation** | Zod | Runtime type validation at API boundaries |
| **Themes** | next-themes | Dark/light mode with system detection |
| **Docker** | Multi-stage build | Production-optimized container image |
| **CI/CD** | GitHub Actions | Automated lint, typecheck, build |

---

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+ (or use Docker)
- OpenAI API key (optional, for AI features)
- Stripe account (optional, for billing)

### Local Development

```bash
# Clone
git clone https://github.com/Issei-Kun9/flowboard.git
cd flowboard

# Install
npm install

# Configure
cp .env.example .env
# Edit .env with your database URL and API keys

# Database
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts   # optional: seed demo data

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Docker

```bash
docker compose up -d
# App runs at http://localhost:3000
# PostgreSQL at localhost:5432
# Redis at localhost:6379
```

---

## Project Structure

```
flowboard/
├── .github/workflows/         # CI/CD pipeline
├── prisma/
│   ├── schema.prisma          # Database schema (6 models)
│   └── seed.ts                # Demo data seeder
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login & register
│   │   ├── (dashboard)/       # Dashboard, projects, settings, team, billing, AI
│   │   └── api/               # REST API routes (8 endpoints)
│   ├── components/
│   │   ├── ui/                # 10 reusable primitives
│   │   ├── auth/              # Auth forms
│   │   ├── dashboard/         # Sidebar, header, stats, activity
│   │   ├── projects/          # Kanban board, project cards, modals
│   │   ├── tasks/             # Task cards, detail view, create modal
│   │   └── ai/                # Chat assistant
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Auth, DB, Stripe, OpenAI, utils
│   ├── types/                 # TypeScript interfaces
│   └── middleware.ts          # Auth route protection
├── docker-compose.yml         # Multi-service orchestration
├── Dockerfile                 # Multi-stage production build
└── README.md
```

---

## Architecture

### Database Schema

```
User ─────┬── Account (OAuth)
          ├── Session
          ├── WorkspaceMember ── Workspace ── Project ── Task ── TaskLabel
          ├── Task (assigned)                          │       └── Label
          ├── Task (created)                           ├── Comment
          └── Comment                                  └── (owned by User)
```

6 core models: `User`, `Workspace`, `Project`, `Task`, `Label`, `Comment`
Plus auth models: `Account`, `Session`, `VerificationToken`

### API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register with email/password |
| `GET` | `/api/projects?workspaceId=` | List workspace projects |
| `POST` | `/api/projects` | Create project |
| `GET/PATCH/DELETE` | `/api/projects/[id]` | Project CRUD |
| `GET` | `/api/tasks?projectId=` | List project tasks |
| `POST` | `/api/tasks` | Create task |
| `GET/PATCH/DELETE` | `/api/tasks/[id]` | Task CRUD |
| `POST` | `/api/ai/chat` | AI assistant chat |
| `POST` | `/api/stripe/checkout` | Create Stripe checkout |

### Key Design Decisions

1. **Prisma 7 + `@prisma/adapter-pg`** — Modern adapter pattern for type-safe PostgreSQL access
2. **JWT sessions** — Stateless auth for better scalability over database sessions
3. **Server-side AI** — OpenAI API never exposed to client; all calls go through API routes
4. **Lazy SDK initialization** — Stripe and OpenAI clients initialize on first use, not at module load (build-safe)
5. **Zod at boundaries** — Runtime validation on every API endpoint prevents invalid data
6. **Multi-tenant workspaces** — Workspace-scoped data isolation with role-based access control

---

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run db:generate  # Regenerate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed demo data
npm run db:studio    # Open Prisma Studio
npm run test:e2e     # Playwright E2E tests
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | Secret for JWT signing |
| `NEXTAUTH_URL` | Yes | App URL for auth callbacks |
| `GITHUB_CLIENT_ID` | No | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | No | GitHub OAuth client secret |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `OPENAI_API_KEY` | No | OpenAI API key for AI features |
| `STRIPE_SECRET_KEY` | No | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | No | Stripe publishable key |
| `NEXT_PUBLIC_APP_URL` | No | Public app URL (defaults to localhost) |

---

## Deployment

### Vercel (Recommended)

```bash
# Connect your repo to Vercel
# Set environment variables in Vercel dashboard
# Deploy automatically on push to main
```

### Docker Production

```bash
docker compose -f docker-compose.yml up -d --build
```

### Database

Use any PostgreSQL provider:
- **Supabase** — Free tier, generous limits
- **Neon** — Serverless PostgreSQL
- **Railway** — Managed PostgreSQL
- **AWS RDS** — Production-grade

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with Next.js, TypeScript, PostgreSQL, and OpenAI
</p>
