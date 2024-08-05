const User = require("../models/user")

module.exports.getsignup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postsignup = async(req,res)=>{
    try {
    const {username,email,password} = req.body;
    const user1 = new User({username,email});
    const newUser = await User.register(user1,password);
    req.login(newUser,(err)=>{
        if(err){
            return next(err);
        }
            req.flash("success","Welcome to WonderLust!")
             res.redirect("/listings");
    })

    }
    catch(e) {
        req.flash("error","Username already exists")
        res.redirect("/signup");
    }
}

module.exports.getLoginForm = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.postLoginForm = async (req, res) => {


    req.flash("success", "Welcome back to WonderLust!");
    if(res.locals.redirectUrl) {
        return res.redirect(res.locals.redirectUrl)
    }
    else {
        res.redirect("/listings");
    }
    
}

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","Logged out successfully")
        res.redirect("/listings");
    });
    
};