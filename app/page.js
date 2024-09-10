"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  return (
    <main
      className={`min-h-screen flex flex-col ${inter.variable} font-sans max-w-4xl mx-auto px-4 py-12 relative`}
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-8xl font-bold mb-8 text-gray-800 whitespace-nowrap">
          Tangle News Quiz
        </h1>
        <h2 className="text-2xl md:text-2xl mb-4 text-gray-700 max-w-3xl mx-auto font-serif">
          Politics is complicated. How well do you understand the news?
        </h2>
      </div>

      <div className="last:border-b-gray-400 last:border-b">
        <QuizLink
          title="The Example Quiz"
          description="A sample quiz to get you started."
          href="/example"
        />
        <QuizLink
          title="The Election Quiz"
          description="Test your knowledge on election processes and history."
          href="/election-quiz"
        />
      </div>
    </main>
  );
}

function QuizLink({ title, description, href }) {
  return (
    <Link href={href} className="block">
      <div className="border-t-gray-500 border-t py-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 font-serif">{description}</p>
      </div>
    </Link>
  );
}
