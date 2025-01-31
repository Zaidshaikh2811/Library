ALTER TABLE "borrow_records" ALTER COLUMN "status" SET DEFAULT 'BORROWED';--> statement-breakpoint
ALTER TABLE "public"."borrow_records" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."borrow_status";--> statement-breakpoint
CREATE TYPE "public"."borrow_status" AS ENUM('AVAILABLE', 'BORROWED', 'RESERVED');--> statement-breakpoint
ALTER TABLE "public"."borrow_records" ALTER COLUMN "status" SET DATA TYPE "public"."borrow_status" USING "status"::"public"."borrow_status";