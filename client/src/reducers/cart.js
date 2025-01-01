import { UPDATE_CART, FETCH_ALL_CART, DELETE_CART, CREATE_CART } from "../constants/actionTypes.js";

const cartReducer = (cart = [], action) => {
    switch(action.type) {
        case FETCH_ALL_CART:
            console.log("Fetched Reducer Cart", action.payload)
            return action.payload;
        case CREATE_CART:
            console.log("Post Reducer Cart", action.payload)
            return [...cart, action.payload];
        case UPDATE_CART:
            return cart.map((item) => {return item._id === action.payload._id ? action.payload : item});
        case DELETE_CART:
            return cart.filter((item) => {return item._id !== action.payload})
        default:
            return cart;
    }
}

export default cartReducer;