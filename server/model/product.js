import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    creator: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: false
    },

    price: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    shipping_method: {
        type: String,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    selectedFile: {
        type: Array,
        required: true
    },

    ratings: {
        type: Array,
        required: true,
    },

    createdAt: {
        type: Date,
        default: new Date()
    },

}, {timestamps: true})

const productModel = mongoose.model("product", productSchema);
export default productModel;