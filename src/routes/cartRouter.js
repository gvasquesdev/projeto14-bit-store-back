import express from "express"
import { getUserCart, addToUserCart, removeFromUserCart, increaseProductQuantity, decreaseProductQuantity } from "../controllers/cartController.js"
import {verifyToken} from '../middlewares/tokenMiddleware.js';

const saleRouter = express.Router()

saleRouter.get("/carts", verifyToken, getUserCart)
saleRouter.post("/addtocart", verifyToken, addToUserCart)
saleRouter.post("/removefromcart", verifyToken, removeFromUserCart)
saleRouter.post("/increaseproductquantity", verifyToken, increaseProductQuantity)
saleRouter.post("/decreaseproductquantity", verifyToken, decreaseProductQuantity)

export default saleRouter