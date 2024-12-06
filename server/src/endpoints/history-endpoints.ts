import { Database } from "sqlite";
import { addSearchHistory, getSearchHistory, deleteSearchHistory } from "../utils/history-utils";
import { Request, Response } from "express";

export function createHistoryEndpoints(app: any, db: Database) {
  // Endpoint to add a search input to the user's search history
  app.post("/history/add", (req: Request, res: Response) => {
    console.log("Received request to add search history");
    addSearchHistory(req, res, db);
  });

  // Endpoint to fetch the user's search history
  app.get("/history", (req: Request, res: Response) => {
    console.log("Received request to fetch search history");
    getSearchHistory(req, res, db);
  });

  // Endpoint to delete a specific search input from the user's history
  app.delete("/history/:searchInput", (req: Request, res: Response) => {
    console.log("Received request to delete search history");
    deleteSearchHistory(req, res, db);
  })
}
