import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const reg = JSON.parse(fs.readFileSync(path.join(root, 'registry/index.json'), 'utf8'));

async function head(url) {
  const r = await fetch(url, { method: 'HEAD' });
  if (!r.ok) throw new Error(`HEAD ${r.status} ${url}`);
}

const jobs = [];
for (const p of reg.plugins) {
  for (const v of p.versions) {
    if (v.url) jobs.push(head(v.url));
    if (v.sig) jobs.push(head(v.sig));
    if (v.sbom) jobs.push(head(v.sbom));
  }
  if (p.manifest) jobs.push(head(p.manifest));
  (p.screenshots || []).forEach(u => jobs.push(head(u)));
}
await Promise.all(jobs);
console.log('✔ all links OK');
