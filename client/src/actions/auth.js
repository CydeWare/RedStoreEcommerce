import * as api from "../API/index.js";
import { AUTH, ERROR, NOERROR} from "../constants/actionTypes"; //We use this so it will give an error if we mispell something

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data })
        dispatch({ type: NOERROR })

        navigate("/")
    } catch (error){
        console.log(error.response.data.message)
        dispatch({ type: ERROR, data: error.response.data.message})
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data })
        dispatch({ type: NOERROR })

        navigate("/")
    } catch (error){
        console.log(error.response.data.message)
        dispatch({ type: ERROR, data: error.response.data.message})
    }
}

export const sign = (result, navigate) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.sign(result);

        dispatch({ type: AUTH, data })
        dispatch({ type: NOERROR })

        navigate("/")
    } catch (error){
        console.log(error.response.data.message)
        dispatch({ type: ERROR, data: error.response.data.message})
    }
}