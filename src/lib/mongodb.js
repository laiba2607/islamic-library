import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "islamic-library");

    console.log("✅ Connected to DB:", db.databaseName);

    const books = await db
      .collection("books")
      .find({}, { projection: { title: 1, author: 1, language: 1, year: 1, pdfFile: 1 } })
      .toArray();

    console.log("📚 Books found:", books.length);

    if (books.length === 0) {
      return NextResponse.json({ error: "No books found in collection" }, { status: 404 });
    }

    return NextResponse.json(books);
  } catch (err) {
    console.error("❌ GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books", details: err.message }, { status: 500 });
  }
}
