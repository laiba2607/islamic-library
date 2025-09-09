import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";

export const dynamic = "force-dynamic"; // ✅ tells Next.js not to pre-render

export async function GET() {
  try {
    await dbConnect();
    const books = await Book.find({}, "title author language year pdfFile slug");
    return NextResponse.json(books);
  } catch (err) {
    console.error("❌ GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books", details: err.message }, { status: 500 });
  }
}
