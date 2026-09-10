import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:4321';

test('SEO: robots.txt contains Disallow /api/ and valid Sitemap index', () => {
  const robots = fs.readFileSync(path.join(process.cwd(), 'public/robots.txt'), 'utf8');
  assert.match(robots, /Disallow:\s*\/api\//);
  assert.match(robots, /Sitemap:\s*https:\/\/margaphotography\.com\/sitemap-index\.xml/);
});

test('SEO: English Homepage HTML contains full SEO meta & hreflangs', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.equal(res.status, 200);
  const html = await res.text();

  // Language attribute
  assert.match(html, /<html[^>]*lang=["']en["']/);

  // Robots & Crawler Directives
  assert.match(html, /<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*max-image-preview:large/);
  assert.match(html, /<meta[^>]*name=["']googlebot["'][^>]*content=["'][^"']*index, follow/);

  // Geotags
  assert.match(html, /<meta[^>]*name=["']geo\.region["'][^>]*content=["']NP["']/);
  assert.match(html, /<meta[^>]*name=["']geo\.placename["'][^>]*content=["']Kathmandu, Nepal["']/);
  assert.match(html, /<meta[^>]*name=["']ICBM["'][^>]*content=["']27\.7172, 85\.3240["']/);

  // Hreflangs
  assert.match(html, /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']en["'][^>]*href=["']https:\/\/margaphotography\.com\/["']/);
  assert.match(html, /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']fr["'][^>]*href=["']https:\/\/margaphotography\.com\/fr["']/);
  assert.match(html, /<link[^>]*rel=["']alternate["'][^>]*hreflang=["']x-default["']/);

  // Open Graph
  assert.match(html, /<meta[^>]*property=["']og:locale["'][^>]*content=["']en_US["']/);
  assert.match(html, /<meta[^>]*property=["']og:image:width["'][^>]*content=["']1200["']/);

  // Structured Data (Organization / TravelAgency)
  assert.match(html, /"TravelAgency"/);
  assert.match(html, /"Marga Photography"/);
  assert.match(html, /"Buddhiman Tamang"/);
});

test('SEO: French Homepage HTML contains French lang & fr_FR locale', async () => {
  const res = await fetch(`${baseUrl}/fr`);
  assert.equal(res.status, 200);
  const html = await res.text();

  // Dynamic French lang attribute
  assert.match(html, /<html[^>]*lang=["']fr["']/);

  // French OpenGraph locale
  assert.match(html, /<meta[^>]*property=["']og:locale["'][^>]*content=["']fr_FR["']/);

  // Canonical points to /fr
  assert.match(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/margaphotography\.com\/fr["']/);
});

test('SEO: Category Explore Page contains ImageGallery and BreadcrumbList schema', async () => {
  const res = await fetch(`${baseUrl}/explore/people`);
  assert.equal(res.status, 200);
  const html = await res.text();

  // BreadcrumbList schema
  assert.match(html, /"BreadcrumbList"/);
  assert.match(html, /"Portfolios"/);

  // ImageGallery & ImageObject schema
  assert.match(html, /"ImageGallery"/);
  assert.match(html, /"ImageObject"/);
});

test('SEO: Expedition Page contains TouristTrip and Day Itinerary schema', async () => {
  const res = await fetch(`${baseUrl}/expeditions/tiji-festival-upper-mustang`);
  assert.equal(res.status, 200);
  const html = await res.text();

  // TouristTrip schema
  assert.match(html, /"TouristTrip"/);
  assert.match(html, /"Day"/);
  assert.match(html, /"Tiji Festival & The Walled Kingdom of Mustang"/);
});

test('SEO: Story Page contains Article schema and BreadcrumbList', async () => {
  const res = await fetch(`${baseUrl}/stories/the-cliff-honey-hunters-of-annapurna`);
  assert.equal(res.status, 200);
  const html = await res.text();

  // Article schema
  assert.match(html, /"Article"/);
  assert.match(html, /"Field Notes & Stories"/);
});
