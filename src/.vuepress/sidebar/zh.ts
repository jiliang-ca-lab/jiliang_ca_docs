import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    {
      text: "实验介绍",
      link: "lab/0_实验介绍.md",
    },
    {
      text: "基础与衔接",
      link: "lab/1_基础与衔接/",
      collapsible: true,
      prefix: "lab/1_基础与衔接/",
      children: "structure",
    },
    "lab/demo.md",
  ],
});
