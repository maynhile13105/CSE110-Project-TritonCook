import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { Database } from "sqlite";
import { v4 as uuid } from 'uuid';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

export function createLoginEndpoints(app: any, db: Database) {
  app.post('/api/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // console.log(username)
    // console.log(password)

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
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: '3h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  });

  app.post('/api/createAccount', async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const isValidUCSDEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('@ucsd.edu');
    if (!isValidUCSDEmail) {
      return res.status(400).json({ error: 'Invalid UCSD email address.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    try {
      const existingUserLogin = await db.get(
        `SELECT * FROM login WHERE username = ?`,
        [username]
      );

      if (existingUserLogin) {
        return res.status(400).json({ error: 'Username is already in use.' });
      }

      const hash = createHash('sha256').update(email).digest();
      const userId = uuid({ random: hash.slice(0, 16) });
      
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.run(
        `INSERT INTO login (id, username, passwordHash) VALUES (?, ?, ?)`,
        [userId, username, hashedPassword]
      );

      const existingUser = await db.get(
        `SELECT * FROM users WHERE id = ?`,
        [userId]
      );
      
      if (!existingUser) {
        await db.run(
          `INSERT INTO users (id, name, email) VALUES (?, ?, ?)`,
          [userId, username, email]
        );
      }
      
      res.status(201).json({ message: 'Account created successfully.' });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
}