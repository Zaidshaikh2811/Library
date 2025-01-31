ALTER TYPE "public"."borrow_stat" RENAME TO "borrow_status";--> statement-breakpoint
ALTER TABLE "borrow_record" RENAME TO "borrow_records";--> statement-breakpoint
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_record_id_unique";--> statement-breakpoint
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_record_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_record_book_id_books_id_fk";
--> statement-breakpoint
ALTER TABLE "borrow_records" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records" ADD CONSTRAINT "borrow_records_id_unique" UNIQUE("id");