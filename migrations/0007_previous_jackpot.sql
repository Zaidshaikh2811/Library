CREATE TYPE "public"."borrow_stat" AS ENUM('borrowed', 'reserved');--> statement-breakpoint
ALTER TABLE "borrow_record" ALTER COLUMN "status" SET DATA TYPE borrow_stat;--> statement-breakpoint
DROP TYPE "public"."borrow_status";