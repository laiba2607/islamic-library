import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  year: { type: Number },
  pdfFile: { type: String },
  slug: { type: String }
});

// ✅ Prevent model overwrite in development
export default mongoose.models.Book || mongoose.model("Book", BookSchema);
