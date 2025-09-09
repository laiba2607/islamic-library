import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
import mongoose from "mongoose";

export const dynamic = "force-dynamic"; // ⬅️ put this at the top of [id]/route.js


export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;
    let book;

    if (mongoose.Types.ObjectId.isValid(id)) {
      book = await Book.findById(id);
    } else {
      book = await Book.findOne({
        $or: [{ slug: id }, { pdfFile: id }],
      });
    }

    if (!book) {
      return NextResponse.json({ error: `Book not found (id: ${id})` }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (err) {
    console.error("❌ [id]/route.js error:", err);
    return NextResponse.json({ error: "Failed to fetch book", details: err.message }, { status: 500 });
  }
}
