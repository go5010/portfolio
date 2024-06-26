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
      maxWidth: {
        "inquiry-width": "40rem",
      },
      boxShadow: {
        TopImageShadow: "inset 0 0 20px 20px rgba(255,255,255,1)",
      },
    },
    fontFamily: {
      logo: ["UD デジタル 教科書体 NK-B", "Arial"],
      AdSlogan: ["游ゴシック"],
    },
    screens: {
      lg: "1024px",
      md: "768px",
      sm: "640px",
      xs: "320px",
    },
  },
  plugins: [],
};
export default config;
