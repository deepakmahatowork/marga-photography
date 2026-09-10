import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const expeditions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/expeditions' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    heroImage: z.string(),
    category: z.enum(['Festivals', 'Wildlife', 'Culture & People', 'Landscapes', 'Custom']),
    region: z.string(),
    durationDays: z.number(),
    groupSize: z.string(),
    photographyLevel: z.string(),
    difficulty: z.enum(['Gentle', 'Moderate', 'Challenging', 'Strenuous']),
    bestSeason: z.string(),
    priceFrom: z.string(),
    featured: z.boolean().default(false),
    highlights: z.array(z.string()),
    photographicOpportunities: z.array(z.string()),
    equipmentRecommendations: z.array(z.string()),
    itinerary: z.array(
      z.object({
        day: z.string(),
        title: z.string(),
        description: z.string(),
        photoFocus: z.string(),
      })
    ),
    included: z.array(z.string()),
    excluded: z.array(z.string()),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ).optional(),
  }),
});

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,json}', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    photographer: z.string(),
    location: z.string(),
    date: z.string(),
    heroImage: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    relatedExpeditionSlug: z.string().optional(),
    excerpt: z.string(),
    featured: z.boolean().default(false),
  }),
});

const photographs = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml}', base: './src/content/photographs' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['people', 'culture', 'festivals', 'wildlife', 'landscapes']),
    location: z.string(),
    image: z.string(),
    photographer: z.string(),
    caption: z.string(),
    aspectRatio: z.enum(['landscape', 'portrait', 'square', 'panorama']).default('landscape'),
    camera: z.string().optional(),
    lens: z.string().optional(),
    focalLength: z.string().optional(),
    aperture: z.string().optional(),
    shutterSpeed: z.string().optional(),
    iso: z.string().optional(),
    featured: z.boolean().default(false),
    copyright: z.string().default('© Marga Photography. All rights reserved.'),
  }),
});

const photographers = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml}', base: './src/content/photographers' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string(),
    specialties: z.array(z.string()),
    instagram: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  expeditions,
  stories,
  photographs,
  photographers,
};
