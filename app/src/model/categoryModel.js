const mongoose = require("mongoose")

let categorySchema = mongoose.Schema({
    categoryName:{
        type:String,
        required:{value:true,"message":"Please enter Category Name"},
        lowercase:true        
    }
})

module.exports = mongoose.model("Category",categorySchema)