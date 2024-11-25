import { Database } from "sqlite";
import { Request, Response } from "express";
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

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

export async function createPost(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
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
    // TODO

    res.status(202).send();
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'An error occurred while deleting the favorite recipe.' });
  }
}