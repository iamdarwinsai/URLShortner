const express=require("express");
const { connectToMongoDB } = require("./connect");
const URL=require("./models/url")
const path=require("path");
const cookieParser = require('cookie-parser')
const { restrictToLoggedUserOnly,checkAuth } = require("./middlewares/auth");

const staticRoute=require("./routes/staticRouter")
const urlRoute=require("./routes/url");
const userRoute=require("./routes/user");



const app=express();
const PORT=4000;

connectToMongoDB("mongodb://127.0.0.1:27017/URL_SHORTIT_LATEST").then(()=>{
    console.log("MongoDb connected");
})

app.set("view engine","ejs")
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/url", restrictToLoggedUserOnly, urlRoute)
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute)


app.listen(PORT,(req,res)=>{
    console.log(`Server started at ${PORT}`);
})