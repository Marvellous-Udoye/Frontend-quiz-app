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
      boxShadow: {
        "custom": "0px 16px 40px 0px rgba(143, 160, 193, 0.14)"
      },
      screens: {
        'sm': { 'max': '600px' },
        'tb': {'max': '1200px'},
        'ls': {'min': '601px'},
      }
    },
  },
  plugins: [],
};
export default config;
