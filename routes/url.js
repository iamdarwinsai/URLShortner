const express=require("express");
const { handleGenerateShortURL, handleGetLink,handleGetAnalytics } = require("../controllers/url");

const router=express.Router();

router.post("/",handleGenerateShortURL);



router.get("/:shortId",handleGetLink)

router.get("/analaytics/:shortId",handleGetAnalytics)

module.exports=router;