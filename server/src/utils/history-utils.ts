import { Request, Response } from "express";
import { Database } from "sqlite";

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Function to verify JWT token and get the user ID
function verifyToken(req: Request): string | null {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("Extracted token:", token + '123');
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

// Add a search input to the history
export async function addSearchHistory(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  const { searchInput } = req.body;
  if (!searchInput) return res.status(400).json({ error: 'Missing search input' });

  try {
    // Insert or update the search input with the latest timestamp
    await db.run(
      `INSERT OR REPLACE INTO search_history (userID, searchInput, time)
       VALUES (?, ?, CURRENT_TIMESTAMP);`,
      [userID, searchInput]
    );

    // Fetch the updated history (limit to 10)
    const history = await db.all(
      `SELECT searchInput FROM search_history
       WHERE userID = ?
       ORDER BY time DESC
       LIMIT 10;`,
      [userID]
    );

    res.status(201).json({ data: history });
  } catch (error) {
    console.error('Error saving search history:', error);
    res.status(500).json({ error: 'An error occurred while saving search history.' });
  }
}

// Fetch the search history for a user
export async function getSearchHistory(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req);
  if (!userID) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const history = await db.all(
      `SELECT searchInput FROM search_history
       WHERE userID = ?
       ORDER BY time DESC
       LIMIT 10;`,
      [userID]
    );

    res.status(200).json({ data: history });
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'An error occurred while fetching search history.' });
  }
}

// Function to delete a specific search input from the user's history
export async function deleteSearchHistory(req: Request, res: Response, db: Database) {
  const userID = verifyToken(req); // Verify the user
  if (!userID) return res.status(401).json({ error: "Unauthorized" });

  const { searchInput } = req.params; // Extract the search input from the request params
  if (!searchInput) {
    return res.status(400).json({ error: "Missing search input" });
  }

  try {
    // Delete the search input for the user
    await db.run(
      `DELETE FROM search_history
       WHERE userID = ? AND searchInput = ?`,
      [userID, searchInput]
    );

    res.status(200).json({ message: "Search input deleted successfully" });
  } catch (error) {
    console.error("Error deleting search history:", error);
    res.status(500).json({ error: "An error occurred while deleting the search input." });
  }
}

