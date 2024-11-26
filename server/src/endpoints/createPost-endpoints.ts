import { Database } from "sqlite";
import { Request, Response } from "express";
import { createPost, deletePost } from "../utils/createPost-utils";

export function createFavoriteRecipesEndpoints(app: any, db: Database) {
  // Create post
  app.post("/post", (req: Request, res: Response) => {
    console.log("Received request for adding post");
    createPost(req, res, db);
  });

  // Remove post
  app.delete("/post", (req: Request, res: Response) => {
    console.log("Received request for deleting post");
    deletePost(req, res, db);
  });
}

