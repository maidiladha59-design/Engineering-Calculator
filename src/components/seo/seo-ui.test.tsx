import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FaqSection } from "./FaqSection";
import { JsonLd } from "./JsonLd";

describe("JsonLd", () => {
  it("escapes markup so untrusted strings cannot close the script tag", () => {
    const markup = renderToStaticMarkup(
      <JsonLd data={{ name: "</script><script>alert(1)</script>" }} />,
    );

    expect(markup).not.toContain("</script><script>");
    expect(markup).toContain("\\u003c/script");
    expect(markup).toContain('type="application/ld+json"');
  });
});

describe("FaqSection", () => {
  it("renders every question as a disclosure widget", () => {
    const markup = renderToStaticMarkup(
      <FaqSection
        faqs={[
          { question: "Apa itu hukum Ohm?", answer: "Hubungan V, I, dan R." },
          { question: "Apakah gratis?", answer: "Ya, tanpa login." },
        ]}
      />,
    );

    expect(markup).toContain("Pertanyaan umum");
    expect(markup.match(/<details/g)).toHaveLength(2);
    expect(markup).toContain("Apa itu hukum Ohm?");
  });

  it("renders nothing when there are no FAQs", () => {
    expect(renderToStaticMarkup(<FaqSection faqs={[]} />)).toBe("");
  });
});
