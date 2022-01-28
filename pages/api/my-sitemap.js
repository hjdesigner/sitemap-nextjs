const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

export default async (req, res) => {
  const links = [
    { url: '/blog/my-first-blog-post/', changeFreq: 'daily', priority: 0.3 },
    { url: '/blog/my-second-blog-post/', changeFreq: 'daily', priority: 0.3 },
    { url: '/blog/my-third-blog-post/', changeFreq: 'daily', priority: 0.3 }
  ]

  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    'Content-Type': 'application/xml'
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
}