import {signInSchema, signUpSchema} from "../schemas/authSchema.js"
import db from "../database/mongo.js"

export function signInMiddleware(req, res, next) {
    const { email, password } = req.body;

    const validation = signInSchema.validate({email, password}, { abortEarly: false })

    if (validation.error) {
        res.status(400).send({Error: validation.error.details})
        return
    }
    next();
}

export async function signUpMiddleware(req, res, next) {
    const {name, cpf, email, password} = req.body;

    const emailAlreadyInUse = await db.collection("users").find({email: email}).toArray()

    if (emailAlreadyInUse.length) {
        res.status(409).send({Error: "este email ja esá sendo usado"})
        return
    }


    const validation = signUpSchema.validate({name, cpf, email, password}, { abortEarly: false })

    if (validation.error) {
        res.status(400).send({Error: validation.error.details})
        return
    }

    next();
}