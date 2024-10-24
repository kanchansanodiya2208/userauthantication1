
const User = require("../Models/UserModel");
const {createSecretToken} = require("../Util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup= async(req,res,next) => {
    try {
        const {email, username, password, createdAt} = req.body;
        console.log(email);
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.json({message: "User Already Exists"});
        }
        const user = await User.create({email, username, password, createdAt});
        const Token = createSecretToken(user._id);
        res.cookie("Token", Token,{
            withCredentials: true,
             httpOnly: false,

            })
            res.status(201)
            .json({message: "User SignUp SuccessFully", success: true, user})
            next();
    } catch (error) {
        console.error(error);
        
    }
}

module.exports.Login = async(req,res,next) => {
    try {
       const {email, password} = req.body;
    
       if(!email || !password) {
        res.json({message: "All Fields are Required"});
       } 
       const user = await User.findOne({email});
       if(!user) {
        res.json({message: "email address is incorect"})
       }
       const auth = await bcrypt.compare(password, user.password)
       if(!auth){
        res.json({message: "Incorect Password"})
       }
       const token = createSecretToken(user._id);
       res.cookie("Token", token,{
        withCredentials: true,
        httpOnly: false,
       })
       res.status(201)
       .json({message: "User LoggedIn SuccessFully", success: true})
       next();
    } catch (error) {
        console.error(error);
    }
}