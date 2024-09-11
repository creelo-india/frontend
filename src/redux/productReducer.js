import { PRODUCT_LIST, SET_PRODUCT_LIST } from "./constant"



export const productData = (data = [], action) => {
    console.log("product reducer is caeeld")
    switch (action.type) {
            case SET_PRODUCT_LIST:
                console.warn("PRODUCT_LIST condition ", action)
                console.warn("data is",action)
                return [...action.data]
        default:
            return data
    }
}