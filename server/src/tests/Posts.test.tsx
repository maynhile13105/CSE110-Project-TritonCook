import { Server } from "http";
import { Database } from "sqlite";
import app from "../index";
const jwt = require('jsonwebtoken');
import openDatabase from "../database/openDatabase";

let server: Server;
let db: Database;
const port = 8080;
let token = "";
const userId = "7e24928f-926d-400c-bd36-7acb3190948c" // Hardcoded user id

beforeAll(async () => {
  db = await openDatabase();
  server = await app.listen(port);

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
    `
    DELETE FROM recipe_instructions
    WHERE recipeID IN (
      SELECT id FROM recipes WHERE userID = ?
    );
    `,
    [userId]
  );

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
  test("create post successfully", async () => {
    const postData = {
      title: "Test Recipe",
      ingredients: "Test Ingredient",
      estimate: 30,
      cuisine: "Test Cuisine",
      instructions: [
        { description: "Step 1: Do something", img: null },
        { description: "Step 2: Do something else", img: null },
      ],
    };

    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
    expect(post.ingredients).toBe(postData.ingredients);
    expect(post.estimate).toBe(postData.estimate);
    expect(post.cuisine).toBe(postData.cuisine);
    expect(post.imagePath).toBeUndefined();

    const instructions = await db.all(
      "SELECT * FROM recipe_instructions WHERE recipeID = ? ORDER BY step",
      [result.postId]
    );
    expect(instructions.length).toBe(postData.instructions.length);
    for (let i = 0; i < instructions.length; i++) {
      expect(instructions[i].description).toBe(postData.instructions[i].description);
      expect(instructions[i].img).toBe(postData.instructions[i].img);
    }
  });

  test("unauthorized create post", async () => {
    const postData = {
      title: "Test Recipe",
      ingredients: "Test Ingredient",
      estimate: "30 mins",
      cuisine: "Test Cuisine",
    };

    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();

    expect(response.status).toBe(401);
    expect(result.postId).toBeUndefined();
    expect(result.error).toBe('Unauthorized');

    // Verify the post is in the database
    const post = await db.get("SELECT * FROM recipes WHERE id = ?", [result.postId]);
    expect(post).toBeUndefined();
  });

  test("create post with missing fields", async () => {
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const result = await response.json();

    expect(response.status).toBe(400);
    expect(result.error).toBe("Missing fields.");
  });

  test("create and delete post successfully", async () => {
    const postId = "test-post-id";

    // Insert a sample post
    await db.run(
      "INSERT INTO recipes (id, userID, title, ingredients, estimate, cuisine, result_img) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [postId, userId, "Test Title", "Test Ingredients", 30, "Test Cuisine", null]
    );

    const instructions = [
      { step: 1, img: null, description: "Step 1: Do this" },
      { step: 2, img: null, description: "Step 2: Do that" },
    ];
    for (const instruction of instructions) {
      await db.run(
        "INSERT INTO recipe_instructions (recipeID, step, img, description) VALUES (?, ?, ?, ?)",
        [postId, instruction.step, instruction.img, instruction.description]
      );
    }

    const response = await fetch("http://localhost:8080/delete/test-post-id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    expect(response.status).toBe(202);
    expect(result.message).toBe("Recipe successfully deleted from your post list.");

    // Verify the post is removed from the database
    const post = await db.get("SELECT * FROM recipes WHERE id = ?", [postId]);
    expect(post).toBeUndefined();

    const postInstructions = await db.all(
      "SELECT * FROM recipe_instructions WHERE recipeID = ?",
      [postId]
    );
    expect(postInstructions.length).toBe(0);
  });

  test("fail to delete non-existent post", async () => {
    const response = await fetch("http://localhost:8080/delete/non-existent-id", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    expect(response.status).toBe(404);
    expect(result.error).toBe("Recipe not found or you do not have permission to delete it.");
  });
});