const express=require("express");
const { handleSignUp,handleLoginIn } = require("../controllers/user");
const router=express.Router();



router.post("/signup",handleSignUp)

router.post("/login",handleLoginIn)

module.exports=router;