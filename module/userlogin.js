let express = require("express");
let mongoose = require("mongoose");
let axios = require("axios");
let app = express();
let Schema = mongoose.Schema;
let loginSchema =  new Schema({
    email: String,
    password:String,
});

/*loginSchema.pre('save', function(next){
    console.log('pre');
    let user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            console.log(user.password);

            next();
        });
    });
});*/

let login =  mongoose.model('login',loginSchema);
module.exports = login;

