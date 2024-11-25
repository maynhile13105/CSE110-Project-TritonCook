import { Response } from "express";
import initDB from "./createTable";
import { createGoogleEndpoints } from "./api/google-endpoints";
import { createLoginEndpoints } from "./api/login-endpoints";
import { createDisplayedRecipesEndpoints } from "./endpoints/displayedRecipes-endpoints";
import { createFavoriteRecipesEndpoints } from "./endpoints/favorite-endpoints";
import { addRecipesToDatabase, addUsersToDatabase } from "./addTestRecipes";
import { sampleRecipes, sampleUsers } from "./dummyList";
import { createUserInformationEndpoints } from "./endpoints/userInfo-endpoint";

const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Initialize the database and start the server
(async () => {
  const db = await initDB();

  //Add sample user:
  await addUsersToDatabase(db, sampleUsers);

  // Add sample test recipes; takes id 1-10
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
  createUserInformationEndpoints(app, db);
})();

