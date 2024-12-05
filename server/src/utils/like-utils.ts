import { Request, Response } from "express";
import { Database } from "sqlite";

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

export async function loadNumberOfLikes(req: Request, res: Response, db: Database) {
  const { recipeID } = req.params;
  // Validate input
  if (!recipeID) {
    return res.status(400).json({ error: "User ID is required." });
  }
  
  try {
    // Fetch user from the database
    const result = await db.get(
      `SELECT COUNT(*) AS count
       FROM likes
       WHERE recipeID = ?;
      `,[recipeID]
    );

    return res.status(200).json({ data: result.count });
  } catch (error) {
    console.error(`Error fetching number of likes for recipeID ${recipeID}:`, error);
    return res.status(500).json({ error: "An error occurred while fetching the number of likes." });
  }
};

export async function fetchLikedRecipes(req: Request, res: Response, db: Database) {
  //Authorize user
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const likedRecipesList = await db.all(
      `SELECT r.*
       FROM likes l
       JOIN recipes r ON r.id = l.recipeID
       WHERE l.userID = ?
       ORDER BY l.time DESC;
      `,[userID]
    );

    //console.log('Fetched liked recipes:', likedRecipesList);
    res.status(200).json({ data: likedRecipesList });
  } catch (error) {
    console.error('Error fetching liked recipes:', error);
    res.status(500).json({ error: 'An error occurred while fetching liked recipes.' });
  }

};

export async function addLike(req: Request, res: Response, db: Database) {
    //Authorize user
    const userID = verifyToken(req);
    if (!userID) return res.status(401).json({ error: 'Unauthorized' });
  
    try {
      // Log to check the database connection
      //console.log("Adding like status...");
      const { recipeID } = req.body;
      if (!recipeID) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      await db.run('INSERT INTO likes (userID, recipeID) VALUES (?, ?);', [userID, recipeID]);
      res.status(201).json({ userID: userID, recipeID });
    } catch (error) {
      return res.status(400).send({ error: `Recipe could not be added like status, ${error}` });
    }
};

export async function removeLike(req: Request, res: Response, db: Database) {
    //Authorize user
    const userID = verifyToken(req);
    if (!userID) return res.status(401).json({ error: 'Unauthorized' });
  
    const { recipeID } = req.params;
    if (!recipeID) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
  
      console.log("Removing like status...");
  
      const likeStatus = await db.get('SELECT * FROM likes WHERE userID = ? AND recipeID = ?;', [userID, recipeID]);
      console.log(`${userID} ----- ${recipeID}`);
      if (!likeStatus) {
        return res.status(404).json({ error: 'Recipe not found in user\'s like list' });
      }
  
      await db.run('DELETE FROM likes WHERE userID = ? AND recipeID = ?;', [userID, recipeID]);
      res.status(202).send();
    } catch (error) {
      console.error('Error deleting favorite:', error);
      res.status(500).json({ error: 'An error occurred while deleting the favorite recipe.' });
    }
};
