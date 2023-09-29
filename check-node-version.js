import { readFileSync } from 'fs';

const requiredVersion = readFileSync('.nvmrc', 'utf-8').trim();
const currentVersion = process.version.replace('v', '');

if (requiredVersion !== currentVersion) {
  console.error(`⚠️  The project requires Node.js ${requiredVersion} but you are using ${currentVersion}. Please switch versions using NVM or install the required version.`);
  process.exit(1);
}