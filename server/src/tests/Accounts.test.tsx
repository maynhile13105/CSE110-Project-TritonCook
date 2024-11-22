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
});

afterAll(async () => {
  await db.run(`
    DELETE FROM users WHERE name IN ('testUser1', 'testUser2');
  `);
  await db.run(`
    DELETE FROM login WHERE username IN ('testUser1', 'testUser2');
  `);

  // console.log("Starting cleanup...");

  // if (server) {
  //   console.log("Closing server...");
  //   await new Promise<void>((resolve, reject) => {
  //     server.close((err) => {
  //       if (err) {
  //         console.error("Error closing server:", err);
  //         return reject(err);
  //       }
  //       console.log("Server closed.");
  //       resolve();
  //     });
  //   });
  // }

  // if (db) {
  //   console.log("Closing database...");
  //   await db.close();
  //   console.log("Database closed.");
  // }

  // console.log("Cleanup complete.");

  // console.log("Forcing process exit.");
  // process.exit(0);
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

describe("Create Account", () => {
  const user1Username = "testUser1";
  const user1Email = "user1@ucsd.edu";
  const user1Password = "password";
  const user1 = {
    username: user1Username,
    email: user1Email,
    password: user1Password,
  };

  test("missing username", async () => {
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user1Email,
        password: user1Password,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Username, email, and password are required.');
  });

  test("missing email", async () => {
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
        password: user1Password,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Username, email, and password are required.');
  });

  test("missing password", async () => {
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
        email: user1Email,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Username, email, and password are required.');
  });

  test("invalid email", async () => {
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
        email: "user1@gmail.com",
        password: user1Password,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Invalid UCSD email address.');
  });

  test("password too short", async () => {
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
        email: user1Email,
        password: "short",
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Password must be at least 8 characters long.');
  });

  test("username already taken", async () => {
    // First create the user
    await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1),
    });

    // Try to create the same user again
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1),
    });

    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Username is already in use.');
  });

  test("create account", async () => {
    const response = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1),
    });

    // console.log(response);

    const result = await response.json();
    expect(response.status).toBe(201);
    expect(result.message).toBe('Account created successfully.');

    const hash = createHash('sha256').update(user1Email).digest();
    const userId = uuid({ random: hash.slice(0, 16) });

    const loginUser = await db.get(`SELECT * FROM login WHERE username = ?`, [user1Username]);
    expect(loginUser).not.toBeNull();
    expect(loginUser.id).toBe(userId);
    expect(loginUser.username).toBe(user1Username);

    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [userId]);
    expect(user).not.toBeNull();
    expect(user.name).toBe(user1.username);
    expect(user.email).toBe(user1.email);
  });
});

describe("Login", () => {
  const user1Username = "testUser1";
  const user1Email = "user1@ucsd.edu";
  const user1Password = "password";
  const user1 = {
    username: user1Username,
    email: user1Email,
    password: user1Password,
  };

  test("missing username", async () => {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: user1Password,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Username and password are required.');
  });

  test("missing password", async () => {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(400);
    expect(result.error).toBe('Username and password are required.');
  });

  test("user not found", async () => {
    const response_create = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1),
    });
    expect(response_create.status).toBe(201);

    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: "nonexistentUser",
        password: user1Password,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(404);
    expect(result.error).toBe('User not found.');
  });

  test("invalid credentials", async () => {
    const response_create = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1),
    });
    expect(response_create.status).toBe(201);

    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
        password: "wrongPassword",
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(401);
    expect(result.error).toBe('Invalid credentials.');
  });

  test("login", async () => {
    const response_create = await fetch('http://localhost:8080/api/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1),
    });
    expect(response_create.status).toBe(201);

    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user1Username,
        password: user1Password,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.token).toBeDefined();

    const hash = createHash('sha256').update(user1Email).digest();
    const userId = uuid({ random: hash.slice(0, 16) });

    const decodedToken = jwt.verify(result.token, process.env.JWT_SECRET);
    expect(decodedToken.userId).toBeDefined();
    expect(decodedToken.userId).toBe(userId);
  });
});
