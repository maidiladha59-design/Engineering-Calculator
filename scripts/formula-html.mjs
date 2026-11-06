import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import ts from "typescript";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const OUT_FILE = path.join(SRC_DIR, "data", "formula-html.json");
const ATTRS = new Set(["tex", "formulaTex"]);
const RENDER_OPTIONS = {
  displayMode: true,
  throwOnError: false,
  strict: false,
  trust: false,
  output: "htmlAndMathml",
};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (
      /\.(ts|tsx)$/.test(entry.name) &&
      !/\.test\.(ts|tsx)$/.test(entry.name) &&
      !/\.d\.ts$/.test(entry.name)
    ) {
      files.push(full);
    }
  }

  return files;
}

/* Reads the raw body of a `String.raw`...`` or `...` template literal so
   backslash commands reach KaTeX exactly as written in the source. */
function rawTemplateText(node, sourceFile) {
  let target = node;

  if (ts.isTaggedTemplateExpression(target)) {
    const tag = target.tag;

    if (
      !ts.isPropertyAccessExpression(tag) ||
      tag.name.text !== "raw" ||
      tag.expression.getText(sourceFile) !== "String"
    ) {
      return null;
    }

    target = target.template;
  }

  if (!ts.isNoSubstitutionTemplateLiteral(target)) {
    return null;
  }

  return sourceFile.text.slice(target.getStart(sourceFile) + 1, target.getEnd() - 1);
}

function texFromInitializer(initializer, sourceFile, constants) {
  if (!initializer) {
    return null;
  }

  if (ts.isJsxExpression(initializer)) {
    return initializer.expression
      ? texFromInitializer(initializer.expression, sourceFile, constants)
      : null;
  }

  if (ts.isIdentifier(initializer)) {
    return constants.get(initializer.text) ?? null;
  }

  if (ts.isStringLiteral(initializer)) {
    return initializer.text;
  }

  return rawTemplateText(initializer, sourceFile);
}

export function collectFormulaSources() {
  const sources = new Map();
  const unsupported = [];
  const files = walk(SRC_DIR);
  const parsed = files.map((file) => ({
    file,
    sourceFile: ts.createSourceFile(
      file,
      fs.readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    ),
  }));
  const constants = new Map();

  for (const { sourceFile } of parsed) {
    const visit = (node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.initializer
      ) {
        const tex = rawTemplateText(node.initializer, sourceFile);

        if (tex !== null) {
          constants.set(node.name.text, tex);
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  for (const { file, sourceFile } of parsed) {
    const where = (node) =>
      `${path.relative(ROOT, file)}:${sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1}`;

    const add = (tex, at) => {
      if (!sources.has(tex)) {
        sources.set(tex, []);
      }

      sources.get(tex).push(at);
    };

    const visit = (node) => {
      if (
        ts.isPropertyAssignment(node) &&
        (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) &&
        ATTRS.has(node.name.text)
      ) {
        const tex = texFromInitializer(node.initializer, sourceFile, constants);

        if (tex === null) {
          unsupported.push(`${where(node)}: non-literal ${node.name.text} value`);
        } else {
          add(tex, where(node));
        }
      }

      if (ts.isJsxAttribute(node) && ATTRS.has(node.name.text)) {
        const tex = texFromInitializer(node.initializer, sourceFile, constants);

        /* tex={formulaTex} and tex={block.tex} are props resolved by the
           calculators from the literal definitions collected above. */
        if (tex !== null) {
          add(tex, where(node));
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
  }

  return { sources, unsupported, fileCount: files.length };
}

export function renderFormulaMap(sources) {
  const map = {};

  for (const tex of [...sources.keys()].sort()) {
    map[tex] = katex.renderToString(tex, RENDER_OPTIONS);
  }

  return map;
}

function main() {
  const check = process.argv.includes("--check");
  const { sources, unsupported, fileCount } = collectFormulaSources();

  if (unsupported.length > 0) {
    console.error("Formula props must be static String.raw template literals:");
    for (const line of unsupported) {
      console.error(`  - ${line}`);
    }
    process.exit(1);
  }

  const map = renderFormulaMap(sources);
  const json = `${JSON.stringify(map, null, 2)}\n`;
  const existing = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, "utf8") : "";

  if (check) {
    const expectedKeys = Object.keys(JSON.parse(existing || "{}"));
    const missing = Object.keys(map).filter((tex) => !expectedKeys.includes(tex));
    const stale = expectedKeys.filter((tex) => !(tex in map));

    if (json !== existing) {
      console.error(
        `src/data/formula-html.json is out of date (${missing.length} missing, ${stale.length} stale). Run: npm run generate:formulas`,
      );
      process.exit(1);
    }

    console.log(`formula-html.json is up to date (${expectedKeys.length} formulas from ${fileCount} files).`);
    return;
  }

  fs.writeFileSync(OUT_FILE, json);
  console.log(`Wrote ${Object.keys(map).length} formulas to ${path.relative(ROOT, OUT_FILE)}.`);
}

main();