var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var app = express();
let loginSchema =  mongoose.Schema({
    email: String,
    password:String
});
let login =  mongoose.model('login',loginSchema);

module.exports = login;

