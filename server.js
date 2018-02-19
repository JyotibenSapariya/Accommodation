// Include Server Dependencies
let express = require("express");
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let request = require('request');
let nodemailer = require('nodemailer');
let xoauth2 = require("xoauth2");
let axios = require("axios");

//Import modules
let adminlogin = require('./module/adminlogin');
let contact = require('./module/contact');
let login = require('./module/userlogin');
let AddRoom = require('./module/AddRoom');

// Require Article Schema
// let Article = require("./models/Article");

// Create Instance of Express

let app = express();
// Sets an initial port. We'll use this later in our listener
let PORT = process.env.PORT || 3000;

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
let db = mongoose.connection;

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


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jyotisapariya1995@gmail.com',
            pass: 'sapariya1995'
        }
    });

    let html = "<b>"
    html += "Name: " + req.body.name + "<br>";
    html += "Company Name: " + req.body.subject + "<br>";
    html += "Email: " + req.body.email + "<br>";
    html += "Company Description: " + req.body.description + "<br>";
    html += "</b>"

    // setup email data with unicode symbols
    let mailOptions = {
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


app.get("/getRooms", function (req, res) {
    console.log("request body is");
    contact.find((err, data) => {
        console.log(data)
        res.json(data);
    });
    //  console.log(res);

});

app.post("/UserSignUp", function (req, res) {
    console.log("request body is", req.body);
    login.find({email: req.body.email}, (err, data) => {
        if (data.length === 1) {

            res.send(false);
        } else {

            let data = new login({
                email: req.body.email,
                password: req.body.password

            });
            data.save((err, res) => {
                console.log('success user Sign Up');

            });
            res.send(true);
        }
    });

});

app.post("/Userlogin", function (req, res) {
    console.log("request body is", req.body.email);
    login.find({email: req.body.email, password: req.body.password}, (err, sdata) => {
        if (sdata.length === 1) {
            console.log('come to the dashboard');
            res.send(true);
        } else {
            res.send(false);
            console.log('email and password is wrong')
        }
    });
    //  console.log(res);

});

app.post("/AddRoom", function (req, res) {
    console.log("request body is", req.body.Apartment_name);
    let data = new AddRoom({
        Apartment_name: req.body.Apartment_name
    });
    data.save((req, res) => {
        console.log('success add room');
    });
});



//Admin Site


app.post("/adminlogin", function (req, res) {
    console.log("request body is", req.body.email);
    adminlogin.find({email: req.body.email, password: req.body.password}, (err, data) => {
        if (data.length === 1) {
            //console.log(data);
             res.send(true);
        } else {
            //console.log(data)
           res.send(false);
        }
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
