import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="text-stone-800 ">
      <div className=" mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-stone-800 mb-4 md:mb-0"
        >
          <span className="ml-3 text-3xl font-extrabold text-green-700">
            EcoVisuals
          </span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="#" className="mr-5 hover:text-stone-800">
            First Link
          </Link>
          <Link href="#" className="mr-5 hover:text-stone-800">
            Second Link
          </Link>
          <Link href="#" className="mr-5 hover:text-stone-800">
            Third Link
          </Link>
          <Link href="#" className="mr-5 hover:text-stone-800">
            Fourth Link
          </Link>
        </nav>
        <button className="inline-flex items-center bg-green-600 border-0 py-1 px-3 focus:outline-none font-semibold text-white hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
