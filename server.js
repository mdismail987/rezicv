import http from 'http';
import { readFileSync, existsSync } from 'fs';
import { resolve, join, extname } from 'path';

const PORT = process.env.PORT || 3001;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API: /api/ai
  if (req.url === '/api/ai' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { action, bullet, mode } = payload;

        if (action === 'rewrite_bullet') {
          const clean = (bullet || '').trim().replace(/^(responsible for|helped with|worked on)\s+/i, '');
          const result = {
            rewrittenBullet: `Architected and deployed ${clean || 'scalable cloud microservices'}, elevating application performance by 36% and driving 99.99% system reliability.`,
            explanation: `Applied STAR methodology in ${mode || 'impact'} mode with strong action verbs and quantified impact.`,
          };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
          return;
        }

        if (action === 'tailor_job') {
          const result = {
            matchScore: 88,
            jobTitle: 'Senior Software Engineer',
            matchedKeywords: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Microservices'],
            missingKeywords: ['Docker', 'AWS ECS', 'Kubernetes', 'CI/CD'],
            tailoredSummary: 'Accomplished Senior Software Engineer with proven success architecting resilient distributed systems and driving measurable engineering velocity.',
            tailoredBullets: [
              {
                targetKeyword: 'Kubernetes',
                suggestedBullet: 'Engineered automated container orchestration pipelines using Kubernetes and Helm, cutting incident response times by 32%.',
              },
            ],
          };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
          return;
        }

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unsupported action' }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: /api/stripe/checkout
  if (req.url === '/api/stripe/checkout' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ url: '/?upgrade=success&test_mode=simulated', simulated: true }));
    return;
  }

  // Static files fallback if dist exists
  const distDir = resolve('./dist');
  let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);

  if (existsSync(filePath)) {
    const ext = extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(readFileSync(filePath));
  } else if (existsSync(join(distDir, 'index.html'))) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync(join(distDir, 'index.html')));
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ReziCV Backend API active', port: PORT }));
  }
});

server.listen(PORT, () => {
  console.log(`ReziCV Backend API server listening on http://localhost:${PORT}`);
});
