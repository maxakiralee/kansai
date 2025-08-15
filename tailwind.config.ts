import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          900: '#4b3b2b',
          700: '#6a4e36',
          300: '#b79b7a',
        },
        leaf: {
          700: '#3a7f51',
          500: '#56a86b',
          300: '#85c89c',
          100: '#e7f5ea',
        },
        paper: '#ffffff',
        bgGreen: '#c7e6a5',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
