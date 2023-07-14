
const passport= require ('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv').config()


var  use =require ('passport');
var {config}= require('dotenv');
config();


const emails=["nathalyquiva2@gmail.com"];//base de datos que tienen los gmails

const authgoogle =new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google"//primera autentica y por ahora lleva a home
  },
  function(accessToken, refreshToken, profile, done) {
  //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //      console.log("llegue aca")
  //     return cb(err, user);
const response= emails.includes(profile.emails[0].value);

if (response){
  //console.log(response)//true
  console.log(profile)
  console.log('si hay res')
  done(null, profile)
  return profile
} else {
  console.log('nohay res')
  emails.push(profile.emails[0].value);
  done(null, profile)
}
}
    )

;

module.exports= authgoogle


