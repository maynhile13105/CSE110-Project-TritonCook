import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { Database } from "sqlite";
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

export function createLoginEndpoints(app: any, db: Database) {
  app.post('/api/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    console.log(username)
    console.log(password)

    try {
      const user = await db.get(`SELECT * FROM login WHERE username = ?`, [username]);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  app.post('/api/login', async (req: Request, res: Response) => {
    // TODO: finish account creation api
    res.status(500).json({ error: 'Internal server error.' });
  });
}