import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

const openDatabase = async () => {
  const db: Database = await open({
    filename: "database.sqlite",
    driver: sqlite3.Database,
  });

  return db;
};

export default openDatabase;