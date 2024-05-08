"use client";
import { useMessages } from "@/utils/useMessages";
import { Avatar, AvatarIcon, Button, Spinner } from "@nextui-org/react";
import { Logo } from "./icons";
import { FaRegThumbsDown } from "react-icons/fa";

type Props = {};

const MessagesList = (props: Props) => {
  const { messages, isLoadingAnswer } = useMessages();
  return (
    <>
      {messages?.map((message, i) => {
        const isUser = message.role === "user";
        if (message.role === "system") return null;
        return (
          <div
            key={`message-${i}`}
            className="w-full text-primary"
            dir="auto"
            id={`message-${i}`}
          >
            <div className="py-2 px-3 text-base md:px-4 m-auto lg:px-1 xl:px-5">
              <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
                <div className="flex-shrink-0 flex flex-col relative items-end">
                  {
                    <Avatar
                      icon={isUser ? <AvatarIcon /> : <Logo size={24} />}
                    />
                  }
                </div>
                <div className="relative flex w-full min-w-0 flex-col">
                  <div className="font-semibold select-none">
                    {isUser ? "You" : "BOTAI"}
                  </div>
                  <div className="flex flex-grow flex-col max-w-full">
                    <div className="min-h-[20px] text-primary flex flex-col items-start whitespace-pre-wrap break-words [.text-message+&]:mt-5 overflow-x-auto gap-3">
                      <div>{message.content.trim() || ""}</div>
                    </div>
                    <div className="mt-1 flex gap-3 empty:hidden">
                      <div className="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible">
                        <div className="flex">
                          <Button
                            isIconOnly
                            variant="flat"
                            className="p-1 text-primary-400 hover:text-primary"
                            radius="md"
                          >
                            <FaRegThumbsDown />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {isLoadingAnswer && (
        <div className="w-full text-primary">
          <div className="py-2 px-3 text-base md:px-4 m-auto lg:px-1 xl:px-5">
            <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
              <div className="flex-shrink-0 flex flex-col relative items-end">
                <Avatar icon={<Logo size={24} />} />
              </div>
              <div className="relative w-full min-w-0  block">
                <Spinner color="primary" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesList;
