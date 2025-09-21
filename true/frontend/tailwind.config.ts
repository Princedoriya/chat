import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBackground: "#F9FAFB",
        brandPrimary: "#4F46E5",
        brandSecondary: "#6366F1",
      },
    },
  },
  plugins: [],
};
export default config;
