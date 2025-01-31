CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"author" varchar NOT NULL,
	"genre" varchar NOT NULL,
	"rating" integer NOT NULL,
	"total_copies" integer DEFAULT 1 NOT NULL,
	"available_copies" integer DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"cover_color" varchar NOT NULL,
	"cover_url" text NOT NULL,
	"vide_url" text NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "books_id_unique" UNIQUE("id")
);
