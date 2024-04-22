import { Plugin } from "postcss";

const postcssConfig: { plugins: Record<string, Plugin> } = {
  plugins: {
    tailwindcss: { postcssPlugin: "tailwindcss" },
    autoprefixer: { postcssPlugin: "autoprefixer" },
  },
};

export default postcssConfig;
