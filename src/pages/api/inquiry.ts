import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false; // Hybrid serverless endpoint

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email({ message: 'Valid email is required' }),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
  experience: z.string().optional(),
  camera_system: z.string().optional(),
  preferred_season: z.string().optional(),
  notes: z.string().optional(),
  expedition: z.string().default('General Inquiry'),
  company_honeypot: z.string().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawData = await request.json();

    // 1. Anti-spam honeypot detection
    if (rawData.company_honeypot && rawData.company_honeypot.trim().length > 0) {
      // Silently discard bot submission
      return new Response(
        JSON.stringify({ success: true, message: 'Inquiry processed' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Server-side Zod validation
    const parsed = inquirySchema.safeParse(rawData);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((i) => i.message).join(', ');
      return new Response(
        JSON.stringify({ success: false, message: errorMsg }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validData = parsed.data;

    // 3. Optional Webhook / CRM Integration Dispatch
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'margaphotography.com',
          timestamp: new Date().toISOString(),
          ...validData,
        }),
      }).catch((err) => console.error('[CRM WEBHOOK ERROR]', err));
    }

    // 4. Fallback lead logging (ensures zero data loss in production)
    console.log('[LEAD DISPATCH] New Marga Photography Expedition Inquiry:', {
      timestamp: new Date().toISOString(),
      name: validData.name,
      email: validData.email,
      country: validData.country,
      phone: validData.phone || 'N/A',
      expedition: validData.expedition,
      experience: validData.experience || 'N/A',
      cameraSystem: validData.camera_system || 'N/A',
      season: validData.preferred_season || 'N/A',
      notes: validData.notes || 'N/A',
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Inquiry received. Our expedition lead will contact you within 24 hours.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[LEAD DISPATCH ERROR]', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'A technical error occurred while recording your inquiry. Please write to expeditions@margaphotography.com directly.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
