import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IChatCompletionOptions {
  debug?: boolean;
  model?: string;
  provider?: any;
  stream?: boolean;
  retry?: {
    condition?: (text: string) => boolean;
    times?: number;
  };
  output?: (text: string) => string;
  chunkSize?: number;
  proxy?: string;
}

export interface IMessage {
  content: string;
  role: "user" | "system" | "assistant";
  comment?: string;
  rating?: number;
}
