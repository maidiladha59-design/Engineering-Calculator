import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import formulaHtml from "@/data/formula-html.json";
import { CalculatorLayout } from "./CalculatorLayout";
import { ExampleBlock } from "./ExampleBlock";
import { FormulaBlock } from "./FormulaBlock";
import { GuidanceBlock } from "./GuidanceBlock";
import { ResultCard } from "./ResultCard";
import { StepsList } from "./StepsList";
import { VariableTable } from "./VariableTable";

describe("ResultCard", () => {
  it("renders the value, unit, additional rows and footnote", () => {
    const markup = renderToStaticMarkup(
      <ResultCard
        label="Arus listrik (I)"
        value="2"
        unit="A"
        rows={[{ label: "Daya", value: "24 W" }]}
        footnote="Nilai dibulatkan."
      />,
    );

    expect(markup).toContain("Arus listrik (I)");
    expect(markup).toContain(">2<");
    expect(markup).toContain(">A<");
    expect(markup).toContain("Daya");
    expect(markup).toContain("24 W");
    expect(markup).toContain("Nilai dibulatkan.");
    expect(markup).toContain('aria-live="polite"');
  });
});

describe("StepsList", () => {
  it("numbers every step and keeps the optional detail", () => {
    const markup = renderToStaticMarkup(
      <StepsList
        steps={[
          { title: "Gunakan rumus", detail: "I = V / R." },
          { title: "Hitung hasil" },
        ]}
      />,
    );

    expect(markup).toContain("Langkah perhitungan");
    expect(markup).toContain("Gunakan rumus");
    expect(markup).toContain("I = V / R.");
    expect(markup.match(/<li/g)).toHaveLength(2);
  });

  it("renders nothing when there are no steps", () => {
    expect(renderToStaticMarkup(<StepsList steps={[]} />)).toBe("");
  });
});

describe("FormulaBlock", () => {
  it("serves prerendered KaTeX markup for a known formula", () => {
    const [tex] = Object.keys(formulaHtml);
    const markup = renderToStaticMarkup(<FormulaBlock tex={tex} />);

    expect(markup).toContain('class="katex');
  });

  it("falls back to plain text when the formula was not prerendered", () => {
    const markup = renderToStaticMarkup(
      <FormulaBlock tex="RUMUS_TIDAK_DIKENAL" />,
    );

    expect(markup).toContain("RUMUS_TIDAK_DIKENAL");
    expect(markup).not.toContain('class="katex');
  });
});

describe("VariableTable", () => {
  it("lists every symbol with its unit and description", () => {
    const markup = renderToStaticMarkup(
      <VariableTable
        rows={[
          { symbol: "V", name: "Tegangan", unit: "V", note: "Beda potensial" },
          { symbol: "I", name: "Arus", unit: "A" },
        ]}
      />,
    );

    expect(markup).toContain("Tegangan");
    expect(markup).toContain("Beda potensial");
    expect(markup.match(/<tr/g)).toHaveLength(3);
  });
});

describe("ExampleBlock", () => {
  it("shows the problem, answer and example button", () => {
    const markup = renderToStaticMarkup(
      <ExampleBlock problem="Hitung arus." answer="2 A" onUse={() => {}} />,
    );

    expect(markup).toContain("Contoh soal");
    expect(markup).toContain("Hitung arus.");
    expect(markup).toContain("2 A");
    expect(markup).toContain("Coba contoh ini");
  });
});

describe("GuidanceBlock", () => {
  it("renders mistakes and tips lists", () => {
    const markup = renderToStaticMarkup(
      <GuidanceBlock
        mistakes={["Menukar satuan."]}
        tips={["Konversi ke SI lebih dulu."]}
      />,
    );

    expect(markup).toContain("Kesalahan umum");
    expect(markup).toContain("Menukar satuan.");
    expect(markup).toContain("Tips");
    expect(markup).toContain("Konversi ke SI lebih dulu.");
  });
});

describe("CalculatorLayout", () => {
  const baseProps = {
    title: "Kalkulator Uji",
    description: "Deskripsi kalkulator uji.",
    categoryName: "Fisika",
    onCalculate: () => {},
    onReset: () => {},
  };

  it("renders the input form and the empty result placeholder", () => {
    const markup = renderToStaticMarkup(
      <CalculatorLayout {...baseProps}>
        <input id="nilai" defaultValue="1" />
      </CalculatorLayout>,
    );

    expect(markup).toContain("Kalkulator Uji");
    expect(markup).toContain("HITUNG");
    expect(markup).toContain("RESET");
    expect(markup).toContain("Hasil muncul di sini");
  });

  it("renders the accessible error state instead of a result", () => {
    const markup = renderToStaticMarkup(
      <CalculatorLayout {...baseProps} error="Nilai wajib diisi.">
        <input id="nilai" />
      </CalculatorLayout>,
    );

    expect(markup).toContain("Tidak dapat menghitung");
    expect(markup).toContain("Nilai wajib diisi.");
    expect(markup).toContain('role="alert"');
  });
});
