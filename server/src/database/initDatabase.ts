import openDatabase from "./openDatabase";

const initDatabase = async () => {
  // Open the database connection
  const db = await openDatabase();
  
  // Create a table "users" if it doesn't exist
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

  // Create a table "recipes" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT,
      userID TEXT,
      title TEXT,
      ingredients TEXT,
      estimate TEXT,
      cuisine TEXT,
      result_img TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE    
    );
  `);

  // Create a table "recipe_instruction" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipe_instructions (
      recipeID TEXT,
      step INTEGER,
      img TEXT,
      description TEXT,
      FOREIGN KEY (recipeID) REFERENCES recipes(id) ON DELETE CASCADE ON UPDATE CASCADE    
    );
  `);

 

    // Create a table "favorite_recipes" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS favorite_recipes (
      userID TEXT,
      recipeID TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (userID, recipeID),
      FOREIGN KEY (recipeID) REFERENCES recipes(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      PRIMARY KEY (userID, recipeID)    
    );
  `);

  // Create a table "likes" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      recipeID TEXT,
      userID TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recipeID) REFERENCES recipes(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      PRIMARY KEY (userID, recipeID)    

    );
  `);

  // Create a table "comments" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      userID TEXT,
      recipeID TEXT,
      comment TEXT,
      time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (recipeID) REFERENCES recipes(id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);

  // Create a table "follows" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS follows (
      following_user_id TEXT,
      followed_user_id TEXT,
      FOREIGN KEY (following_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (followed_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      UNIQUE (following_user_id, followed_user_id)
    );
  `);

  // Create a table "friendship" if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS friendship (
      userID1 TEXT,
      userID2 TEXT,
      FOREIGN KEY (userID1) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (userID2) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
      UNIQUE (userID1, userID2)
    
    );
  `)
  
  return db;
};

export default initDatabase;
