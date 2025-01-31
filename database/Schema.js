
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



export const books = pgTable("books", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    title: varchar("title").notNull(),
    author: varchar("author").notNull(),
    genre: varchar("genre").notNull(),
    rating: integer("rating").notNull(),
    totalCopies: integer("total_copies").notNull().default(1),
    availableCopies: integer("available_copies").notNull().default(0),
    description: text("description").notNull(),
    coverColor: varchar("cover_color").notNull(),
    coverUrl: text("cover_url").notNull(),
    videoUrl: text("vide_url").notNull(),
    summary: text("summary").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})


