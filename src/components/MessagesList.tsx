"use client";
import { useMessages } from "@/utils/useMessages";
import {
  Avatar,
  AvatarIcon,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { ChangeEvent, useRef, useState } from "react";
import { FaRegStar, FaRegThumbsDown, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { Logo } from "./icons";
import { IMessage } from "@/config/types";

type Props = {};

const MessagesList = (props: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { messages, isLoadingAnswer } = useMessages();
  const selectedMessage = useRef<IMessage | null>(null);
  const handleFeedback = () => {
    console.log(selectedMessage.current);
  };

  return (
    <>
      {messages?.map((message, i) => {
        const isUser = message.role === "user";
        if (message.role === "system") return;
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
                      {!isUser && (
                        <div className="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px] visible">
                          <div className="flex">
                            <Button
                              isIconOnly
                              variant="light"
                              className="text-primary-400 hover:text-primary"
                              radius="md"
                              onPress={() => {
                                selectedMessage.current = message;
                                onOpen();
                              }}
                            >
                              <FaRegThumbsDown />
                            </Button>
                          </div>
                        </div>
                      )}
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setRating(0);
          setComment("");
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                FeedBack
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <form>
                    <div className="flex gap-2">
                      <label>Your Rating</label>
                      <Rating
                        emptySymbol={<FaRegStar size={16} />}
                        fullSymbol={<FaStar size={16} fill="#F7B750" />}
                        onClick={(val) => setRating(() => val)}
                        initialRating={rating}
                      />
                    </div>
                    <div className="flex gap-2">
                      <label>Comment</label>
                      <Textarea
                        value={comment}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setComment(() => e.target.value)
                        }
                        className="rounded-xl text-black dark:text-white m-0 w-full resize-none bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent max-h-[25dvh] md:max-h-52 placeholder-black/50 dark:placeholder-white/50"
                        variant="bordered"
                        placeholder="Your comment"
                      ></Textarea>
                    </div>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onPress={() => {
                    handleFeedback();
                    onClose();
                  }}
                  variant="light"
                  color="success"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MessagesList;
