import { useState } from "react";
import useFakeStore from "../hooks/useFakeStore";
import Cart from "./Cart";
import ContentTitle from "./ContentTitle";
import Filter from "./Filter";
import Products from "./Products";
import Search from "./Search";
import Sort from "./Sort";
import { ProductsContext } from "../context/productsContext";
import LoadingSkeleton from "./LoadingSkeleton";
import Error from "./ErrorComponent";
import CartContextProvider from "../provider/cartProvider";

function ContentSection() {
  const [sortOption, setSortOption] = useState(null);
  const [url, setUrl] = useState("https://fakestoreapi.com/products");
  const { data, loading, error } = useFakeStore(url);
  // const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(searchTerm);

  let sortedProducts;
  if (sortOption === null) {
    sortedProducts = data;
  } else if (sortOption === "asc") {
    sortedProducts = data.sort((a, b) => a.price - b.price);
  } else {
    sortedProducts = data.sort((a, b) => b.price - a.price);
  }

  // const handleCardAdd = (item) => {
  //   setCartItems((prevItems) => [...prevItems, item]);
  // };

  // const removeFromCart = (itemId) => {
  //   if (
  //     window.confirm("Are you sure you want to remove this item from the cart?")
  //   ) {
  //     setCartItems((prevItems) =>
  //       prevItems.filter((item) => item.id !== itemId)
  //     );
  //   }
  // };

  return (
    <ProductsContext.Provider
      value={{
        sortedProducts,
        setUrl,
        searchTerm,
      }}
    >
      <CartContextProvider>
        <div>
          <div className="pt-16 sm:pt-24 lg:pt-40">
            <ContentTitle />
            {!error && (
              <div className="mt-10">
                <div className="flex justify-between relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                  {/* <!-- Sort & Filter--> */}
                  <div className="w-full">
                    <Sort
                      sortOption={sortOption}
                      setSortOption={setSortOption}
                    />
                    <Filter setSearchTerm={setSearchTerm} />
                  </div>
                  {/* <!-- Search and Cart --> */}
                  <div className="flex gap-2 items-center">
                    <Search
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                    <Cart />
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:max-w-7xl lg:px-8">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {/* <!-- Card --> */}
                    {error ? (
                      <Error message={error.message} />
                    ) : loading ? (
                      <LoadingSkeleton count={8} />
                    ) : (
                      <Products />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CartContextProvider>
    </ProductsContext.Provider>
  );
}

export default ContentSection;
