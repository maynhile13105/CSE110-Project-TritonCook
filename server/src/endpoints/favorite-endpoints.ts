import { Database } from "sqlite";
import { addFavoriteRecipe, checkIsFavoriteRecipe, deleteFavoriteRecipe, getFavoriteRecipes } from "../utils/favorite-utils";
import { Request, Response } from "express";

export function createFavoriteRecipesEndpoints(app: any, db: Database) {
  app.post("/favorite", (req: Request, res: Response) => {
    console.log("Received request for adding favorite recipes");
    addFavoriteRecipe(req, res, db);
  });

  app.delete("/favorite", (req: Request, res: Response) => {
    console.log("Received request for deleting favorite recipes");
    deleteFavoriteRecipe(req, res, db);
  });

  app.get("/favorite", (req: Request, res: Response) => {
    console.log("Received request for getting favorite recipes");
    getFavoriteRecipes(req, res, db);
  });

  // app.get("/favorite/check/:userID/:recipeID", (req: Request, res: Response) => {
  //   console.log("Received request for checking favorite recipes");
  //   checkIsFavoriteRecipe(req, res, db);
  // })
}