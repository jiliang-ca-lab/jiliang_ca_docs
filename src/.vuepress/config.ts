import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  // base: "/jiliang_ca_docs/",
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "CA exp",
      description: "Docs for CA exp",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "计算机组成原理实验",
      description: "计算机组成原理实验文档",
    },
  },

  theme,

  head: [
    ["meta", { name: "referrer", content: "no-referrer" }],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
