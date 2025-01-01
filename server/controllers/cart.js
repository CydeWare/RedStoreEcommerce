import Cart from "../model/cart.js"
import mongoose from 'mongoose';

const getCartItems = async (req, res) => {

    try{
        const cart = await Cart.find();

        console.log(cart);

        res.status(200).json(cart);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}

const createCartItem = async (req, res) => {
    const cart = req.body;

    const newCart = new Cart({ ...cart, createdAt: new Date().toISOString()});

    try{
        await newCart.save();

        res.status(201).json(newCart);
    }catch(error){
        res.status(409).json({ success: false, message: error.message });
    }
}

const updateCartItem = async (req, res) => {
    const { id: _id } = req.params;
    const cart = req.body;
    const { userId } = cart;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No such cart item with that id`);

    // const updatedCart = await Cart.findByIdAndUpdate(_id, {...cart, _id}, { new: true });
    const updatedCart = await Cart.findOneAndUpdate({_id: _id, userId: userId}, {...cart, _id}, { new: true })

    res.json(updatedCart);
}

const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    const source = req.body;
    const userId = source.source;

    console.log("CART ITEM REMOVED")

    if(!mongoose.Types.ObjectId.isValid(id)){ 
    
    console.log("Error: Cart item not removed")    
    return res.status(404).send(`No such cart item with that id`)

}

    // await Cart.findByIdAndDelete(id);
    await Cart.findOneAndDelete({ _id: id, userId: userId });

    console.log("Cart Item REMOVED")

    res.json({ message: "Cart Item deleted succesfully"})
}

export { getCartItems, createCartItem, updateCartItem, deleteCartItem };