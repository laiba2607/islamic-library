import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // ✅ match your collection exactly → "books"
    const books = await db.collection("books").find({}).toArray();

    if (!books || books.length === 0) {
      return NextResponse.json({ message: "❌ No books found." }, { status: 404 });
    }

    return NextResponse.json(books);
  } catch (err) {
    console.error("❌ Error in GET /api/books:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
