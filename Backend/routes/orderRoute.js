import express from "express"
import { placeOrder } from "../controllers/orderController.js";
// import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'



const orderRouter = express.Router()

// Payment Features
orderRouter.post('/place',authUser,placeOrder)



export default orderRouter