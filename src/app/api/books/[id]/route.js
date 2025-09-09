import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";   // ✅ use dbConnect
import Book from "@/models/Book";        // ✅ you must have a Book model defined
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
  const { id } = params;

  try {
    await dbConnect(); // connect once

    let book = null;

    if (ObjectId.isValid(id)) {
      book = await Book.findById(id);
    } else {
      book = await Book.findOne({
        $or: [{ pdfFile: id }, { slug: id }, { _id: id }],
      });
    }

    if (!book) {
      return NextResponse.json({ error: `Book not found (id: ${id})` }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error("GET /api/books/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch book", details: err.message }, { status: 500 });
  }
}
