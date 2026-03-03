import knex from "knex";
import { env } from "./env/index.js";

export const config = {
  client: "sqlite3",
  connection:
    env.DATABASE_CLIENT === "sqlite"
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const dbKnex = knex(config);
