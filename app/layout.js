import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tangle News Quiz",
  description: "Tangle News Quiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Image
          src="/tangle-logo-gradient.png"
          alt="Tangle News Logo"
          width={150}
          height={37}
          className="mx-auto mb-6"
        />
        {children}
      </body>
    </html>
  );
}
