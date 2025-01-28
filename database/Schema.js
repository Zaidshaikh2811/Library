
import { date, integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';


export const STATUS_ENUM = pgEnum("status", ["pending", "approved", "rejected"]);
export const ROLE_ENUM = pgEnum("role", ["user", "admin"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ["borrowed", "returned"]);


export const users = pgTable('users', {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    universityId: integer("university_id").notNull(),
    universityCard: text("university_card").notNull(),
    status: STATUS_ENUM("status").notNull().default("pending"),
    role: ROLE_ENUM("role").notNull().default("user"),
    lastActivityDate: date("last_activity_date").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


