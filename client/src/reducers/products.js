import { UPDATE, FETCH_ALL, DELETE, CREATE, RATE } from "../constants/actionTypes.js";

const productReducer = (products = [], action) => {
    switch(action.type) {
        case FETCH_ALL:
            console.log("Fetched Reducer", action.payload)
            return action.payload;
        case CREATE:
            console.log("product Reducer", action.payload)
            return [...products, action.payload];
        case UPDATE:
            return products.map((product) => {return product._id === action.payload._id ? action.payload : product});
        case DELETE:
            return products.filter((product) => {return product._id !== action.payload})
        case RATE:
            console.log("Rate reducer")
            return products.map((product) => product._id === action.payload._id ? action.payload : product)
        default:
            return products;
    }
}

export default productReducer;