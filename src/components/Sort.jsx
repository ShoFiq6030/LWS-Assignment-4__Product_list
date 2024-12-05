/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import DropDownSvg from "../Svg/DropDownSvg";

function Sort({ sortOption, setSortOption }) {
  const [toggleButtonOptions, setToggleButtonOptions] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleButtonOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleOptionSelect(option) {
    setSortOption(option);
    setToggleButtonOptions(false);
  }
  // console.log(sortOption);
  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setToggleButtonOptions(!toggleButtonOptions)}
          >
            Sort
            <DropDownSvg />
          </button>
        </div>

        {/* <!-- Sort Options --> */}
        {toggleButtonOptions && (
          <div
            className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <span
                className={`cursor-pointer block px-4 py-2 text-sm transition-all ${
                  sortOption === "asc"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={() => handleOptionSelect("asc")}
              >
                Low to High
              </span>
              <span
                href=""
                className={`cursor-pointer block px-4 py-2 text-sm transition-all ${
                  sortOption === "desc"
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={() => handleOptionSelect("desc")}
              >
                High to Low
              </span>
            </div>
          </div>
        )}
      </div>
      {/* <!-- Sort End --> */}
    </>
  );
}

export default Sort;
