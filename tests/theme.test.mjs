import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Theme Tokens — Global CSS defines semantic tokens for light and dark', () => {
  const cssPath = path.join(rootDir, 'src/styles/global.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Verify light tokens (Marga Adventure Theme)
  assert.match(css, /--color-canvas-bg:\s*#f8fafc/);
  assert.match(css, /--color-canvas-surface:\s*#ffffff/);
  assert.match(css, /--color-text-primary:\s*#0f172a/);
  assert.match(css, /--color-brand:\s*#1e73be/);

  // Verify dark tokens under [data-theme="dark"]
  assert.match(css, /\[data-theme=["']dark["']\]/);
  assert.match(css, /--color-canvas-bg:\s*#0b0f19/);
});

test('Theme Architecture — BaseLayout contains zero-FOUC script', () => {
  const layoutPath = path.join(rootDir, 'src/layouts/BaseLayout.astro');
  const layout = fs.readFileSync(layoutPath, 'utf8');

  assert.match(layout, /localStorage\.getItem\(['"]theme['"]\)/);
  assert.match(layout, /document\.documentElement\.setAttribute\(['"]data-theme['"]/);
});

test('Theme Toggle — Header component includes theme toggle button', () => {
  const headerPath = path.join(rootDir, 'src/components/navigation/Header.astro');
  const header = fs.readFileSync(headerPath, 'utf8');

  assert.match(header, /ThemeToggle/);
});
