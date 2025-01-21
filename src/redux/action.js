
import { ADD_TO_CART,ADD_TO_CART_FAIL,ADD_TO_CART_SUCCESS,SET_PRODUCT_LIST, EMPTY_CART, REMOVE_FROM_CART,FETCH_CART,FETCH_CART_SUCCESS,FETCH_CART_FAIL } from "./constant"
import axios from "axios";



export const addToCart = (data) => async (dispatch) => {
    console.warn("action is called2222222222222222222",data);
    const token = localStorage.getItem("token");
    try {
        dispatch({ type: ADD_TO_CART });
        
        // API call to add to cart
        const response = await axios.post("http://127.0.0.1:8000/api/add-to-cart/", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Replace with your actual token
            },
        });

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: response.data, 
        });

        
    } catch (error) {
        console.error("Error adding to cart: ", error);
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response?.data || "Something went wrong",
        });
    }
};


export const fetchCart = () => async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
        dispatch({ type: FETCH_CART });

        // API call to fetch cart data
        const response = await axios.get("http://127.0.0.1:8000/api/cart/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: FETCH_CART_SUCCESS,
            payload: response.data, 
        });
        console.log(response.data)
        console.log("@@@@@@@@@@@@@@@@@@@@@@@ dispatch is",dispatch)
    } catch (error) {
        console.error("Error fetching cart data: ", error);
        dispatch({
            type: FETCH_CART_FAIL,
            payload: error.response?.data || "Something went wrong",
        });
    }
};




export const removeToCart = (data) => {
    console.warn("action removeToCart", data)
    return {
        type: REMOVE_FROM_CART,
        data
    }
}

export const emptyCart = () => {
    console.warn("action emptyCart",)
    return {
        type: EMPTY_CART,
    }
}



