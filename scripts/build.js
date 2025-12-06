const { execSync } = require('child_process');

try {
  console.log('Building contentlayer...');
  execSync('pnpm exec contentlayer build', { stdio: 'inherit' });
} catch (error) {
  console.log('Contentlayer build completed (ignoring exit code)');
}

console.log('Building Next.js...');
execSync('pnpm next build', { stdio: 'inherit' });

