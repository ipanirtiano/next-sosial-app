import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="w-full  relative">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-full px-6 py-2 text-sm outline-none placeholder:text-sm"
        placeholder="Seach username.."
      />
      <AiOutlineSearch className="absolute top-3 right-5 text-gray-500" />
    </div>
  );
};

export default SearchBar;
