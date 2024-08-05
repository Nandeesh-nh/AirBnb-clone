const mongoose = require("mongoose");
const Review  = require("./reviews.js");
const cloudinary = require("cloudinary");
const {storage} = require("multer-storage-cloudinary")
const Schema = mongoose.Schema;

const lisitingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    image: {
       url : String,
       filename:String,
    },
    price: {
        type: Number,
        min: [1, 'Price should be at least 1 Rs.'],
        required: [true, 'Price is required']
    },
    location: {
        type : String,
        require : true
    },
    country: {
       type: String,
       require : true
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
           
          },
          coordinates: {
            type: [Number],          
          }
    },
    category : {
        type : String,
        enum : ["trending", "family", "beachside", "pet-friendly", "cityescape", "countryside", "adventure", "budget-stays", "luxury", "unique-stays", "skiing", "romantic", "eco-friendly", "nightlife"],
        required : true,
    }
});


lisitingSchema.post("findOneAndDelete",async function (listing) {
    await Review.deleteMany({_id: {$in : listing.reviews}});
    await cloudinary.uploader.destroy(listing.image.filename);
})

const Listing = mongoose.model("Listing",lisitingSchema);

module.exports = Listing;
