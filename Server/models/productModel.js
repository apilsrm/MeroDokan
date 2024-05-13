import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "please filled productName"],
    },
    description: {
      type: String,
      required: [true, "description filled here"],
    },
   
    category: {
      type: String,
      required: [true, "Please select a category "],
    },
    productImg:{
         url:{
          type: String,
         },
    },
    ratings:{
      type: Number,
    },
    manufacture:{
      type: String,
    },
    isInStock: {
      type: Number,
      required: [true, "Please enter the product stock"],
    
    },
    SKU:{
      type:String,
    },
    price: {
      type: Number,
      required: [true, "Price field must be filled"],
    },
    createdAt: {
        type: Date,
    default:Date.now()
      }
  },
  
);

const Product = mongoose.model("product", productSchema);

export default Product;
