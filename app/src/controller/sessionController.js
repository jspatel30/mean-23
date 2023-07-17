 
function signup(req,res)
{
    var users =[]
    let firstName = req.body.firstName;
    let email = req.body.email;
    let password = req.body.password;

    let user = 
    {
        "firstName":firstName,
        "email":email,
        "password":password
    }
    users.push(user)
    
    res.json({"msg":"User Added" , "data":user, "rescode":200})

}
module.exports.signup = signup;


 