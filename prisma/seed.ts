import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

// Helper to generate dates
const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);
const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000);

async function main() {
  console.log("Seeding database...");

  // ============================================
  // USERS
  // ============================================
  const hashedPassword = await bcrypt.hash("password123", 12);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "demo@kanvus.dev" },
      update: {},
      create: {
        name: "Alex Morgan",
        email: "demo@kanvus.dev",
        password: hashedPassword,
        plan: "PRO",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
    }),
    prisma.user.upsert({
      where: { email: "sarah@kanvus.dev" },
      update: {},
      create: {
        name: "Sarah Chen",
        email: "sarah@kanvus.dev",
        password: hashedPassword,
        plan: "FREE",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
    }),
    prisma.user.upsert({
      where: { email: "jordan@kanvus.dev" },
      update: {},
      create: {
        name: "Jordan Williams",
        email: "jordan@kanvus.dev",
        password: hashedPassword,
        plan: "FREE",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      },
    }),
    prisma.user.upsert({
      where: { email: "maya@kanvus.dev" },
      update: {},
      create: {
        name: "Maya Patel",
        email: "maya@kanvus.dev",
        password: hashedPassword,
        plan: "FREE",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      },
    }),
    prisma.user.upsert({
      where: { email: "alex@kanvus.dev" },
      update: {},
      create: {
        name: "Alex Rivera",
        email: "alex@kanvus.dev",
        password: hashedPassword,
        plan: "FREE",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexRivera",
      },
    }),
  ]);

  const [demoUser, sarah, jordan, maya, alex] = users;
  console.log(`Created ${users.length} users`);

  // ============================================
  // WORKSPACE
  // ============================================
  const workspace = await prisma.workspace.upsert({
    where: { slug: "kanvus-team" },
    update: {},
    create: {
      name: "Kanvus Team",
      slug: "kanvus-team",
      description: "Main workspace for the Kanvus product team",
      ownerId: demoUser.id,
    },
  });

  // Add all users as members
  await Promise.all([
    prisma.workspaceMember.upsert({
      where: { userId_workspaceId: { userId: demoUser.id, workspaceId: workspace.id } },
      update: {},
      create: { userId: demoUser.id, workspaceId: workspace.id, role: "OWNER" },
    }),
    prisma.workspaceMember.upsert({
      where: { userId_workspaceId: { userId: sarah.id, workspaceId: workspace.id } },
      update: {},
      create: { userId: sarah.id, workspaceId: workspace.id, role: "ADMIN" },
    }),
    prisma.workspaceMember.upsert({
      where: { userId_workspaceId: { userId: jordan.id, workspaceId: workspace.id } },
      update: {},
      create: { userId: jordan.id, workspaceId: workspace.id, role: "MEMBER" },
    }),
    prisma.workspaceMember.upsert({
      where: { userId_workspaceId: { userId: maya.id, workspaceId: workspace.id } },
      update: {},
      create: { userId: maya.id, workspaceId: workspace.id, role: "MEMBER" },
    }),
    prisma.workspaceMember.upsert({
      where: { userId_workspaceId: { userId: alex.id, workspaceId: workspace.id } },
      update: {},
      create: { userId: alex.id, workspaceId: workspace.id, role: "MEMBER" },
    }),
  ]);

  console.log(`Created workspace: ${workspace.name}`);

  // ============================================
  // PROJECTS
  // ============================================
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: "Website Redesign",
        description: "Complete redesign of the marketing website with new brand identity",
        color: "#00C896",
        workspaceId: workspace.id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Mobile App v2",
        description: "React Native mobile app with new features and performance improvements",
        color: "#7DD3FC",
        workspaceId: workspace.id,
      },
    }),
    prisma.project.create({
      data: {
        name: "API Infrastructure",
        description: "Backend API redesign with GraphQL and real-time subscriptions",
        color: "#14B8A6",
        workspaceId: workspace.id,
      },
    }),
    prisma.project.create({
      data: {
        name: "Design System",
        description: "Unified component library and design tokens across all platforms",
        color: "#FBBF24",
        workspaceId: workspace.id,
      },
    }),
  ]);

  const [website, mobileApp, apiInfra, designSystem] = projects;
  console.log(`Created ${projects.length} projects`);

  // ============================================
  // LABELS
  // ============================================
  const allLabels = await Promise.all([
    // Website labels
    prisma.label.create({ data: { name: "UI/UX", color: "#00C896", projectId: website.id } }),
    prisma.label.create({ data: { name: "SEO", color: "#7DD3FC", projectId: website.id } }),
    prisma.label.create({ data: { name: "Content", color: "#FBBF24", projectId: website.id } }),
    // Mobile labels
    prisma.label.create({ data: { name: "iOS", color: "#EF4444", projectId: mobileApp.id } }),
    prisma.label.create({ data: { name: "Android", color: "#22C55E", projectId: mobileApp.id } }),
    prisma.label.create({ data: { name: "Performance", color: "#FBBF24", projectId: mobileApp.id } }),
    // API labels
    prisma.label.create({ data: { name: "GraphQL", color: "#14B8A6", projectId: apiInfra.id } }),
    prisma.label.create({ data: { name: "WebSocket", color: "#7DD3FC", projectId: apiInfra.id } }),
    prisma.label.create({ data: { name: "Security", color: "#EF4444", projectId: apiInfra.id } }),
    // Design System labels
    prisma.label.create({ data: { name: "Component", color: "#00C896", projectId: designSystem.id } }),
    prisma.label.create({ data: { name: "Documentation", color: "#FBBF24", projectId: designSystem.id } }),
    prisma.label.create({ data: { name: "Accessibility", color: "#7DD3FC", projectId: designSystem.id } }),
  ]);

  console.log(`Created ${allLabels.length} labels`);

  // ============================================
  // TASKS - Website Redesign
  // ============================================
  const websiteTasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Create wireframes for homepage",
        description: "Design low-fidelity wireframes for the new homepage layout including hero, features, pricing, and footer sections.",
        status: "DONE",
        priority: "HIGH",
        projectId: website.id,
        creatorId: demoUser.id,
        assigneeId: sarah.id,
        dueDate: daysAgo(5),
        createdAt: daysAgo(14),
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        title: "Design hero section animations",
        description: "Create micro-interactions and hover effects for the hero section using Framer Motion.",
        status: "DONE",
        priority: "MEDIUM",
        projectId: website.id,
        creatorId: demoUser.id,
        assigneeId: sarah.id,
        dueDate: daysAgo(3),
        createdAt: daysAgo(12),
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        title: "Implement responsive navigation",
        description: "Build mobile-first navigation with hamburger menu, search, and user dropdown.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: website.id,
        creatorId: demoUser.id,
        assigneeId: jordan.id,
        dueDate: daysFromNow(2),
        createdAt: daysAgo(10),
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        title: "Optimize for Core Web Vitals",
        description: "Improve LCP, FID, and CLS scores. Target 90+ on all metrics.",
        status: "TODO",
        priority: "HIGH",
        projectId: website.id,
        creatorId: demoUser.id,
        assigneeId: alex.id,
        dueDate: daysFromNow(7),
        createdAt: daysAgo(8),
        order: 4,
      },
    }),
    prisma.task.create({
      data: {
        title: "Write meta descriptions",
        description: "Create SEO-optimized meta descriptions for all pages.",
        status: "TODO",
        priority: "LOW",
        projectId: website.id,
        creatorId: demoUser.id,
        assigneeId: maya.id,
        dueDate: daysFromNow(14),
        createdAt: daysAgo(5),
        order: 5,
      },
    }),
    prisma.task.create({
      data: {
        title: "A/B test pricing page",
        description: "Set up A/B test for pricing page variations to optimize conversion.",
        status: "BACKLOG",
        priority: "MEDIUM",
        projectId: website.id,
        creatorId: demoUser.id,
        dueDate: daysFromNow(21),
        createdAt: daysAgo(3),
        order: 6,
      },
    }),
  ]);

  // ============================================
  // TASKS - Mobile App v2
  // ============================================
  const mobileTasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Implement push notifications",
        description: "Add Firebase Cloud Messaging for iOS and Android push notifications.",
        status: "IN_PROGRESS",
        priority: "URGENT",
        projectId: mobileApp.id,
        creatorId: demoUser.id,
        assigneeId: alex.id,
        dueDate: daysFromNow(1),
        createdAt: daysAgo(7),
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        title: "Offline data sync",
        description: "Implement offline-first architecture with local SQLite database sync.",
        status: "TODO",
        priority: "HIGH",
        projectId: mobileApp.id,
        creatorId: demoUser.id,
        assigneeId: jordan.id,
        dueDate: daysFromNow(10),
        createdAt: daysAgo(5),
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        title: "Biometric authentication",
        description: "Add Face ID and fingerprint authentication for secure app access.",
        status: "TODO",
        priority: "MEDIUM",
        projectId: mobileApp.id,
        creatorId: demoUser.id,
        assigneeId: alex.id,
        dueDate: daysFromNow(14),
        createdAt: daysAgo(4),
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        title: "App Store screenshots",
        description: "Create screenshots for App Store and Play Store listings.",
        status: "BACKLOG",
        priority: "LOW",
        projectId: mobileApp.id,
        creatorId: demoUser.id,
        assigneeId: sarah.id,
        dueDate: daysFromNow(21),
        createdAt: daysAgo(2),
        order: 4,
      },
    }),
    prisma.task.create({
      data: {
        title: "Performance profiling",
        description: "Profile and optimize memory usage, startup time, and frame rate.",
        status: "DONE",
        priority: "HIGH",
        projectId: mobileApp.id,
        creatorId: demoUser.id,
        assigneeId: alex.id,
        dueDate: daysAgo(2),
        createdAt: daysAgo(20),
        order: 5,
      },
    }),
  ]);

  // ============================================
  // TASKS - API Infrastructure
  // ============================================
  const apiTasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Set up GraphQL server",
        description: "Configure Apollo Server with TypeScript and schema-first approach.",
        status: "DONE",
        priority: "HIGH",
        projectId: apiInfra.id,
        creatorId: demoUser.id,
        assigneeId: alex.id,
        dueDate: daysAgo(10),
        createdAt: daysAgo(21),
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        title: "Implement rate limiting",
        description: "Add Redis-based rate limiting with configurable thresholds per API key.",
        status: "DONE",
        priority: "URGENT",
        projectId: apiInfra.id,
        creatorId: demoUser.id,
        assigneeId: jordan.id,
        dueDate: daysAgo(7),
        createdAt: daysAgo(18),
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        title: "WebSocket subscriptions",
        description: "Add real-time subscriptions for live data updates.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: apiInfra.id,
        creatorId: demoUser.id,
        assigneeId: jordan.id,
        dueDate: daysFromNow(3),
        createdAt: daysAgo(12),
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        title: "API documentation portal",
        description: "Build interactive API docs with GraphQL Playground and examples.",
        status: "TODO",
        priority: "MEDIUM",
        projectId: apiInfra.id,
        creatorId: demoUser.id,
        assigneeId: maya.id,
        dueDate: daysFromNow(10),
        createdAt: daysAgo(5),
        order: 4,
      },
    }),
    prisma.task.create({
      data: {
        title: "Load testing",
        description: "Write and run load tests to ensure API handles 10k concurrent users.",
        status: "BACKLOG",
        priority: "MEDIUM",
        projectId: apiInfra.id,
        creatorId: demoUser.id,
        dueDate: daysFromNow(14),
        createdAt: daysAgo(3),
        order: 5,
      },
    }),
  ]);

  // ============================================
  // TASKS - Design System
  // ============================================
  const designTasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Create color token system",
        description: "Define semantic color tokens for light/dark modes with CSS variables.",
        status: "DONE",
        priority: "HIGH",
        projectId: designSystem.id,
        creatorId: demoUser.id,
        assigneeId: sarah.id,
        dueDate: daysAgo(12),
        createdAt: daysAgo(20),
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        title: "Build Button component",
        description: "Create Button with variants: primary, secondary, ghost, destructive. Include loading states.",
        status: "DONE",
        priority: "HIGH",
        projectId: designSystem.id,
        creatorId: demoUser.id,
        assigneeId: jordan.id,
        dueDate: daysAgo(10),
        createdAt: daysAgo(18),
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        title: "Typography scale",
        description: "Define typography scale with Inter/Geist fonts, line heights, and letter spacing.",
        status: "DONE",
        priority: "MEDIUM",
        projectId: designSystem.id,
        creatorId: demoUser.id,
        assigneeId: sarah.id,
        dueDate: daysAgo(8),
        createdAt: daysAgo(15),
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        title: "Form components",
        description: "Build Input, Select, Checkbox, Radio, and Textarea with validation.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: designSystem.id,
        creatorId: demoUser.id,
        assigneeId: jordan.id,
        dueDate: daysFromNow(2),
        createdAt: daysAgo(7),
        order: 4,
      },
    }),
    prisma.task.create({
      data: {
        title: "Write Storybook stories",
        description: "Create stories for all components with interactive controls.",
        status: "TODO",
        priority: "MEDIUM",
        projectId: designSystem.id,
        creatorId: demoUser.id,
        assigneeId: maya.id,
        dueDate: daysFromNow(7),
        createdAt: daysAgo(3),
        order: 5,
      },
    }),
    prisma.task.create({
      data: {
        title: "Accessibility audit",
        description: "Test all components with screen readers and keyboard navigation.",
        status: "TODO",
        priority: "HIGH",
        projectId: designSystem.id,
        creatorId: demoUser.id,
        assigneeId: sarah.id,
        dueDate: daysFromNow(10),
        createdAt: daysAgo(2),
        order: 6,
      },
    }),
  ]);

  const allTasks = [...websiteTasks, ...mobileTasks, ...apiTasks, ...designTasks];
  console.log(`Created ${allTasks.length} tasks`);

  // ============================================
  // LABEL ASSOCIATIONS
  // ============================================
  const labelAssociations = [
    // Website
    { taskId: websiteTasks[0].id, labelId: allLabels[0].id }, // wireframes - UI/UX
    { taskId: websiteTasks[1].id, labelId: allLabels[0].id }, // animations - UI/UX
    { taskId: websiteTasks[2].id, labelId: allLabels[0].id }, // navigation - UI/UX
    { taskId: websiteTasks[3].id, labelId: allLabels[1].id }, // Core Web Vitals - SEO
    { taskId: websiteTasks[4].id, labelId: allLabels[2].id }, // meta descriptions - Content
    // Mobile
    { taskId: mobileTasks[0].id, labelId: allLabels[3].id }, // push notifications - iOS
    { taskId: mobileTasks[0].id, labelId: allLabels[4].id }, // push notifications - Android
    { taskId: mobileTasks[1].id, labelId: allLabels[5].id }, // offline sync - Performance
    { taskId: mobileTasks[4].id, labelId: allLabels[5].id }, // performance profiling - Performance
    // API
    { taskId: apiTasks[0].id, labelId: allLabels[6].id }, // GraphQL server - GraphQL
    { taskId: apiTasks[2].id, labelId: allLabels[7].id }, // WebSocket - WebSocket
    { taskId: apiTasks[1].id, labelId: allLabels[8].id }, // rate limiting - Security
    // Design System
    { taskId: designTasks[0].id, labelId: allLabels[9].id }, // color tokens - Component
    { taskId: designTasks[1].id, labelId: allLabels[9].id }, // Button - Component
    { taskId: designTasks[2].id, labelId: allLabels[10].id }, // typography - Documentation
    { taskId: designTasks[3].id, labelId: allLabels[9].id }, // form components - Component
    { taskId: designTasks[5].id, labelId: allLabels[11].id }, // accessibility - Accessibility
  ];

  await Promise.all(
    labelAssociations.map((assoc) =>
      prisma.taskLabel.create({ data: assoc })
    )
  );
  console.log(`Added ${labelAssociations.length} label associations`);

  // ============================================
  // COMMENTS
  // ============================================
  const comments = await Promise.all([
    // Website comments
    prisma.comment.create({
      data: {
        content: "The hero section looks amazing! Love the gradient treatment. Let's ship this.",
        taskId: websiteTasks[0].id,
        authorId: demoUser.id,
        createdAt: daysAgo(4),
      },
    }),
    prisma.comment.create({
      data: {
        content: "Thanks! I've refined the spacing and added the micro-interactions we discussed.",
        taskId: websiteTasks[1].id,
        authorId: sarah.id,
        createdAt: daysAgo(2),
      },
    }),
    prisma.comment.create({
      data: {
        content: "Working on the mobile nav now. Should have it ready for review by tomorrow.",
        taskId: websiteTasks[2].id,
        authorId: jordan.id,
        createdAt: daysAgo(1),
      },
    }),
    // Mobile comments
    prisma.comment.create({
      data: {
        content: "Push notifications are working on iOS. Testing Android now.",
        taskId: mobileTasks[0].id,
        authorId: alex.id,
        createdAt: hoursAgo(6),
      },
    }),
    prisma.comment.create({
      data: {
        content: "Great progress! Make sure to handle the notification permissions gracefully.",
        taskId: mobileTasks[0].id,
        authorId: demoUser.id,
        createdAt: hoursAgo(4),
      },
    }),
    // API comments
    prisma.comment.create({
      data: {
        content: "GraphQL schema is ready. Added queries for users, projects, and tasks.",
        taskId: apiTasks[0].id,
        authorId: alex.id,
        createdAt: daysAgo(9),
      },
    }),
    prisma.comment.create({
      data: {
        content: "WebSocket subscriptions are 80% done. Need to add error handling.",
        taskId: apiTasks[2].id,
        authorId: jordan.id,
        createdAt: daysAgo(1),
      },
    }),
    // Design System comments
    prisma.comment.create({
      data: {
        content: "Color tokens are live! Check out the new obsidian/emerald palette.",
        taskId: designTasks[0].id,
        authorId: sarah.id,
        createdAt: daysAgo(11),
      },
    }),
    prisma.comment.create({
      data: {
        content: "Button component is done. All variants working with proper focus states.",
        taskId: designTasks[1].id,
        authorId: jordan.id,
        createdAt: daysAgo(9),
      },
    }),
    prisma.comment.create({
      data: {
        content: "Form components are in progress. Input and Select are done, working on Checkbox now.",
        taskId: designTasks[3].id,
        authorId: jordan.id,
        createdAt: hoursAgo(12),
      },
    }),
  ]);

  console.log(`Created ${comments.length} comments`);

  console.log("\n✓ Database seeded successfully!");
  console.log("\nDemo accounts:");
  console.log("  demo@kanvus.dev / password123 (Owner)");
  console.log("  sarah@kanvus.dev / password123 (Admin)");
  console.log("  jordan@kanvus.dev / password123 (Member)");
  console.log("  maya@kanvus.dev / password123 (Member)");
  console.log("  alex@kanvus.dev / password123 (Member)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
