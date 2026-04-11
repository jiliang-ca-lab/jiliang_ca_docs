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
    {
      text: "实验一 ALU实验",
      link: "lab/2_alu/",
      collapsible: true,
      prefix: "lab/2_alu/",
      children: "structure",
    },
    {
      text: "实验二 寄存器与主存实验",
      link: "lab/3_寄存器与主存/",
      collapsible: true,
      prefix: "lab/3_寄存器与主存/",
      children: "structure",
    },
    "lab/demo.md",
  ],
});
