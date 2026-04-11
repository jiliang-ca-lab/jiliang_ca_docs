---
title: 寄存器实验答案-ing
---

```
// 简单寄存器堆：32 x 32-bit，带复位、1 写端口、2 读端口
module regfile(
    input  wire        clk,
    input  wire        reset,
    // READ PORT 1
    input  wire [ 4:0] raddr1,
    output wire [31:0] rdata1,
    // READ PORT 2
    input  wire [ 4:0] raddr2,
    output wire [31:0] rdata2,
    // WRITE PORT
    input  wire        we,       // write enable, HIGH valid
    input  wire [ 4:0] waddr,
    input  wire [31:0] wdata
);
reg [31:0] rf[31:0];
integer i;

// WRITE: 在时钟上升沿写入；若 reset 为高，清零所有寄存器
always @(posedge clk or posedge reset) begin
    if (reset) begin
        for (i = 0; i < 32; i = i + 1) rf[i] <= 32'b0;
    end else begin
        if (we) rf[waddr] <= wdata;
    end
end

// READ OUT
assign rdata1 = (raddr1 == 5'b0) ? 32'b0 : rf[raddr1];
assign rdata2 = (raddr2 == 5'b0) ? 32'b0 : rf[raddr2];

endmodule
```

```
module alu-reg(
    input  [31:0] dip_sw,
    input         clock_btn, // 按键，作为触发时钟（BTN5）
    input         reset_btn, // 按键，复位寄存器堆（BTN6）
    output [15:0] leds
);

wire [7:0]  op      = dip_sw[31:24];
wire [7:0]  unused  = dip_sw[23:16];
wire [7:0]  alu_src1 = dip_sw[15:8];
wire [7:0]  alu_src2 = dip_sw[7:0];

// 地址来自 dip_sw[23:16] 的高5位 (bits 23:19)
wire [7:0] addr_byte = dip_sw[23:16];
wire [4:0] addr = addr_byte[7:3];

// 模式判断：使用 dip_sw[16] 作为模式位，0 表示写入，1 表示读出
wire write_mode = (dip_sw[16] == 1'b0);
wire read_mode  = (dip_sw[16] == 1'b1);

reg  [15:0] alu_result;
// 寄存器堆接口信号
wire [31:0] rf_rdata1;
wire [31:0] rf_rdata2;
wire        rf_we = write_mode;
wire [4:0]  rf_raddr1 = addr;
wire [4:0]  rf_waddr  = addr;
wire [31:0] rf_wdata  = {24'b0, alu_result[7:0]};

reg  [15:0] leds_out;                 // 输出寄存器，按键触发时更新
assign leds = leds_out;

always @(*) begin
    case (op)
        8'h00: alu_result = {op, alu_src1 + alu_src2};        // ADD
        8'h01: alu_result = {op, alu_src1 - alu_src2};        // SUB
        8'h02: alu_result = {op, alu_src1 & alu_src2};        // AND
        8'h03: alu_result = {op, alu_src1 | alu_src2};        // OR
        8'h04: alu_result = {op, alu_src1 ^ alu_src2};        // XOR
        8'h05: alu_result = {op, ~alu_src1};                  // NOT
        8'h06: alu_result = {op, alu_src1 << alu_src2};       // SLL
        8'h07: alu_result = {op, alu_src1 >> alu_src2};       // SRL
        8'h08: alu_result = {op, $signed(alu_src1) >>> alu_src2};  // SRA
        8'h09: alu_result = {op, (alu_src1 << alu_src2) | (alu_src1 >> (8 - alu_src2))}; // ROL
        default: alu_result = {8'hFF, 8'h00};  
    endcase
end

// 在按下 clock_btn 的上升沿触发写入或读出动作，并更新 leds
always @(posedge clock_btn or posedge reset_btn) begin
    if (reset_btn) begin
        leds_out <= 16'b0;
    end else begin
        if (write_mode) begin
            leds_out <= alu_result; // 写入时高8位显示 op
        end else if (read_mode) begin
            leds_out <= {8'hFF, rf_rdata1[7:0]}; // 读出时高8位全亮，低8位显示寄存器低8位
        end else begin
            leds_out <= alu_result; // 默认展示 ALU 结果
        end
    end
end

// 实例化寄存器堆
regfile u_regfile (
    .clk(clock_btn),
    .reset(reset_btn),
    .raddr1(rf_raddr1),
    .rdata1(rf_rdata1),
    .raddr2(5'b0),
    .rdata2(rf_rdata2),
    .we(rf_we),
    .waddr(rf_waddr),
    .wdata(rf_wdata)
);

endmodule
```

