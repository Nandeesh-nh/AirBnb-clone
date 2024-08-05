const express = require("express")
const router = express.Router();
const passport = require("passport");
const passportlocal = require("passport-local-mongoose")
const wrapAsync = require("../utils/wrapAsync")
const {savelocation} = require("../middleware.js");
const userCountroller = require("../controllers/user.js")

router.route("/signup")
      .get(userCountroller.getsignup)
      .post(userCountroller.postsignup)

router.route("/login")
      .get(userCountroller.getLoginForm)
      .post(savelocation, passport.authenticate("local", {
           failureRedirect: "/login",
           failureFlash: true
        }), userCountroller.postLoginForm);

router.get("/logout",userCountroller.logout);


module.exports = router;