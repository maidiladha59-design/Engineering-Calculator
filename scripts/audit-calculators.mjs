#!/usr/bin/env node
/**
 * Runtime audit for every active calculator page.
 *
 * For each example block it clicks "Coba contoh ini", presses HITUNG, and
 * records the form values, the expected answer printed in the example, the
 * rendered result card, and the number of calculation steps. Chrome is driven
 * through the DevTools Protocol so the check exercises the real hydrated app.
 *
 * Usage: node scripts/audit-calculators.mjs [--base http://localhost:3000]
 * Output: .audit/calculators.json and .audit/report.md
 */

import { spawn } from "node:child_process";
import { readFile, mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const args = process.argv.slice(2);
const baseArg = args.indexOf("--base");
const BASE_URL = baseArg >= 0 ? args[baseArg + 1] : "http://localhost:3000";
const PORT = 9333;
const OUT_DIR = ".audit";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const chromePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));

if (!chromePath) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome executable.");
  process.exit(1);
}

async function waitForDevTools() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);

      if (response.ok) {
        return response.json();
      }
    } catch {
      // Chrome is still starting.
    }

    await sleep(100);
  }

  throw new Error("Chrome DevTools endpoint did not become ready.");
}

function parseCalculators(source) {
  const entryPattern =
    /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)",[\s\S]*?status:\s*"(active|coming-soon)",?\s*\}/g;
  const entries = [];
  let match = entryPattern.exec(source);

  while (match) {
    entries.push({
      slug: match[1],
      name: match[2],
      category: match[3],
      status: match[4],
    });
    match = entryPattern.exec(source);
  }

  return entries;
}

class DevTools {
  constructor(socket) {
    this.socket = socket;
    this.nextId = 0;
    this.pending = new Map();
    this.listeners = new Map();

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (typeof message.id === "number") {
        const pending = this.pending.get(message.id);

        if (!pending) {
          return;
        }

        this.pending.delete(message.id);

        if (message.error) {
          pending.reject(new Error(message.error.message));
        } else {
          pending.resolve(message.result);
        }

        return;
      }

      const handlers = this.listeners.get(message.method);

      if (handlers) {
        for (const handler of handlers) {
          handler(message.params);
        }
      }
    });
  }

  on(method, handler) {
    if (!this.listeners.has(method)) {
      this.listeners.set(method, new Set());
    }

    this.listeners.get(method).add(handler);

    return () => this.listeners.get(method)?.delete(handler);
  }

  send(method, params = {}) {
    this.nextId += 1;
    const id = this.nextId;

    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  return new DevTools(socket);
}

const PAGE_SCRIPT = String.raw`
(async () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const norm = (value) =>
    (value ?? "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
  const exampleButtons = () =>
    [...document.querySelectorAll("button")].filter(
      (button) => norm(button.textContent) === "Coba contoh ini",
    );
  const total = exampleButtons().length;
  const results = [];

  for (let index = 0; index < total; index += 1) {
    const button = exampleButtons()[index];

    if (!button) {
      results.push({ index, failure: "Tombol contoh tidak ditemukan." });
      continue;
    }

    button.click();
    await sleep(180);

    const hitung = [...document.querySelectorAll("button")].find(
      (candidate) => norm(candidate.textContent) === "HITUNG",
    );
    const form = hitung?.closest("form") ?? null;
    const inputs = form
      ? [...form.querySelectorAll("input, select")].map((element) => {
          const label = element.id
            ? norm(
                document.querySelector('label[for="' + element.id + '"]')
                  ?.textContent,
              )
            : "";
          return (label ? label + "=" : "") + norm(element.value);
        })
      : [];

    if (!hitung) {
      results.push({ index, inputs, failure: "Tombol HITUNG tidak ditemukan." });
      continue;
    }

    hitung.click();

    let card = null;
    for (let attempt = 0; attempt < 50; attempt += 1) {
      await sleep(60);
      card = document.querySelector('section[aria-live="polite"]');

      if (card) {
        break;
      }
    }

    await sleep(60);

    const alert = document.querySelector('[role="alert"]');
    const valueElement = card?.querySelector("span.text-3xl");
    const unit = valueElement
      ? [...valueElement.parentElement.querySelectorAll("span")]
          .filter((span) => span !== valueElement)
          .map((span) => norm(span.textContent))
          .join(" ")
      : "";
    const rows = card
      ? [...card.querySelectorAll("dl > div")].map((row) => norm(row.textContent))
      : [];
    const sections = [...document.querySelectorAll("section")].filter(
      (section) => norm(section.querySelector("h2")?.textContent) === "Contoh soal",
    );
    const section = sections[index];
    const answer = section
      ? [...section.querySelectorAll("p")].find((paragraph) =>
          norm(paragraph.textContent).startsWith("Jawaban:"),
        )
      : null;

    results.push({
      index,
      inputs,
      expected: answer
        ? norm(answer.textContent).replace(/^Jawaban:\s*/, "")
        : null,
      actual: valueElement ? norm(valueElement.textContent) : null,
      unit,
      rows,
      steps: document.querySelectorAll("ol li").length,
      error: alert ? norm(alert.textContent) : null,
    });
  }

  return results;
})()
`;

const READY_SCRIPT = String.raw`
(() => {
  const button = [...document.querySelectorAll("button")].find(
    (candidate) => (candidate.textContent ?? "").trim() === "HITUNG",
  );
  if (!button) return false;
  return Object.keys(button).some(
    (key) => key.startsWith("__reactProps$") || key.startsWith("__reactFiber$"),
  );
})()
`;

function normalizeNumbers(text) {
  const matches =
    String(text ?? "")
      .replace(/[\u2212\u2013]/g, "-")
      .match(/[-+]?\d[\d.,]*/g) ?? [];

  return matches
    .map((raw) => {
      let token = raw.replace(/[.,]+$/, "");
      const hasComma = token.includes(",");
      const hasDot = token.includes(".");

      if (hasComma && hasDot) {
        token = token.replace(/\./g, "").replace(",", ".");
      } else if (hasComma) {
        token = token.replace(",", ".");
      } else if (hasDot && /^\d{1,3}(\.\d{3})+$/.test(token)) {
        token = token.replace(/\./g, "");
      }

      return Number(token);
    })
    .filter((value) => Number.isFinite(value));
}

function closeEnough(expected, actual) {
  if (expected === actual) {
    return true;
  }

  const scale = Math.max(Math.abs(expected), Math.abs(actual), 1e-9);

  return Math.abs(expected - actual) / scale <= 0.005;
}

function verify(example) {
  if (example.failure) {
    return { status: "GAGAL", note: example.failure };
  }

  if (example.error) {
    return { status: "GAGAL", note: `Error: ${example.error}` };
  }

  if (!example.actual) {
    return { status: "GAGAL", note: "Kartu hasil tidak muncul." };
  }

  if (!example.expected) {
    return { status: "CEK", note: "Teks jawaban contoh tidak ditemukan." };
  }

  const expectedNumbers = normalizeNumbers(example.expected);
  const actualText = [example.actual, example.unit, ...example.rows]
    .join(" ")
    .toLowerCase();

  if (expectedNumbers.length === 0) {
    const expectedText = String(example.expected).toLowerCase().trim();
    const meaningfulTokens = expectedText
      .split(/\s+/)
      .filter(
        (token) =>
          !["desimal", "biner", "heksadesimal", "oktal"].includes(token),
      );
    const matched =
      actualText.includes(expectedText) ||
      meaningfulTokens.every((token) => actualText.includes(token));

    return matched
      ? { status: "OK", note: "Jawaban non-numerik cocok." }
      : {
          status: "CEK",
          note: "Jawaban non-numerik tidak cocok dengan hasil.",
        };
  }

  const actualNumbers = normalizeNumbers(
    [example.actual, example.unit, ...example.rows].join(" "),
  );
  const [primary] = expectedNumbers;
  const matched = actualNumbers.some((actual) => closeEnough(primary, actual));

  if (!matched) {
    return {
      status: "CEK",
      note: "Angka jawaban contoh tidak cocok dengan hasil yang tampil.",
    };
  }

  if (example.steps < 1) {
    return { status: "CEK", note: "Langkah perhitungan tidak tampil." };
  }

  return { status: "OK", note: "" };
}

async function main() {
  const calculatorsSource = await readFile(
    "src/data/calculators.ts",
    "utf8",
  );
  const all = parseCalculators(calculatorsSource);
  const active = all.filter((calculator) => calculator.status === "active");

  console.log(`Auditing ${active.length} active calculators at ${BASE_URL}`);

  const profileDir = join(tmpdir(), `ec-audit-${Date.now()}`);
  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--window-size=1280,900",
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${profileDir}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  let devtools;

  try {
    await waitForDevTools();
    const created = await fetch(
      `http://127.0.0.1:${PORT}/json/new?about:blank`,
      { method: "PUT" },
    ).then((response) => response.json());
    devtools = await connect(created.webSocketDebuggerUrl);

    await devtools.send("Page.enable");
    await devtools.send("Runtime.enable");
    await devtools.send("Log.enable");
    await devtools.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    const consoleErrors = [];
    devtools.on("Runtime.consoleAPICalled", (params) => {
      if (params.type === "error") {
        consoleErrors.push(
          params.args.map((arg) => arg.value ?? arg.description ?? "").join(" "),
        );
      }
    });
    devtools.on("Runtime.exceptionThrown", (params) => {
      consoleErrors.push(
        params.exceptionDetails.exception?.description ??
          params.exceptionDetails.text,
      );
    });
    devtools.on("Log.entryAdded", (params) => {
      if (params.entry.level === "error") {
        consoleErrors.push(params.entry.text);
      }
    });

    const audit = [];

    for (const [position, calculator] of active.entries()) {
      const url = `${BASE_URL}/kalkulator/${calculator.category}/${calculator.slug}`;
      consoleErrors.length = 0;
      const response = await devtools.send("Page.navigate", { url });
      const navigationError = response.errorText;

      let ready = false;

      if (!navigationError) {
        for (let attempt = 0; attempt < 120; attempt += 1) {
          await sleep(100);
          const check = await devtools.send("Runtime.evaluate", {
            expression: READY_SCRIPT,
            returnByValue: true,
          });

          if (check.result?.value === true) {
            ready = true;
            break;
          }
        }
      }

      if (!ready) {
        audit.push({
          ...calculator,
          url,
          pageError: navigationError ?? "Halaman tidak siap (hidrasi gagal).",
          examples: [],
        });
        console.log(
          `[${position + 1}/${active.length}] ${calculator.slug}: halaman gagal dimuat`,
        );
        continue;
      }

      const evaluation = await devtools.send("Runtime.evaluate", {
        expression: PAGE_SCRIPT,
        awaitPromise: true,
        returnByValue: true,
      });

      if (evaluation.exceptionDetails) {
        audit.push({
          ...calculator,
          url,
          pageError:
            evaluation.exceptionDetails.exception?.description ??
            evaluation.exceptionDetails.text,
          examples: [],
        });
        continue;
      }

      const examples = (evaluation.result?.value ?? []).map((example) => ({
        ...example,
        verdict: verify(example),
      }));

      audit.push({
        ...calculator,
        url,
        pageError: null,
        consoleErrors: [...consoleErrors],
        examples,
      });

      const failing = examples.filter(
        (example) => example.verdict.status !== "OK",
      ).length;
      console.log(
        `[${position + 1}/${active.length}] ${calculator.slug}: ` +
          `${examples.length - failing}/${examples.length} contoh OK` +
          (failing ? ` (${failing} perlu dicek)` : ""),
      );
    }

    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(
      join(OUT_DIR, "calculators.json"),
      `${JSON.stringify({ baseUrl: BASE_URL, generatedAt: new Date().toISOString(), calculators: audit }, null, 2)}\n`,
    );
    await writeFile(join(OUT_DIR, "report.md"), renderReport(audit));

    const totals = audit.reduce(
      (accumulator, calculator) => {
        accumulator.examples += calculator.examples.length;
        accumulator.ok += calculator.examples.filter(
          (example) => example.verdict.status === "OK",
        ).length;
        return accumulator;
      },
      { examples: 0, ok: 0 },
    );

    console.log(
      `\nDone: ${totals.ok}/${totals.examples} examples OK across ${audit.length} calculators.`,
    );
    console.log("Report: .audit/report.md");
  } finally {
    devtools?.socket.close();
    chrome.kill();
    await rm(profileDir, { recursive: true, force: true }).catch(() => {});
  }
}

function renderReport(audit) {
  const lines = [
    "# Audit runtime kalkulator",
    "",
    "Dihasilkan oleh `npm run audit:calculators` terhadap build produksi.",
    "",
    "| Kategori | Kalkulator | Contoh | Input | Expected | Actual | Status |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const calculator of audit) {
    if (calculator.pageError) {
      lines.push(
        `| ${calculator.category} | ${calculator.name} | - | - | - | - | GAGAL: ${calculator.pageError} |`,
      );
      continue;
    }

    if (calculator.examples.length === 0) {
      lines.push(
        `| ${calculator.category} | ${calculator.name} | - | - | - | - | CEK: tidak ada contoh |`,
      );
    }

    for (const example of calculator.examples) {
      const cell = (value) => String(value ?? "-").replace(/\|/g, "\\|");
      const actual = [
        [example.actual, example.unit].filter(Boolean).join(" "),
        example.rows?.length ? `(${example.rows.join("; ")})` : "",
      ]
        .filter(Boolean)
        .join(" ");
      lines.push(
        `| ${calculator.category} | ${calculator.name} | ${example.index + 1} | ` +
          `${cell((example.inputs ?? []).join("; "))} | ${cell(example.expected)} | ` +
          `${cell(actual)} | ` +
          `${example.verdict.status}${example.verdict.note ? `: ${cell(example.verdict.note)}` : ""} |`,
      );
    }
  }

  const consoleIssues = audit.flatMap((calculator) =>
    (calculator.consoleErrors ?? []).map(
      (error) => `- ${calculator.slug}: ${error}`,
    ),
  );

  lines.push("", "## Error konsol", "");

  if (consoleIssues.length === 0) {
    lines.push("Tidak ada error konsol selama audit.");
  } else {
    lines.push(...consoleIssues);
  }

  lines.push("");
  return `${lines.join("\n")}\n`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
