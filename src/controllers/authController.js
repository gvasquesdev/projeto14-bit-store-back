import bcrypt from "bcrypt"
import db from "../database/mongo.js"
import jwt from "jsonwebtoken"

export async function signIn (req, res) {
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email })

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // token expires in 24 hours

        res.send({token})
    } else {
        res.status(401).send({Error: "email e/ou senha incorretos!"})
    }
}

export async function signUp (req, res) {
    const {name, cpf, email, password} = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    const regex = 

    await db.collection("users").insertOne({ name, cpf: cpf.toString().replace(/[^0-9]/g, "") , email, password: passwordHash, cartProducts: []}) 

    res.sendStatus(201);
}