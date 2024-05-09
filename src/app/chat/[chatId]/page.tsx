"use client";
import { Logo } from "@/components/icons";
import MessageForm from "@/components/MessageForm";
import MessagesList from "@/components/MessagesList";
import { useMessages } from "@/utils/useMessages";
export default function Home() {
  const { messages } = useMessages();
  return (
    <div
      role="presentation"
      className="flex h-full flex-col focus-visible:outline-0"
    >
      <div className="flex-1 overflow-hidden">
        <div className="relative h-full">
          <div className="h-full w-full">
            <div className="absolute left-0 right-0">
              <div className="p-0">
                <div className="flex flex-col text-sm pb-9 overflow-y-auto">
                  <div className="sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 p-2 font-semibold bg-background">
                    <div className="absolute left-1/2 -translate-x-1/2"></div>
                    <div className="text-black dark:text-white flex items-center gap-2">
                      BOT AI
                    </div>
                  </div>
                  {/* Conversation Start */}
                  <div className="w-full max-h-96">
                    <MessagesList />
                  </div>
                  {/* Conversation End */}
                </div>
              </div>
            </div>
            {/* New Chat Start */}
            {!messages?.length && (
              <div className="flex h-full flex-col items-center justify-center text-primary">
                <div className="relative">
                  <div className="mb-3 h-12 w-12">
                    <div className="relative flex h-full items-center justify-center rounded-full bg-background text-primary">
                      <Logo />
                    </div>
                  </div>
                </div>
                <div className="mb-5 text-2xl font-medium">
                  How can I help you today?
                </div>
              </div>
            )}
            {/* New Chat End */}
          </div>
        </div>
      </div>
      <div className="w-full md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
        <div className="px-3 text-base md:px-4 m-auto  lg:px-1 xl:px-5">
          <div className="mx-auto flex flex-1 gap-3 text-base md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
            <MessageForm />
          </div>
          <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px]">
            BOTAI can make mistakes. Consider checking important information.
          </div>import {useEffect} from 'react';
          import {useEffect} from 'react';
          import {useEffect} from 'react';

        </div>
      </div>
    </div>
  );
}
