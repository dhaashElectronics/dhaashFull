
import express from "express"
import authUser from "../middleware/auth.js"
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js"

const carRouter = express.Router()


carRouter.post('/get',authUser, getUserCart)
carRouter.post('/add',authUser, addToCart)
carRouter.post('/update',authUser, updateCart)


export default carRouter