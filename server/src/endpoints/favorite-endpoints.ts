import { Database } from "sqlite";
import { addFavoriteRecipe, deleteFavoriteRecipe, getFavoriteRecipes } from "../utils/favorite-utils";
import { Request, Response } from "express";

export function createFavoriteRecipesEndpoints(app: any, db: Database) {

  //Add to the favotie list
  app.post("/favorite/add/:recipeID", (req: Request, res: Response) => {
    console.log("Received request for ADD FAVORITE recipes");
    addFavoriteRecipe(req, res, db);
  });

  //Remove out of the favorite list
  app.delete("/favorite/remove/:recipeID", (req: Request, res: Response) => {
    console.log("Received request for DELETE FAVOTRITE recipes");
    deleteFavoriteRecipe(req, res, db);
  });

  //Get The List
  app.get("/favorite", (req: Request, res: Response) => {
    console.log("Received request for displayed FAVORITE recipes");
    getFavoriteRecipes(req, res, db);
  });
/*
  //Check favorite
  app.get("/favorite/check/:userID/:recipeID", (req: Request, res: Response) => {
    console.log("Received request for CHECK FAVORITE STATUS");
    checkIsFavoriteRecipe(req, res, db);
  })*/
}

