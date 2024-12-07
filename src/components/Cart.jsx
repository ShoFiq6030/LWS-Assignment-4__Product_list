import { useContext, useState } from "react";
import CartSvg from "../Svg/CartSvg";
import CartModal from "./CartModal";
import { CartContext } from "../context/cartContext";

function Cart() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <div className="flow-root">
        <button
          onClick={openModal}
          className="group -m-2 flex items-center p-2"
        >
          <CartSvg hight={6} weight={6} />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cartItems.length}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
      </div>
      <CartModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Cart;
