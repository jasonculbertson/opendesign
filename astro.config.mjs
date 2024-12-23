import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    mdx({
      components: {
        Card: './src/components/MDXCard.tsx'
      }
    }), 
    tailwind(), 
    react()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});