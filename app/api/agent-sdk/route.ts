import { NextRequest } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { openai } from "@/config/OpenAiModel";
import z from "zod";
import { Agent, run, tool } from "@openai/agents";

export async function POST(req: NextRequest) {
  const { userId, agentId, userInput } = await req.json();

  const agentDetail = await fetchQuery(api.agent.GetAgentById, {
    agentId: agentId,
  });
  //Check if the conversation ID exists
  let conversationId_ = null;
  const conversationDetail = await fetchQuery(
    api.conversation.GetConversationById,
    {
      agentId: agentDetail._id,
      userId: userId,
    }
  );

  conversationId_ = conversationDetail?.conversationId;
  if (!conversationDetail.conversationId) {
    //create new conversationId
    const { id: conversationId } = await openai.conversations.create({});
    conversationId_ = conversationId;
  }

  //Map all
  const generatedTools = agentDetail?.agentToolConfig.tools.map((t: any) => {
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
  const createdAgents = agentDetail?.agentToolConfig.agents.map(
    (config: any) => {
      return new Agent({
        name: config?.name,
        instructions: config?.instructions,
        tools: generatedTools,
      });
    }
  );

  const finalAgent = Agent.create({
    name: agentDetail?.name,
    instructions: "You determine which agent to use based on the user query.",
    handoffs: createdAgents,
  });
  const result = await run(finalAgent, userInput, {
    conversationId: conversationId_,
    stream: true,
  });
  const stream = result.toTextStream({
    compatibleWithNodeStreams: true,
  });

  //@ts-ignore
  return newResponse(stream);

  return new Response(JSON.stringify({ agentDetail }), { status: 200 });
}
