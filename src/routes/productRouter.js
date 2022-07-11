import express from "express"
import { getAllProducts, insertProducts } from "./../controllers/productController.js"

const productRouter = express.Router()

productRouter.get("/getallproducts", getAllProducts);
productRouter.post("/postproducts", insertProducts);

export default productRouter;