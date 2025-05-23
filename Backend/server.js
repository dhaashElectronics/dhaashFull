import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongdb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import carRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// APP config
const app = express()
const  port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())


//api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use('/api/cart', carRouter)
app.use('/api/order',orderRouter)



app.get("/",(req,res)=>{
    res.send("Api working")
})


app.listen(port, ()=> console.log("Server started on PORT : " + port))