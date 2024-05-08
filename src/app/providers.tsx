"use client";
import { MessagesProvider } from "@/utils/useMessages";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <MessagesProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </MessagesProvider>
    </NextUIProvider>
  );
}
