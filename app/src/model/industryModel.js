const mongoose = require("mongoose")

let industrySchema = new mongoose.Schema({
    IndustryName:{
        type:String,
        required:true,
        lowercase:true
    }
})
module.exports = mongoose.model("Industry",industrySchema)