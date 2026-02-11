import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";

const CART_KEY = "troowe_cart";

const initializer = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    const items = Array.isArray(parsed?.items) ? parsed.items : [];
    return { items };
  } catch {
    return { items: [] };
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const { vendorProductId, quantity = 1, name, price } = action.payload;
      const existing = state.items.find((i) => i.vendorProductId === vendorProductId);
      let next;
      if (existing) {
        next = state.items.map((i) =>
          i.vendorProductId === vendorProductId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        next = [...state.items, { vendorProductId, quantity, name: name || "Product", price: price != null ? Number(price) : 0 }];
      }
      return { items: next };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.vendorProductId !== action.payload.vendorProductId) };
    case "UPDATE_QTY": {
      const { vendorProductId, quantity } = action.payload;
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.vendorProductId !== vendorProductId) };
      }
      return {
        items: state.items.map((i) =>
          i.vendorProductId === vendorProductId ? { ...i, quantity } : i
        ),
      };
    }
    case "EMPTY":
      return { items: [] };
    default:
      return state;
  }
};

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, initializer);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify({ items: state.items }));
    } catch {}
  }, [state.items]);

  const addItem = useCallback((payload) => dispatch({ type: "ADD", payload }), []);
  const removeItem = useCallback((vendorProductId) => dispatch({ type: "REMOVE", payload: { vendorProductId } }), []);
  const updateQuantity = useCallback((vendorProductId, quantity) =>
    dispatch({ type: "UPDATE_QTY", payload: { vendorProductId, quantity } }), []);
  const emptyCart = useCallback(() => dispatch({ type: "EMPTY" }), []);

  const totalPrice = state.items.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 0), 0);
  const count = state.items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    emptyCart,
    totalPrice,
    count,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
