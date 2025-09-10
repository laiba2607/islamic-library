import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const book = await db.collection("books").findOne({
      _id: new ObjectId(params.id),
    });

    if (!book) {
      return NextResponse.json({ message: "❌ Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error("❌ Error in GET /api/books/[id]:", err);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
