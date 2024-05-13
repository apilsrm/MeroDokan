import Product from "../models/productModel.js";
import path from "path";
import { join } from "path";
import fs, { rmSync } from "fs";
import { unlink } from "fs/promises";
import { url } from "inspector";
import { tryCatchAsyncError } from "../middlewares/tryCatchAsyncError.js";
import ErrorHandle from "../utils/errorHandler.js";
import ApiFeatures from "../helpers/apiFeatures.js";


export const createProduct = tryCatchAsyncError(async (req, res) => {
  
  const {
    productName,
    description,
    price,
    category,
    isInStock,
    manufacture,
    ratings,
    SKU,
  } = req.body;

  // if (!req.file) {
  //   await unlink(req.file.path);

  
  if(!productName || !description || !price  || !category || !isInStock || !ratings || !manufacture ) {

   if(req.file){
    await unlink(req.file.path)
   }

  return  next(new ErrorHandle("filled must be filled",400))
  } 



  const baseUrl = `${req.protocol}://${req.hostname}:${
    process.env.PORT || 4000
  }`;
  const imagePath = req.file.filename;
  let productImageUrl;

  if (imagePath) {
    productImageUrl = `${baseUrl}/gallery/${imagePath}`.replace(/\\/g, "/")  
  } 
  // join(baseUrl, "gallery", imagePath).replace(/\\/g, "/");

  const product = await Product.create({
    productName,
    description,
    price,
    manufacture,
    ratings,
    category,
    isInStock,
    SKU,
    productImg: productImageUrl ? { url: productImageUrl } : undefined,
  });

  res.status(201).json({
    success: true,
    message: "product create successFully",
    product,
  });
})

// get all
export const allProducts = tryCatchAsyncError( async (req, res) => {

  const resultPerPage = 12;
  const countDocument = await Product.countDocuments();
  const ApiFeature  = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

  const products = await ApiFeature.query;
  if(!products)
  return next(new ErrorHandler("Product not found",400));

  res.status(201).json({
    success: true,
    message: "all product get successfully",
    products,
    resultPerPage,
    countDocument,
  });
  
}
)
//update
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  let product = await Product.findById(productId);

  if(!product){
  if(req.file){
    await unlink(req.file.path)
   }
   return next(new ErrorHandle("Product not found",404));

  }  //product id mistake vayo bhane upload huna vayan
  const { productName, description, price, category, isInStock, ratings, manufacture, SKU } = req.body;

  if(!productName || !description || !price  || !category || !isInStock || !ratings || !manufacture) {
    
    if(req.file){
      await unlink(req.file.path)
     }

    return next(new ErrorHandle("filled must be filled",404));

    } 


  const existingImageUrl = product.productImg.url;

  const baseUrl = `${req.protocol}://${req.hostname}:${
    process.env.PORT || 4000
  }`;
  const imagePath = req.file.filename;
  let productImageUrl;

  if(existingImageUrl){
    const filename = path.basename(existingImageUrl);
    const previousImagePath = path.join("public", "gallery", filename).replace(/\\/g, "/");
    fs.unlinkSync(previousImagePath);
  }
  if (imagePath) {
    productImageUrl = `${baseUrl}/gallery/${imagePath}`.replace(/\\/g, "/");
  }

product.productName = productName;
product.description = description;
product.category = category;
product.price = price;
product.manufacture = manufacture;
product.isInStock = isInStock;
product.ratings = ratings;
product.SKU = SKU;
product.productImg= productImageUrl ? { url: productImageUrl } : undefined,

await product.save();
res.status(200).json({
  success:true,
  message:"product updated successfully",
  product,
});

  // product = await Product.findByIdAndUpdate(
  //   productId,
  //   { productName, description, price, category, isInStock },
  //   { new: true }
  // );

  // res.status(201).json({
  //   success: true,
  //   message: "product update successfullly ",
  //   product,
  // });
};

//getSingle product
export const getSingleProduct = tryCatchAsyncError(async(req, res,next) => {

  const productId = req.params.id;
  const product= await Product.findById(productId)

  if(!product){
    return next(new ErrorHandle("Product not found",404));
  }

  res.status(200).json({
    success: true,
    message: "product get successfullly ",
    data:product,
  });

})

///delete
export const deleteProduct = tryCatchAsyncError(async (req, res) => {
 
  const productId = req.params.id;
  const productdel= await Product.findById( productId );
  if(!productdel){
    return next(new ErrorHandle("Product not found",404));
  }
const existingImageUrl = productdel.productImg.url;
// url check then gallery ma delete 
if(existingImageUrl){
  const filename = path.basename(existingImageUrl);
  const previousImagePath = path.join("public", "gallery", filename)
  fs.unlinkSync(previousImagePath);
}
 //delete from database 
 await productdel.deleteOne();
  res.status(200).json({
    success: true,
    message: "product delete successfullly ",
    productdel
  });
  
 }
)

//get a product by admin

export const allProductsAdmin = tryCatchAsyncError(async(req,res,next) => {
  const  products = await Product.find()
  if(!products) return next(new ErrorHandle("Product not found", 400));

  res.status(200).json({
    success:true,
    message:"all data fecth successfully",
    data:products,
  })
})

//get singleProduct by admin
export const adminSingleProduct = tryCatchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.params.id)
  if(!product) return next(new ErrorHandle("product not found",404))

  res.status(200).json({
    success:true,
    messge:"product fetch successFully",
    data:product
  })
})