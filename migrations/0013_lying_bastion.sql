CREATE TYPE "public"."borrow_status" AS ENUM('borrowed', 'reserved', 'returned');--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "status" SET DATA TYPE borrow_status;