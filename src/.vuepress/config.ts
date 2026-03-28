import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/jiliang_ca_docs/",

  locales: {
    "/": {
      lang: "en-US",
      title: "xxxx exp",
      description: "A docs for xxxx exp",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "xxxx实验",
      description: "xxxx实验文档",
    },
  },

  theme,

  head: [
    ["meta", { name: "referrer", content: "no-referrer" }],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
