import type { APIRoute } from 'astro';

const pages = [
  '',
  '/docs/leadership/day-1',
  '/docs/leadership/day-1/30-60-90-plan',
  '/docs/videos/case-studies',
  '/docs/videos/interviews',
];

export const GET: APIRoute = async () => {
  const siteUrl = 'https://opendesigndocs.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.7'}</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
