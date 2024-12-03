import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import multer from 'multer';
import { Database } from "sqlite";
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';


require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;



const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/avatar');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const uploadAvatar = multer({ storage: avatarStorage });

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

  app.post('/api/createAccount', 
    uploadAvatar.single('avatar'),
    async (req: Request, res: Response) => {
      const { username, email, password } = req.body;
      const avatarFile = req.file;
      
      if (!username || !email || !password || !avatarFile) {
        if (req.file) fs.unlinkSync(req.file.path); // Clean up file if input invalid
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

        let avatar = req.file ? `/uploads/avatar/${req.file.filename}` : null;
      
      if(avatarFile){
        const ext = path.extname(avatarFile.originalname); // Get original file extension
        const newFilename = `${userId}-Avatar${ext}`;
  
        const oldPath = avatarFile.path;
        const newPath =  `./uploads/avatar/${newFilename}`;
  
        // Rename the result image file
        await fsPromises.rename(oldPath, newPath);
        avatar = `/uploads/avatar/${newFilename}`;
      }
        
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
            `INSERT INTO users (id, name, email, picture) VALUES (?, ?, ?, ?)`,
            [userId, username, email, avatar]
          );
        }
        
        res.status(201).json({ message: 'Account created successfully.' });
      } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
    }
  );
}