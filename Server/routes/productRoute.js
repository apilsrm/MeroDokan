import express from "express";
import { adminSingleProduct, allProducts, allProductsAdmin, createProduct, deleteProduct, getSingleProduct, updateProduct } from "../controllers/productController.js";
import upload from "../file/upload.js";
import { isAuthAdmin, isAuthenticated } from "../middlewares/auth.js";
const router= express.Router();

//create product
router.post("/create/product", isAuthenticated,isAuthAdmin,upload.single("productImg"),createProduct);

//get all product
router.get("/get/products",allProducts);

//getSingleProduct
router.get("/single/product/:id",getSingleProduct);


//update
router.put("/admin/update/product/:id",isAuthenticated,isAuthAdmin,upload.single("productImg"),updateProduct);

//delete
router.delete("/delete/products/:id",isAuthenticated,isAuthAdmin,deleteProduct);

//admin get all products

router.route("/all/admin/products").get(isAuthenticated, isAuthAdmin, allProductsAdmin);


//admin single product
router.route("/single/admin/product/:id").get(isAuthenticated, isAuthAdmin, adminSingleProduct);


export default router;




