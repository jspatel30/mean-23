const UserModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env

//signup
module.exports.signup = async function(req,res){

    // let user = new UserModel({
    //     firstname:req.body.firstname,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    let user = new UserModel(req.body)
    let data = await user.save()

    res.json({"msg":"Signup done",data:data,"rescode":200})     
}

//login
module.exports.login = async function(req,res){
    let email = req.body.email
    let password = req.body.password
    
    let user = await UserModel.findOne({email:email})
    
    
    if(user && user.password == password)
    { 
            let token = jwt.sign({"email":user.email,"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"7d"})
            res.json({"msg":"Login Successfully","data":user,rescode:200,token:token})
    }
    else
    {
        res.json({"msg":"Login Failed","data":"User Not Available",rescode:-9})
    }
}