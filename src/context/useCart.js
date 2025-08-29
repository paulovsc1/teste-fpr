import { useContext } from "react";
import CartContext from "./cartcontext";

export function useCart() {
  return useContext(CartContext);
}
