/**
 * ============================================================================
 *  OPTIMISE YOUR PHOTOS
 * ============================================================================
 *
 *  Photos straight from a phone are 4–8 MB, which is far too heavy for a
 *  website — especially for visitors on Tunisian mobile data. This script
 *  resizes and compresses them in place.
 *
 *  HOW TO USE
 *  ----------
 *  1. Copy your photos into the right folder:
 *       public/images/vehicles/   → photos of your scooters and motorbikes
 *       public/images/about/      → the photo on the "L'agence" page
 *       public/images/hero/       → the large homepage banner image
 *
 *  2. Run:  npm run optimize-images
 *
 *  3. Reference the filename in the vehicle's file, e.g.
 *       images: ['cappuccino-s-125-1.jpg']
 *
 *  Photos already the right size are skipped, so it is safe to run repeatedly.
 *
 *  NAMING TIP: name files after the vehicle, e.g. `cappuccino-s-125-1.jpg`.
 *  Descriptive filenames are a small but real ranking signal for image search.
 */
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..', 'public', 'images');

/** Longest edge, in pixels, per folder. */
const MAX_WIDTH = {
  hero: 2000,
  vehicles: 1600,
  about: 1600,
  og: 1200,
  default: 1600,
};

const QUALITY = 78;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

function folderOf(path) {
  return basename(dirname(path));
}

let processed = 0;
let skipped = 0;
let savedBytes = 0;

console.log('Optimising images in public/images …\n');

for await (const path of walk(ROOT)) {
  const ext = extname(path).toLowerCase();
  if (!EXTENSIONS.has(ext)) continue;

  const before = (await stat(path)).size;
  const maxWidth = MAX_WIDTH[folderOf(path)] ?? MAX_WIDTH.default;

  const image = sharp(path);
  const metadata = await image.metadata();

  // Already small enough and reasonably compressed — leave it alone.
  if ((metadata.width ?? 0) <= maxWidth && before < 300_000) {
    skipped += 1;
    continue;
  }

  const temp = path + '.tmp';

  await image
    .rotate() // respect the phone's orientation tag
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(temp);

  const after = (await stat(temp)).size;

  if (after >= before) {
    await unlink(temp);
    skipped += 1;
    continue;
  }

  await rename(temp, path);
  processed += 1;
  savedBytes += before - after;

  const pct = Math.round(((before - after) / before) * 100);
  console.log(
    `  ✓ ${basename(path)}  ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(1)} MB  (−${pct}%)`,
  );
}

console.log(
  `\nDone. ${processed} optimised, ${skipped} already fine, ${(savedBytes / 1024 / 1024).toFixed(1)} MB saved.`,
);
