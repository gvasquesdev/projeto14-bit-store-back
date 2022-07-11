import db from "../database/mongo.js"
import productSchema from "./../schemas/productSchema.js";


export async function  getAllProducts (req,res) {
    const products = await db.collection("products").find().toArray();

    res.send(products);

}

export async function insertProducts (req,res) {
    const {name, image, price, department} = req.body;

    const validate = productSchema.validate({name, image, price, department}, { abortEarly: false });

    if(validate.error){
        res.status(400).send("Try again");
    }

    try {
        const productExists = await db
          .collection('products')
          .findOne({ name: req.body.name });
        if (productExists) {
          return res.sendStatus(409);
        }

    
        await db
            .collection("products")
            .insertOne({name, image, price, department});
        res.status(201).send("Product registered successfully");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}