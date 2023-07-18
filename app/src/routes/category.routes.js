const express = require("express")
const route = express.Router()
const CategoryController = require("../controller/categoryController")

route.post("/addCategory",CategoryController.addCategory)
route.get("/getCategoryById/:categoryId",CategoryController.getCategoryById)
route.get("/getAllCategory",CategoryController.getAllCategory)
route.delete("/deleteCategoryById/:categoryId",CategoryController.deleteCategoryById)
route.delete("/deleteAllCategory",CategoryController.deleteAllCategory)

module.exports = route