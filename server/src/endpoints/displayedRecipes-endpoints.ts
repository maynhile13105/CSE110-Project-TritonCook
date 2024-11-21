import { Database } from "sqlite";
import { Request, Response } from "express";
import { getDisplayedRecipes } from "../utils/displayedRecipes-utils";

export function createDisplayedRecipesEndpoints(app: any, db: Database){

    app.get("/displayedRecipe", (req: Request, res: Response) => {
        getDisplayedRecipes(req, res, db);
    });


}