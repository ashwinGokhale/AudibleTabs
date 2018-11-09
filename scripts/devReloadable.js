const tasks = require('./tasks');
const { exec } = require('shelljs');

console.log('[Copy assets]');
console.log('-'.repeat(80));
tasks.copyAssets('dev');

exec('webpack-dev-server --config webpack/devReloadable.config.js --progress --profile --colors');
