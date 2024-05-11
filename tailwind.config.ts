import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/types/*.ts",
    "./src/core/styles/*.ts",
  ],
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
