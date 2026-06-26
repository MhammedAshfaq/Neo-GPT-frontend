import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { message, model, history } = await req.json();

    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        const sendChunk = (data) => {
          controller.enqueue(encoder.encode(`data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`));
        };

        const replies = [
          `I am **Neo GPT**, your intelligent AI assistant, streaming dynamically via a **Next.js App Router API Route**! 🚀\n\nTo build a fully connected system, this route handler will forward requests to your custom Python or Node.js LLM endpoints.`,
          `Sure! Here is a clean example of a Javascript React Hook consuming a Next.js API Route:\n\n\`\`\`javascript\n// Consuming a streaming API route in the browser\nconst response = await fetch('/api/chat/stream', {\n  method: 'POST',\n  body: JSON.stringify({ message: 'Hi' })\n});\nconst reader = response.body.getReader();\n// Read the chunks...\n\`\`\`\n\nIt parses streamed event packets dynamically in the client thread. 🎯`,
          `Welcome back! Let's explore what we can do today. Here are the active models:\n\n1. **Neo GPT v1** — Versatile and optimized\n2. **Neo GPT Plus** — Complex reasoning engine\n3. **Neo GPT Turbo** — Minimal response latency\n\nWhich one would you like to run?`,
        ];
        
        const reply = replies[Math.floor(Math.random() * replies.length)];
        const words = reply.split(' ');

        for (let i = 0; i < words.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 50));
          const delta = (i === 0 ? '' : ' ') + words[i];
          sendChunk({ delta });
        }

        sendChunk('[DONE]');
        controller.close();
      }
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Stream route error:", error);
    return NextResponse.json({ error: "Failed to establish stream" }, { status: 500 });
  }
}
