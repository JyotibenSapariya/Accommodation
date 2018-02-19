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
        res.send(true);
    });
    console.log(data);
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
        Apartment_name: req.body.Apartment_name,
        Image_name: req.body.Image_name
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

app.get("/getRooms", function (req, res) {
    console.log("room data");
    AddRoom.find((err, sdata) => {
        console.log('data find');
        res.send(JSON.stringify(sdata));
    });
    //  console.log(res);

});

app.post("/DeleteRoom", function (req, res) {
    console.log("delete data");
    AddRoom.remove({_id: req.body.RId}, (err, sdata) => {
        console.log('Delete room' + req.body.RId);
        res.send("success");
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
