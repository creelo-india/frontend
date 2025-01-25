import {
    ADD_TO_CART,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    EMPTY_CART,
    FETCH_CART_SUCCESS,
    FETCH_CART_FAIL,
    REMOVE_FROM_CART,
  } from "./constant";
  
  export const cartData = (state = [], action) => {
    switch (action.type) {
      case ADD_TO_CART:
        console.warn("Adding to cart (loading state)...", action);
        return state; // No immediate update here, wait for ADD_TO_CART_SUCCESS
  
      case ADD_TO_CART_SUCCESS:
        console.warn("ADD_TO_CART_SUCCESS condition", action);
  
        // Check if the product already exists in the cart
        const existingProduct = state.find(
          (item) => item.product_id === action.payload.product_id
        );
  
        if (existingProduct) {
          // Update the quantity of the existing product
          return state.map((item) =>
            item.product_id === action.payload.product_id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
        }
  
        // Add the new product to the cart
        return [...state, { ...action.payload }];
  
      case REMOVE_FROM_CART:
        console.warn("REMOVE_FROM_CART condition", action);
        return state.filter((item) => item.product_id !== action.data.product_id);
  
      case EMPTY_CART:
        console.warn("EMPTY_CART action triggered");
        return [];
  
      case FETCH_CART_SUCCESS:
        console.warn("FETCH_CART_SUCCESS condition", action);
        return action.payload;
  
      case FETCH_CART_FAIL:
        console.error("Error fetching cart data:", action.payload);
        return state; // Return the current state on failure
  
      case ADD_TO_CART_FAIL:
        console.error("Error adding to cart:", action.payload);
        return state; // Return the current state on failure
  
      default:
        return state;
    }
  };
  