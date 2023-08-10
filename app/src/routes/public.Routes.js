const express = require("express")
const app = express()
const route = express.Router()
const signupController = require("../controller/signup_loginController")

route.post("/signupDb",signupController.signup)
route.post("/login",signupController.login)
route.get("/getAllUsers",signupController.getAllUser)
route.delete("/deleteUserById/:userId",signupController.deleteUserById)
module.exports = route