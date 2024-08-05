const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {Schema,reviewSchema} = require("../schema.js");
const {isloggedin,isOwner,funvalidation}= require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer  = require('multer')
const Listing = require("../models/listing.js");
const {storage} = require("../cloudConfiq.js")
const upload = multer({ storage });



router.route("/")
        .get(wrapAsync(listingControllers.indexRoute))
       
//creating new route new route
router.get("/new",isloggedin,wrapAsync(listingControllers.newRoute))
//show route 
router.get("/:id",wrapAsync(listingControllers.showRoute));
//update and edit route
router.get("/:id/edit",isloggedin,isOwner,wrapAsync(listingControllers.editRoute));

//creating new post post method
router.post("/",isloggedin,upload.single('image'),funvalidation,wrapAsync(listingControllers.postNewRoute))

router.post("/search",wrapAsync(listingControllers.search))

//update route                //to access id you use this route or else it would be difficult to use this id;
router.put("/:id",isloggedin,upload.single('image'),wrapAsync(listingControllers.putEditRoute))

//delete route 
router.delete("/:id",isloggedin,isOwner,wrapAsync(listingControllers.deleteRoute))


module.exports = router;