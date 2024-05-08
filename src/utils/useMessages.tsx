"use client";
// import { ChatCompletionStream } from "openai/lib/ChatCompletionStream.mjs";
// import { IMessage } from "openai/resources/index.mjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { sendMessage } from "./sendMessage";
import { IMessage } from "@/config/types";

interface ContextProps {
  messages: Array<IMessage>;
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<Partial<ContextProps>>({});
export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: IMessage = {
        role: "user",
        content,
      };
      const newMessages = [...messages, newMessage];
      // Add the user message to the state so we can see it immediately
      setMessages(() => newMessages);

      const data = await sendMessage(newMessages);
      if (!data) return;
      const reply: IMessage = { content: data.message, role: "assistant" };
      // Add the assistant message to the state
      setMessages(() => [...newMessages, reply]);
    } catch (error) {
      // Show error when something goes wrong
      console.log(error);
    } finally {
      setIsLoadingAnswer(false);
    }
  };
  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
