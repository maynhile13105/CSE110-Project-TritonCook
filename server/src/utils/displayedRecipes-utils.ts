import { Request, Response } from "express";
import { Database } from "sqlite"; // Replace with your actual DB library

export async function getDisplayedRecipes(req: Request, res: Response, db: Database) {
  try {
    // Log to check the database connection
    //console.log("Fetching displayed recipes...");

    // Query to fetch the 100 most recent recipes
    const recipes = await db.all(
      'SELECT * FROM recipes ORDER BY time DESC LIMIT 100;'
    );

    // Log the recipes fetched from the database
    //console.log("Fetched recipes:", recipes);

    // Respond with the fetched recipes
    return res.status(200).json({ data: recipes });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching recipes." });
  }
}

export async function getUserPostedRecipes(req: Request, res: Response, db: Database) {

  //console.log("Fetching posted recipes...");
  const { userID } = req.params;
  //console.log("userID received in backend: ", [userID]);
  if (!userID) {
    return res.status(400).json({ error: 'Missing required fields: userID' });
  }

  //console.log("UserID in backend: ", userID);

  try {
    // Log to check the database connection
    //console.log("Fetching user's posted recipes...");
    const recipes = await db.all(
      `SELECT * 
       FROM recipes
       WHERE userID = ?
       ORDER BY time DESC;
      `, [userID]
    );

    // Log the recipes fetched from the database
    //console.log("Fetched posted recipes:", recipes);

    // Respond with the fetched recipes
    return res.status(200).json({ data: recipes });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred while fetching user's posted recipes." });
  }
}

