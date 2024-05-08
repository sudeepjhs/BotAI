import { Button } from "@nextui-org/react";

type Props = {};

const SuggestionButton = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <Button
      variant="faded"
      className="relative w-full whitespace-nowrap rounded-xl px-4 py-8 text-left text-primary md:whitespace-normal bg-transparent hover:bg-default-100"
    >
      <div className="flex w-full gap-2 items-center justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col overflow-hidden">
            <div className="truncate">{title}</div>
            <div className="truncate font-normal opacity-50">{content}</div>
          </div>
        </div>
      </div>
    </Button>
  );
};

const Suggestion = (props: Props) => {
  return (
    <div className="relative h-full w-full">
      <div className="flex flex-col gap-3.5 pb-3.5 pt-2">
        <div className="h-full flex ml-1 md:w-full md:m-auto gap-0 md:gap-2 justify-center">
          <div className="grow absolute bottom-full left-0 mb-4 flex w-full gap-2 px-1 pb-1 sm:px-2 sm:pb-0 md:static md:mb-0 md:max-w-none">
            <div className="grid w-full grid-flow-row grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
              <div className="flex flex-col gap-2 even:hidden md:even:block ">
                <SuggestionButton
                  content="after asking me three questions"
                  title="Make me a personal webpage"
                />
              </div>
              <div className="flex flex-col gap-2 even:hidden md:even:block ">
                <SuggestionButton
                  title="Give me ideas"
                  content="for what to do with my kids' art"
                />
              </div>
              <div className="flex flex-col gap-2 even:hidden md:even:block ">
                <SuggestionButton
                  content="vocabulary for an exam"
                  title="Help me study"
                />
              </div>
              <div className="flex flex-col gap-2 even:hidden md:even:block ">
                <SuggestionButton
                  title="Write a text"
                  content="inviting my neighbors to a barbecue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
