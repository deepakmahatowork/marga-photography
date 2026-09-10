import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Content Verification — No establish date in hero and 5 years expertise present', () => {
  const indexPath = path.join(rootDir, 'src/pages/index.astro');
  const indexContent = fs.readFileSync(indexPath, 'utf8');

  // Must NOT have establish date in hero
  assert.equal(indexContent.includes('Est. 2014'), false, 'Should not contain "Est. 2014"');
  assert.equal(indexContent.includes('Est. 20'), false, 'Should not contain establish date');

  // Must contain 5 Years of Field Expertise
  assert.ok(
    indexContent.includes('5 Years of Field Expertise'),
    'Should contain "5 Years of Field Expertise"'
  );
});

test('Mobile Navigation — Touch accessibility, smooth scrolling, and safe link navigation', () => {
  const headerPath = path.join(rootDir, 'src/components/navigation/Header.astro');
  const header = fs.readFileSync(headerPath, 'utf8');

  // Hamburger button touch target (>= 44px)
  assert.match(header, /min-w-\[44px\]/);
  assert.match(header, /min-h-\[44px\]/);
  assert.match(header, /touch-manipulation/);

  // Dynamic mobile viewport height & overscroll container for smooth phone scrolling
  assert.match(header, /h-\[100dvh\]/);
  assert.match(header, /overscroll-contain/);
  assert.match(header, /min-h-0/);

  // Safe navigation: menuLinks listener must NOT synchronously closeMenu on cross-page links
  assert.match(header, /href\.startsWith\(['"]#['"]\)/);
});
