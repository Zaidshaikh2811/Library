import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/Schema";
import Image from "next/image";

export default async function Home() {

  const result = await db.select().from(users);

  console.log(JSON.stringify(result, null, 2));


  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList title="Latest Books" books={sampleBooks} containerClassname="mt-20" />

    </>
  );
}
