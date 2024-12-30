import * as api from "../API";
import { UPDATE, FETCH_ALL, DELETE, CREATE, RATE } from "../constants/actionTypes"; //We use this so it will give an error if we mispell something

export const getProducts = () => async (dispatch) => {
    try {
        console.log("Products Fetched")
        const { data } = await api.getProducts();

        const action = {
            type: FETCH_ALL,
            payload: data
        }

        dispatch(action)
    }catch(error) {
        console.log(error.message);
    }
}


export const createProduct = (product) => async (dispatch) => {
    try {
        
        const { data } = await api.createProduct(product);

        console.log("Product TO FIND NAME:", data)

        const action = {
            type: CREATE,
            payload: data
        }

        console.log("Product Created", data)

        dispatch(action);
    }catch(error) {
        console.log(error.response.data);
    }
}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, product);

        dispatch({type: UPDATE, payload: data});
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try{
        await api.deleteProduct(id);

        console.log("Product deleted")

        dispatch({type: DELETE, payload: id})

    }catch(error){
        console.log(error);
    }
}

export const rateProduct = (id, rating) => async (dispatch) => {
    try {
        const { data } = await api.rateProduct(id, rating);

        dispatch({type: RATE, payload: data});
    }catch(error){
        console.log(error);
    }
}
