const Review = require("../models/reviews");
const Listing = require("../models/listing");

module.exports.postReview = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        next(new ExpressError("not found id",404))
    }
    let review = req.body.review;
    let r1  = new Review(review);
    listing.reviews.push(r1);
    r1.author = req.user._id;
    await r1.save();
    await listing.save();
    req.flash("success","new review added")
    res.redirect(`/listings/${id}`)
}

module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Deleted Review")
    res.redirect(`/listings/${id}`)
}