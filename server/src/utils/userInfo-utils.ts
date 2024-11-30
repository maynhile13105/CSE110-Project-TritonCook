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

export async function loadUserProfile(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Retrieve user information from the database
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userID]);
    console.log('Profile in backend:', JSON.stringify(user, null, 2));
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ user });
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

export async function loadUsername(req: Request, res: Response, db: Database) {
  const { id } = req.params;

  // Validate input
  if (!id) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // Fetch user from the database
    const user = await db.get(
      `SELECT name 
       FROM users
       WHERE id = ?;`,
      [id]
    );

    // Check if the user exists
    if (!user) {
      console.warn(`User not found for ID: ${id}`);
      return res.status(404).json({ error: "User not found." });
    }

    //console.log(`Fetched username for ID ${id}:`, user.name);
    return res.status(200).json({ data: user.name });
  } catch (error) {
    console.error(`Error fetching username for ID ${id}:`, error);
    return res.status(500).json({ error: "An error occurred while fetching the username." });
  }
}



export async function loadUserProfileUsingUsername(req: Request, res: Response, db: Database) {
  const { name } = req.params;

  // Validate input
  if (!name) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    // Fetch user from the database
    const user = await db.get(`SELECT * FROM users WHERE name = ?`, [name]);


    // Check if the user exists
    if (!user) {
      console.warn(`User not found for ID: ${name}`);
      return res.status(404).json({ error: "User not found." });
    }
    //console.log('Profile in backend:', JSON.stringify(user, null, 2));

    return res.status(200).json({ user });
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}