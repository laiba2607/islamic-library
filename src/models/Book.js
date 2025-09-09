import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  _id: { type: ObjectId }, // ✅ string IDs like "1"
  title: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  year: { type: Number }
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
