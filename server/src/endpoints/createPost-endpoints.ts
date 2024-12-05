import { Database } from "sqlite";
import { Request, Response } from "express";
import { createPost, deletePost } from "../utils/post-utils";
import multer from "multer";

// Define storage 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname.startsWith('instructionImages')) {
      cb(null, './uploads/recipes/instructions');
    } else if (file.fieldname === 'result_img') {
      cb(null, './uploads/recipes/results');
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
// Set up multer 
const upload = multer({ storage: storage });


export function createPostEndpoints(app: any, db: Database) {
  // Create post
  app.post(
    "/post",
    upload.any(),
    (req: Request, res: Response) => createPost(req, res, db)
  );

  // Remove post
  app.delete("/delete/:recipeID", (req: Request, res: Response) => {
    //console.log("Received request for deleting post");
    deletePost(req, res, db);
  });
}

