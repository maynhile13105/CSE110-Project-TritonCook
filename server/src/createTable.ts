import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initDB = async () => {
  // Open the database connection
  const db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
  // Create a "user" table if it doesn't exist
  await db.exec(`
   CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    picture TEXT
   );
 `);

  // Create a "login" table if it doesn't exist
  await db.exec(`
   CREATE TABLE IF NOT EXISTS login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL
   );
`);
  return db;
};

export default initDB;

