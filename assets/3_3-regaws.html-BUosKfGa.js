import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as e,o as i}from"./app-C_5aS1qi.js";const l={};function p(d,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>// 简单寄存器堆：32 x 32-bit，带复位、1 写端口、2 读端口</span></span>
<span class="line"><span>module regfile(</span></span>
<span class="line"><span>    input  wire        clk,</span></span>
<span class="line"><span>    input  wire        reset,</span></span>
<span class="line"><span>    // READ PORT 1</span></span>
<span class="line"><span>    input  wire [ 4:0] raddr1,</span></span>
<span class="line"><span>    output wire [31:0] rdata1,</span></span>
<span class="line"><span>    // READ PORT 2</span></span>
<span class="line"><span>    input  wire [ 4:0] raddr2,</span></span>
<span class="line"><span>    output wire [31:0] rdata2,</span></span>
<span class="line"><span>    // WRITE PORT</span></span>
<span class="line"><span>    input  wire        we,       // write enable, HIGH valid</span></span>
<span class="line"><span>    input  wire [ 4:0] waddr,</span></span>
<span class="line"><span>    input  wire [31:0] wdata</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>reg [31:0] rf[31:0];</span></span>
<span class="line"><span>integer i;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// WRITE: 在时钟上升沿写入；若 reset 为高，清零所有寄存器</span></span>
<span class="line"><span>always @(posedge clk or posedge reset) begin</span></span>
<span class="line"><span>    if (reset) begin</span></span>
<span class="line"><span>        for (i = 0; i &lt; 32; i = i + 1) rf[i] &lt;= 32&#39;b0;</span></span>
<span class="line"><span>    end else begin</span></span>
<span class="line"><span>        if (we) rf[waddr] &lt;= wdata;</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// READ OUT</span></span>
<span class="line"><span>assign rdata1 = (raddr1 == 5&#39;b0) ? 32&#39;b0 : rf[raddr1];</span></span>
<span class="line"><span>assign rdata2 = (raddr2 == 5&#39;b0) ? 32&#39;b0 : rf[raddr2];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>endmodule</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>module alu-reg(</span></span>
<span class="line"><span>    input  [31:0] dip_sw,</span></span>
<span class="line"><span>    input         clock_btn, // 按键，作为触发时钟（BTN5）</span></span>
<span class="line"><span>    input         reset_btn, // 按键，复位寄存器堆（BTN6）</span></span>
<span class="line"><span>    output [15:0] leds</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wire [7:0]  op      = dip_sw[31:24];</span></span>
<span class="line"><span>wire [7:0]  unused  = dip_sw[23:16];</span></span>
<span class="line"><span>wire [7:0]  alu_src1 = dip_sw[15:8];</span></span>
<span class="line"><span>wire [7:0]  alu_src2 = dip_sw[7:0];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 地址来自 dip_sw[23:16] 的高5位 (bits 23:19)</span></span>
<span class="line"><span>wire [7:0] addr_byte = dip_sw[23:16];</span></span>
<span class="line"><span>wire [4:0] addr = addr_byte[7:3];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 模式判断：使用 dip_sw[16] 作为模式位，0 表示写入，1 表示读出</span></span>
<span class="line"><span>wire write_mode = (dip_sw[16] == 1&#39;b0);</span></span>
<span class="line"><span>wire read_mode  = (dip_sw[16] == 1&#39;b1);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>reg  [15:0] alu_result;</span></span>
<span class="line"><span>// 寄存器堆接口信号</span></span>
<span class="line"><span>wire [31:0] rf_rdata1;</span></span>
<span class="line"><span>wire [31:0] rf_rdata2;</span></span>
<span class="line"><span>wire        rf_we = write_mode;</span></span>
<span class="line"><span>wire [4:0]  rf_raddr1 = addr;</span></span>
<span class="line"><span>wire [4:0]  rf_waddr  = addr;</span></span>
<span class="line"><span>wire [31:0] rf_wdata  = {24&#39;b0, alu_result[7:0]};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>reg  [15:0] leds_out;                 // 输出寄存器，按键触发时更新</span></span>
<span class="line"><span>assign leds = leds_out;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>always @(*) begin</span></span>
<span class="line"><span>    case (op)</span></span>
<span class="line"><span>        8&#39;h00: alu_result = {op, alu_src1 + alu_src2};        // ADD</span></span>
<span class="line"><span>        8&#39;h01: alu_result = {op, alu_src1 - alu_src2};        // SUB</span></span>
<span class="line"><span>        8&#39;h02: alu_result = {op, alu_src1 &amp; alu_src2};        // AND</span></span>
<span class="line"><span>        8&#39;h03: alu_result = {op, alu_src1 | alu_src2};        // OR</span></span>
<span class="line"><span>        8&#39;h04: alu_result = {op, alu_src1 ^ alu_src2};        // XOR</span></span>
<span class="line"><span>        8&#39;h05: alu_result = {op, ~alu_src1};                  // NOT</span></span>
<span class="line"><span>        8&#39;h06: alu_result = {op, alu_src1 &lt;&lt; alu_src2};       // SLL</span></span>
<span class="line"><span>        8&#39;h07: alu_result = {op, alu_src1 &gt;&gt; alu_src2};       // SRL</span></span>
<span class="line"><span>        8&#39;h08: alu_result = {op, $signed(alu_src1) &gt;&gt;&gt; alu_src2};  // SRA</span></span>
<span class="line"><span>        8&#39;h09: alu_result = {op, (alu_src1 &lt;&lt; alu_src2) | (alu_src1 &gt;&gt; (8 - alu_src2))}; // ROL</span></span>
<span class="line"><span>        default: alu_result = {8&#39;hFF, 8&#39;h00};  </span></span>
<span class="line"><span>    endcase</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在按下 clock_btn 的上升沿触发写入或读出动作，并更新 leds</span></span>
<span class="line"><span>always @(posedge clock_btn or posedge reset_btn) begin</span></span>
<span class="line"><span>    if (reset_btn) begin</span></span>
<span class="line"><span>        leds_out &lt;= 16&#39;b0;</span></span>
<span class="line"><span>    end else begin</span></span>
<span class="line"><span>        if (write_mode) begin</span></span>
<span class="line"><span>            leds_out &lt;= alu_result; // 写入时高8位显示 op</span></span>
<span class="line"><span>        end else if (read_mode) begin</span></span>
<span class="line"><span>            leds_out &lt;= {8&#39;hFF, rf_rdata1[7:0]}; // 读出时高8位全亮，低8位显示寄存器低8位</span></span>
<span class="line"><span>        end else begin</span></span>
<span class="line"><span>            leds_out &lt;= alu_result; // 默认展示 ALU 结果</span></span>
<span class="line"><span>        end</span></span>
<span class="line"><span>    end</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实例化寄存器堆</span></span>
<span class="line"><span>regfile u_regfile (</span></span>
<span class="line"><span>    .clk(clock_btn),</span></span>
<span class="line"><span>    .reset(reset_btn),</span></span>
<span class="line"><span>    .raddr1(rf_raddr1),</span></span>
<span class="line"><span>    .rdata1(rf_rdata1),</span></span>
<span class="line"><span>    .raddr2(5&#39;b0),</span></span>
<span class="line"><span>    .rdata2(rf_rdata2),</span></span>
<span class="line"><span>    .we(rf_we),</span></span>
<span class="line"><span>    .waddr(rf_waddr),</span></span>
<span class="line"><span>    .wdata(rf_wdata)</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>endmodule</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2)])])}const v=n(l,[["render",p]]),u=JSON.parse('{"path":"/zh/lab/3_%E5%AF%84%E5%AD%98%E5%99%A8%E4%B8%8E%E4%B8%BB%E5%AD%98/3_3-regaws.html","title":"寄存器实验答案-ing","lang":"zh-CN","frontmatter":{"title":"寄存器实验答案-ing","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"寄存器实验答案-ing\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-11T13:26:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Paul\\",\\"url\\":\\"https://www.cjlu.edu.cn/\\"}]}"],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/lab/3_%E5%AF%84%E5%AD%98%E5%99%A8%E4%B8%8E%E4%B8%BB%E5%AD%98/3_3-regaws.html"}],["meta",{"property":"og:site_name","content":"计算机组成原理实验"}],["meta",{"property":"og:title","content":"寄存器实验答案-ing"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-11T13:26:54.000Z"}],["meta",{"property":"article:modified_time","content":"2026-04-11T13:26:54.000Z"}]]},"git":{"createdTime":1775914014000,"updatedTime":1775914014000,"contributors":[{"name":"Paul_J","username":"","email":"1563160779@qq.com","commits":1}]},"readingTime":{"minutes":1.97,"words":590}}');export{v as comp,u as data};
