import {combineReducers} from "redux";
import productReducer from "./products.js"
import errorReducer from "./error.js";
import cartReducer from "./cart.js";
import authReducer from "./auth.js";

const allReducers = combineReducers({
    products: productReducer,
    error: errorReducer,
    cart: cartReducer,
    auth: authReducer
})

export default allReducers;