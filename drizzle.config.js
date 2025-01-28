import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";
config({ path: '.env' });

export default defineConfig({
    schema: "./database/Schema.js",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});