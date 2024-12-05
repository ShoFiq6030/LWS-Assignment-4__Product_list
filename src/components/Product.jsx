/* eslint-disable react/prop-types */
import { useContext } from "react";
import CartSvg from "../Svg/CartSvg";
import { ProductsContext } from "../context/productsContext";

function Product({ item }) {
  const { handleCardAdd, removeFromCart, cartItems } =
    useContext(ProductsContext);

  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const handleButtonClick = () => {
    if (isInCart) {
      removeFromCart(item.id);
    } else {
      handleCardAdd(item);
    }
  };

  return (
    <div className="relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-80">
        <img
          src={item.image}
          alt="Front of mens Basic Tee in black."
          className="h-full w-full object-cover object-top lg:h-full lg:w-full p-4 bg-gray-100"
        />
      </div>
      <div className="mt-4 px-3 pb-4">
        <div>
          <h3 className="text-sm text-gray-700">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{item.price}$</p>
      </div>
      {/* <!-- Button --> */}
      <div
        className={`cursor-pointer rounded-md text-[0.8125rem] font-medium leading-5 text-slate-700 ring-1 ring-slate-700/10 ${
          isInCart
            ? "bg-red-500 hover:bg-red-600 text-white hover:ring-red-500"
            : "bg-white hover:bg-slate-50 text-slate-900 hover:ring-slate-700/10"
        } items-center text-center mb-3 mx-3 flex-1`}
      >
        <div
          className="flex px-3 py-2 justify-center"
          onClick={handleButtonClick}
        >
          <CartSvg />
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </div>
      </div>
    </div>
  );
}

export default Product;
