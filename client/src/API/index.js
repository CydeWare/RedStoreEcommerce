import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


export const getProducts = () => API.get("/products");
export const createProduct = (newProduct) => API.post("/products", newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct)
export const deleteProduct = (id) => API.delete(`/products/${id}`)
export const rateProduct = (id, rating) => API.patch(`/products/${id}/rateProduct`, rating)

export const getCartItems = () => API.get("/cart");
export const createCartItem = (newCartItem, userId) => API.post("/cart", {...newCartItem, userId: userId});
export const updateCartItem = (id, updatedCartItem, userId) => API.patch(`/cart/${id}`, {...updatedCartItem, userId: userId})
export const deleteCartItem = (id, userId) => API.delete(`/cart/${id}`, {
    headers: {
      Authorization: ""
    },
    data: {
      source: userId
    }
  })

export const signIn = (formData) => API.post("/user/signin", formData)
export const signUp = (formData) => API.post("/user/signup", formData)
export const sign = (formData) => API.post("/user/sign", formData)