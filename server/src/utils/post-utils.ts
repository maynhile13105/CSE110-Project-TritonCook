import { Database } from "sqlite";
import { Request, Response } from "express";
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

export async function createPost(req: Request, res: Response, db: Database, up: any) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { title, ingredients, estimate, cuisine } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const postId = uuidv4();

    if (!title || !ingredients || !estimate || !cuisine) {
      return res.status(400).json({ error: 'Missing fields.' });
    }

    await db.run(
      `
      INSERT INTO recipes (id, userID, title, ingredients, estimate, cuisine, result_img)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [postId, userID, title, ingredients, estimate, cuisine, imagePath]
    );

    res.status(201).json({ postId, message: "Recipe successfully added." });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ error: "An error occurred while adding the recipe." });
  }
}

export async function deletePost(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    console.log("Deleting post....")

    const { recipeID } = req.params;

    console.log("Received recipeID:", recipeID);


    // Ensure the user owns the recipe before deleting
    const recipe = await db.get(
      `SELECT * FROM recipes WHERE id = ? AND userID = ?`,
      [recipeID, userID]
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found or you do not have permission to delete it.' });
    }

    // Delete the recipe
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