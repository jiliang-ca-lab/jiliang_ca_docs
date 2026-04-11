---
title: 寄存器实验-ing
---

## 寄存器的设计

继承实验2，op等alu操作不变

顶层与约束添加rst与rst按钮，与试验台对应

```
module led(
    input  [31:0] dip_sw,
    input         clock_btn,
    input         reset_btn,
    output [15:0] leds
);
```

约束

```
set_property -dict {PACKAGE_PIN U1 IOSTANDARD LVCMOS33} [get_ports clock_btn] ;#BTN5
set_property -dict {PACKAGE_PIN U5 IOSTANDARD LVCMOS33} [get_ports reset_btn] ;#BTN6
```

原来没用上的dip_sw[23:16]要派上用场，高5位用于指示寄存器编号，最低1位（sw[16]）则定义为输入输出选择，0的时候表示输入，1的时候表示输出。

所有的输入输出操作将以按下clock_btn触发。

- 输入时，sw[16]置0，按下clock_btn后，高8位显示op，低8位显示alu计算结果。
- 输出时，sw[16]置1，按下clock_btn后，高8位全亮，低8位显示对应寄存器编号的内容。
- 若按下reset_btn，对所有寄存器进行初始化操作（全部置零）

