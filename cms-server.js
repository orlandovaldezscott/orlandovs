const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3131;
const CONTENT_DIR = '/Users/orlandovaldes-scott/orlandovs/content';
const SITE_DIR = '/Users/orlandovaldes-scott/orlandovs';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, data, code=200) {
  cors(res); res.writeHead(code, {'Content-Type':'application/json'});
  res.end(JSON.stringify(data));
}

function walk(dir, files=[]) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (f.endsWith('.md')) files.push({name: f, path: full});
  }
  return files;
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') { cors(res); res.writeHead(204); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/' || url.pathname === '/cms') {
    cors(res); res.writeHead(200, {'Content-Type':'text/html'});
    res.end(fs.readFileSync(path.join(SITE_DIR, 'cms.html')));
    return;
  }

  if (url.pathname === '/files') {
    return json(res, walk(CONTENT_DIR));
  }

  if (url.pathname === '/file') {
    const p = url.searchParams.get('path');
    if (!p || !p.startsWith(CONTENT_DIR)) return json(res, {error:'Invalid path'}, 400);
    return json(res, {content: fs.readFileSync(p, 'utf8')});
  }

  if (url.pathname === '/save' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      const {path: p, content} = JSON.parse(body);
      if (!p.startsWith(CONTENT_DIR)) return json(res, {error:'Invalid path'}, 400);
      fs.mkdirSync(path.dirname(p), {recursive:true});
      fs.writeFileSync(p, content);
      json(res, {ok:true});
    });
    return;
  }

  if (url.pathname === '/publish' && req.method === 'POST') {
    try {
      execSync('cd /Users/orlandovaldes-scott/orlandovs && /opt/homebrew/bin/hugo && git add -A && git diff --cached --quiet || git commit -m "CMS publish" && git push', {timeout:30000});
      json(res, {ok:true});
    } catch(e) {
      json(res, {ok:false, error: e.stderr?.toString() || e.message});
    }
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => console.log(`CMS running at http://localhost:${PORT}`));
