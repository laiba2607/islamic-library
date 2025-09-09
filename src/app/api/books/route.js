import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import "@/app/globals.css";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "islamic-library");
    const books = await db
      .collection("books")
      .find({}, { projection: { title: 1, author: 1, language: 1, year: 1, pdfFile: 1 } })
      .toArray();

    return NextResponse.json(books);
  } catch (err) {
    console.error("GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
