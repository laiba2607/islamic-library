import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";


function isValidHexObjectId(id) {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "islamic-library");
    const col = db.collection("books");

    let book = null;

    if (isValidHexObjectId(id)) {
      book = await col.findOne({ _id: new ObjectId(id) });
    } else {
      // try pdfFile, slug, or string _id
      book = await col.findOne({
        $or: [{ pdfFile: id }, { slug: id }, { _id: id }],
      });
    }

    if (!book) {
      return NextResponse.json({ error: `Book not found (id: ${id})` }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (err) {
    console.error("GET /api/books/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
