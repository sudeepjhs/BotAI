import OpenAI from "openai";

export const sendMessage: (
  messages: Array<OpenAI.Chat.ChatCompletionMessageParam>
) => Promise<ReadableStream<Uint8Array> | null | undefined> = async (
  messages: Array<OpenAI.Chat.ChatCompletionMessageParam>
) => {
    try {
      const response = await fetch("/api/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      return response.body;
    } catch (error) {
      console.log(error);
    }
  };
