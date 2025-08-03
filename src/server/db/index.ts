import { drizzle } from "drizzle-orm/singlestore";
import { type Pool } from "mysql2/promise";
import mysql from "mysql2/promise";

import { env } from "~/env";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ?? mysql.createPool(env.SINGLESTORE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error:", err);
});

export const db = drizzle({ client: conn });