/* eslint-disable react/prop-types */

// import { useState } from "react";
import SearchSvg from "../Svg/SearchSvg";
import useDebounce from "../hooks/useDebounce";

function Search({ searchTerm, setSearchTerm }) {
  // const [inputValue,searchInputValue] = useState(searchTerm)
  const doSearch = useDebounce((term) => {
    setSearchTerm(term);
  }, 500);

  function handleChange(e) {
    const value = e.target.value;
    doSearch(value);
  }
  console.log(searchTerm);
  return (
    <div className="flex flex-1 items-center px-3.5 py-2 text-gray-400 group hover:ring-1 hover:ring-gray-300 focus-within:!ring-2 ring-inset focus-within:!ring-teal-500 rounded-md">
      <SearchSvg />
      <input
        className="block w-full appearance-none bg-transparent text-base text-gray-700 placeholder:text-gray-400 focus:outline-none placeholder:text-sm sm:text-sm sm:leading-6"
        placeholder="Find anything..."
        aria-label="Search components"
        role="combobox"
        type="search"
        aria-expanded="false"
        aria-autocomplete="list"
        // value={searchTerm}
        onChange={handleChange}
        style={{ caretColor: "rgb(107, 114, 128)" }}
      />
    </div>
  );
}

export default Search;