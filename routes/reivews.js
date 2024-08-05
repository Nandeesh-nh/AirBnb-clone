const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {isloggedin,isOwner,reviewValidation,isReviewAuthor}= require("../middleware.js");
const reviewController = require("../controllers/review.js");

//review route 
router.post("/",isloggedin,reviewValidation,wrapAsync(reviewController.postReview));

//delete review route 
router.delete("/:reviewId",isloggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview));


module.exports = router