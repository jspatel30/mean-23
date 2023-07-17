const mongoose = require("mongoose")
require('dotenv').config()  //It will read your environment file

// const MONGO_URI = process.env.MONGO_URI
const {MONGO_URI} = process.env

module.exports.getDbConnection = function(){
    mongoose.connect(MONGO_URI).then(()=>console.log("Db Connected "))
    .catch(()=>console.log("Db Connection failed"))
}
