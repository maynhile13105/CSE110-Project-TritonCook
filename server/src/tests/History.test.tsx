import { Server } from "http";
import { Database } from "sqlite";
import app from "../index";
import openDatabase from "../database/openDatabase";

let server: Server;
let db: Database;
const port = 8080;
let token = "";
const userId = "7e24928f-926d-400c-bd36-7acb3190948c"; // Hardcoded user ID

beforeAll(async () => {
  db = await openDatabase();
  server = await app.listen(port);

  // Wait for server startup for consistency on slower devices
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await delay(1000);

  // Create account for token
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

  token = result_login.token;
});

afterEach(async () => {
  await db.run(`DELETE FROM search_history WHERE userID = ?;`, [userId]);
});

afterAll(async () => {
  await db.run(`DELETE FROM users WHERE name IN ('testUser1');`);
  await db.run(`DELETE FROM login WHERE username IN ('testUser1');`);

  await db.close();
  server.close();
});

describe("History Endpoints", () => {
  test("Add search input to history", async () => {
    const response = await fetch("http://localhost:8080/history/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchInput: "test search" }),
    });

    const result = await response.json();
    expect(response.status).toBe(201);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].searchInput).toBe("test search");

    const history = await db.all(`SELECT * FROM search_history WHERE userID = ?;`, [userId]);
    expect(history).toHaveLength(1);
    expect(history[0].searchInput).toBe("test search");
  });

  test("Fetch search history", async () => {
    await db.run(
      `INSERT INTO search_history (userID, searchInput, time) VALUES (?, ?, CURRENT_TIMESTAMP);`,
      [userId, "test search"]
    );

    const response = await fetch("http://localhost:8080/history", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].searchInput).toBe("test search");
  });

  test("Delete a search input from history", async () => {
    await db.run(
      `INSERT INTO search_history (userID, searchInput, time) VALUES (?, ?, CURRENT_TIMESTAMP);`,
      [userId, "test search"]
    );

    const response = await fetch("http://localhost:8080/history/test%20search", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe("Search input deleted successfully");

    const history = await db.all(`SELECT * FROM search_history WHERE userID = ?;`, [userId]);
    expect(history).toHaveLength(0);
  });

  test("Add search input when unauthorized", async () => {
    const response = await fetch("http://localhost:8080/history/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchInput: "unauthorized test" }),
    });

    const result = await response.json();
    expect(response.status).toBe(401);
    expect(result.error).toBe("Unauthorized");
  });

  test("Delete non-existent search input", async () => {
    const response = await fetch("http://localhost:8080/history/nonexistent", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.message).toBe("Search input deleted successfully");

    const history = await db.all(`SELECT * FROM search_history WHERE userID = ?;`, [userId]);
    expect(history).toHaveLength(0);
  });
});
