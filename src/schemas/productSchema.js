import joi from "joi";


const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().required(),
    department: joi.string().required()
});

export default productSchema;