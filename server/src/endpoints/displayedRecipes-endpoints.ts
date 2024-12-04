import { Database } from "sqlite";
import { Request, Response } from "express";
import { getDisplayedRecipes, getRecipe, getUserPostedRecipes } from "../utils/displayedRecipes-utils";

export function createDisplayedRecipesEndpoints(app: any, db: Database) {
  app.get("/displayedRecipes", (req: Request, res: Response) => {
    //console.log("Received request for getting displayed recipes");
    getDisplayedRecipes(req, res, db);
  });

  app.get("/displayedPostedRecipes/:userID", (req: Request, res: Response) => {
    //console.log("Received request for getting user's posted recipes");
    getUserPostedRecipes(req, res, db);
  });

  app.get("/displayedRecipes/:recipeID", (req: Request, res: Response) => {
    //console.log("Received request for getting specific recipe");
    getRecipe(req, res, db);
  });
}