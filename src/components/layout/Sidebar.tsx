import { Button, Link } from "@nextui-org/react";
import NextLink from "next/link";
import { FC } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Logo } from "../icons";

const PastChat: FC<{ time?: Date; chats?: [] }> = ({ time, chats }) => {
  return (
    <div className="relative mt-5 empty:mt-0 empty:hidden">
      <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all text-token-text-tertiary">
        Today
      </h3>
      <ol>
        <li className="relative z-[15]">
          <div className="relative rounded-lg active:opacity-90 dark:hover:bg-gray-800 hover:bg-gray-200">
            <Link
              as={NextLink}
              href="#"
              className="flex items-center gap-2 p-2"
            >
              <div className="relative grow overflow-hidden whitespace-nowrap">
                New chat
              </div>
            </Link>
          </div>
        </li>
      </ol>
    </div>
  );
};

const Sidebar = () => {
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
                  <Link
                    as={NextLink}
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
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-2 pb-2 text-sm">
                <div className="empty:hidden">
                  <PastChat />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
