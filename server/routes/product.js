//For posting products!

import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct, rateProduct } from "../controllers/product.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", auth, createProduct);
router.patch('/:id', auth, updateProduct)
router.delete("/:id", auth, deleteProduct);
router.patch('/:id/rateProduct', auth, rateProduct)

export default router;