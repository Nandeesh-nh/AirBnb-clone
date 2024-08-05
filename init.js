const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
if(process.env.NODE_ENV!="production") {
    require("dotenv").config();
}

let data = require("./demo data.js");
main()
.then(()=>{
    console.log("connected to the database")
})
.catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(process.env.db_url);
    await Listing.deleteMany();

    data = data.map((obj)=>({...obj,owner : '66b0be3e5e02e18344ab9896'}));
    console.log(data);

    await Listing.insertMany(data)
    .then(()=>{
        console.log("inserted succesfully");
    });
}  


