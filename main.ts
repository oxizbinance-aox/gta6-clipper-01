import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(process.cwd());
const videoPath = join(repoRoot, "VIDEO.json");
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "out");

const raw = readFileSync(videoPath, "utf8");
const video = JSON.parse(raw) as { url?: unknown };
if (
  typeof video.url !== "string" ||
  !video.url.startsWith("https://www.youtube.com/shorts/")
) {
  throw new Error("VIDEO.json must name a YouTube Shorts url");
}

const videoId = video.url.slice(
  "https://www.youtube.com/shorts/".length,
);
if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
  throw new Error("VIDEO.json url must carry an 11-character Shorts id");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "VIDEO.json");
writeFileSync(target, JSON.stringify({ url: video.url }) + "\n");
console.log(`wrote ${target}`);
