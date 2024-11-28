import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
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