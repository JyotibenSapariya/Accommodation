// Include Server Dependencies

//import swal from "sweetalert";
let swal = require("sweetalert");
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
let request = require('request');
let nodemailer = require('nodemailer');
let xoauth2 = require("xoauth2");
let axios = require("axios");
let fs   = require('fs');
let _  = require('underscore');

let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let uuid = require('uuid');
// Sets an initial port. We'll use this later in our listener
let PORT = process.env.PORT || 3000;

//****************Server listening*****************
let server = app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});


let AddUserSchema = new mongoose.Schema({

    Email:String,
    roomID:String
});
let AddUser = mongoose.model('AddUser',AddUserSchema);

let MessageSchema = new mongoose.Schema({
    who:String,
    what:String,
    when: Date
});
let AddMsg = mongoose.model('AddMsg',MessageSchema);

let admins = {};
let users = {};


let io = require('socket.io').listen(server);

io.on('connection' , function (socket) {
    
    console.log('user connected');
    socket.on('AddAdmin', function(data) {
        this.isAdmin = data.isAdmin;
        socket.username = data.admin;
       // console.log(('add admin'));
        /*_.each(admins, function(adminSocket) {
            io.emit("admin added", socket.username)
            io.emit("admin added", adminSocket.username)
        });*/

        admins[socket.username] = socket;


      //  console.log('admins : ' + admins[socket.username]);

      //  console.log(data.admin);
       // console.log('useres : ' + users[socket.roomID]);
      //  console.log(users);
        console.log('No of Users Are Online : ' + Object.keys(users).length);
        //If some user is already online on chat
        if (Object.keys(users).length > 0) {
            _.each(users, function(userSocket) {
                console.log(userSocket.roomID);
                AddUser.find({roomID: userSocket.roomID},function (err,data) {
                    console.log(data);
                })
                   /* .then(function(history) {
                        let len = history.length;
                        let userSocket = users[history[len - 1]];
                        history.splice(-1, 1);
                    */    socket.join(userSocket.roomID);
                       // console.log(socket.join(userSocket.roomID));
                        io.emit("New Client", {
                            roomID: userSocket.roomID,
                            email:userSocket.Email,
                            //history: history,
                            details: userSocket.userDetails,
                            justJoined: true
                        })
                    /*})*/
            });

        }
    });

    socket.on('add user', function(data) {
        console.log('add user Socket: ' + data.Email );
        socket.isAdmin = false;
        if (data.isNewUser) {
            data.Email = data.Email;
            data.roomID = uuid.v4();
            let AdduserData = new AddUser(data);
            AdduserData.save();

            socket.emit("roomID", data.roomID);
        }
        socket.roomID = data.roomID;
        console.log('socket id -' + socket.roomID);
        //Fetch user details
        AddUser.find({roomID:socket.roomID}, function(err,details){
            console.log('details' + details);
        })
            .then(function(details) {
                socket.userDetails = details;
                console.log(socket.userDetails + 'Find the User DATA')
            })
            .catch(function(error) {
                console.log("Line 95 : ", error)
            });

       if( socket.join(socket.roomID))
           console.log('socket.join'+ socket.roomID);

        let newUser = false;
        if (!users[socket.roomID]) {  // Check if different instance of same user. (ie. Multiple tabs)
            users[socket.roomID] = socket;
            newUser = true;
        }
        AddUser.find({roomID:socket.roomID}, function(err,details){
            console.log(details);
        })
            .then(function(history) {
                history.splice(-1, 1);
                io.emit('chat history', {
                    history: history,
                    getMore: false
                });
                if (Object.keys(admins).length === 0) {
                    console.log('Admin Ofline');
                    //Tell user he will be contacted asap and send admin email
                    io.emit('admin log message', "Thank you for reaching us." +
                        " Please leave your message here and we will get back to you shortly.");
                    /*mail.alertMail();*/
                } else {
                    if (newUser) {
                        console.log(data.roomID);
                        AddUser.find({roomID:socket.roomID}, function(err,details){
                            console.log(details);
                        });
                        io.emit('log message', "Hello " + socket.userDetails + ", How can I help you?");

                        //Make all available admins join this users room.
                        _.each(admins, function(adminSocket) {
                            adminSocket.join(socket.roomID);
                            adminSocket.emit("New Client", {
                                roomID: socket.roomID,
                                history: history,
                                details: socket.userDetails,
                                justJoined: false
                            })
                        });
                    }
                }
            })
            .catch(function(error) {
                console.log("Line 132 : ", error)
            })

    });
    socket.on('chat message', function(data) {
        if (data.roomID === "null")
            data.roomID = socket.roomID;
        data.isAdmin = socket.isAdmin;

        let AddMsgData = new AddMsg({
            who:data.isAdmin,
            what:data.msg,
            when:data.timestamp
        });
        AddMsgData.save(data);
        console.log(AddMsgData);
        socket.broadcast.to(data.roomID).emit('chat message', data);
    });
    
   /* socket.on('chat message', function (msg) {
        console.log('message' + msg.msg + msg.User);
        io.emit('RECEIVE_MESSAGE',msg);

    });
    socket.on( 'AdminSendMsg', function (msg) {
        console.log('Admin message' + msg.msg + msg.User);
        socket.emit(msg.User).emit('USER_RECEIVE_MESSAGE', msg);
        //io.emit('USER_RECEIVE_MESSAGE',msg);

    });*/
});
const fileUpload = require('express-fileupload');

app.use(fileUpload());



//Import modules
let adminlogin = require('./module/adminlogin');
let contact = require('./module/contact');
let login = require('./module/userlogin');
let AddRoom = require('./module/AddRoom');
let Image = require('./module/Image');


// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/accomodation",{useMongoClient : true});
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

//*******************************************************
//Admin Side
//*******************************************************
//Admin Side Show Contact Data
app.get("/Showcontactdata", function (req, res) {
    console.log("contact data");
    contact.find((err, sdata) => {
        console.log('data find');
        res.send(JSON.stringify(sdata));
    });
});
//Admin Side Delete Contact Data
app.post("/Deletecontact", function (req, res) {
    console.log("delete data");
    contact.remove({_id: req.body.RId}, (err, sdata) => {
        console.log('Delete contact' + req.body.RId);
        res.send("success");
    });
});
//Admin Side Show User Data
app.get("/Getuserdata", function (req, res) {
    console.log("contact data");
    login.find((err, sdata) => {
        console.log('data find');
        res.send(JSON.stringify(sdata));
    });
});
//Admin Side Delete User Data
app.post("/Deleteuserdata", function (req, res) {
    console.log("delete data");
    login.remove({_id: req.body.RId}, (err, sdata) => {
        console.log('Delete room' + req.body.RId);
        res.send("success");
    });
});
//Admin Side show Unverified Rooms
app.get("/getRooms", function (req, res) {
    console.log("room data");
    AddRoom.find({Status:"UNVERIFIED"},(err, sdata) => {
        console.log('data find');
        res.send(sdata);
    });
    //  console.log(res);

});
//Admin Side Verify Unverified Rooms
app.post("/Verifyroom", function (req, res) {
    console.log("verify data");
    AddRoom.update({ _id: req.body.RId },{ $set: {Status:"VERIFIED"}}, (err, sdata) => {
        console.log('VERIFY room' + req.body.RId);
        res.send("success");
    });
});
//Admin Side Delete Verified and Unverified Rooms
app.post("/DeleteRoom", function (req, res) {
    console.log("delete data");
    AddRoom.remove({_id: req.body.RId}, (err, sdata) => {
        console.log('Delete room' + req.body.RId);
        res.send("success");
    });
});
//Admin Side and User Side(Find page) Show Verified Rooms
app.get("/GetVerifiedRoom", function (req, res) {
    console.log("room data");
    AddRoom.find({Status:"VERIFIED"},(err, sdata) => {
        console.log('data find');
        res.send(JSON.stringify(sdata));
    });
});
//Admin Login
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


//*******************************************************
//User Side
//*******************************************************
//User Signup
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

//User Login
app.post("/Userlogin", function (req, res) {

    login.find({email: req.body.email, password:req.body.password }, (err, sdata) => {
        if (sdata.length === 1) {
            res.send(sdata);
        } else {
            console.log('email and password is wrong')

            res.send(false);
            }
    });
    //  console.log(res);

});

//User Side Add Contact Data
app.post("/contact", function (req, res) {
    console.log("request body is", req.body);

    let data = new contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description
    });
    data.save((req, res) => {
    });
    res.send(true);
    console.log(data);
});
//User Side Show more Details about rooms
app.post("/getRoomsMoreDetails", function (req, res) {
    //console.log("room data");
    AddRoom.find({_id:req.body.RId},(err, sdata) => {
        console.log(sdata);
        res.send(JSON.stringify(sdata));
    });
    //  console.log(res);



});
//User side show room data city wise
app.post("/SearchInput", function (req, res) {
    console.log("request body is", req.body.SearchInput);
    AddRoom.find({Status:"VERIFIED",City:req.body.SearchInput},(err, sdata) => {
        console.log('data find');
        if(sdata.length===0){
            res.send(JSON.stringify(false));
        }else {

            res.send(JSON.stringify(sdata));
        }
    })
});
//User Side Add rooms Data
app.post("/AddRoom", function (req, res) {
    console.log(req.files);
    let Images1 = './img/' + req.files.Image_Name1.name;
    // Images = req.files.Image_Name1.name;
    let imageFile = req.files.Image_Name;
    let mul_newpath = new Array();
    // console.log(req.files.Image_Name);
    //console.log(imageFile.name);


    /* imageFile.mv("./public/img/"+ imageFile.name, function(err) {
         if (err) {
             return res.status(500).send(err);
         }
     });*/
    //console.log(req.files);
    let data = new AddRoom({
        _id: new mongoose.Types.ObjectId,
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
        Status: "UNVERIFIED",
        Image_name: Images1
    });
    console.log(data);
    let promise = data.save();
    //assert.ok(promise instanceof Promise);
    for (let i = 0; i < req.files.Image_Name.length; i++) {
        mul_newpath[i] = './public/img/' + imageFile[i].name;
        let Iname = './img/' + imageFile[i].name;
        //console.log(mul_newpath[i]);
        imageFile[i].mv(mul_newpath[i], function (err) {

            let image_name = imageFile[i].name;
            console.log(image_name);
            let imagedata = new Image({
                RId: data._id,    // assign the _id from the person
                ImageName: Iname,
            });
            imagedata.save(function (error, res) {
                if (error) {
                    console.log("image insert error ");
                    res.send(error);

                }
                else {
                    console.log("Multiple image inserted " + [i]);
                }
            });
        });
    }

    promise.then(function (doc) {
        res.json("true");
        //res.send("success");
    });
    if(!promise)
        res.json("false")




});



