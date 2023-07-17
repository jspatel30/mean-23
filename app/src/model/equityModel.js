const mongoose = require("mongoose")

let equitySchema = new mongoose.Schema({
    "CompanyName":{
        type:String,
        lowercase:true
    },
    "Symbol":{
        type:String,
        uppercase:true
    },
    "ISINCode":{
        type:String
    },
    "Price":{
        type:String
    },
    "YearHigh":{
        type:String
    },
    "YearLow":{
        type:String
    },
    "IndustryID":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Industry"
    }
})

module.exports = mongoose.model("Equity",equitySchema)