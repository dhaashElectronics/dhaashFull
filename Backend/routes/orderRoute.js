import express from "express"
import { placeOrder, userOrders,allOrders,updateStatus } from "../controllers/orderController.js";
// import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import adminAuth from "../middleware/adminAuth.js"



const orderRouter = express.Router()



// Payment Features 
orderRouter.post('/place',authUser,placeOrder)

//user feature
orderRouter.post('/userorders',authUser,userOrders)



// admin feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)




export default orderRouter