import db from "../database/mongo.js"

export async function getUserOrders (req, res) {
    const userOrders = await db.collection("sales").find({ userId: res.locals.userId }).toArray()

    res.send(userOrders)
}

export async function registerSale (req, res) {
    const {products, price, address, date } = req.body;

    await db.collection("sales").insertOne({ userId: res.locals.userId, products, price, address, date  })

    res.sendStatus(201)
}