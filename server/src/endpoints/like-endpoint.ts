import { Database } from "sqlite";
import { Request, Response } from "express";
import { loadNumberOfLikes, addLike, removeLike, fetchLikedRecipes } from "../utils/like-utils";

export function createLikeEndpoints(app: any, db: Database){

    app.get("/like/:recipeID", (req: Request, res: Response) => {
        //console.log("Received request for fetching number of likes");
        loadNumberOfLikes(req, res, db);
    });

    app.post("/like/add/:recipeID", (req: Request, res: Response) => {
        //console.log("Received request for ADDing LIKE status");
        addLike(req, res, db);
    });

    app.delete("/like/remove/:recipeID", (req: Request, res: Response) =>{
        //console.log("Received request for removing LIKE status ");
        removeLike(req, res, db);
    });

    //Get The List
    app.get("/like", (req: Request, res: Response) => {
        //console.log("Received request for displayed like recipes");
        fetchLikedRecipes(req, res, db);
    });

}