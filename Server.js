const express = require("express")
const app = express()
require("./app/src/config/dbConfig").getDbConnection()
const ProductRoute = require("./app/src/routes/product.routes")
const CategoryRoute = require("./app/src/routes/category.routes")
const authMiddleware = require("./app/src/middleware/auth.middleware")
const publicRoute = require("./app/src/routes/public.Routes")

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//private
app.use("/admin",authMiddleware,ProductRoute)
app.use("/admin",authMiddleware,CategoryRoute)

//public
app.use("/public",publicRoute)

app.listen(9999,function(){
    console.log("Server Started at 9999")
 })