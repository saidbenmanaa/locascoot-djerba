import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Serve modern formats automatically. Photos are the heaviest asset on a
    // rental site, so this is where page speed is won or lost.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    // Preview deployments and every *.vercel.app address are copies of the
    // site: keep them out of search results so they never compete with
    // https://www.locascootdjerba.tn. The production domain is unaffected.
    const noIndex = { key: 'X-Robots-Tag', value: 'noindex, nofollow' };

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?<host>.+)\\.vercel\\.app' }],
        headers: [noIndex],
      },
      ...(process.env.VERCEL_ENV === 'preview'
        ? [{ source: '/:path*', headers: [noIndex] }]
        : []),
    ];
  },
};

export default withNextIntl(nextConfig);
