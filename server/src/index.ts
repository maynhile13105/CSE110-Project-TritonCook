import { Response } from "express";
import { createGoogleEndpoints } from "./api/google-endpoints";
import { createLoginEndpoints } from "./api/login-endpoints";
import initDatabase from "./database/initDatabase";
import { createDisplayedRecipesEndpoints } from "./endpoints/displayedRecipes-endpoints";
import { createFavoriteRecipesEndpoints } from "./endpoints/favorite-endpoints";
import { addRecipesToDatabase, addUsersToDatabase } from "./tests/utils/addTestRecipes";
import { sampleRecipes, sampleUsers } from "./tests/utils/dummyList";
import { createUserInformationEndpoints } from "./endpoints/userInfo-endpoint";
import { createLikeEndpoints } from "./endpoints/like-endpoint";
import { createPostEndpoints } from "./endpoints/createPost-endpoints";
import path from 'path';


const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const fs = require('fs');


// Define the directory path for the recipe's result images upload
const resultImgDir = './uploads/recipes/results';
// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(resultImgDir)) {
  fs.mkdirSync(resultImgDir, { recursive: true });
}

// Define the directory path for the recipe's result images upload
const instructionImgDir = './uploads/recipes/instructions';
// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(instructionImgDir)) {
  fs.mkdirSync(instructionImgDir, { recursive: true });
}


// Define the directory path for avatar upload
const avatarDir = './uploads/avatar';
// Check if the directory exists, and create it if it doesn't
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}


app.use('/uploads/recipes/results', express.static('uploads/recipes/results'));
app.use('/uploads/recipes/instructions', express.static('uploads/recipes/rinstructions'));
app.use('/uploads/avatar', express.static('uploads/avatar'));


// Start the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}


// Initialize the database and start the server
(async () => {
  const db = await initDatabase();

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
  createLikeEndpoints(app, db);
  createPostEndpoints(app, db);
})();

export default app;