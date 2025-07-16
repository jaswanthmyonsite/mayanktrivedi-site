const generateSitemap = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mayanktrivedi.com';
  
  const pages = [
    { url: '/', changefreq: 'monthly', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.9 },
    { url: '/ventures', changefreq: 'monthly', priority: 0.9 },
    { url: '/leadership', changefreq: 'monthly', priority: 0.8 },
    { url: '/makers-heart', changefreq: 'monthly', priority: 0.8 },
    { url: '/speaking', changefreq: 'weekly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return sitemap;
};

export default generateSitemap;
