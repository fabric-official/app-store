/**
 * Sign a file with minisign or cosign (keyless recommended).
 * Usage: node scripts/sign.mjs <infile> <outfile.sig>
 */
import fs from 'fs';
import { execSync } from 'child_process';

const infile = process.argv[2];
const outfile = process.argv[3] || `${infile}.sig`;
if (!infile) { console.error('Usage: node scripts/sign.mjs <infile> <outfile.sig>'); process.exit(1); }

try {
  // Prefer cosign keyless if available
  execSync(`cosign sign-blob --yes ${infile} > ${outfile}`, { stdio: 'inherit', shell: 'bash' });
} catch {
  // Fallback to minisign (expects MINISIGN_SECRET_KEY in env or local key config)
  execSync(`minisign -S -s /github/home/.minisign/minisign.key -m ${infile} -x ${outfile}`, { stdio: 'inherit', shell: 'bash' });
}
console.log('✔ signed', infile, '→', outfile);
