if(process.env.NODE_ENV!="production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override')
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const passport = require("passport");
const localStrategy = require("passport-local");
const wrapAsync = require("./utils/wrapAsync.js")
const User = require("./models/user.js")
const UserRoute= require("./routes/user.js")

//listing router
const listingsRouter = require("./routes/listings.js");
//review router
const reviewsRouter = require("./routes/reivews.js");


let port = 8080;

main()
.then(()=>{
    console.log("connected to the database")
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(process.env.db_url);
}  




app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.engine("ejs",ejsMate);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const store = MongoStore.create({
    mongoUrl : process.env.db_url,
    touchAfter : 24*60*60,
    crypto : {
        secret :process.env.secret,
    }
});
app.use(session({
    store,
    secret : process.env.secret,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expire : Date.now()+7*60*60*24*1000,
        httpOnly : true,
        maxAge : 7*60*60*24*1000,

    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));            //passport code;
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(flash());
app.use((req,res,next)=>{
    res.locals.user = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})




app.get("/",(req,res)=>(
    res.send("i am listening here")
))


//listings routes
app.use("/listings",listingsRouter);
//reviews routes 
app.use("/listings/:id/reviews",reviewsRouter);
//user routes
app.use("/",UserRoute)


app.all("*",(req,res,next)=>{
   res.render("errors/page.ejs")
})

app.use((err,req,res,next)=>{
    let{status=500,message="some error"} = err;
    res.status(status).render("errors/error.ejs",{err});
})
app.listen(port,()=>{
    console.log("Server is running on port "+port);
})

        
