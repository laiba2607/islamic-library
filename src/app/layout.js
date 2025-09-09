import { Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const urduFont = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
});


export const metadata = {
  title: "📚 Islamic Library",
  description: "A collection of Hadith and Islamic knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urduFont.variable} antialiased `}
      >
        {children}
        <footer className="p-6 text-white text-center" id="forbtn">
          © {new Date().getFullYear()} Islamic Library
        </footer>
      </body>
    </html>
  );
}
      
