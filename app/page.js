"use client";
import { Libre_Baskerville } from "next/font/google";
import Quiz from "./Quiz";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
});

export default function Home() {
  return (
    <main className={`min-h-screen ${libreBaskerville.variable} font-serif`}>
      <Quiz />
    </main>
  );
}
