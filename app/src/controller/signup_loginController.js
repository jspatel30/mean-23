const UserModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const {SEC_KEY} = process.env
const bcrypt = require("bcrypt")

//signup
module.exports.signup = async function(req,res){

    // let user = new UserModel({
    //     firstname:req.body.firstname,
    //     email:req.body.email,
    //     password:req.body.password
    // })
    let password = req.body.password
    let encryptedPassoword = bcrypt.hashSync(password,10)
    console.log("enc pass",encryptedPassoword)
    req.body.password = encryptedPassoword
    
    let user = new UserModel(req.body)
    let data = await user.save()
    res.json({"msg":"Signup done",data:data,"rescode":200})     
}   

//login
module.exports.login = async function(req,res){
    let email = req.body.email
    let password = req.body.password
    console.log(password)
    let user = await UserModel.findOne({email:email})
    
    console.log(user.password)
    if(user && bcrypt.compareSync(password,user.password))
    { 
            let token = jwt.sign({"email":user.email,"userId":user._id,"role":"user"},SEC_KEY,{expiresIn:"7d"})
            res.json({"msg":"Login Successfully","data":user,rescode:200,token:token})
    }
    else
    {
        res.json({"msg":"Login Failed","data":"User Not Available",rescode:-9})
    }
}

//getAllUser
module.exports.getAllUser = function(req,res){
    UserModel.find().then(data=>{
        res.json({data:data,"msg":"USer Retrieved",rescode:200})
    }).catch((err)=>{
        res.json({data:data,"msg":"USer Retrieved",rescode:200})
    })
}

//deleteUserById
module.exports.deleteUserById = function(req,res)
{
    UserModel.findByIdAndDelete(req.params.userId).then((data)=>{
        res.status(200).json({
            msg:"User deleted",
            data:data
        })
    }).catch((err)=>{
        res.statsu(-9).json({
            msg:"User deletion failed",
            err:err
        })
    })
}