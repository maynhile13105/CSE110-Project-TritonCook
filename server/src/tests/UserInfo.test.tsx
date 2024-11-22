import { Server } from "http";
import { Database } from "sqlite";
import app from "../index";
import { createHash } from 'crypto';
import { v4 as uuid } from 'uuid';
const jwt = require('jsonwebtoken');
import openDatabase from "../database/openDatabase";
import initDatabase from "../database/initDatabase";

let server: Server;
let db: Database;
const port = 8080;

beforeAll(async () => {
  // Check for JWT_SECRET
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined. Please set it in the environment.");
  }

  db = await openDatabase();
  await initDatabase();
  server = await app.listen(port);

  // Wait for server startup for constancy on slower devices
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await delay(1000);
});

afterAll(async () => {
  await db.run(`
    DELETE FROM users WHERE name IN ('testUser1', 'testUser2');
  `);
  await db.run(`
    DELETE FROM login WHERE username IN ('testUser1', 'testUser2');
  `);

  db.close();
  server.close();
});

beforeEach(async () => {
  // Delete users and login records
  await db.run(`
    DELETE FROM users WHERE name IN ('testUser1', 'testUser2');
  `);
  await db.run(`
    DELETE FROM login WHERE username IN ('testUser1', 'testUser2');
  `);
});

describe("User Info Endpoint", () => {
  const user1Username = "testUser1";
  const user1Email = "user1@ucsd.edu";
  const user1Password = "password";
  const user1 = {
    username: user1Username,
    email: user1Email,
    password: user1Password,
  };

  test("Retrieve user information successfully", async () => {
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

    // Step 3: Request user info with the token
    const response_userInfo = await fetch("http://localhost:8080/userInfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${result_login.token}`,
      },
    });
    const result_userInfo = await response_userInfo.json();

    // Assertions
    expect(response_userInfo.status).toBe(200);
    expect(result_userInfo.user).toBeDefined();
    expect(result_userInfo.user.name).toBe(user1Username);
    expect(result_userInfo.user.email).toBe(user1Email);

    // Verify database values match the response
    const hash = createHash("sha256").update(user1Email).digest();
    const userId = uuid({ random: hash.slice(0, 16) });

    const userInDb = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
    expect(userInDb).not.toBeNull();
    expect(userInDb.id).toBe(userId);
    expect(userInDb.name).toBe(user1Username);
    expect(userInDb.email).toBe(user1Email);
  });

  test("Unauthorized access to user info", async () => {
    // Step 1: Attempt to access user info without a token
    const response_userInfo = await fetch("http://localhost:8080/userInfo", {
      method: "GET",
    });

    const result_userInfo = await response_userInfo.json();

    // Assertions
    expect(response_userInfo.status).toBe(401);
    expect(result_userInfo.error).toBe("Unauthorized");
  });

  test("Invalid token for user info", async () => {
    // Step 1: Create an invalid token
    const invalidToken = jwt.sign({ userId: "fakeId" }, "wrongSecret", {
      expiresIn: "1h",
    });

    // Step 2: Attempt to access user info with invalid token
    const response_userInfo = await fetch("http://localhost:8080/userInfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${invalidToken}`,
      },
    });

    const result_userInfo = await response_userInfo.json();

    // Assertions
    expect(response_userInfo.status).toBe(401);
    expect(result_userInfo.error).toBe("Unauthorized");
  });
});
