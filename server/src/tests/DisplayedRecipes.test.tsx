import { Server } from "http";
import { Database } from "sqlite";
import app from "../index";
import { addRecipesToDatabase } from "./utils/addTestRecipes";
import { sampleRecipes } from "./utils/samlpleRecipes";
import openDatabase from "../database/openDatabase";

let server: Server;
let db: Database;
const port = 8080;

beforeAll(async () => {
  db = await openDatabase();
  server = await app.listen(port);
  // await addRecipesToDatabase(db, sampleRecipes);

  // Wait for server startup for constancy on slower devices
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await delay(1000);
  // await addRecipesToDatabase(db, sampleRecipes);
});

afterAll(async () => {
  await db.close();
  server.close();
});

it("should return the most recent recipes ordered by time", async () => {
  const response = await fetch('http://localhost:8080/displayedRecipes', { method: "GET" });
  const rec = (await response.json()).data;
  expect(response.status).toBe(200);
  expect(rec).toHaveLength(10); // We inserted 5 recipes
  expect(rec[0].title).toBe("Spaghetti Aglio e Olio"); // Most recent
  expect(rec[1].title).toBe("Avocado Toast"); // Second most recent
});