import { Server } from "http";
import { Database } from "sqlite";
import app from "../index";
const jwt = require('jsonwebtoken');
import { addRecipesToDatabase } from "./utils/addTestRecipes";
import { sampleRecipes } from "./utils/samlpleRecipes";
import openDatabase from "../database/openDatabase";

let server: Server;
let db: Database;
const port = 8080;
let token = "";
const userId = "7e24928f-926d-400c-bd36-7acb3190948c" // Hardcoded user id

beforeAll(async () => {
  db = await openDatabase();
  server = await app.listen(port);
  await addRecipesToDatabase(db, sampleRecipes);

  // Wait for server startup for constancy on slower devices
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  await delay(1000);

  // Create account for token (repeat of Login:login)
  const user1Username = "testUser1";
  const user1Email = "user1@ucsd.edu";
  const user1Password = "password";
  const user1 = {
    username: user1Username,
    email: user1Email,
    password: user1Password,
  };
  // Step 1: Create an account
  const response_create = await fetch("http://localhost:8080/api/createAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user1),
  });
  expect(response_create.status).toBe(201);

  // Step 2: Log in to obtain JWT token
  const response_login = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user1Username,
      password: user1Password,
    }),
  });

  const result_login = await response_login.json();
  expect(response_login.status).toBe(200);
  expect(result_login.token).toBeDefined();

  token = result_login.token
});

afterEach(async () => {
  await db.run(
    'DELETE FROM recipes WHERE userID = ?;',
    [userId]
  );
});

afterAll(async () => {
  await db.run(`
    DELETE FROM users WHERE name IN ('testUser1');
  `);
  await db.run(`
    DELETE FROM login WHERE username IN ('testUser1');
  `);

  await db.close();
  server.close();
});

describe("Posts", () => {
  test.skip("create post successfully", async () => {
    const postData = {
      title: "Test Recipe",
      ingredients: "Test Ingredient",
      estimate: "30 mins",
      cuisine: "Test Cuisine",
    };

    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();

    expect(response.status).toBe(201);
    expect(result.postId).toBeDefined();
    expect(result.message).toBe("Recipe successfully added.");

    // Verify the post is in the database
    const post = await db.get("SELECT * FROM recipes WHERE id = ?", [result.postId]);
    expect(post).toBeDefined();
    expect(post.title).toBe(postData.title);
  });
});