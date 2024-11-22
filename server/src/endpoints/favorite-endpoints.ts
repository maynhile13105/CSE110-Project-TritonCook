import { Database } from "sqlite";
import { addFavoriteRecipe, checkIsFavoriteRecipe, deleteFavoriteRecipe, getFavoriteRecipes } from "../utils/favorite-utils";
import { Request, Response } from "express";

export function createFavoriteRecipesEndpoints(app: any, db: Database){
    app.post("/favorite", (req: Request, res: Response) => {
        console.log("Received request for displayed recipes");
        addFavoriteRecipe(req, res, db);
    });

    app.delete("/favorite/:userID/:recipeID", (req: Request, res: Response) => {
        console.log("Received request for displayed recipes");
        deleteFavoriteRecipe(req, res, db);
    });

    app.get("/favorite", (req: Request, res: Response) => {
        console.log("Received request for displayed recipes");
        getFavoriteRecipes(req, res, db);
    });

    app.get("/favorite/check/:userID/:recipeID", (req: Request, res: Response) => {
        console.log("Received request for displayed recipes");
        checkIsFavoriteRecipe(req, res, db);
    })
}