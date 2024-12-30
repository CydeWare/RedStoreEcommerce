import Product from "../model/product.js"
import mongoose from 'mongoose';

const getProducts = async (req, res) => {
    try{
        const product = await Product.find();

        res.status(200).json(product);

    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}

const createProduct = async (req, res) => {
    const product = req.body;

    const newProduct = new Product({ ...product, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newProduct.save();

        res.status(201).json(newProduct);
    }catch(error){
        res.status(409).json({ success: false, message: error.message });
    }
}

const updateProduct = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No such product with that id`)

    const updatedProduct = await Product.findByIdAndUpdate(_id, {...product, _id}, { new: true });

    res.json(updatedProduct);
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){ 
    
    console.log("Error: product not removed")    
    return res.status(404).send(`No such product with that id`)

}

    await Product.findByIdAndDelete(id);

    console.log("POST REMOVED")

    res.json({ message: "Product deleted succesfully"})
}

const rateProduct = async (req, res) => { 
    const { id } = req.params;
    const ratingObj  = req.body;
    let keys = Object.keys(ratingObj);
    const rating = Number(keys[0]);

    console.log("REQ BODY" + JSON.stringify(ratingObj))

    console.log("RATING FROM BACKEND: " + rating);

    if(!req.userId) return res.json({ message: "Unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No such product with that id");

    const product = await Product.findById(id);

    const index = product.ratings.findIndex((obj) => obj.id === String(req.userId));

    if(index === -1) {
        //rate product
        product.ratings.push({id: req.userId, rating: rating});
    } else{
         //rate product AGAIN
        product.ratings = product.ratings.map((obj) => {
            if(obj.id === String(req.userId)){
                return {...obj, rating: rating};
            }
            return obj;
        })

        // product.rating = product.rating.filter((id) => id !== String(req.userId))
    }
    //{ likeCount: product.likeCount + 1 }
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })

    res.json(updatedProduct);
}


export { getProducts, createProduct, updateProduct, deleteProduct, rateProduct };