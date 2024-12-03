import { Database } from "sqlite";
import { Request, Response } from "express";
import path from "path";
import { promises as fsPromises } from 'fs';

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req: Request): string | null {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export async function createPost(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const postID = uuidv4();

    const { title, ingredients, estimate, cuisine, instructions } = req.body;

    const filesArray  = req.files as Express.Multer.File[];
    
    const resultImgFile = filesArray.find((file) => file.fieldname === "result_img");

    let  result_img = resultImgFile ? `/uploads/recipes/results/${resultImgFile.filename}` : null;

    if(resultImgFile){
      const ext = path.extname(resultImgFile.originalname); // Get original file extension
      const newFilename = `${postID}-Result${ext}`;

      const oldPath = resultImgFile.path;
      const newPath =  `./uploads/recipes/results/${newFilename}`;

      // Rename the result image file
      await fsPromises.rename(oldPath, newPath);
      result_img = `/uploads/recipes/results/${newFilename}`;
    }


    console.log("filesArray: ", filesArray );
    console.log("resultImgFile: ", resultImgFile);
    console.log("result_img: ", result_img);


    if (!title || !ingredients || !estimate || !cuisine || !instructions) {
      return res.status(400).json({ error: 'Missing fields.' });
    }


    await db.run("BEGIN");

    await db.run(
      `
      INSERT INTO recipes (id, userID, title, ingredients, estimate, cuisine, result_img)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [postID, userID, title, ingredients, estimate, cuisine, result_img]
    );

    const parsedInstructions = Array.isArray(instructions) ? instructions : JSON.parse(instructions);
    
    // Get `instructionImages` dynamically
    const instructionImageFiles = filesArray.filter((file) =>
      file.fieldname.startsWith("instructionImages")
    );
    if (!Array.isArray(parsedInstructions) || parsedInstructions.length === 0) {
      return res.status(400).json({ error: "Instructions must be a non-empty array." });
    }
    for (let i = 0; i < parsedInstructions.length; i++) {
      const stepNumber = i + 1;
      const { description } = parsedInstructions[i];

      if (!description) {
        throw new Error(`Instruction at step ${stepNumber} is missing a description.`);
      }

      const instructionImageFile = instructionImageFiles[i];

      const ext = path.extname(instructionImageFile.originalname); // Get original file extension


      let instructionImagePath = instructionImageFile? `/uploads/recipes/instructions/${instructionImageFile.filename}` : null;

      if(instructionImageFile){
        const newFilename = `${postID}-Step${stepNumber}${ext}`;

        const oldPath = instructionImageFile.path;
        const newPath =  `./uploads/recipes/instructions/${newFilename}`;

        //Rename the file
        await fsPromises.rename(oldPath, newPath);

        instructionImagePath = `/uploads/recipes/instructions/${newFilename}`;
      }
      console.log(`instruction ${stepNumber}, description: ${description}, img_path: ${instructionImagePath}`);
      await db.run(
        `
        INSERT INTO recipe_instructions (recipeID, step, img, description)
        VALUES (?, ?, ?, ?)
        `,
        [postID, stepNumber, instructionImagePath, description]
      );
    }

    await db.run("COMMIT");

    res.status(201).json({ postID, message: "Recipe successfully added." });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "An error occurred while adding the recipe." });
  }
}

export async function deletePost(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    //console.log("Deleting post....")

    const { recipeID } = req.params;

    //console.log("Received recipeID:", recipeID);


    // Ensure the user owns the recipe before deleting
    const recipe = await db.get(
      `SELECT * FROM recipes WHERE id = ? AND userID = ?`,
      [recipeID, userID]
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found or you do not have permission to delete it.' });
    }

    // Get the instruction images associated with the recipe
    const instructions = await db.all(
      `SELECT * FROM recipe_instructions WHERE recipeID = ?`,
      [recipeID]
    );

    // Get the file paths for the result image and instruction images
    const resultImgPath = recipe.result_img;
    // Delete the recipe instructions images (if any)
    const instructionImgPaths = instructions.map(instruction => instruction.img).filter(Boolean);
    
    // Delete all related images from the filesystem
    const filePathsToDelete = [resultImgPath, ...instructionImgPaths];
    for (const filePath of filePathsToDelete) {
      // Construct the full file path
      const fullPath = filePath.replace('/uploads', 'uploads');
      
      try {
        // Delete the file
        await fsPromises.unlink(fullPath);
        //console.log(`Deleted file: ${fullPath}`);
      } catch (err) {
        console.error(`Error deleting file: ${fullPath}`, err);
      }
    }

    // Delete the recipe
    
    await db.run("DELETE FROM recipe_instructions WHERE recipeID = ?", [recipeID]);
    await db.run("DELETE FROM favorite_recipes WHERE recipeID = ?", [recipeID]);
    await db.run("DELETE FROM likes WHERE recipeID = ?", [recipeID]);

    await db.run(
      `DELETE FROM recipes WHERE id = ? AND userID = ?`,
      [recipeID, userID]
    );

    console.log(`Deleted recipe with ID: ${recipeID}`);

    res.status(202).json({ message: 'Recipe successfully deleted from your post list.' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'An error occurred while deleting the post recipe.' });
  }
}