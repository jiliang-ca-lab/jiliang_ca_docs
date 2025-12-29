import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "实验文档",
      icon: "flask",
      prefix: "experiment/",
      children: "structure",
      link: "experiment/",
    },

  ],
});
