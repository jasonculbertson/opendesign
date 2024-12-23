import { kv } from '@vercel/kv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get the directory of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ensure the data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export async function getLikes(pagePath: string): Promise<number> {
  const likes = await kv.get<number>(`likes:${pagePath}`);
  return likes || 0;
}

export async function incrementLikes(pagePath: string): Promise<number> {
  const key = `likes:${pagePath}`;
  const newCount = await kv.incr(key);
  return newCount;
}
