import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
  experience: z.string().optional(),
  camera_system: z.string().optional(),
  preferred_season: z.string().optional(),
  notes: z.string().optional(),
  expedition: z.string().default('General Inquiry'),
  company_honeypot: z.string().optional(),
});

test('Inquiry Schema Validation — Valid Input', () => {
  const validData = {
    name: 'Elena Rostova',
    email: 'elena@example.com',
    country: 'Germany',
    phone: '+49 170 1234567',
    experience: 'Advanced Photographer',
    camera_system: 'Leica M11',
    preferred_season: 'Spring 2026',
    notes: 'Interested in Upper Mustang Tiji Festival',
    expedition: 'Tiji Festival Upper Mustang',
  };

  const result = inquirySchema.safeParse(validData);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.name, 'Elena Rostova');
    assert.equal(result.data.email, 'elena@example.com');
  }
});

test('Inquiry Schema Validation — Invalid Email Rejection', () => {
  const invalidData = {
    name: 'Test User',
    email: 'not-an-email',
    country: 'Nepal',
  };

  const result = inquirySchema.safeParse(invalidData);
  assert.equal(result.success, false);
});

test('Inquiry Schema Validation — Missing Required Field Rejection', () => {
  const missingName = {
    email: 'test@example.com',
    country: 'UK',
  };

  const result = inquirySchema.safeParse(missingName);
  assert.equal(result.success, false);
});
