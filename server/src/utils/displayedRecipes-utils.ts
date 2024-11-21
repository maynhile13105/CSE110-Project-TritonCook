import { Request, Response } from "express";
import { Database } from "sqlite"; // Replace with your actual DB library

export async function getDisplayedRecipes(req: Request, res: Response, db: Database) {
  try {
    // Query to fetch the 100 most recent recipes
    const recipes = await db.all(
      'SELECT * FROM recipes ORDER BY time DESC LIMIT 100;'
    );

    // Respond with the fetched recipes
    res.status(200).json({ data: recipes });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching recipes." });
  }
}
