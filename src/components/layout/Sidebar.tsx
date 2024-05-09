"use client";
import { getDateDiffInDays } from "@/utils/date";
import { MessageRespository, useMessages } from "@/utils/useMessages";
import { Button, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { FC, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Logo } from "../icons";
import { useRouter } from "next/navigation";

interface ChatHistory {
  Id: string | number;
  title: string;
  createdDate: Date;
  updateDate?: Date;
}

interface PastChatProps {
  timeline: string;
  chats: ChatHistory[];
}

const PastChat: FC<PastChatProps> = ({ timeline, chats }) => {
  const router = useRouter();
  if (!chats.length) return null;
  return (
    <div className="relative mt-5 empty:mt-0 empty:hidden">
      <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all text-primary">
        {timeline}
      </h3>
      <ol>
        {chats.map((c, i) => {
          return (
            <li key={`${timeline}-${i}`} className="relative z-[15]">
              <div
                onClick={() => router.push(`/chat/${c.Id}`)}
                className="relative rounded-lg active:opacity-90 dark:hover:bg-gray-800 hover:bg-gray-200"
              >
                <div className="flex items-center gap-2 p-2 text-primary">
                  <div className="relative grow overflow-hidden whitespace-nowrap text-ellipsis">
                    {c.title}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const Sidebar = () => {
  const [chats, setChats] = useState<PastChatProps[]>([]);
  const { messages, newChatId, setNewChatId } = useMessages();

  useEffect(() => {
    const chatsList = localStorage.getItem("chats");
    if (!chatsList) return;
    const chatListData: MessageRespository[] = JSON.parse(chatsList);
    const filteredchatListData = chatListData.map((val) => {
      return {
        createdDate: val.createdDate,
        Id: val.id,
        title: val.title,
        updateDate: val.updateDate,
      } as ChatHistory;
    });
    console.log("sidebar");
    
    const chatGroups = Object.groupBy(
      filteredchatListData,
      ({ createdDate, updateDate }) => {
        let currentDate = new Date();
        if (updateDate) {
          return getDateDiffInDays(updateDate, currentDate) == 0
            ? "Today"
            : "Past 30 days";
        } else {
          return getDateDiffInDays(createdDate, currentDate) == 0
            ? "Today"
            : "Past 30 days";
        }
      }
    );
    for (const [key, value] of Object.entries(chatGroups)) {
      setChats((prev) => [...prev, { timeline: key, chats: value }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length !== 2 || newChatId === "") return;
    const tempchats = [...chats];
    let index = tempchats.findIndex((c) => c.timeline === "Today");
    if (index < 0) return;
    tempchats[index].chats.unshift({
      createdDate: new Date(),
      Id: newChatId,
      title: messages[0].content,
    });
    setChats(() => tempchats);
    setNewChatId(() => "");
  }, [newChatId, messages, chats, setNewChatId]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-full min-h-0 flex-col">
        <div className="relative h-full w-full flex-1 items-start border-white/20">
          <nav
            className="flex h-full w-full flex-col px-3 pb-3.5"
            aria-label="Chat history"
          >
            <div className="flex-col flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
              <div className="sticky left-0 right-0 top-0 z-20 pt-3.5">
                <div className="pb-0.5 last:pb-0" tabIndex={0}>
                  <NextLink
                    href="/"
                    className="flex h-10 items-center gap-2 rounded-lg px-2 font-medium dark:hover:bg-gray-800 hover:bg-gray-200"
                  >
                    <div className="h-7 w-7 flex-shrink-0">
                      <div className="relative flex h-full items-center justify-center rounded-full">
                        <Logo size={24} className="h-2/3 w-2/3" />
                      </div>
                    </div>
                    <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary">
                      New chat
                    </div>
                    <div className="flex gap-3">
                      <span className="flex items-center">
                        <Button
                          as={"div"}
                          size="sm"
                          isIconOnly
                          className="bg-transparent text-primary"
                        >
                          <FaRegEdit size="18" />
                        </Button>
                      </span>
                    </div>
                  </NextLink>
                </div>
              </div>
              {!!chats.length && (
                <div className="flex flex-col gap-2 pb-2 text-sm">
                  <div className="empty:hidden">
                    <PastChat
                      timeline="Today"
                      chats={
                        chats[
                          chats.findIndex((val) => val.timeline === "Today")
                        ]?.chats || []
                      }
                    />
                  </div>
                  <div className="empty:hidden">
                    <PastChat
                      timeline="Past 30 days"
                      chats={
                        chats[
                          chats.findIndex(
                            (val) => val.timeline === "Past 30 days"
                          )
                        ]?.chats || []
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
