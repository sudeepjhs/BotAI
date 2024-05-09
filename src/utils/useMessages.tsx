"use client";

import { IMessage } from "@/config/types";
import { useParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "./sendMessage";

interface ContextProps {
  messages: Array<IMessage>;
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  newChatId: string;
  setNewChatId: Dispatch<SetStateAction<string>>;
}

export interface MessageRespository {
  id: string | number;
  title: string;
  messages: IMessage[];
  createdDate: Date;
  updateDate?: Date;
}

const ChatsContext = createContext<Partial<ContextProps>>({});
export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [newChatId, setNewChatId] = useState("");
  const params = useParams();
  const chatIdIndex = useRef(-1);

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

  useEffect(() => {
    if (!Object.hasOwn(params, "chatId")) {
      chatIdIndex.current = -1;
      setMessages(() => []);
      return;
    }
    const chatsList = localStorage.getItem("chats");
    if (!chatsList) return;
    const chatListData: MessageRespository[] = JSON.parse(chatsList);
    chatIdIndex.current = chatListData.findIndex(
      (chat) => chat.id == params.chatId
    );
    if (chatIdIndex.current >= 0) {
      setMessages(() => chatListData[chatIdIndex.current].messages);
    }
  }, [params]);

  useEffect(() => {
    if (
      !messages.length ||
      messages.length % 2 !== 0 ||
      (messages.length == 2 && chatIdIndex.current < 0)
    )
      return;
    const saveData = () => {
      let storeData: MessageRespository;
      let chatListData: MessageRespository[] = [];
      const chatsList = localStorage.getItem("chats");
      if (chatsList) chatListData = JSON.parse(chatsList);
      if (chatIdIndex.current === -1 && !params?.chatId) {
        const id = uuidv4();
        setNewChatId(() => id);
        storeData = {
          createdDate: new Date(),
          id: id,
          messages: messages,
          title: messages[0].content.trim(),
        };
        chatListData.push(storeData);
        chatIdIndex.current = chatListData.length - 1;
      } else if (chatIdIndex.current >= 0) {
        chatListData[chatIdIndex.current].messages = messages;
        chatListData[chatIdIndex.current].updateDate = new Date();
      }
      localStorage.setItem("chats", JSON.stringify(chatListData));
    };

    setTimeout(() => {
      saveData();
    }, 1000);
  }, [messages, params?.chatId]);

  return (
    <ChatsContext.Provider
      value={{
        messages,
        addMessage,
        isLoadingAnswer,
        setMessages,
        newChatId,
        setNewChatId,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
