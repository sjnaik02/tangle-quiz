"use client";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col ${inter.variable} relative mx-auto max-w-4xl px-4 py-8 font-sans tracking-tighter`}
    >
      <div className="mb-6 text-left md:mb-12 md:text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-800 md:mb-8 md:text-8xl">
          Tangle Quizzes
        </h1>
        <h2 className="mx-auto mb-2 max-w-3xl font-serif text-lg text-gray-700 md:mb-4 md:text-2xl">
          Politics is complicated. How well do you understand the news?
        </h2>
      </div>

      <div className="mx-auto w-full max-w-2xl last:border-b last:border-b-gray-200">
        <QuizLink
          title="The News Bubble Quiz"
          description="Are you in the bubble? Find out in 2 minutes!"
          href="/news-bubble-quiz"
        />
      </div>
    </main>
  );
}

function QuizLink({ title, description, href }) {
  return (
    <Link href={href} className="">
      <div className="border-t border-t-gray-200 py-8 transition-transform duration-200 hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
          {title}
        </h2>
        <p className="font-serif text-gray-600 md:text-lg">{description}</p>
      </div>
    </Link>
  );
}
