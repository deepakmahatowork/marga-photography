# Production Deployment Guide — Marga Photography

This guide outlines step-by-step instructions for deploying **Marga Photography** to various production hosting platforms.

---

## Option 1: Docker & Self-Hosted Node Server (Recommended Default)

The repository is pre-configured with `@astrojs/node` standalone server adapter and includes a multi-stage [`Dockerfile`](file:///home/deepakmahato/marga-photography/Dockerfile) and [`docker-compose.yml`](file:///home/deepakmahato/marga-photography/docker-compose.yml).

### Step-by-Step Deployment:

1. **Clone & Environment Setup**:
   ```bash
   git clone https://github.com/your-org/marga-photography.git /var/www/marga-photography
   cd /var/www/marga-photography
   cp .env.example .env
   # Edit .env with your RESEND_API_KEY and CRM_WEBHOOK_URL
   ```

2. **Launch with Docker Compose**:
   ```bash
   docker compose up -d --build
   ```

3. **Nginx Reverse Proxy with Let's Encrypt SSL**:
   ```nginx
   server {
       server_name margaphotography.com www.margaphotography.com;

       location / {
           proxy_pass http://127.0.0.1:4321;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Option 2: Cloudflare Pages / Workers

To deploy to Cloudflare Pages:

1. Install Cloudflare adapter:
   ```bash
   npm i @astrojs/cloudflare
   ```
2. Update [`astro.config.mjs`](file:///home/deepakmahato/marga-photography/astro.config.mjs):
   ```js
   import cloudflare from '@astrojs/cloudflare';

   export default defineConfig({
     adapter: cloudflare(),
   });
   ```
3. Connect your repository in the Cloudflare Pages dashboard with build command `npm run build` and output directory `dist`.

---

## Option 3: Netlify

1. Install Netlify adapter:
   ```bash
   npm i @astrojs/netlify
   ```
2. Update [`astro.config.mjs`](file:///home/deepakmahato/marga-photography/astro.config.mjs):
   ```js
   import netlify from '@astrojs/netlify';

   export default defineConfig({
     adapter: netlify(),
   });
   ```
3. Deploy directly via Netlify CLI or Git integration:
   ```bash
   netlify deploy --build --prod
   ```

---

## Option 4: Vercel

1. Install Vercel adapter:
   ```bash
   npm i @astrojs/vercel
   ```
2. Update [`astro.config.mjs`](file:///home/deepakmahato/marga-photography/astro.config.mjs):
   ```js
   import vercel from '@astrojs/vercel';

   export default defineConfig({
     adapter: vercel(),
   });
   ```
3. Deploy via Vercel CLI:
   ```bash
   vercel --prod
   ```

---

## Pre-Deployment Verification Checklist

```bash
# 1. Run unit test suite
npm test

# 2. Test production build
npm run build

# 3. Test local preview
npm run preview
```
