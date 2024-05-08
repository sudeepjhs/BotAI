"use client";
import { useMessages } from "@/utils/useMessages";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";

type Props = {};

const MessageForm = (props: Props) => {
  const [content, setContent] = useState("");
  const { addMessage } = useMessages();
  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    addMessage(content);
    setContent("");
  };
  return (
    <div className="flex w-full items-center">
      <Textarea
        placeholder="Message BotAI"
        className="rounded-xl text-black dark:text-white m-0 w-full resize-none bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent max-h-[25dvh] md:max-h-52 placeholder-black/50 dark:placeholder-white/50"
        variant="bordered"
        value={content}
        autoFocus
        onChange={(e: any) => setContent(e.target.value)}
      ></Textarea>
      <Button
        isIconOnly
        isDisabled={!content}
        type="button"
        className="absolute rounded-lg border border-black bg-black p-0.5 text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 dark:border-white dark:bg-white  dark:hover:bg-white bottom-5 right-2"
        onClick={handleSubmit}
      >
        <FaArrowUp className="text-white dark:text-black" />
      </Button>
    </div>
  );
};

export default MessageForm;
