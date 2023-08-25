const shortid = require('shortid');
const URL=require("../models/url")
async function handleGenerateShortURL(req,res){

    const body=req.body;
    if(!body.url){
        return res.status(400).json({MSG:"URL is required idiot"})
    }
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectedURL:req.body.url,
        visitedHistory:[],
        createdBy:req.user._id,
    })
    return res.render('home',{
        id:shortID,
    })
}

async function handleGetLink(req,res){
    const shortId=req.params.shortId
    
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitedHistory: {
            timestamp:Date.now()
        }
    }});

    res.redirect(entry.redirectedURL);
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});

    return res.json({"Visited":result.visitedHistory.length})
}

module.exports={
    handleGenerateShortURL,handleGetLink,handleGetAnalytics
}