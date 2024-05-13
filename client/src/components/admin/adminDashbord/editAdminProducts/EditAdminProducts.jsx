import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Spinner from "react-bootstrap/esm/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../../layout/loader/Loader";
import { adminUpdateProduct, clearError, productAdminSingle } from "../../../../redux/features/adminSlice";


const EditAdminProducts = () => {
  const { loading, error , adminProduct } = useSelector((state) => state.admin);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
 

  const [editValue, setEditValue] = useState({
    productName:"",
    description:"",
    price:"",
    ratings:"",
    manufacture:"",
    isInStock:"",
    SKU:"",
    category:"",
  });


  const {
    productName,
    description,
    category,
    price,
    ratings,
    manufacture,
    isInStock,
    SKU,
  } = editValue;

  const [productImgReview, setProductImgReview] = useState("");
  const [productImg, setProductImg] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onloadend = ()=>{
        setProductImgReview(reader.result)
        setProductImg(file)
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateFormData = new FormData();
      updateFormData.append("productName", productName);
      updateFormData.append("description", description);
      updateFormData.append("manufacture", manufacture);
      updateFormData.append("category", category);
      updateFormData.append("ratings", ratings);
      updateFormData.append("price", price);
      updateFormData.append("isInStock", isInStock);
      updateFormData.append("SKU", SKU);
      updateFormData.append("productImg", productImg);
    
    
     dispatch(adminUpdateProduct({id, updateFormData, toast, navigate}))
  }

  useEffect(() => {
    if (adminProduct) {
  
      setEditValue({
        productName:adminProduct.productName || "",
        description:adminProduct.description || "",
        ratings:adminProduct.ratings || "",
        price:adminProduct.price || "",
        category:adminProduct.category || "",
        manufacture:adminProduct.manufacture || "",
        isInStock:adminProduct.isInStock || "",
        SKU:adminProduct.SKU || "",
      })

      setProductImgReview(adminProduct?.productImg?.url || "")
    }
  },[adminProduct] )



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    dispatch(productAdminSingle(id))
  
  }, [dispatch, error,id]);


 
  return (
    <>
 
        
          <div className="flex space-x-2 ">
            <Link
              to="/admin/hamrodokan/panel"
              className="text-xl font-semibold mb-4 flex justify-start no-underline"
            >
              <FaArrowLeft />
              Add New Product
            </Link>
          </div>

          <div className="bg-white p-8 rounded shadow">
            <form onSubmit={handleSubmit} className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product price"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Ratings
                </label>
                <input
                  type="number"
                  id="ratings"
                  name="ratings"
                  step="0.1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product ratings"
                  value={ratings}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Manufacture
                </label>
                <input
                  type="text"
                  id="manufacture"
                  name="manufacture"
                  step="0.1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product manufacture"
                  value={manufacture}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  type="text"
                  id="SKU"
                  name="SKU"
                  step="0.1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product SKU"
                  value={SKU}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  step="0.1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product category"
                  value={category}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  IsInStock
                </label>
                <input
                  type="number"
                  id="isInStock"
                  name="isInStock"
                  step="0.1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product isInStock"
                  value={isInStock}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  productImg
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="productImg"
                  step="0.1"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter productImg"
                  onChange={handleFileChange}
                />
                {/* {product && (
                  <img
                    src={product?.productImg?.url}
                    alt="productImg"
                    className="w-64 ml-8 object-cover"
                  />
                )} */}

                {productImgReview && (
               <img src={productImgReview} alt="productImg" className="w-64 object-cover" />
                  )}
              </div>

              <div className="w-full md:w-1/2 px-4 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter product description"
                  value={description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              {/* Add other fields similar to the ones above */}
              <div className="w-full px-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
                >
                  {loading && <Spinner animation="border" size="sm" />} Update
                  Product
                </button>
              </div>
            </form>
          </div>
        
      
    </>
  );
};

export default EditAdminProducts;
