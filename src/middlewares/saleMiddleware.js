import saleSchema from "../schemas/saleSchema.js"

export default function saleMiddleware(req, res, next) {
    const { address } = req.body;

    const validation = saleSchema.validate({address}, { abortEarly: false })

    if (validation.error) {
        res.status(400).send({error: validation.error.details})
        return
    }
    next();
}