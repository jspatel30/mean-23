const express = require("express")
const route = express.Router()
const ProductController = require("../Controller/productControllerDB")

route.post("/addProductDB",ProductController.addProduct)
route.get("/getAllProductsDB",ProductController.getAllProducts)
route.get("/getProductByIdDB/:productId",ProductController.getProductById)
route.delete("/deleteProductByIdDB/:productId",ProductController.deleteProductById)
route.delete("/deleteAllProductsDB",ProductController.deleteAllProduct)
route.post("/product/filter",ProductController.filterProduct)
route.put("/updateProduct",ProductController.updateProduct)

module.exports = route