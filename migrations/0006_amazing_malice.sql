CREATE TABLE "borrow_record" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"borrow_date" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" date NOT NULL,
	"return_date" date,
	"status" "borrow_status" DEFAULT 'borrowed' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "borrow_record_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DROP TABLE "borrow_records" CASCADE;--> statement-breakpoint
ALTER TABLE "borrow_record" ADD CONSTRAINT "borrow_record_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_record" ADD CONSTRAINT "borrow_record_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE no action ON UPDATE no action;