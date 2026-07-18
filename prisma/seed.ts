import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash("password123", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@kanvus.dev" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@kanvus.dev",
      password: hashedPassword,
      plan: "FREE",
    },
  });

  console.log(`Created user: ${user.email}`);

  const workspace = await prisma.workspace.upsert({
    where: { slug: "demo-workspace" },
    update: {},
    create: {
      name: "Demo Workspace",
      slug: "demo-workspace",
      description: "A demo workspace to get started",
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "OWNER",
        },
      },
    },
  });

  console.log(`Created workspace: ${workspace.name}`);

  const project = await prisma.project.create({
    data: {
      name: "Product Launch",
      description: "Q3 product launch planning and execution",
      color: "#6366f1",
      workspaceId: workspace.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Mobile App",
      description: "React Native mobile application development",
      color: "#22c55e",
      workspaceId: workspace.id,
    },
  });

  console.log(`Created projects: ${project.name}, ${project2.name}`);

  const labels = await Promise.all([
    prisma.label.create({
      data: { name: "Bug", color: "#ef4444", projectId: project.id },
    }),
    prisma.label.create({
      data: { name: "Feature", color: "#3b82f6", projectId: project.id },
    }),
    prisma.label.create({
      data: { name: "Urgent", color: "#f97316", projectId: project.id },
    }),
    prisma.label.create({
      data: { name: "Backend", color: "#8b5cf6", projectId: project2.id },
    }),
    prisma.label.create({
      data: { name: "Frontend", color: "#06b6d4", projectId: project2.id },
    }),
  ]);

  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        title: "Design landing page",
        description: "Create wireframes and high-fidelity mockups for the product landing page",
        status: "DONE",
        priority: "HIGH",
        projectId: project.id,
        creatorId: user.id,
        assigneeId: user.id,
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        status: "IN_PROGRESS",
        priority: "HIGH",
        projectId: project.id,
        creatorId: user.id,
        assigneeId: user.id,
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        title: "Write API documentation",
        description: "Document all REST API endpoints with examples",
        status: "TODO",
        priority: "MEDIUM",
        projectId: project.id,
        creatorId: user.id,
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        title: "Performance optimization",
        description: "Optimize bundle size and improve Core Web Vitals scores",
        status: "BACKLOG",
        priority: "LOW",
        projectId: project.id,
        creatorId: user.id,
        order: 4,
      },
    }),
    prisma.task.create({
      data: {
        title: "User authentication flow",
        description: "Implement login, register, and password reset flows",
        status: "IN_PROGRESS",
        priority: "URGENT",
        projectId: project2.id,
        creatorId: user.id,
        assigneeId: user.id,
        order: 1,
      },
    }),
    prisma.task.create({
      data: {
        title: "Build navigation component",
        description: "Create responsive navigation with mobile hamburger menu",
        status: "TODO",
        priority: "MEDIUM",
        projectId: project2.id,
        creatorId: user.id,
        order: 2,
      },
    }),
    prisma.task.create({
      data: {
        title: "Database schema design",
        description: "Design and implement the PostgreSQL schema with Prisma",
        status: "DONE",
        priority: "HIGH",
        projectId: project2.id,
        creatorId: user.id,
        assigneeId: user.id,
        order: 3,
      },
    }),
    prisma.task.create({
      data: {
        title: "Deploy to production",
        description: "Set up production environment on Vercel with PostgreSQL",
        status: "TODO",
        priority: "HIGH",
        projectId: project2.id,
        creatorId: user.id,
        order: 4,
      },
    }),
  ]);

  console.log(`Created ${tasks.length} tasks`);

  // Add labels to some tasks
  await Promise.all([
    prisma.taskLabel.create({
      data: { taskId: tasks[0].id, labelId: labels[1].id },
    }),
    prisma.taskLabel.create({
      data: { taskId: tasks[1].id, labelId: labels[1].id },
    }),
    prisma.taskLabel.create({
      data: { taskId: tasks[2].id, labelId: labels[1].id },
    }),
    prisma.taskLabel.create({
      data: { taskId: tasks[4].id, labelId: labels[2].id },
    }),
    prisma.taskLabel.create({
      data: { taskId: tasks[5].id, labelId: labels[4].id },
    }),
  ]);

  console.log("Added labels to tasks");

  // Create some comments
  await Promise.all([
    prisma.comment.create({
      data: {
        content: "Great work on this! The design looks fantastic.",
        taskId: tasks[0].id,
        authorId: user.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: "I've started working on the GitHub Actions workflow. Should have a PR ready by tomorrow.",
        taskId: tasks[1].id,
        authorId: user.id,
      },
    }),
  ]);

  console.log("Created comments");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
