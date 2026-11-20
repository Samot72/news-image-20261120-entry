// Entry program for the news-image-20261120 competition entry.
//
// The artwork being judged ships in this repository as entry.png, in the
// same directory as this file. When the harness runs the program, it has
// to place those exact bytes at <output dir>/entry.png and then prove the
// copy is faithful: same length, same sha256 digest. Any mismatch is a
// hard failure, never a silent pass. The program makes no network calls
// and reads nothing outside this directory, so two runs always produce
// the same bytes.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Anchor every path to this file's own directory, resolved from the
// module URL, so the program works from any working directory.
const here: string = dirname(fileURLToPath(import.meta.url));
const sourcePath: string = join(here, "entry.png");

// The runner may name an output directory through the environment;
// otherwise the deliverable belongs in the conventional /output mount.
const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destPath: string = join(outDir, "entry.png");

// Read the source a single time: the in-memory bytes are both what gets
// written and the reference the written file is checked against.
const source: Buffer = readFileSync(sourcePath);

mkdirSync(outDir, { recursive: true });
writeFileSync(destPath, source);

// First proof: the file on disk must be exactly as long as the source.
const onDisk: Buffer = readFileSync(destPath);
if (onDisk.length !== source.length) {
  throw new Error(
    `length mismatch: source is ${source.length} bytes, wrote ${onDisk.length}`,
  );
}

// Second proof: equal length can still hide flipped bytes, so compare
// sha256 digests of the source and of what actually landed on disk.
const digest = (bytes: Buffer): string =>
  createHash("sha256").update(bytes).digest("hex");
const sourceDigest: string = digest(source);
const diskDigest: string = digest(onDisk);
if (diskDigest !== sourceDigest) {
  throw new Error(
    `sha256 mismatch: source ${sourceDigest}, on disk ${diskDigest}`,
  );
}

console.log(
  `entry.png delivered: ${onDisk.length} bytes, sha256 ${diskDigest} -> ${destPath}`,
);
