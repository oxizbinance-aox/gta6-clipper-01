import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const SHORTS_PREFIX = "https://www.youtube.com/shorts/";
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const inputPath = join(BOT_DIR, "VIDEO.json");

let raw: string;
try {
  raw = readFileSync(inputPath, "utf8");
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  fail(`could not read ${inputPath}: ${reason}`);
}

let data: unknown;
try {
  data = JSON.parse(raw);
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  fail(`${inputPath} is not valid JSON: ${reason}`);
}

if (typeof data !== "object" || data === null || Array.isArray(data)) {
  fail(`${inputPath} must contain a JSON object with a "url" field.`);
}

const url = (data as { url?: unknown }).url;

if (typeof url !== "string") {
  fail(`"url" in ${inputPath} must be a string.`);
}

if (!url.startsWith(SHORTS_PREFIX)) {
  fail(
    `"url" must start with ${SHORTS_PREFIX} (got: ${JSON.stringify(url)}).`,
  );
}

const videoId = url.slice(SHORTS_PREFIX.length);

if (!VIDEO_ID_PATTERN.test(videoId)) {
  fail(
    `video id after ${SHORTS_PREFIX} must be exactly 11 characters ` +
      `(letters, digits, "_" or "-") (got: ${JSON.stringify(videoId)}).`,
  );
}

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  fail(`could not create output directory ${OUTPUT_DIR}: ${reason}`);
}

const outputPath = join(OUTPUT_DIR, "VIDEO.json");

try {
  writeFileSync(outputPath, JSON.stringify({ url }) + "\n", "utf8");
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  fail(`could not write ${outputPath}: ${reason}`);
}

console.log(`Wrote ${outputPath}`);
