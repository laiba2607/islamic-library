import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "islamic-library");
    const books = await db.collection("books").find({}).toArray();

    console.log("📚 Books from DB:", books); // 🔍 check server logs

    return NextResponse.json(books);
  } catch (err) {
    console.error("❌ GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
