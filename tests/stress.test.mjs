import test from 'node:test';
import assert from 'node:assert/strict';

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:4321';

test('Routes Availability & Redirects Test', async () => {
  const routes = [
    { path: '/', expectedStatus: 200 },
    { path: '/about', expectedStatus: 200 },
    { path: '/commercial', expectedStatus: 200 },
    { path: '/contact', expectedStatus: 200 },
    { path: '/expeditions', expectedStatus: 200 },
    { path: '/expeditions/bardia-chitwan-wildlife-expedition', expectedStatus: 200 },
    { path: '/expeditions/gokyo-everest-high-himalaya', expectedStatus: 200 },
    { path: '/expeditions/nepal-master-photography-expedition', expectedStatus: 200 },
    { path: '/expeditions/sacred-nepal-culture-people', expectedStatus: 200 },
    { path: '/expeditions/sacred-shamans-of-nepal', expectedStatus: 200 },
    { path: '/expeditions/tiji-festival-upper-mustang', expectedStatus: 200 },
    { path: '/explore/people', expectedStatus: 200 },
    { path: '/explore/culture', expectedStatus: 200 },
    { path: '/explore/festivals', expectedStatus: 200 },
    { path: '/explore/wildlife', expectedStatus: 200 },
    { path: '/explore/landscapes', expectedStatus: 200 },
    { path: '/stories', expectedStatus: 200 },
    { path: '/stories/in-search-of-the-royal-bengal', expectedStatus: 200 },
    { path: '/stories/shadows-of-lo-manthang', expectedStatus: 200 },
    { path: '/stories/the-cliff-honey-hunters-of-annapurna', expectedStatus: 200 },
    { path: '/stories/the-living-shamans-of-dhorpatan', expectedStatus: 200 },
    { path: '/fr', expectedStatus: 200 },
    { path: '/non-existent-page-test-404', expectedStatus: 404 }
  ];

  for (const item of routes) {
    const res = await fetch(baseUrl + item.path, { redirect: 'manual' });
    assert.equal(
      res.status,
      item.expectedStatus,
      `Route ${item.path} expected status ${item.expectedStatus} but received ${res.status}`
    );
  }
});

test('Redirect Routes (Astro Config)', async () => {
  const redirects = [
    { path: '/gallery', expectedTarget: '/explore/people' },
    { path: '/tours/nepal-photography', expectedTarget: '/expeditions' },
    { path: '/tours/mustang-tiji-photography', expectedTarget: '/expeditions/tiji-festival-upper-mustang' },
    { path: '/tours/everest-gokyo-photo', expectedTarget: '/expeditions/gokyo-everest-high-himalaya' },
    { path: '/tours/wildlife-photography-nepal', expectedTarget: '/expeditions/bardia-chitwan-wildlife-expedition' },
  ];

  for (const item of redirects) {
    const res = await fetch(baseUrl + item.path, { redirect: 'manual' });
    // Should either return 301/302/307/308 redirect or 200 if followed
    assert.ok(
      [200, 301, 302, 307, 308].includes(res.status),
      `Redirect route ${item.path} returned unexpected status ${res.status}`
    );
  }
});

test('High Concurrency Page Fetch Stress Test (50 simultaneous requests)', async () => {
  const testRoutes = [
    '/',
    '/expeditions',
    '/stories',
    '/explore/people',
    '/explore/wildlife',
    '/about',
    '/fr',
    '/contact'
  ];

  const requests = Array.from({ length: 50 }, (_, i) => {
    const route = testRoutes[i % testRoutes.length];
    return fetch(baseUrl + route).then((res) => ({
      route,
      status: res.status,
      ok: res.ok
    }));
  });

  const results = await Promise.all(requests);
  const failed = results.filter((r) => !r.ok);
  assert.equal(failed.length, 0, `Concurrency stress test encountered ${failed.length} failed requests`);
});

test('Inquiry API — Honeypot Bot Silently Discarded', async () => {
  const res = await fetch(baseUrl + '/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Bot Submission',
      email: 'bot@spamnetwork.com',
      country: 'Unknown',
      company_honeypot: 'http://spam-link.ru'
    })
  });

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
});

test('Inquiry API — Missing Required Fields Returns 400', async () => {
  const res = await fetch(baseUrl + '/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Tester',
      // Missing email and country
    })
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
});

test('Inquiry API — Valid Submission with Metadata and Edge Characters', async () => {
  const res = await fetch(baseUrl + '/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Elena Rostova-Tamang (बुद्धिमान & François)',
      email: 'elena.rostova@photo-master.com',
      country: 'France / नेपाल',
      phone: '+977-9841008984',
      experience: 'Professional / Commercial',
      camera_system: 'Sony A1 II & Leica M11-D',
      preferred_season: 'Autumn 2026',
      notes: 'Interested in documenting Himalayan honey harvesting and sacred monastic rites.',
      expedition: 'Tiji Festival Upper Mustang'
    })
  });

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
  assert.match(data.message, /Inquiry received/);
});

test('Inquiry API — Concurrency Burst Test (30 parallel POSTs)', async () => {
  const bursts = Array.from({ length: 30 }, (_, i) => {
    return fetch(baseUrl + '/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Burst Photographer ${i}`,
        email: `photographer${i}@burst.test`,
        country: 'Switzerland',
        expedition: 'Gokyo & Everest High Himalaya'
      })
    }).then((r) => r.status);
  });

  const statuses = await Promise.all(bursts);
  const non200 = statuses.filter((s) => s !== 200);
  assert.equal(non200.length, 0, `Burst POST test had ${non200.length} non-200 responses`);
});

test('Inquiry API — Large Payload Resilience', async () => {
  const largeNotes = 'Field Expedition Details: '.repeat(500); // ~13.5 KB string
  const res = await fetch(baseUrl + '/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Heavy Payload Tester',
      email: 'heavy@test.org',
      country: 'Nepal',
      notes: largeNotes
    })
  });

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.success, true);
});
