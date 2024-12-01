import { Database } from "sqlite";
import { Request, Response } from "express";
import { createPost, deletePost } from "../utils/post-utils";

export function createPostEndpoints(app: any, db: Database, up: any) {
  // Create post
  app.post("/post", (req: Request, res: Response) => {
    console.log("Received request for adding post");
    createPost(req, res, db, up);
  });

  // Remove post
  app.delete("/delete/:recipeID", (req: Request, res: Response) => {
    console.log("Received request for deleting post");
    deletePost(req, res, db);
  });
}

