import { IChatCompletionOptions, IMessage } from "@/config/types";
import { G4F } from "g4f";
import { NextRequest, NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const g4f = new G4F();

export async function POST(request: NextRequest) {
  const { messages } = (await request.json()) as {
    messages: Array<IMessage>;
  };

  if (messages == null)
    NextResponse.json({ error: "Message not found" }, { status: 406 });
  const params: IChatCompletionOptions = {
    provider: g4f.providers.GPT,
    // stream: true
  };

  // const params: OpenAI.Chat.ChatCompletionCreateParams = {
  //   messages: messages,
  //   model: "gpt-3.5-turbo",
  //   stream: true,
  //   max_tokens: 100
  // };
  try {
    const chatCompletion = await g4f.chatCompletion(messages, params);
    // NextResponse.json(chatCompletion);
    return NextResponse.json({ message: chatCompletion });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
