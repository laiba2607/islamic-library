"use client";
import { useEffect, useState } from "react";
import BookReader from "@/app/components/BookReader";
// @import "tailwindcss";

export default function BookPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    const run = async () => {
      setErr("");
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || `Failed to load book ${id}`);
        }
        const data = await res.json();
        setBook(data);
      } catch (e) {
        console.error(e);
        setErr(e.message);
      }
    };
    run();
  }, [id]);

  if (err) return <div className="p-6 text-red-600">❌ {err}</div>;
  if (!book) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Language: {book.language}</p>
      {book.year ? <p className="text-gray-600">Year: {book.year}</p> : null}

      <div className="mt-4">
        {book.pdfFile ? (
          <>
            <BookReader pdfUrl={book.pdfFile} />
            <a
              href={book.pdfFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Open in new tab
            </a>
          </>
        ) : (
          <p className="text-red-500">❌ PDF not available</p>
        )}
      </div>
    </div>
  );
}
