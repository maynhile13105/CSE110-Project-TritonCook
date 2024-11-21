import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadDisplayedRecipes } from "../utils/displayedRecipes-utils";

export function createDisplayedRecipesEndpoints(app: any, db: Database){

    app.get("/displayedRecipes", (req: Request, res: Response) => {
        console.log("Received request for displayed recipes");
        loadDisplayedRecipes(req, res, db);
    });


}