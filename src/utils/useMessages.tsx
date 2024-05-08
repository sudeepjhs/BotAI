"use client";
import { ChatCompletionStream } from "openai/lib/ChatCompletionStream.mjs";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { sendMessage } from "./sendMessage";

interface ContextProps {
  messages: Array<ChatCompletionMessageParam>;
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<Partial<ContextProps>>({});
export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionMessageParam = {
        role: "user",
        content,
      };
      const newMessages = [...messages, newMessage];
      // Add the user message to the state so we can see it immediately
      setMessages(() => newMessages);

      const res = await sendMessage(newMessages);
      if (res) {
        const runner = ChatCompletionStream.fromReadableStream(res);
        runner.on("content", (delta, snapshot) => {
          console.log(delta, snapshot);
        });
        console.dir(await runner.finalChatCompletion(), { depth: null });
      }
      // const reply = data.choices[0].message
      // Add the assistant message to the state
      // setMessages([...newMessages, reply])
    } catch (error) {
      // Show error when something goes wrong
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
