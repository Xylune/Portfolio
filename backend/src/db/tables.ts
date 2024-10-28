import type { DB } from "./db";

export const createTables = (db: DB) => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    version TEXT NOT NULL,
    tags TEXT NOT NULL,
    status TEXT NOT NULL,
    public BOOLEAN NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    published_at TEXT NULL
  );
`);
};