
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

const app = express()

//configuration
dotenv.config();


app.use(express.urlencoded({extended: true}))
app.use(express.json());

//always use here
app.use(morgan("dev"));


// //database connect
connectDB();

// const connectDB = async () => {
//     await mongoose.connect("mongodb://127.0.0.1:27017/HamroDokan");
//     console.log(`MongoDB is connected`);
//   };
//   connectDB();

const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    isMarried:Boolean
})
const User = new mongoose.model("user",userSchema);

// simple function call
// const makeCollection = async() => {
//    const user = await User.find();
//   console.log(user);
// }
// makeCollection();




//post
app.post("/add",async(req,res)=> {
    const user = await User.create(req.body);

    res.status(201).json({
        success:true,
        message:"user added",
        user,
    })
})
   

//get
app.get("/users", async(req,res)=>{
    const product = await User.find()

    res.status(201).json({
        success:true,
        message:"user get ",
        product,
    })
})

//put(update)
app.put("/user/:id",async(req,res) =>{
 let userUpdate = await User.findById(req.params.id)

 userUpdate = await User.findByIdAndUpdate(req.params.id, req.body,{ new:true});

 res.status(201).json({
    success:true,
    message:"user update successfullly ",
    userUpdate,
})



})



//delete
app.delete("/user/:id", async(req,res) =>{
    await User.deleteOne({_id: req.params.id});
    res.status(201).json({
        success:true,
        message:"user deleted successfullly ",
        userUpdate,
    })


})





// app.get("/", (req,res)=>{
//     res.status(200).json({
//         name: "Ram",
//         age: 23,
//         isMarried: false,
//     })
// })
// app.post("/add", (req,res)=>{
//     const userName = req.body.name
//     const userEmail = req.body.email
//     const userPassword = req.body.password
//     res.status(201).json({
//         success: true,
//         name: userName,
//         email: userEmail,
//         password: userPassword,
//     })
// })
// const PORT = 4000
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running at: http://localhost:${PORT}`)
})