import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "islamic-library");

    // ✅ remove projection first for debugging
    const books = await db.collection("books").find({}).toArray();

    console.log("📚 Books from DB:", books); // check server logs

    return NextResponse.json(books);
  } catch (err) {
    console.error("❌ GET /api/books error:", err);
    return NextResponse.json(
      { error: "Failed to fetch books", details: err.message },
      { status: 500 }
    );
  }
}
