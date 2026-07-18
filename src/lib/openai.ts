import OpenAI from "openai";

let _openai: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    const isOpenRouter = !!process.env.OPENROUTER_API_KEY;
    _openai = new OpenAI({
      apiKey: isOpenRouter
        ? process.env.OPENROUTER_API_KEY
        : process.env.OPENAI_API_KEY || "sk-placeholder",
      baseURL: isOpenRouter
        ? "https://openrouter.ai/api/v1"
        : undefined,
    });
  }
  return _openai;
}

export async function analyzeTaskPriority(task: {
  title: string;
  description?: string | null;
  dueDate?: string | null;
}): Promise<{ priority: string; reasoning: string }> {
  const response = await getOpenAI().chat.completions.create({
    model: "nvidia/nemotron-3-super-120b-a12b:free",
    temperature: 0.3,
    max_tokens: 500,
    messages: [
      {
        role: "system",
        content: `You are a project management assistant. Analyze tasks and suggest priorities.
Respond with JSON only: { "priority": "URGENT" | "HIGH" | "MEDIUM" | "LOW" | "NONE", "reasoning": "brief explanation" }
Consider deadline urgency, task complexity, and general project management best practices.`,
      },
      {
        role: "user",
        content: `Analyze this task and suggest a priority:
Title: ${task.title}
Description: ${task.description || "No description"}
Due date: ${task.dueDate || "No due date"}`,
      },
    ],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content || '{"priority":"MEDIUM","reasoning":"Unable to analyze"}';
  return JSON.parse(content);
}

export async function chatWithAI(
  message: string,
  context: {
    projects: { name: string; taskCount: number; completedCount: number }[];
    recentTasks: { title: string; status: string; priority: string }[];
  }
): Promise<string> {
  const response = await getOpenAI().chat.completions.create({
    model: "nvidia/nemotron-3-super-120b-a12b:free",
    temperature: 0.7,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: `You are Kanvus, a project management assistant. Help users manage their projects and tasks efficiently.

Current workspace context:
- Projects: ${JSON.stringify(context.projects)}
- Recent tasks: ${JSON.stringify(context.recentTasks)}

Be concise, helpful, and actionable. Suggest task prioritization, identify bottlenecks, and recommend next steps when appropriate.`,
      },
      { role: "user", content: message },
    ],
  });

  return response.choices[0].message.content || "I couldn't process that request. Please try again.";
}
