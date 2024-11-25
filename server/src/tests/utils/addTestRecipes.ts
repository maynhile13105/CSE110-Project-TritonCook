import { Database } from "sqlite";
import { Profile, Recipe } from "./types";

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


export async function addUsersToDatabase(db: Database, users: Profile[]) {
  try {
    for (const user of users) {
      // Check if the recipe already exists in the database
      const existingUser= await db.get(
        `SELECT * FROM users WHERE id = ?;`,
        [user.id]
      );

      // If the recipe does not exist, insert it
      if (!existingUser) {
        await db.run(
          `INSERT INTO users (id, name, email, picture)
           VALUES (?, ?, ?, ?);`,
          [ user.id, user.name, user.email, user.picture ]
        );
        console.log(`Added user with ID: ${user.id}`);
      } else {
        console.log(`Recipe with ID: ${user.id} already exists.`);
      }
    }
  } catch (error) {
    console.error("Error adding recipes to database:", error);
  }
}
