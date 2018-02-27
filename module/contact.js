let express = require("express");
let mongoose = require("mongoose");
let axios = require("axios");
let app = express();
let contactSchema =  mongoose.Schema({
    name: String,
    subject:String,
    email: String,
   description: String
});
let contact =  mongoose.model('contact',contactSchema);

module.exports = contact;

