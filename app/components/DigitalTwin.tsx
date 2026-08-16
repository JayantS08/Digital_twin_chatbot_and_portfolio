"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

type M = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || "";

export default function DigitalTwin() {
  const [messages, setMessages] = useState<M[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m Jayant’s digital twin. Ask me about his projects, research, education, skills or engineering work.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(e: FormEvent) {
    e.preventDefault();

    const text = input.trim();

    if (!text || loading) return;

    const next = [
      ...messages,
      { role: "user" as const, content: text },
    ];

    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      if (!API_URL) {
        throw new Error("NO_API");
      }

      const r = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: next,
        }),
      });

      if (!r.ok) {
        throw new Error(`API returned ${r.status}`);
      }

      const d = await r.json();

      setMessages([
        ...next,
        {
          role: "assistant",
          content: d.answer || "No answer returned.",
        },
      ]);
    } catch (error) {
      console.error("Digital Twin API error:", error);

      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "I couldn't connect to the Digital Twin API. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat">
      <div className="chat-head">
        <strong>Ask Jayant AI</strong>
        <span className="status">DIGITAL TWIN / BETA</span>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div className={"msg " + m.role} key={i}>
            <div className="bubble">
              {m.role === "assistant" ? (
                <ReactMarkdown>{m.content}</ReactMarkdown>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg">
            <div className="bubble">Thinking…</div>
          </div>
        )}
      </div>

      <form className="chat-form" onSubmit={send}>
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Jayant..."
        />

        <button className="btn" type="submit" aria-label="Send">
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}