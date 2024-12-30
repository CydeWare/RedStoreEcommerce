import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({

    selectedFile:{
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    shipping_method: {
        type: String,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
}, {timestamps: true});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;