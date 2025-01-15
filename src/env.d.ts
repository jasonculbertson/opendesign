/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  readonly CLERK_SECRET_KEY: string;
  readonly CONVERTKIT_API_KEY: string;
  readonly CONVERTKIT_API_SECRET: string;
  readonly CONVERTKIT_FORM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}