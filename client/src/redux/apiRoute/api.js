import axios from "axios"

const baseUrl = "http://localhost:4000/api/v1"

const API = axios.create({
    baseURL: baseUrl,

})

//interceptors
API.interceptors.request.use((req)=> {
    const token = localStorage.getItem("token")
    try {
        req.headers.Authorization = `Bearer ${token}`
    } catch (error) {
        console.log(error)
    }
    return req;
})




//get all products
export const getAllProducts = () =>  API.get("/get/products")

//get single products 
export const getSingleProduct = (id) => API.get(`/single/product/${id}`)


//admin
 //created Add product
 export const addProduct = (formData) => API.post("/create/product", formData)

//single admin product
export const singleAdminProduct =(id) => API.get(`/single/admin/product/${id}`)

//update product by admin
export const updateAdminProduct = ( updateFormData, id) => API.put(`/admin/update/product/${id}`,updateFormData);


//delete product
 export const deleteProduct = (id) => API.delete(`/delete/products/${id}`)

//admin 
export const getAdminProducts = () => API.get("/all/admin/products")


//user register
 export const userRegister = (formData) => API.post("/register",formData)

 //user login
 export const userLogin = (loginValue) => API.post("/login",loginValue)
 
 //get profile
 export const userProfile = () => API.get("/single/user");

 //change password 
 export const passwordUpdate = (changeValue) => API.put("/change/password", changeValue)

 //update profile 
 export const updateProfile = (updateForm) => API.put("/update/user", updateForm);

