import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "theme-blue": "#0B499D",
        "theme-blue2": "#EDF1F7",
      },
      width: {
        "128": "32rem",
        "inquiry-width": "40rem",
      },
    },
    fontFamily: {
      logo: ["UD デジタル 教科書体 NK-B", "Arial"],
      AdSlogan: ["游ゴシック"],
    },
  },
  plugins: [],
};
export default config;
