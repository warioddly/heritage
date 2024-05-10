import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [

    plugin(function ({ addUtilities }) {
        addUtilities({
            ".backdrop-blur-md": {
                "-webkit-backdrop-filter": "blur(15px)",
                "backdrop-filter": "blur(15px)",
            },
            ".backdrop-blur-sm": {
                "-webkit-backdrop-filter": "blur(8px)",
                "backdrop-filter": "blur(8px)",
            },
        });
    })

  ]
};
export default config;
