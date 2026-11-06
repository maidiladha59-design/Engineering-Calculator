import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import formulaHtml from "./formula-html.json";

describe("formula html map", () => {
  it("is regenerated whenever a formula source changes", () => {
    const result = spawnSync(
      process.execPath,
      ["scripts/formula-html.mjs", "--check"],
      { cwd: process.cwd(), encoding: "utf8" },
    );

    expect(`${result.stdout}${result.stderr}`).toContain("up to date");
    expect(result.status).toBe(0);
  });

  it("contains prerendered KaTeX markup for every formula", () => {
    const entries = Object.entries(formulaHtml);

    expect(entries.length).toBeGreaterThanOrEqual(50);

    for (const [tex, html] of entries) {
      expect(tex.length).toBeGreaterThan(0);
      expect(html).toContain('class="katex');
    }
  });
});
