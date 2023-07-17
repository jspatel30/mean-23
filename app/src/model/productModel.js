const mongoose = require("mongoose")
const Schema = mongoose.Schema

//SCHEMA
ProductSchema = new Schema(
  {
    "productName":String,
    "price":Number,
    "qty":Number,
    "categoryId":{
      type:Schema.Types.ObjectId,
      ref:"Category"
    }
  })

  
  module.exports = mongoose.model("Product",ProductSchema)
  //Name of table will be Product(products) and the structure of table will be ProductSchema
  
  
  //const ProductModel = mongoose.model("Product",ProductSchema)