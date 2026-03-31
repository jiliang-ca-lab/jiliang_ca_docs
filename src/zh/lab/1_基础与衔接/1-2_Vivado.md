---
title: Vivado的安装与使用
---

::: tip
我们该如何调度fpga芯片中的资源以满足设计需求？

Vivado 是 AMD（原 Xilinx）面向 7 系列、UltraScale、UltraScale+、Versal 等全系列 FPGA/SoC 的一体化设计套件，覆盖从 RTL 到比特流、从仿真到上板调试的全流程。

**这一篇文章主要介绍软件的操作，如有语法相关的问题可忽略，在对应文章可以解答。**

:::

## 下载安装

::: info

请注意，完整安装需要约30GB。

若熟悉开发流程或空间不足，可自行搜寻其他工具

:::

::: details 2019.2版本下载链接（百度网盘）
通过百度网盘分享的文件：Vivado19

链接: https://pan.baidu.com/s/1N2OE1XBIolUIBJiOpaAY7w?pwd=CJLU 提取码: CJLU
:::

## 项目创立

这里将介绍如何从零创建一个项目，并介绍软件的基本使用/项目中文件的用途。

由于部分实验会提前准备好框架，流程可能与后续要求有所不同，请以实验要求为准。

### 新建项目

打开Vivado（如图所示是2019.2版本的），创建项目

![img](https://gitee.com/paul_jiang/img/raw/master/procreate.png)

创建一个RTL项目，可选是否在该阶段添加资源文件，自行选择，现在不加后面也能加。

::: info
**行为级 VS RTL级 VS 门级**

**RTL代码**，即寄存器传输级代码，是一种用于描述数字电路的硬件抽象。它定义了在不同的寄存器之间数据如何传输，以及这些传输如何依赖于时钟信号。RTL设计的关键之处在于其表述的是寄存器之间数据如何变换，而不是具体的逻辑门级实现。

:::

![](https://gitee.com/paul_jiang/img/raw/master/type.png)

选择芯片型号（选择7A200T-676-1），可以通过筛选快速定位。

要让vivado知道用的啥芯片，才能将代码转化为芯片“认识”的样子吧。

![](https://gitee.com/paul_jiang/img/raw/master/modu.png)

完成项目创建。

打开项目，可以在历史记录中打开，或者去项目文件夹中点开.xpr文件（此为项目文件）

![](https://gitee.com/paul_jiang/img/raw/master/finishi1.png)

### 项目文件

在**Sources**板块中，可以管理项目文件。下面将将介绍每种文件的作用，并跑起大家的第一个Vivado项目【**点灯**】。

#### 设计文件

**设计文件（Design Sources）**从名称就不难看出，这类文件用于存放大家的设计代码。里面包括：

- `module` 定义
- `input` 输入
- `output` 输出
- 组合逻辑 / 时序逻辑

这里可能一时无法理解清楚，但是无需紧张，下面着重演示如何操作自己的项目，在另一篇文章中还会详细介绍Verilog的编写与RTL思想。

现在的项目中没有其他的文件，点击**Sources**板块中“**+**”，可以创建或添加文件，我们选择**创建**。

![](https://gitee.com/paul_jiang/img/raw/master/add.png)

从这里就可以看出所有的文件类型，**添加一个设计文件**。

![](https://gitee.com/paul_jiang/img/raw/master/add2.png)

这里涉及到新建文件，需要输入文件名等信息。 

![](https://gitee.com/paul_jiang/img/raw/master/vv1.png)

如果是新建文件，会弹出“**定义模块**”。此处可以在这里创建，也可跳过通过代码实现。

在这里，我们的模块叫做`led`，从电路的角度看，一个模块不管内部是怎么实现的，对外一定得有输入与输出的管脚吧。

可以自己定义接口的名称，从进入模块的信号为`input`，出去的则为`output`，勾选`Bus`则会定义这个“管脚”宽度不止为一位，后面两个变量则是定义位宽。

模块化思想后续会再补充。

![](https://gitee.com/paul_jiang/img/raw/master/leed.png)

随后点击“**OK**”和“**finish**”完成添加，若操作正确，会成功创建一个xxx.v的设计文件，内容如下：

```verilog
module led(
    input [31:0] dip_sw,
    output [15:0] leds
    );
endmodule
```

在模块定义的`);`之后。`endmodule`之前，可以写模块内的处理逻辑，比如，我想让拨码开关（dip_sw）直接连接led（leds），当然这个信号给0亮还是给1亮需要看电路设计决定。添加这个逻辑后的代码是这样的。

```verilog
module led(
    input [31:0] dip_sw,
    output [15:0] leds
    );
    assign leds = dip_sw[15:0];
endmodule
```

自此，你已经成功创建了一个模块。这个模块的结构是这样的：

![](https://gitee.com/paul_jiang/img/raw/master/ledrtl.png)

#### 仿真文件

刚刚这个模块可能比较简单，但假如一个模块的逻辑非常复杂，调试会成为一件非常麻烦的事情。

这里介绍一种方法，在需要被测试的模块外侧“再套一层”，对那个模块的输入信号给予`激励`，并检测输出的信号是否正确。

这类文件被称为**仿真文件**，在文件列表中放在“**Simulation Sources**”中。

添加方法同上，注意选择添加的是一个仿真文件。

![](https://gitee.com/paul_jiang/img/raw/master/test1.png)

这个文件的后缀通常也是.v，其实也可以广义的理解为一个模块，只不过这个模块的用处不一样。在该文件中写入以下内容：

```
`timescale 1ns / 1ps

module led_tb();

reg [31:0] dip_sw;
wire [15:0] leds;

led u_led (
    .dip_sw(dip_sw),
    .leds(leds)
);

initial begin
    dip_sw = 32'h00000000;
    #10;
    if(leds !== 16'h0000) $stop;

    dip_sw = 32'h12345678;
    #10;
    if(leds !== 16'h5678) $stop;

    dip_sw = 32'hFFFFFFFF;
    #10;
    if(leds !== 16'hFFFF) $stop;

    $display("==================================");
    $display("        ALL TESTS PASS!           ");
    $display("==================================");
    
    #50;
    $finish;
end

endmodule
```

模块的创建部分是一样的。

注意这是刚刚的led模块的上一层，这样我们才能给定输入输出，进而测试出这个模块所实现的功能是否正常。

![](https://gitee.com/paul_jiang/img/raw/master/simu1.png)

#### 约束文件

![](https://gitee.com/paul_jiang/img/raw/master/con1.png)

```verilog
#LEDS
set_property -dict {PACKAGE_PIN B24 IOSTANDARD LVCMOS33} [get_ports {leds[0]}]
set_property -dict {PACKAGE_PIN E21 IOSTANDARD LVCMOS33} [get_ports {leds[1]}]
set_property -dict {PACKAGE_PIN A24 IOSTANDARD LVCMOS33} [get_ports {leds[2]}]
set_property -dict {PACKAGE_PIN D23 IOSTANDARD LVCMOS33} [get_ports {leds[3]}]
set_property -dict {PACKAGE_PIN C22 IOSTANDARD LVCMOS33} [get_ports {leds[4]}]
set_property -dict {PACKAGE_PIN C21 IOSTANDARD LVCMOS33} [get_ports {leds[5]}]
set_property -dict {PACKAGE_PIN E20 IOSTANDARD LVCMOS33} [get_ports {leds[6]}]
set_property -dict {PACKAGE_PIN B22 IOSTANDARD LVCMOS33} [get_ports {leds[7]}]
set_property -dict {PACKAGE_PIN C23 IOSTANDARD LVCMOS33} [get_ports {leds[8]}]
set_property -dict {PACKAGE_PIN A23 IOSTANDARD LVCMOS33} [get_ports {leds[9]}]
set_property -dict {PACKAGE_PIN D21 IOSTANDARD LVCMOS33} [get_ports {leds[10]}]
set_property -dict {PACKAGE_PIN A18 IOSTANDARD LVCMOS33} [get_ports {leds[11]}]
set_property -dict {PACKAGE_PIN D20 IOSTANDARD LVCMOS33} [get_ports {leds[12]}]
set_property -dict {PACKAGE_PIN A22 IOSTANDARD LVCMOS33} [get_ports {leds[13]}]
set_property -dict {PACKAGE_PIN A20 IOSTANDARD LVCMOS33} [get_ports {leds[14]}]
set_property -dict {PACKAGE_PIN B20 IOSTANDARD LVCMOS33} [get_ports {leds[15]}]

#DIP_SW
set_property -dict {PACKAGE_PIN T3 IOSTANDARD LVCMOS33} [get_ports {dip_sw[0]}]
set_property -dict {PACKAGE_PIN J3 IOSTANDARD LVCMOS33} [get_ports {dip_sw[1]}]
set_property -dict {PACKAGE_PIN M2 IOSTANDARD LVCMOS33} [get_ports {dip_sw[2]}]
set_property -dict {PACKAGE_PIN P1 IOSTANDARD LVCMOS33} [get_ports {dip_sw[3]}]
set_property -dict {PACKAGE_PIN P4 IOSTANDARD LVCMOS33} [get_ports {dip_sw[4]}]
set_property -dict {PACKAGE_PIN L5 IOSTANDARD LVCMOS33} [get_ports {dip_sw[5]}]
set_property -dict {PACKAGE_PIN L3 IOSTANDARD LVCMOS33} [get_ports {dip_sw[6]}]
set_property -dict {PACKAGE_PIN N6 IOSTANDARD LVCMOS33} [get_ports {dip_sw[7]}]
set_property -dict {PACKAGE_PIN M6 IOSTANDARD LVCMOS33} [get_ports {dip_sw[8]}]
set_property -dict {PACKAGE_PIN N7 IOSTANDARD LVCMOS33} [get_ports {dip_sw[9]}]
set_property -dict {PACKAGE_PIN M7 IOSTANDARD LVCMOS33} [get_ports {dip_sw[10]}]
set_property -dict {PACKAGE_PIN L7 IOSTANDARD LVCMOS33} [get_ports {dip_sw[11]}]
set_property -dict {PACKAGE_PIN M5 IOSTANDARD LVCMOS33} [get_ports {dip_sw[12]}]
set_property -dict {PACKAGE_PIN K3 IOSTANDARD LVCMOS33} [get_ports {dip_sw[13]}]
set_property -dict {PACKAGE_PIN J1 IOSTANDARD LVCMOS33} [get_ports {dip_sw[14]}]
set_property -dict {PACKAGE_PIN L2 IOSTANDARD LVCMOS33} [get_ports {dip_sw[15]}]
set_property -dict {PACKAGE_PIN K2 IOSTANDARD LVCMOS33} [get_ports {dip_sw[16]}]
set_property -dict {PACKAGE_PIN K1 IOSTANDARD LVCMOS33} [get_ports {dip_sw[17]}]
set_property -dict {PACKAGE_PIN N3 IOSTANDARD LVCMOS33} [get_ports {dip_sw[18]}]
set_property -dict {PACKAGE_PIN L4 IOSTANDARD LVCMOS33} [get_ports {dip_sw[19]}]
set_property -dict {PACKAGE_PIN M4 IOSTANDARD LVCMOS33} [get_ports {dip_sw[20]}]
set_property -dict {PACKAGE_PIN N2 IOSTANDARD LVCMOS33} [get_ports {dip_sw[21]}]
set_property -dict {PACKAGE_PIN P6 IOSTANDARD LVCMOS33} [get_ports {dip_sw[22]}]
set_property -dict {PACKAGE_PIN N1 IOSTANDARD LVCMOS33} [get_ports {dip_sw[23]}]
set_property -dict {PACKAGE_PIN P5 IOSTANDARD LVCMOS33} [get_ports {dip_sw[24]}]
set_property -dict {PACKAGE_PIN R3 IOSTANDARD LVCMOS33} [get_ports {dip_sw[25]}]
set_property -dict {PACKAGE_PIN T4 IOSTANDARD LVCMOS33} [get_ports {dip_sw[26]}]
set_property -dict {PACKAGE_PIN R1 IOSTANDARD LVCMOS33} [get_ports {dip_sw[27]}]
set_property -dict {PACKAGE_PIN R5 IOSTANDARD LVCMOS33} [get_ports {dip_sw[28]}]
set_property -dict {PACKAGE_PIN T5 IOSTANDARD LVCMOS33} [get_ports {dip_sw[29]}]
set_property -dict {PACKAGE_PIN R6 IOSTANDARD LVCMOS33} [get_ports {dip_sw[30]}]
set_property -dict {PACKAGE_PIN R2 IOSTANDARD LVCMOS33} [get_ports {dip_sw[31]}]
```

