import type { APIRoute } from "astro";
import Anthropic from "@anthropic-ai/sdk";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { prompt } = await request.json();

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = import.meta.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = new Anthropic({ apiKey });

  const stream = await client.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: `You are a Pokémon designer. When given a concept, generate a brand-new fictional Pokémon in valid JSON matching exactly this schema:
{
  "name": string,           // Pokémon name (catchy, 1–2 syllables, capitalized)
  "types": string[],        // 1 or 2 types from: Normal, Fire, Water, Grass, Electric, Ice, Fighting, Poison, Ground, Flying, Psychic, Bug, Rock, Ghost, Dragon, Dark, Steel, Fairy
  "category": string,       // e.g. "Flame Fox Pokémon"
  "height": string,         // e.g. "0.6 m"
  "weight": string,         // e.g. "8.5 kg"
  "abilities": string[],    // 1–2 ability names
  "stats": {
    "hp": number,           // 1–255
    "attack": number,
    "defense": number,
    "sp_attack": number,
    "sp_defense": number,
    "speed": number
  },
  "description": string,    // 2–3 sentence Pokédex entry
  "moves": string[]         // 4 signature move names
}
Respond with ONLY the JSON object, no markdown, no explanation.`,
    messages: [{ role: "user", content: prompt.trim() }],
  });

  const message = await stream.finalMessage();
  const text = message.content.find((b) => b.type === "text")?.text ?? "";

  let pokemon;
  try {
    pokemon = JSON.parse(text);
  } catch {
    return new Response(JSON.stringify({ error: "Failed to parse AI response", raw: text }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ pokemon }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
