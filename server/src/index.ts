import { Response } from "express";
import { createGoogleEndpoints } from "./api/google-endpoints";
import { createLoginEndpoints } from "./api/login-endpoints";
import openDatabase from "./database/openDatabase";
import initDatabase from "./database/initDatabase";

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

  // Root endpoint to get test if the server is running
  app.get("/", (req: Request, res: Response) => {
    res.send({ "data": "Hello, TypeScript Express!" });
    res.status(200);
  });

  createLoginEndpoints(app, db);
  createGoogleEndpoints(app, db);
})();

export default app;