import { open } from "sqlite";
import sqlite3 from "sqlite3";

const initDB = async () => {
  // Open the database connection
  const db = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });
  // Create a "users" table if it doesn't exist
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
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL
   );
 `);
    
  return db;
};

export default initDB;
