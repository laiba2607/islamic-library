"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/app/components/SearchBar";
import BookCard from "@/app/components/BookCard";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/books");
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const onSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setTerm(q);
    setFiltered(
      books.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.author || "").toLowerCase().includes(q)
      )
    );
  };

  if (loading) return <p className="p-6">Loading...</p>;

  // ✅ Separate Sahih Bukhari, Sahih Muslim, and others
  const bukhariBooks = filtered.filter((b) =>
    (b.title || "").toLowerCase().includes("sahih bukhari")
  );
  const muslimBooks = filtered.filter((b) =>
    (b.title || "").toLowerCase().includes("sahih muslim")
  );
  const musnadBooks = filtered.filter((b) =>
    (b.title || "").toLowerCase().includes("musnad")
  );
  // const sunanBooks = filtered.filter((b) =>
  //   (b.title || "").toLowerCase().includes("sunan")
  // );
  const jametirmidhiBooks = filtered.filter((b) =>
  (b.title || "").toLowerCase().includes("jametirmidhi")
);
// General Sunan books (but not Sunan Nasai)
const sunanBooks = filtered.filter((b) => {
  const title = (b.title || "").toLowerCase();
  return title.includes("sunan") && !title.includes("nasai")&&
  !title.includes("ibn majah");
});
const sunaannasaiBooks = filtered.filter((b) => {
  const title = (b.title || "").toLowerCase();
  return title.includes("nasai") || title.includes("an-nasai");
});
const sunanIbnMajahBooks = filtered.filter((b) => {
  const title = (b.title || "").toLowerCase();
  return title.includes("ibn majah") || title.includes("ibn-majah");
});

  
  const otherBooks = filtered.filter(
    (b) =>
      !(b.title || "").toLowerCase().includes("sahih bukhari") &&
      !(b.title || "").toLowerCase().includes("sahih muslim")&&
      !(b.title || "").toLowerCase().includes("musnad")&&
      !(b.title || "").toLowerCase().includes("sunan")&&
      !(b.title || "").toLowerCase().includes("jametirmidhi")&&
      !(b.title || "").toLowerCase().includes("sunaannasai")&&
      !(b.title || "").toLowerCase().includes("sunanIbnMajah")
  );

  return (
    <div className="p-1">
      <h1 className="text-3xl font-bold mb-3" id="fornav">
        📚 Islamic Library
      </h1>
      <p className="mb-6 text-2xl font-bold text-white text-center">
        Explore Hadith & Islamic Books
      </p>

      <SearchBar value={term} onChange={onSearch} />

      {filtered.length === 0 ? (
        <p className="text-red-500">❌ No books found.</p>
      ) : (
        <>
          {/* ✅ Show Sahih Bukhari books first */}
          {bukhariBooks.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {bukhariBooks.map((b) => (
                  <BookCard key={b._id} book={b} />
                ))}
              </div>

              {/* ✅ Daily Hadith after Sahih Bukhari */}
              <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
                <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
                <p className="italic text-center mb-4">
                   The reward of deeds depends upon the intentions, and every person
                  will get the reward according to what he has intended...
                </p>
                <p className="text-right leading-relaxed text-lg">
                  إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ
                  كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا،
                  فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ
                </p>
              </div>
            </>
          )}

          {/* ✅ Show Sahih Muslim books next */}
          {muslimBooks.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {muslimBooks.map((b) => (
                  <BookCard key={b._id} book={b} />
                ))}
              </div>

              {/* ✅ Daily Hadith after Sahih Muslim */}
              <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
                <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
                <p className="italic text-center mb-4">
                  None of you truly believes until he loves for his brother what he loves for himself.
                </p>
                <p className="text-right leading-relaxed text-lg">
                  لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ
                </p>
              </div>
            </>
          )}

          {/* ✅ show musnad books */}
          {musnadBooks.length > 0 && (
             <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musnadBooks.map((b) => (
                <BookCard key={b._id} book={b} />
              ))}
            </div>
            {/* ✅ Daily Hadith after Sahih Muslim */}
              <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
                <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
                <p className="italic text-center mb-4">
                  None of you truly believes until he loves for his brother what he loves for himself.
                </p>
                <p className="text-right leading-relaxed text-lg">
                  لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ
                </p>
              </div>
            </>
          )}
            {/* ✅ show sunan books */}
          {sunanBooks.length > 0 && (
             <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sunanBooks.map((b) => (
                <BookCard key={b._id} book={b} />
              ))}
            </div>
            {/* ✅ Daily Hadith after Sahih Muslim */}
              <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
                <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
                <p className="italic text-center mb-4">
                  None of you truly believes until he loves for his brother what he loves for himself.
                </p>
                <p className="text-right leading-relaxed text-lg">
                  لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ
                </p>
              </div>
            </>
          )}
          
          {/* ✅ show jamaitirmidhi books */}
          {jametirmidhiBooks.length > 0 && (
             <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jametirmidhiBooks.map((b) => (
                <BookCard key={b._id} book={b} />
              ))} 
             </div>
            {/* ✅ Daily Hadith after Sahih Muslim */}
              <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
                <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
                <p className="italic text-center mb-4">
                  None of you truly believes until he loves for his brother what he loves for himself.
                </p>
                <p className="text-right leading-relaxed text-lg">
                  لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ
                </p>
              </div>
            </>
          )}
          
          {/* ✅ show jamaitirmidhi books */}
          {sunaannasaiBooks.length > 0 && (
             <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sunaannasaiBooks.map((b) => (
                <BookCard key={b._id} book={b} />
              ))} 
             </div>
            {/* ✅ Daily Hadith after Sahih Muslim */}
              <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
                <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
                <p className="italic text-center mb-4">
                  None of you truly believes until he loves for his brother what he loves for himself.
                </p>
                <p className="text-right leading-relaxed text-lg">
                  لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ
                </p>
              </div>
            </>
          )}
          {/* ✅ show Sunan Ibn Majah books */}
{sunanIbnMajahBooks.length > 0 && (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sunanIbnMajahBooks.map((b) => (
        <BookCard key={b._id} book={b} />
      ))}
    </div>
    <div className="my-10 p-6 bg-gray-100 rounded-xl shadow-lg" id="forbtn">
      <h2 className="text-2xl font-bold text-center mb-4">📖 Daily Hadith</h2>
      <p className="italic text-center mb-4">
        Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.
      </p>
      <p className="text-right leading-relaxed text-lg">
        مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ
      </p>
    </div>
  </>
)}




{/* ✅ Other Books */}
          {otherBooks.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherBooks.map((b) => (
                  <BookCard key={b._id} book={b} />
                ))}
              </div>
            </>
          )}<br />

        </>
      )}
    </div>
  );
}
