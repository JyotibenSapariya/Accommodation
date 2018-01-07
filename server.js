// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require('request');
var nodemailer = require('nodemailer');
var xoauth2 = require("xoauth2");
var axios = require("axios");

// Require Article Schema
// var Article = require("./models/Article");

// Create Instance of Express

var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/accomodation");
var db = mongoose.connection;

db.on("error", function (err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------


// Main "/" Route
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


let contactSchema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    description: String
});
let contact = mongoose.model('contact', contactSchema)
app.post("/contact", function (req, res) {
    console.log("request body is", req.body);

    let data = new contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description


    });
    data.save((req, res) => {

        //res.send('success');

    });
    console.log(data);


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jyotisapariya1995@gmail.com',
            pass: 'sapariya1995'
        }
    });

    var html = "<b>"
    html += "Name: " + req.body.name + "<br>";
    html += "Company Name: " + req.body.subject + "<br>";
    html += "Email: " + req.body.email + "<br>";
    html += "Company Description: " + req.body.description + "<br>";
    html += "</b>"

    // setup email data with unicode symbols
    var mailOptions = {
        from: 'jyotisapariya1995@gmail.com', // sender address
        to: 'jyotisapariya1995@gmail.com', // list of receivers
        subject: 'New Contact', // Subject line
        text: 'use html mofo', // plain text body
        html: html // html body
    };

    function mailCallback(status) {
        res.status(status).send();
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            console.log("we errored!")
            res.status(500).send('email attempt failed!')
            mailCallback(500);

        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).send("OK");
            mailCallback(200)
        }
    });


});


let signup = require('./module/adminlogin');
app.post("/signup", function (req, res) {
    console.log("request body is", req.body.email);
    signup.find({email: req.body.email, password: req.body.password}, (err, sdata) => {
       if(sdata.length === 1) {
           console.log('sucess');
           //  res.send('success');
       }else {console.log('error')}
    });
  //  console.log(res);

});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
