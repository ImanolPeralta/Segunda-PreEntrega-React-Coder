import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: []
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            console.error("El producto ya fue agregado.");
        }
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };


    const totalQuantity = cart.reduce((acc, prod) => acc + prod.quantity, 0);


    const updateQuantity = (itemId, newQuantity) => {
        setCart(cart.map(prod => 
            prod.id === itemId 
            ? { ...prod, quantity: newQuantity } 
            : prod
        ));
    };


const total = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

return (
  <CartContext.Provider
    value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      totalQuantity,
      total,
      updateQuantity,
    }}
  >
    {children}
  </CartContext.Provider>
);


    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
