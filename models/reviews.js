const mongoose = require("mongoose");
const User = require("./user.js");
const schema = new mongoose.Schema({
    comment : {
        type : String,
        maxlength : 250
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
})

const Review = mongoose.model("Review",schema);
module.exports = Review