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

export async function createPost(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { title, ingredients, estimate, cuisine } = req.body;
    const postId = uuidv4();
    // TODO
    res.status(201).json(postId);
  } catch (error) {
    return res.status(400).send({ error: `Recipe could not be added to your favorite list, ${error}` });
  }
}

export async function deletePost(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { postId } = req.body;

    // Ensure the user owns the recipe before deleting
    const recipe = await db.get(
      `SELECT * FROM recipes WHERE id = ? AND userID = ?`,
      [postId, userID]
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found or you do not have permission to delete it.' });
    }

    // Delete the recipe
    await db.run(
      `DELETE FROM recipes WHERE id = ?`,
      [postId]
    );

    res.status(202).json({ message: 'Recipe successfully deleted from your favorite list.' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'An error occurred while deleting the favorite recipe.' });
  }
}