"use client";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/tangle-logo-gradient.png"
                alt="Tangle News Logo"
                width={120}
                height={48}
                className="w-auto h-12"
              />
            </Link>
          </div>
          <div>
            <a
              href="https://www.readtangle.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-r from-red-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get Unbiased News
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
