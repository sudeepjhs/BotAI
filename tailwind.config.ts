import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#212121",
            foreground: "#171717",
            primary: {
              DEFAULT: "#ececec",
              "400": "#b4b4b4"
            },
          },
        },
        light: {
          colors: {
            background: "white",
            foreground: "#f9f9f9",
            primary: {
              DEFAULT: "#0d0d0d",
            },
          },
        },
      },
    }),
  ],
};
export default config;
