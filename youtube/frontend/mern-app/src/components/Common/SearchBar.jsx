import React, { useState } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log( "search items:",searchTerm,);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch} // ✅ handle form submit here
          className="relative flex items-center justify-center w-full"
        >
          {/* ❌ Exit Icon (just closes) */}
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute top-4 right-6 cursor-pointer"
          >
            <HiXMark className="h-6 w-6 text-gray-700 hover:text-red-500 transition-colors" />
          </button>

          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full 
              placeholder:text-gray-700"
            />
            {/* 🔍 Submit Button */}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className="cursor-pointer">
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
