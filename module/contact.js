let express = require("express");
let mongoose = require("mongoose");
let axios = require("axios");
let app = express();
let contactSchema =  mongoose.Schema({
    email: String,
    password:String
});
let contact =  mongoose.model('contact',contactSchema);

module.exports = contact;

