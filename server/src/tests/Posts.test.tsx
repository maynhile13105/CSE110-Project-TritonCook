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
      instructions: JSON.stringify([
        { description: "Step 1: Do something" },
        { description: "Step 2: Do something else" },
      ]),

    };

    // Simulate file uploads (e.g., result image and instruction images)
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("ingredients", postData.ingredients);
    formData.append("estimate", postData.estimate.toString());
    formData.append("cuisine", postData.cuisine);
    formData.append("instructions", postData.instructions);
    formData.append("instructionImages", new Blob(["test-image-1"]), "step1.jpg");
    formData.append("instructionImages", new Blob(["test-image-2"]), "step2.jpg");
    formData.append("result_img", new Blob(["test-image"]), "result.jpg");
  
  
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    const result = await response.json();
  
    expect(response.status).toBe(201);
    expect(result.postID).toBeDefined();
    expect(result.message).toBe("Recipe successfully added.");
  
    // Verify the post is in the database
    const post = await db.get("SELECT * FROM recipes WHERE id = ?", [result.postID]);
    expect(post).toBeDefined();
    expect(post.title).toBe(postData.title);
    expect(post.ingredients).toBe(postData.ingredients);
    expect(post.estimate).toBe(postData.estimate);
    expect(post.cuisine).toBe(postData.cuisine);
  
    const instructions = await db.all(
      "SELECT * FROM recipe_instructions WHERE recipeID = ? ORDER BY step",
      [result.postID]
    );
    expect(instructions.length).toBe(2);
    for (let i = 0; i < instructions.length; i++) {
      expect(instructions[i].description).toBe(
        JSON.parse(postData.instructions)[i].description
      );
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
    const postData = {
      title: "Test Recipe",
      ingredients: "Test Ingredient",
      estimate: 30,
      cuisine: "Test Cuisine",
      instructions: JSON.stringify([
        { description: "Step 1: Do something" },
        { description: "Step 2: Do something else" },
      ]),

    };

    // Simulate file uploads (e.g., result image and instruction images)
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("ingredients", postData.ingredients);
    formData.append("estimate", postData.estimate.toString());
    formData.append("cuisine", postData.cuisine);
    formData.append("instructions", postData.instructions);
    formData.append("instructionImages", new Blob(["test-image-1"]), "step1.jpg");
    formData.append("instructionImages", new Blob(["test-image-2"]), "step2.jpg");
    formData.append("result_img", new Blob(["test-image"]), "result.jpg");
  
  
    const createPost_response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    const postResult = await createPost_response.json();

    const postID = postResult.postID;


    const response = await fetch(`http://localhost:8080/delete/${postID}`, {
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
    const post = await db.get("SELECT * FROM recipes WHERE id = ?", [postID]);
    expect(post).toBeUndefined();

    const postInstructions = await db.all(
      "SELECT * FROM recipe_instructions WHERE recipeID = ?",
      [postID]
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