const express = require("express")
const app = express()
const route = express.Router()
const signupController = require("../controller/signup_loginController")

route.post("/signupDb",signupController.signup)
route.post("/login",signupController.login)

module.exports = route