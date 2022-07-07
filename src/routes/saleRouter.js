import express from "express"
import { getUserOrders, registerSale } from "../controllers/saleController.js"
import jwt from "jsonwebtoken"

async function verifyToken(req, res, next) {
    const authorization = req.headers.authorization
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) {
        res.status(401).send("Falha na autenticação, faça login e tente novamente")
        return 
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        res.locals.userId = tokenData.userId
    } catch {
        res.status(401).send("aFalha na autenticação, faça login e tente novamente")
        return
    }
  
    next()
  }

const saleRouter = express.Router()

saleRouter.get("/sales", verifyToken, getUserOrders)
saleRouter.post("/sales", verifyToken, registerSale)

export default saleRouter