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
import { RatingStar } from "react-ts-rating-star";
import { Logo } from "./icons";

type Props = {};

const MessagesList = (props: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { messages, isLoadingAnswer, setMessages } = useMessages();
  const selectedMessageId = useRef<number | null>(null);
  const handleFeedback = () => {
    if (selectedMessageId.current === null) return;
    const tempMessage = [...messages];
    tempMessage[selectedMessageId.current] = {
      ...tempMessage[selectedMessageId.current],
      comment: comment,
      rating: rating,
    };

    setMessages(() => tempMessage);

    onClose();
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
                      {!!message.rating && (
                        <div className="flex flex-col self-end lg:self-center justify-start lg:justify-start mt-0 ml-1 h-7 gap-[2px] text-primary text-sm">
                          <div className="flex gap-2 item-center">
                            <label className="text-primary-400">
                              Your Rating :{" "}
                            </label>
                            <RatingStar
                              iconColor="#fdcb6e"
                              averageRating={message.rating}
                              iconHoverEffect="scaling"
                            />
                          </div>
                          <div className="flex gap-2 item-center">
                            <label className="text-primary-400">
                              Comment :{" "}
                            </label>
                            <p>{message.comment}</p>
                          </div>
                        </div>
                      )}
                      {!isUser && !message.rating && (
                        <div className="text-gray-400 flex self-end lg:self-center items-center justify-center lg:justify-start mt-0 -ml-1 h-7 gap-[2px]">
                          <div className="flex">
                            <Button
                              isIconOnly
                              variant="light"
                              className="text-primary-400 hover:text-primary"
                              radius="md"
                              onPress={() => {
                                selectedMessageId.current = i;
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
              <ModalHeader className="flex flex-col gap-1 text-primary">
                Send FeedBack
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col text-primary">
                  <form>
                    <div className="flex gap-2">
                      <label>Your Rating</label>
                      <RatingStar
                        iconColor="#fdcb6e"
                        averageRating={rating}
                        iconHoverEffect="scaling"
                        onClick={(val) => setRating(() => val)}
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
                  onPress={handleFeedback}
                  variant="light"
                  color="success"
                  isDisabled={!rating || !comment}
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
