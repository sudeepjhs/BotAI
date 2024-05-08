"use client";
import { useMessages } from "@/utils/useMessages";
import { Button, Textarea } from "@nextui-org/react";
import { KeyboardEvent, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Suggestion from "./Suggestion";

type Props = {};

const MessageForm = (props: Props) => {
  const [content, setContent] = useState("");
  const { addMessage, messages } = useMessages();
  const handleSubmit = async (e?: any) => {
    e?.preventDefault();
    if (content) addMessage(content);
    setContent("");
  };

  const isPressKeyEntered = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative flex h-full max-w-full flex-1 flex-col">
        <div className="absolute bottom-full left-0 right-0">
          {/* Suggestion Start */}
          {!messages?.length && <Suggestion />}
        </div>
        <div className="flex w-full items-center">
          <Textarea
            placeholder="Message BotAI"
            className="rounded-xl text-black dark:text-white m-0 w-full resize-none bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent max-h-[25dvh] md:max-h-52 placeholder-black/50 dark:placeholder-white/50"
            variant="bordered"
            value={content}
            autoFocus
            onChange={(e: any) => setContent(e.target.value)}
            onKeyDown={isPressKeyEntered}
          ></Textarea>
          <Button
            isIconOnly
            isDisabled={!content}
            type="submit"
            className="absolute rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 dark:border-white dark:bg-white  dark:hover:bg-white bottom-5 right-2"
          >
            <FaArrowUp className="text-white dark:text-black" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
