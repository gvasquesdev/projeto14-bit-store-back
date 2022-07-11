import { ObjectId } from "mongodb";
import db from "../database/mongo.js"

export async function getUserOrders (req, res) {
    const user = await db.collection("users").findOne({_id: ObjectId(res.locals.userId)})
    const userOrders = await db.collection("sales").find({userId: res.locals.userId}).toArray()

    res.send({user, userOrders})
}

export async function registerSale (req, res) {
    const {products, price, address, date} = req.body;

    await db.collection("sales").insertOne({ userId: res.locals.userId, products, price, address, date  })
    await db.collection("carts").deleteMany({userId: res.locals.userId})

    res.sendStatus(201)
}