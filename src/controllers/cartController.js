import { ObjectId } from "mongodb";
import db from "../database/mongo.js"

export async function getUserCart (req, res) {
    const userCart = await db.collection("carts").find({userId: res.locals.userId}).toArray()


    res.send(userCart)
}

export async function addToUserCart (req, res) {
    const {name, price, image, department} = req.body;

    await db.collection("carts").insertOne({userId: res.locals.userId, name, price, image, department, quantity: 1})

    res.sendStatus(200)
}

export async function removeFromUserCart (req, res) {
    const {name} = req.body;

    await db.collection("carts").deleteOne({userId: res.locals.userId, name})

    res.sendStatus(200)
}


export async function increaseProductQuantity (req, res) {
    const {name} = req.body;

    await db.collection("carts").updateOne({userId: res.locals.userId, name}, {$inc: {quantity: 1}})

    res.sendStatus(200)
}

export async function decreaseProductQuantity (req, res) {
    const {name} = req.body;

    await db.collection("carts").updateOne({userId: res.locals.userId, name}, {$inc: {quantity: -1}})

    res.sendStatus(200)
}




