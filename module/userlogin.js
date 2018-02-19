let express = require("express");
let mongoose = require("mongoose");
let axios = require("axios");
let app = express();
let loginSchema =  mongoose.Schema({
    email: String,
    password:String
});
let login =  mongoose.model('login',loginSchema);

module.exports = login;

