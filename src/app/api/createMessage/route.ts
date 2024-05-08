import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as {
    messages: Array<OpenAI.Chat.ChatCompletionMessageParam>;
  };
  if (messages == null)
    NextResponse.json({ error: "Message not found" }, { status: 406 });

  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: messages,
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 100
  };
  try {
    const chatCompletionStream =
      openai.beta.chat.completions.stream(params);
    // NextResponse.json(chatCompletion);
    return new NextResponse(chatCompletionStream.toReadableStream());
  } catch (error) {
    NextResponse.json({
      error: error instanceof Error ? error.message : error,
    }, { status: 500 });
  }
}
