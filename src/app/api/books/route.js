export const dynamic = "force-dynamic"; // ✅ prevents build errors

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ Connected to DB"); // debug log

    const books = await Book.find({}, "title author language year pdfFile slug");
    console.log("📚 Books found:", books); // debug log

    return NextResponse.json(books);
  } catch (err) {
    console.error("❌ GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books", details: err.message }, { status: 500 });
  }
}
