import { Request, Response } from "express";
import { Database } from "sqlite";
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

export async function loadUserInfo(req: Request, res: Response, db: Database) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded)
    const userId = decoded.userId;
    console.log(userId)

    // Retrieve user information from the database
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}