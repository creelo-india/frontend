
import { ADD_TO_CART,ADD_TO_CART_FAIL,ADD_TO_CART_SUCCESS,SET_PRODUCT_LIST, EMPTY_CART, REMOVE_FROM_CART,FETCH_CART,FETCH_CART_SUCCESS,FETCH_CART_FAIL } from "./constant"
import axios from "axios";
import { CONFIG } from "../api/config";


export const addToCart = (data) => async (dispatch) => {
    console.log("Action triggered: CART ACTION", data);
    const token = localStorage.getItem("token");
  
    try {
      dispatch({ type: ADD_TO_CART });
  
      const response = await axios.post(`${CONFIG.BASE_URL}api/add-to-cart/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.message) {
        // After any action, fetch the updated cart
      
        dispatch(fetchCart());
      } else {
        const { product_id, quantity } = response.data;
  
        dispatch({
          type: ADD_TO_CART_SUCCESS,
          payload: { product_id, quantity },
        });
      }
    } catch (error) {
     
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
        const response = await axios.get(`${CONFIG.BASE_URL}api/cart/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch({
            type: FETCH_CART_SUCCESS,
            payload: response.data, 
        });
        console.log("@@@@@@@@@@@@@@@@@@@@@@@ dispatch is",response.data)
        
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



