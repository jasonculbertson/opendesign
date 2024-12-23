import sqlite3 from 'better-sqlite3';
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

const dbPath = path.join(dataDir, 'likes.db');
const db = sqlite3(dbPath);

// Create likes table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS page_likes (
    page_path TEXT PRIMARY KEY,
    likes INTEGER DEFAULT 0
  )
`);

export function getLikes(pagePath: string): number {
  const result = db.prepare('SELECT likes FROM page_likes WHERE page_path = ?').get(pagePath);
  return result ? result.likes : 0;
}

export function incrementLikes(pagePath: string): number {
  db.prepare(`
    INSERT INTO page_likes (page_path, likes) 
    VALUES (?, 1)
    ON CONFLICT(page_path) DO UPDATE SET 
    likes = likes + 1
  `).run(pagePath);

  return getLikes(pagePath);
}
