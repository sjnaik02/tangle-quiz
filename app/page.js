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
      <div className="md:mb-12 mb-6 md:text-center text-left">
        <h1 className="md:mb-8 mb-4 text-5xl font-bold text-gray-800 md:text-8xl">
          Tangle Quizzes
        </h1>
        <h2 className="mx-auto md:mb-4 mb-2 max-w-3xl font-serif text-lg text-gray-700 md:text-2xl">
          Politics is complicated. How well do you understand the news?
        </h2>
      </div>

      <div className="last:border-b last:border-b-gray-200 max-w-2xl mx-auto w-full">
        <QuizLink
          title="Do You Know Our Candidates?"
          description="How well do you know our candidates' policies and positions? Test your knowledge with this quiz!"
          href="/know-the-candidates"
        />
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
    <Link href={href} className="">
      <div className="border-t border-t-gray-200 py-8 transition-transform duration-200 hover:scale-105">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="font-serif text-gray-600 md:text-lg">{description}</p>
      </div>
    </Link>
  );
}
