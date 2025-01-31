import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/Schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {
  const session = await auth();


  const latestBooks = await db.select().from(books).limit(4).orderBy(desc(books.createdAt));


  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user.id} />
      <BookList title="Latest Books" books={latestBooks} containerClassname="mt-20" />

    </>
  );
}
