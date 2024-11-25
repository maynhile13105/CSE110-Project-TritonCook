import { Database } from "sqlite";
import { Recipe } from "./types";

export async function addRecipesToDatabase(db: Database, recipes: Recipe[]) {
  try {
    for (const recipe of recipes) {
      // Check if the recipe already exists in the database
      const existingRecipe = await db.get(
        `SELECT * FROM recipes WHERE id = ?;`,
        [recipe.id]
      );

      // If the recipe does not exist, insert it
      if (!existingRecipe) {
        await db.run(
          `INSERT INTO recipes (id, userID, title, ingredients, estimate, cuisine, result_img, time)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            recipe.id,
            recipe.userID,
            recipe.title,
            recipe.ingredients,
            recipe.estimate,
            recipe.cuisine,
            recipe.result_img,
            recipe.time,
          ]
        );
        console.log(`Added recipe with ID: ${recipe.id}`);
      } else {
        console.log(`Recipe with ID: ${recipe.id} already exists.`);
      }
    }
  } catch (error) {
    console.error("Error adding recipes to database:", error);
  }
}
