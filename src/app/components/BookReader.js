"use client";

export default function BookReader({ pdfUrl }) {
  if (!pdfUrl) return null;
  return (
    <div className="w-full h-[80vh] my-4 border rounded">
      <iframe
        src={pdfUrl}
        title="Book Reader"
        className="w-full h-full"
      />
    </div>
  );
}
