import joi from "joi"

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const signUpSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.alternatives().try(joi.string().pattern(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")).length(11).required(), joi.string().pattern(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")).length(12).required(), joi.string().pattern(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")).length(14).required(), joi.string().pattern(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")).length(16).required(), joi.string().pattern(new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")).length(18).required()),   // CPF or CNPJ
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp("^(?=.{5,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$")).required()
})

export {signInSchema, signUpSchema}