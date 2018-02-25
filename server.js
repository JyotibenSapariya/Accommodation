// Include Server Dependencies
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let request = require('request');
let nodemailer = require('nodemailer');
let xoauth2 = require("xoauth2");
let axios = require("axios");

const fileUpload = require('express-fileupload');

app.use(fileUpload());

// Create Instance of Express

// Sets an initial port. We'll use this later in our listener
let PORT = process.env.PORT || 3000;

//Import modules
let adminlogin = require('./module/adminlogin');
let contact = require('./module/contact');
let login = require('./module/userlogin');
let AddRoom = require('./module/AddRoom');


// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
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
   // console.log("request body is", req.body);
    console.log(req.files);
   // console.log(req.body.Image_Name);
    let imageFile = req.files.Image_Name;
    console.log(req.files.Image_Name);
    console.log(imageFile.name);
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    imageFile.mv("./public/img/"+ imageFile.name, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });
    //console.log(req.files);
    let data = new AddRoom({
        Apartment_name: req.body.Apartment_name,
       Room_Availability_From: req.body.Room_Availability_From,
        Till: req.body.Till,
        Room_Cost_in_euros: req.body.Room_Cost_in_euros,
        Number_of_beds: req.body.Number_of_beds,
        Bathroom: req.body.Bathroom,
        Amenities: req.body.Amenities,
        Contact_Details: req.body.Contact_Details,
        Phone_Number: req.body.Phone_Number,
        Email_Address: req.body.Email_Address,
        Street: req.body.Street,
        City: req.body.City,
        Other_details: req.body.Other_details,
        Image_name: imageFile.name
    });
    console.log(data);
    let promise = data.save();
    //assert.ok(promise instanceof Promise);

    promise.then(function (doc) {
        res.json("true");
        //res.send("success");
    });
    if(!promise)
        res.json("false")




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
