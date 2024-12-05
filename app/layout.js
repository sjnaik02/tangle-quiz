import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Header from "../components/Header";
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
      <head>
        <link rel="icon" href="/tangle-logo-gradient.png" />
      </head>
      <CSPostHogProvider>
        <body className={inter.className}>
          <Header />
          <Toaster />
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
