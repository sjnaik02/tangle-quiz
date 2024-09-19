import { Inter } from "next/font/google";
import Image from "next/image";
import Header from "./Header";
import "./globals.css";
import { CSPostHogProvider } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tangle News Quiz",
  description: "Tangle News Quiz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
