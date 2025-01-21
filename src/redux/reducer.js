import { ADD_TO_CART, EMPTY_CART,FETCH_CART_SUCCESS,FETCH_CART_FAIL, REMOVE_FROM_CART } from "./constant"


export const cartData = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            console.warn("ADD_TO_CART condition ", action);
            return [action.payload, ...state];

        case REMOVE_FROM_CART:
            console.warn("REMOVE_FROM_CART condition ", action);
            return state.filter((item) => item.id !== action.data.id);

        case EMPTY_CART:
            console.warn("EMPTY CART condition ", action);
            return [];

        case FETCH_CART_SUCCESS:
            console.warn("FETCH_CART_SUCCESS condition ", action);
            return action.payload; 

        case FETCH_CART_FAIL:
            console.error("Error fetching cart data: ", action.payload);
            return state; // Return the current state on failure

        default:
            return state;
    }
};
