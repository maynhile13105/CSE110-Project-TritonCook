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
      const existingUser = await db.get(
        `SELECT * FROM login WHERE username = ? OR email = ?`,
        [username, email]
      );

      if (existingUser) {
        return res.status(400).json({ error: 'Username or email is already in use.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await db.run(
        `INSERT INTO login (username, email, passwordHash) VALUES (?, ?, ?)`,
        [username, email, hashedPassword]
      );

      res.status(201).json({ message: 'Account created successfully.' });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
}