import { Request, Response } from "express";
import { Database } from "sqlite"; // Replace with your actual DB library

export async function loadUserInfo(req: Request, res: Response, db: Database) {
    const { userID } = req.params;
    if (!userID) {
        return res.status(400).json({ error: "Missing userID parameter" });
    }
    
    try {
        // Query to fetch favorite recipes for the user, ordered by the time they were added to favorites
        const userInfo = await db.all(
          `SELECT * 
           FROM users
           WHERE id = ?;`,
          [userID]
        );
        res.status(200).json({data: userInfo});
    } catch(error) {
        res.status(500).json({ error: "An error occurred while fetching favorite recipes." });
    }
  
}