import express from "express"
import { getUserOrders, registerSale } from "../controllers/saleController.js"
import saleMiddleware from '../middlewares/saleMiddleware.js';
import {verifyToken} from '../middlewares/tokenMiddleware.js';

const saleRouter = express.Router()

saleRouter.get("/sales", verifyToken, getUserOrders)
saleRouter.post("/sales", verifyToken, saleMiddleware, registerSale)

export default saleRouter