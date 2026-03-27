import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "lab/0-1实验介绍.md",
    {
      text: "基础与衔接",
      link: "lab/1_基础与衔接/",
      collapsible: true,
      prefix: "lab/基础与衔接/",
      children: "structure",
    },
    "lab/demo.md",
  ],
});
