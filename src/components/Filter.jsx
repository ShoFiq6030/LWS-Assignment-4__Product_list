/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import DropDownSvg from "../Svg/DropDownSvg";
import { ProductsContext } from "../context/productsContext";
import useFakeStore from "../hooks/useFakeStore";
function Filter({ setSearchTerm }) {
  const { data } = useFakeStore("https://fakestoreapi.com/products/categories");

  const [toggleButtonOptions, setToggleButtonOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef(null);
  const { setUrl } = useContext(ProductsContext);

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

  const handleCategoryChange = (category) => {
    if (selectedCategory === category) {
      // Deselect if already selected
      setSelectedCategory("");
      setUrl("https://fakestoreapi.com/products");
    } else {
      // Select new category
      setSelectedCategory(category);
      setUrl(`https://fakestoreapi.com/products/category/${category}`);
    }
  };
  const handleFilterClick = () => {
    setSearchTerm("");
    setToggleButtonOptions(!toggleButtonOptions);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-400 hover:text-gray-500 focus:text-gray-700 transition-all"
          id="filter-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={handleFilterClick}
        >
          Filter
          <DropDownSvg />
        </button>
      </div>
      {/* <!-- Filter options --> */}
      {toggleButtonOptions ? (
        <div
          className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-button"
          tabIndex="-1"
          id="filter-dropdown"
        >
          <div className="py-1" role="none">
            {data.map((item) => (
              <label
                key={item}
                className="inline-flex w-full cursor-pointer hover:bg-gray-50 items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4"
                  id="filter-option"
                  checked={selectedCategory === item}
                  onChange={() => handleCategoryChange(item)}
                />
                <span className="ml-2">{item}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Filter;
