// news-image-20261120 — antar entry.png ke direktori output harness,
// lalu buktikan salinannya identik byte demi byte.
//
// Gambarnya sendiri dibuat di tempat lain (broadsheet.html -> entry.png).
// Program ini hanya memindahkan dan memeriksa pemindahannya.
// Tanpa network, tanpa mengubah gambar.
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE_NAME = "entry.png";
const OUTPUT_ENV = "MAKEFUN_OUTPUT_DIR";
const FALLBACK_DIR = "/output";

function sha256Hex(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

async function main(): Promise<void> {
  const sourcePath = resolve(HERE, SOURCE_NAME);
  const outDir = process.env[OUTPUT_ENV] ?? FALLBACK_DIR;
  const destPath = join(outDir, SOURCE_NAME);

  // Baca gambar tepat satu kali; semua langkah berikut memakai bytes ini.
  const original = await readFile(sourcePath);
  const originalHash = sha256Hex(original);

  await mkdir(outDir, { recursive: true });
  await writeFile(destPath, original);

  // Baca balik salinannya, lalu bandingkan dengan sumbernya.
  const copied = await readFile(destPath);
  const copiedHash = sha256Hex(copied);

  if (copied.length !== original.length) {
    throw new Error(
      `panjang beda: sumber ${original.length} byte, salinan ${copied.length} byte`,
    );
  }
  if (copiedHash !== originalHash) {
    throw new Error(`sha256 beda: sumber ${originalHash}, salinan ${copiedHash}`);
  }

  // Panjang sudah diketahui dari buffer yang dibaca balik; tidak perlu stat lagi.
  console.log(`ok: ${destPath} (${copied.length} byte, sha256 ${copiedHash})`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
