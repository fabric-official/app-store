import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import semver from 'semver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const REGISTRY_PATH = path.join(root, 'registry/index.json');

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) return { version: 1, plugins: [] };
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
}

function saveRegistry(reg) {
  // deterministic write (sorted)
  reg.plugins.sort((a, b) => a.id.localeCompare(b.id));
  reg.plugins.forEach(p => p.versions.sort((a, b) => semver.rcompare(a.v, b.v)));
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(reg, null, 2) + '\n', 'utf8');
  console.log('✔ updated registry:', REGISTRY_PATH);
}

function pluginDirs() {
  const base = path.join(root, 'plugins');
  return fs.readdirSync(base).map(x => path.join(base, x)).filter(p => fs.statSync(p).isDirectory());
}

const reg = loadRegistry();

for (const dir of pluginDirs()) {
  const manifestPath = path.join(dir, 'fabric-plugin.json');
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const id = manifest.id;
  const publisher = manifest.publisher || id.split('.')[0];
  const name = manifest.name || id;
  const version = manifest.version;
  const bundle = 'bundle/index.esm.js';
  const sig = 'bundle/index.esm.js.sig';
  const sbom = 'bundle/sbom.json';

  const rel = path.relative(root, dir).replace(/\\/g, '/');
  const urlBase = `https://raw.githubusercontent.com/fabric-official/app-store/main/${rel}`;
  const entry = {
    v: version,
    url: `${urlBase}/${bundle}`,
    sig: `${urlBase}/${sig}`,
    sbom: `${urlBase}/${sbom}`
  };

  let p = reg.plugins.find(x => x.id === id);
  if (!p) {
    p = { id, name, publisher, latest: version, versions: [entry], manifest: `${urlBase}/fabric-plugin.json` };
    reg.plugins.push(p);
  } else {
    const existing = p.versions.find(v => v.v === version);
    if (!existing) p.versions.push(entry);
    if (!p.latest || semver.gt(version, p.latest)) p.latest = version;
    p.name = name;
    p.publisher = publisher;
    p.manifest = `${urlBase}/fabric-plugin.json`;
  }
}

saveRegistry(reg);
