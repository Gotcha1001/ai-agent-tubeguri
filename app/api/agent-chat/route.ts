// import { NextRequest } from "next/server";
// import { z } from "zod";
// import { tool } from "@openai/agents";

// export async function POST(req: NextRequest) {
//   const { input, tools, agents, conversationId } = await req.json();

//   // Map All Tools
//   const generatedTools = tools.map((t: any) => {
//     // Dynamically build zod object for parameters
//     const paramsSchema = z.object(
//       Object.fromEntries(t.parameters).map(([key, type]) => {
//         if (type === "string") return [key, z.string()];
//         if (type === "number") return [key, z.number()];
//         return [key, z.any()];
//       })
//     );

//     return tool({
//       name: t.name,
//       description: t.description,
//       parameters: paramsSchema,
//       async execute(params: Record<string, any>) {
//         // Replace placeholders in url
//         let url = t.url;
//         for (const key in params) {
//           url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
//         }
//         if (t.includesApiKey && t.apiKey) {
//           url += url.includes("?") ? `&key=${t.apiKey}` : `?key=${t.apiKey}`;
//         }

//         // // Make API request
//         const response = await fetch(url);
//         const data = await response.json();
//         // console.log(data);
//         // Return raw data (or transform if needed)
//         return data;
//       },
//     });
//   });
// }

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Agent, run, tool } from "@openai/agents";
import { openai } from "@/config/OpenAiModel";

export async function POST(req: NextRequest) {
  const { input, tools, agents, conversationId, agentName } = await req.json();

  // Map All Tools
  const generatedTools = tools.map((t: any) => {
    // Dynamically build zod object for parameters
    const paramsSchema = z.object(
      Object.fromEntries(
        Object.entries(t.parameters).map(([key, type]) => {
          if (type === "string") return [key, z.string()];
          if (type === "number") return [key, z.number()];
          return [key, z.any()];
        })
      )
    );

    return tool({
      name: t.name,
      description: t.description,
      parameters: paramsSchema,
      async execute(params: Record<string, any>) {
        // Replace placeholders in url
        let url = t.url;
        for (const key in params) {
          url = url.replace(`{{${key}}}`, encodeURIComponent(params[key]));
        }
        if (t.includesApiKey && t.apiKey) {
          url += url.includes("?") ? `&key=${t.apiKey}` : `?key=${t.apiKey}`;
        }

        // // Make API request
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        // Return raw data (or transform if needed)
        return data;
      },
    });
  });
  const createdAgents = agents.map((config: any) => {
    return new Agent({
      name: config?.name,
      instructions: config?.instructions,
      tools: generatedTools,
    });
  });

  const finalAgent = Agent.create({
    name: agentName,
    instructions: "You determine which agent to use based on the user query.",
    handoffs: createdAgents,
  });
  const result = await run(finalAgent, input, {
    conversationId: conversationId,
    stream: true,
  });
  const stream = result.toTextStream({
    compatibleWithNodeStreams: true,
  });
  //@ts-ignore
  return new Response(stream);
}

export async function GET(req: NextRequest) {
  const { id: conversationId } = await openai.conversations.create({});
  return NextResponse.json(conversationId);
}
