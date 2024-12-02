import { Database } from "sqlite";
import { Request, Response } from "express";
import { createPost, deletePost } from "../utils/post-utils";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
export function createPostEndpoints(app: any, db: Database) {
  // Create post
  app.post("/post",
    upload.fields([
      { name: "image", maxCount: 1 }, 
      { name: "instructionImage", maxCount: 10 }, 
    ]),
    (req: Request, res: Response) => createPost(req, res, db)
  );

  // Remove post
  app.delete("/delete/:recipeID", (req: Request, res: Response) => {
    console.log("Received request for deleting post");
    deletePost(req, res, db);
  });
}

