import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as l,o as e}from"./app-CURVvI7a.js";const i={};function p(c,s){return e(),a("div",null,[...s[0]||(s[0]=[l(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>module alu(</span></span>
<span class="line"><span>    input  [31:0] dip_sw,   // 输入开关</span></span>
<span class="line"><span>    output [15:0] leds      // 输出 LED 显示结果</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>wire [7:0]  op      = dip_sw[31:24];  // 操作码</span></span>
<span class="line"><span>wire [7:0]  unused  = dip_sw[23:16];  // 保留不用</span></span>
<span class="line"><span>wire [7:0]  alu_src1 = dip_sw[15:8];  // 操作数 A</span></span>
<span class="line"><span>wire [7:0]  alu_src2 = dip_sw[7:0];   // 操作数 B</span></span>
<span class="line"><span></span></span>
<span class="line"><span>reg  [15:0] alu_result;               // ALU 运算结果</span></span>
<span class="line"><span>assign leds = alu_result;             // 结果输出到 LED</span></span>
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
<span class="line"><span>        </span></span>
<span class="line"><span>        // 无效 OP：</span></span>
<span class="line"><span>        default: alu_result = {8&#39;hFF, 8&#39;h00};  </span></span>
<span class="line"><span>    endcase</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>endmodule</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1)])])}const u=n(i,[["render",p]]),t=JSON.parse('{"path":"/zh/lab/2_alu/2-2_rs.html","title":"实验结果","lang":"zh-CN","frontmatter":{"title":"实验结果","feed":false,"seo":false,"head":[]},"git":{"createdTime":1775288771000,"updatedTime":1775288771000,"contributors":[{"name":"Paul_J","username":"","email":"1563160779@qq.com","commits":1}]},"readingTime":{"minutes":0.65,"words":196}}');export{u as comp,t as data};
