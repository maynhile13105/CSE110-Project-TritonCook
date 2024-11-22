import { Response } from "express";
import { createGoogleEndpoints } from "./api/google-endpoints";
import { createLoginEndpoints } from "./api/login-endpoints";
import openDatabase from "./database/openDatabase";
import initDatabase from "./database/initDatabase";
import { createDisplayedRecipesEndpoints } from "./endpoints/displayedRecipes-endpoints";
import { createFavoriteRecipesEndpoints } from "./endpoints/favorite-endpoints";
import { addRecipesToDatabase } from "./addTestRecipes";
import { sampleRecipes } from "./samlpleRecipes";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Initialize the database and start the server
(async () => {
  await initDatabase();
  const db = await openDatabase();

  // Add sample test recipes; takes id 1-5
  await addRecipesToDatabase(db, sampleRecipes);

  // Root endpoint to get test if the server is running
  app.get("/", (req: Request, res: Response) => {
    res.send({ "data": "Hello, TypeScript Express!" });
    res.status(200);
  });

  createLoginEndpoints(app, db);
  createGoogleEndpoints(app, db);
  createDisplayedRecipesEndpoints(app, db);
  createFavoriteRecipesEndpoints(app, db);
})();

export default app;