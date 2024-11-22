import { Database } from "sqlite";
import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

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

export async function addFavoriteRecipe(req: Request, res: Response, db: Database) {
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { recipeID } = req.body;
    if (!recipeID) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await db.run('INSERT INTO favorite_recipes (userID, recipeID) VALUES (?, ?);', [userId, recipeID]);
    res.status(201).json({ userID: userId, recipeID });
  } catch (error) {
    return res.status(400).send({ error: `Recipe could not be added to your favorite list, ${error}` });
  }
}

export async function deleteFavoriteRecipe(req: Request, res: Response, db: Database) {
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { recipeID } = req.params;
  if (!recipeID) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const recipe = await db.get('SELECT * FROM favorite_recipes WHERE userID = ? AND recipeID = ?;', [userId, recipeID]);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found in user\'s favorite list' });
    }

    await db.run('DELETE FROM favorite_recipes WHERE userID = ? AND recipeID = ?;', [userId, recipeID]);
    res.status(202).send();
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'An error occurred while deleting the favorite recipe.' });
  }
}

export async function checkIsFavoriteRecipe(req: Request, res: Response, db: Database) {
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { recipeID } = req.params;
  if (!recipeID) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const isFavorite = await db.get(
      'SELECT COUNT(*) > 0 AS is_favorite FROM favorite_recipes WHERE userID = ? AND recipeID = ?;',
      [userId, recipeID]
    );
    res.status(200).json({ isFavorite: isFavorite.is_favorite });
  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({ error: 'An error occurred while checking the favorite recipe.' });
  }
}

export async function getFavoriteRecipes(req: Request, res: Response, db: Database) {
  const userId = verifyToken(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const favoriteRecipesList = await db.all(
      `SELECT r.* 
       FROM recipes r
       JOIN favorite_recipes fr ON r.id = fr.recipeID
       WHERE fr.userID = ?
       ORDER BY fr.time DESC;`,
      [userId]
    );

    console.log('Fetched favorite recipes:', favoriteRecipesList);
    res.status(200).json({ data: favoriteRecipesList });
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching favorite recipes.' });
  }
}

