// import OpenAI from "openai";

import { IMessage } from "@/config/types";

export const sendMessage: (
  messages: Array<IMessage>
) => Promise<{ message: string } | null> = async (
  messages: Array<IMessage>
) => {
    try {
      const response = await fetch("/api/createMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };
