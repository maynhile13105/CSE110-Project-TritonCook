import { Database } from "sqlite";
import { Request, Response } from 'express';
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
import { v4 as uuid } from 'uuid';
import { createHash } from "crypto";
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID
const JWT_SECRET = process.env.JWT_SECRET
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export function createGoogleEndpoints(app: any, db: Database) {
  app.post('/api/google-signin', async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const { sub, name, email, picture } = payload;

      const hash = createHash('sha256').update(email).digest();
      const userId = uuid({ random: hash.slice(0, 16) });

      db.run(
        `
        INSERT INTO users (id, name, email, picture)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET picture = ?
        `,
        [userId, name, email, picture, picture]
      );

      const sessionToken = jwt.sign(
        { userId: userId },
        JWT_SECRET,
        { expiresIn: '3h' }
      );        
      // console.log(sessionToken)
      res.json({ sessionToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Token verification failed' });
    }
  });

  app.get('/api/profile', async (req: Request, res: Response) => {
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
  });
}