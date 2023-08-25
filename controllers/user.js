const USER = require("../models/user")
const {v4:uuidv4} =require("uuid")

const { setUser } =require("../Service/Auth")
async function handleSignUp(req,res){
    const{name,email,password}=req.body

    if(!name || !email || !password){
        return res.redirect("/signup")
    }

    await USER.create({
        name,
        email,
        password
    })
    
    return res.redirect('/');

}


async function handleLoginIn(req,res){
    const{email,password}=req.body
    const user=await USER.findOne({email,password})
    if(!user){
        return res.redirect("/login")
    }

    

    const token=setUser(user);
    res.cookie('uid',token);
    return res.redirect('/');

}

module.exports={
    handleSignUp,handleLoginIn
}