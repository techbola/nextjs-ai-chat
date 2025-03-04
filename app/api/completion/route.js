import { StreamingTextResponse, CohereStream } from "ai";

export const runtime = "edge";

export async function POST(request) {
  const { prompt } = await request.json();

  const body = JSON.stringify({
    prompt,
    model: "command-nightly",
    max_tokens: 300,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: "NONE",
    stream: true,
  });

  const response = await fetch("https://api.cohere.ai/v2/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
    },
    body,
  });

  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  const stream = CohereStream(response);

  return new StreamingTextResponse(stream);
}
