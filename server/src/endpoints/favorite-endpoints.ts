import { Database } from "sqlite";
import { addFavoriteRecipe, checkFavoriteRecipe, deleteFavoriteRecipe, getFavoriteRecipes } from "../utils/favorite-utils";
import { Request, Response } from "express";

export function createFavoriteRecipesEndpoints(app: any, db: Database){
    app.post("/favorite", (req: Request, res: Response) => {
        addFavoriteRecipe(req, res, db);
    });

    app.delete("/favorite/:userID/:recipeID", (req: Request, res: Response) => {
        deleteFavoriteRecipe(req, res, db);
    });

    app.get("/favorite", (req: Request, res: Response) => {
        getFavoriteRecipes(req, res, db);
    });

    app.get("/favorite/:userID/:recipeID", (req: Request, res: Response) => {
        checkFavoriteRecipe(req, res, db);
    })
}