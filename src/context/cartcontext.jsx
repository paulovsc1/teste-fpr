import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((c) => c.id === item.id);
    if (!exists) {
      setCart([...cart, item]);
      return { success: true };
    } else {
      return { success: false };
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => {
    const EURO_TO_BRL = 5.40;
    const euroPrice = Number(item.card_prices?.[0]?.cardmarket_price || 0);
    const finalEuroPrice = euroPrice > 0 ? euroPrice : 0.90;
    return sum + finalEuroPrice * EURO_TO_BRL;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
