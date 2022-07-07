import joi from "joi"
import bcrypt from "bcrypt"
import db from "../database/mongo.js"
import jwt from "jsonwebtoken"

export async function signIn (req, res) {
    const { email, password } = req.body;

    const loginSchema = joi.object({
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.required()
    })
    
    const validation = loginSchema.validate({email, password})

    if (validation.error) {
        res.status(401).send("email inválido!")
        return
    }

    const user = await db.collection("users").findOne({ email })

    if(user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // token expires in 24 hours
        
        res.send({token})
    } else {
        res.status(401).send("email e/ou senha incorretos!")
    }
}

export async function signUp (req, res) {
    const {name, email, password} = req.body;

    const emailAlreadyInUse = await db.collection("users").find({email: email}).toArray()

    if (emailAlreadyInUse.length) {
        res.status(409).send("este email ja esá sendo usado")
        return
    }

    const signUpSchema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
        password: joi.string().pattern(new RegExp("^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$")).required()
    })
    
    const validation = signUpSchema.validate({name, email, password}, { abortEarly: false })

    if (validation.error) {
        res.status(422).send(validation.error.details)
        return
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection("users").insertOne({ name, email, password: passwordHash }) 

    res.sendStatus(201);
}