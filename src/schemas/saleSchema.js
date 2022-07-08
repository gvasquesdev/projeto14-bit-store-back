import joi from "joi"

const saleSchema = joi.object({
    address: joi.string().required()
})

export default saleSchema