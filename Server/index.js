
import express from "express"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors";
import productRoute from "./routes/productRoute.js"
import userRoute from "./routes/userRoute.js";
import { errorListening } from "./middlewares/error.js";
import cors from "cors"


const app = express();

//configuration
dotenv.config();


app.use(express.urlencoded({extended: true}))
app.use(express.json());

//always use here
app.use(morgan("dev"));

//cors usee
app.use(cors());


//handle uncaughtexception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}.cyan`)
    console.log(`Shutting down the server to handle unCaughtException`)
    process.exit(1)
})


// //database connect
connectDB();




//routes---routing
app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);


app.use("/gallery",express.static("public/gallery"));


//always route ko tala
//custom error handling
app.use(errorListening);

//handled promise rejection
const PORT = process.env.PORT
const server = app.listen(PORT, ()=>{
    console.log(`Server is running at: http://localhost:${PORT}`.cyan.underline.bold)
})

process.on("unhandledRejection",(err)=> {
    console.log(`Error:${err.message}.red`)
    console.log(`Shutting down the server to handle promise rejection`)
    server.close(()=> {
        process.exit(1)
    })
})