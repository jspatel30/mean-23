const express = require("express")
const app = express()
const route = express.Router()
const signupController = require("../controller/signup_loginController")

route.post("/signupDb",signupController.signup)
route.post("/login",signupController.login)

//below are the URL which should considered as Public URL bcz they are the Rights of Admin..
route.get("/getAllUsers",signupController.getAllUser)
route.delete("/deleteUserById/:userId",signupController.deleteUserById)
route.get("/viewUserById/:userId",signupController.viewUserById)
route.put("/updateUserById/:userId",signupController.updateUserById)
module.exports = route