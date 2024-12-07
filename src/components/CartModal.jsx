import { useContext } from "react";
import { useEffect } from "react";
import { CartContext } from "../context/cartContext";

function CartModal({ isOpen, onClose }) {
  const { cartItems, dispatch } = useContext(CartContext);
  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on unmount or modal close
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);
  const totalProducts = cartItems.length;
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Implement checkout logic
  };

  return (
    <div className="fixed inset-0  bg-gray-600 bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full  max-w-md">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>

        {/* Total Products and Amount */}
        <div className="mb-4 flex justify-between items-center text-sm font-medium text-gray-700">
          <span>Total Products: {totalProducts}</span>
          <span>Total Amount: ${totalAmount}</span>
        </div>

        {/* Scrollable Cart List */}
        <div className="max-h-72 overflow-y-auto mb-4">
          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-2"
                >
                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  {/* Item Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  {/* Item Price and Remove Button */}
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium mb-2">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove this item from the cart?"
                          )
                        ) {
                          // Dispatch the action to remove the item
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            itemId: item.id,
                          });
                        }
                      }}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout and Close Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleCheckout}
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
              cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
