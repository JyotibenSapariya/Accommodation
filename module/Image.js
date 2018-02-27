let express = require("express");
let mongoose = require("mongoose");


let ImageSchema =  mongoose.Schema({
    RId: String,
    ImageName:String
});
let Image =  mongoose.model('Image',ImageSchema);

module.exports = Image;

