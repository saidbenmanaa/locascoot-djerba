/**
 * Generates stand-in images so the site still builds if a photo is ever missing.
 *
 * Run with: node scripts/generate-placeholders.mjs
 *
 * ⚠️  SAFE BY DESIGN: it never touches a file that already exists. The real
 *     photographs in public/images are therefore impossible to overwrite by
 *     running this. Delete a file first if you genuinely want a stand-in back.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(import.meta.dirname, '..', 'public', 'images');

/* Brand navy and gold, so the stand-ins look like the finished site. */
const PALETTE = [
  ['#16294a', '#375a92'],
  ['#1d2e4c', '#4872ae'],
  ['#293e63', '#6a90c5'],
  ['#451e02', '#d98002'],
];

/** SVG is XML, so any `&` or `<` in a label has to be escaped. */
function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function svg({ width, height, label, sublabel, index }) {
  const [from, to] = PALETTE[index % PALETTE.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <g fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2">
    <circle cx="${width * 0.28}" cy="${height * 0.66}" r="${height * 0.13}"/>
    <circle cx="${width * 0.72}" cy="${height * 0.66}" r="${height * 0.13}"/>
    <path d="M${width * 0.36} ${height * 0.66} H${width * 0.56} L${width * 0.66} ${height * 0.4} H${width * 0.56}"
      stroke="rgba(255,255,255,0.5)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="50%" y="${height * 0.86}" text-anchor="middle"
    font-family="system-ui, sans-serif" font-size="${Math.round(height * 0.075)}"
    font-weight="700" fill="rgba(255,255,255,0.92)">${esc(label)}</text>
  <text x="50%" y="${height * 0.93}" text-anchor="middle"
    font-family="system-ui, sans-serif" font-size="${Math.round(height * 0.042)}"
    fill="rgba(255,255,255,0.6)">${esc(sublabel)}</text>
</svg>`;
}

async function write(path, buffer) {
  const label = path.replace(join(import.meta.dirname, '..'), '.');

  // Never clobber a real photograph.
  if (existsSync(path)) {
    console.log('  – skipped (already exists)', label);
    return;
  }

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, buffer);
  console.log('  ✓', label);
}

async function jpg(path, options) {
  const buffer = await sharp(Buffer.from(svg(options)))
    .jpeg({ quality: 80, mozjpeg: true })
    .toBuffer();
  await write(path, buffer);
}

const vehicles = ['zimota-tapo-50', 'cappuccino-s-125'];

console.log('Generating placeholder images…');

let index = 0;
for (const slug of vehicles) {
  const label = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  for (const shot of [1, 2]) {
    await jpg(join(root, 'vehicles', `${slug}-${shot}.jpg`), {
      width: 1200,
      height: 900,
      label,
      sublabel: `Photo ${shot} — remplacer par une vraie photo`,
      index: index + shot,
    });
  }
  index += 1;
}

await jpg(join(root, 'hero', 'hero-bg.jpg'), {
  width: 1920,
  height: 1080,
  label: 'Locascoot Djerba',
  sublabel: 'Image d’accueil — remplacer par une vraie photo',
  index: 0,
});

await jpg(join(root, 'about', 'about.jpg'), {
  width: 1200,
  height: 900,
  label: 'Notre agence',
  sublabel: 'Remplacer par une vraie photo',
  index: 3,
});

await jpg(join(root, 'og', 'default.jpg'), {
  width: 1200,
  height: 630,
  label: 'Locascoot Djerba',
  sublabel: 'Location de scooters à Djerba, Tunisie',
  index: 1,
});

// Apple touch icon
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="8" fill="#16294a"/>
  <g fill="none" stroke="#fdb913" stroke-width="2">
    <circle cx="11.5" cy="24" r="3.5"/><circle cx="28.5" cy="24" r="3.5"/>
  </g>
  <path d="M15 24h7l3.5-8M21 16h4.5M25.5 16l3 8" fill="none" stroke="#ffffff"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

await write(
  join(root, '..', 'apple-touch-icon.png'),
  await sharp(Buffer.from(iconSvg)).png().toBuffer(),
);

await write(join(root, '..', 'favicon.svg'), Buffer.from(iconSvg));

/* Stand-in logo, laid out like the real lockup (navy with SCOOT in gold on a
   white ground) so that dropping the genuine file in its place needs no other
   change. Replace public/images/logo.png with the real artwork. */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="240" viewBox="0 0 760 240">
  <rect width="760" height="240" fill="#ffffff"/>
  <text x="380" y="62" text-anchor="middle" font-family="system-ui, sans-serif"
    font-size="22" font-weight="700" fill="#fdb913">Groupe Alibaba</text>
  <text x="380" y="140" text-anchor="middle" font-family="system-ui, sans-serif"
    font-size="52" font-weight="800">
    <tspan fill="#16294a">LOCA</tspan><tspan fill="#fdb913">SCOOT</tspan><tspan fill="#16294a">DJERBA</tspan>
  </text>
  <text x="380" y="186" text-anchor="middle" font-family="system-ui, sans-serif"
    font-size="19" font-weight="600" fill="#16294a">LOCATION DE SCOOTERS À DJERBA</text>
  <rect x="230" y="206" width="300" height="5" rx="2.5" fill="#fdb913"/>
</svg>`;

await write(
  join(root, 'logo.png'),
  await sharp(Buffer.from(logoSvg)).png().toBuffer(),
);

console.log('Done.');
