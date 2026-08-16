const DEFAULT_MODEL = "gemini-3.1-flash-lite";

import knowledge from "./knowledge.json";

const SYSTEM_PROMPT = `You are Jayant Singh's professional digital twin.

Your job is to answer questions about Jayant using the PUBLIC KNOWLEDGE BASE provided below.

IMPORTANT:
- Present Jayant as an ML/AI Engineer who also has strong software engineering and systems experience.
- Do NOT portray him as only a software developer.
- His experience spans AI/ML, data science, NLP, Knowledge Graphs, LLMs, algorithms, optimization, computer systems, and routing/EDA engineering.
- Never invent achievements, employers, publications, metrics, skills, projects or responsibilities.
- Never reveal confidential or proprietary information.
- If the knowledge base does not contain the answer, clearly say that the information is not currently available in the public knowledge base.
- Be technically precise.
- Keep answers concise but informative.
- When useful, organize answers using short bullets.
- Use the terminology and facts from the knowledge base.

PUBLIC KNOWLEDGE BASE:
${JSON.stringify(knowledge, null, 2)}
`;

function getCorsOrigin(request) {
  const origin = request.headers.get("Origin");

  const allowedOrigins = [
    "http://localhost:3000",
    "https://jayants08.github.io",
  ];

  if (allowedOrigins.includes(origin)) {
    return origin;
  }

  return "https://jayants08.github.io";
}

export default {
  async fetch(request, env) {
    const origin = getCorsOrigin(request);

    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: cors,
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: cors,
      });
    }

    try {
      const body = await request.json();

      const messages = Array.isArray(body.messages)
        ? body.messages
        : [];

      const r = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.GEMINI_API_KEY}`,
          },
          body: JSON.stringify({
            model: env.GEMINI_MODEL || DEFAULT_MODEL,
            messages: [
              {
                role: "system",
                content: SYSTEM_PROMPT,
              },
              ...messages.slice(-12),
            ],
          }),
        }
      );

      const data = await r.json();

      if (!r.ok) {
        return new Response(
          JSON.stringify({
            error: "Gemini API error",
            details: data,
          }),
          {
            status: 502,
            headers: {
              ...cors,
              "Content-Type": "application/json",
            },
          }
        );
      }

      return new Response(
        JSON.stringify({
          answer:
            data?.choices?.[0]?.message?.content ||
            "No answer returned.",
        }),
        {
          headers: {
            ...cors,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: String(e),
        }),
        {
          status: 500,
          headers: {
            ...cors,
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};