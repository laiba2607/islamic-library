"use client";
import Link from "next/link";
import "@/app/globals.css";

export default function BookCard({ book }) {
  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Language: {book.language}</p>
      {book.year ? <p className="text-gray-600">Year: {book.year}</p> : null}

      <div className="mt-3 flex gap-3">
        {/* <Link
          href={`/books/${book._id}`}  // ✅ uses ObjectId URL
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          📖 Open
        </Link> */}

        {book.pdfFile ? (
          <a
            href={book.pdfFile}       // e.g. "/pdfs/Sahih-Muslim-Urdu-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white rounded-lg hover:bg-green-700 transition" id="forbtn"
          >
            ⤴ Open PDF
          </a>
        ) : null}
      </div>
    </div>
  );
}
