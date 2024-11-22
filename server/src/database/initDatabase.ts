import openDatabase from "./openDatabase";

const initDatabase = async () => {
  // Open the database connection
  const db = await openDatabase();
  
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
};

export default initDatabase;
