
import { useReducer } from 'react';
import { CartContext } from '../context/cartContext';
import cartReducer from '../reducer/cartReducer';


function CartContextProvider({children}) {

    const [cartItems, dispatch] = useReducer(cartReducer, [])
    // console.log(cartItems);

    return (
        <CartContext.Provider value={{ cartItems, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider