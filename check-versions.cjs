const fs = require('fs');
const semver = require('semver'); // Пакет semver поможет в сравнении версий

const requiredNodeVersion = fs.readFileSync('.nvmrc', 'utf-8').trim();
const currentNodeVersion = process.version;
const requiredNpmVersion = '9.8.1';
const currentNpmVersion = require('child_process')
  .execSync('npm --version')
  .toString()
  .trim();

if (!semver.satisfies(currentNodeVersion, requiredNodeVersion)) {
  console.error(`⚠️  Project requires Node.js ${requiredNodeVersion}, but you're using ${currentNodeVersion}. Please switch versions using NVM or install the required version.`);
  process.exit(1);
}

if (!semver.satisfies(currentNpmVersion, requiredNpmVersion)) {
  console.error(`⚠️  Project requires npm ${requiredNpmVersion}, but you're using ${currentNpmVersion}. Please update npm.`);
  process.exit(1);
}
