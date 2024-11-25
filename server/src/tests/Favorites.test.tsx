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
    'DELETE FROM favorite_recipes WHERE userID = ?;',
    [userId]
  );
});

afterAll(async () => {
  await db.run(`
    DELETE FROM users WHERE name IN ('testUser1', 'testUser2');
  `);
  await db.run(`
    DELETE FROM login WHERE username IN ('testUser1', 'testUser2');
  `);

  await db.close();
  server.close();
});

describe("Favorites", () => {
  test("get when no favorites", async () => {
    const response = await fetch("http://localhost:8080/favorite", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rec = (await response.json()).data;
    expect(response.status).toBe(200);
    expect(rec).toHaveLength(0);
  });

  test("add favorite in", async () => {
    const response = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec = (await response.json()).recipeID;
    expect(response.status).toBe(201);
    expect(rec).toBeDefined();
    expect(rec).toBe("1");

    const liked = await db.all(
      'SELECT * FROM favorite_recipes WHERE userID = ?;',
      [userId]
    );
    expect(liked).toHaveLength(1);
  });

  test("add duplicate favorite in", async () => {
    const response1 = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec1 = (await response1.json()).recipeID;
    expect(response1.status).toBe(201);
    expect(rec1).toBeDefined();
    expect(rec1).toBe("1");

    const response2 = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec2 = (await response2.json()).recipeID;
    expect(response2.status).toBe(201);
    expect(rec2).toBeDefined();
    expect(rec2).toBe("1");

    const liked = await db.all(
      'SELECT * FROM favorite_recipes WHERE userID = ?;',
      [userId]
    );
    expect(liked).toHaveLength(1);
  });

  test("add different favorite in", async () => {
    const response1 = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec1 = (await response1.json()).recipeID;
    expect(response1.status).toBe(201);
    expect(rec1).toBeDefined();
    expect(rec1).toBe("1");

    const response2 = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "2" }),
    });
    const rec2 = (await response2.json()).recipeID;
    expect(response2.status).toBe(201);
    expect(rec2).toBeDefined();
    expect(rec2).toBe("2");

    const liked = await db.all(
      'SELECT * FROM favorite_recipes WHERE userID = ?;',
      [userId]
    );
    expect(liked).toHaveLength(2);
  });

  test("get after favoriting", async () => {
    const response_favorite = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec_favorite = (await response_favorite.json()).recipeID;
    expect(response_favorite.status).toBe(201);
    expect(rec_favorite).toBeDefined();
    expect(rec_favorite).toBe("1");

    const response_get = await fetch("http://localhost:8080/favorite", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rec_get = (await response_get.json()).data;
    expect(response_get.status).toBe(200);
    expect(rec_get).toHaveLength(1);
    expect(rec_get[0].title).toBe("Spaghetti Aglio e Olio");
  });

  test("get after favoriting many", async () => {
    const response1 = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec1 = (await response1.json()).recipeID;
    expect(response1.status).toBe(201);
    expect(rec1).toBeDefined();
    expect(rec1).toBe("1");

    const response2 = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "2" }),
    });
    const rec2 = (await response2.json()).recipeID;
    expect(response2.status).toBe(201);
    expect(rec2).toBeDefined();
    expect(rec2).toBe("2");

    const response_get = await fetch("http://localhost:8080/favorite", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rec_get = (await response_get.json()).data;
    expect(response_get.status).toBe(200);
    expect(rec_get).toHaveLength(2);
    expect(rec_get[0].title).toBe("Spaghetti Aglio e Olio");
    expect(rec_get[1].title).toBe("Vegetable Stir Fry");
  });

  test.skip("delete favorited", async () => {
    const response_favorite = await fetch("http://localhost:8080/favorite", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
    const rec_favorite = (await response_favorite.json()).recipeID;
    expect(response_favorite.status).toBe(201);
    expect(rec_favorite).toBeDefined();
    expect(rec_favorite).toBe("1");

    const response_get = await fetch("http://localhost:8080/favorite", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const rec_get = (await response_get.json()).data;
    expect(response_get.status).toBe(200);
    expect(rec_get).toHaveLength(1);
    expect(rec_get[0].title).toBe("Spaghetti Aglio e Olio");

    const response_del = await fetch("http://localhost:8080/favorite", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeID: "1" }),
    });
  });

});