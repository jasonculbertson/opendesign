import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    mdx({
      components: {
        'img': 'astro/components/Image.astro'
      }
    }),
    tailwind(),
    react()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  env: {
    PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  }
});