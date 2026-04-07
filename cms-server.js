const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PORT = 3131;
const CONTENT_DIR = '/Users/orlandovaldes-scott/orlandovs/content';
const STATIC_DIR = '/Users/orlandovaldes-scott/orlandovs/static/images';
const SITE_DIR = '/Users/orlandovaldes-scott/orlandovs';

fs.mkdirSync(STATIC_DIR, { recursive: true });

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

  if (url.pathname === '/upload' && req.method === 'POST') {
    const ct = req.headers['content-type'] || '';
    const boundary = ct.split('boundary=')[1];
    if (!boundary) return json(res, {error:'No boundary'}, 400);
    let body = Buffer.alloc(0);
    req.on('data', d => body = Buffer.concat([body, d]));
    req.on('end', () => {
      const bnd = Buffer.from('--' + boundary);
      let start = body.indexOf(bnd) + bnd.length + 2;
      const headerEnd = body.indexOf('\r\n\r\n', start);
      const header = body.slice(start, headerEnd).toString();
      const nameMatch = header.match(/filename="([^"]+)"/);
      if (!nameMatch) return json(res, {error:'No filename'}, 400);
      const fname = nameMatch[1].replace(/[^a-zA-Z0-9._-]/g, '_');
      const dataStart = headerEnd + 4;
      const dataEnd = body.lastIndexOf('\r\n--' + boundary);
      const fileData = body.slice(dataStart, dataEnd);
      const outPath = path.join(STATIC_DIR, fname);
      fs.writeFileSync(outPath, fileData);
      json(res, { ok: true, url: `/images/${fname}`, markdown: `![${fname}](/images/${fname})` });
    });
    return;
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
      execSync('cd /Users/orlandovaldes-scott/orlandovs && git add -A && git diff --cached --quiet || git commit -m "CMS publish" && git push', {timeout:30000});
      json(res, {ok:true});
    } catch(e) {
      json(res, {ok:false, error: e.stderr?.toString() || e.message});
    }
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => console.log(`CMS running at http://localhost:${PORT}`));
