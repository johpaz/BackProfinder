const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const {sequelize} = require("../../db");

var {config}= require('dotenv');

config();





const allEmails= async()=>{
  const allemails= await sequelize.query('SELECT email FROM "Users" ')

  const emailsdb=[];
  
  for (var i = 0; i < allemails[0].length; i++){
    const newEmail= allemails[0][i].email;
    emailsdb.push(newEmail);
  } return (emailsdb)
};


const execute= async (accessToken, refreshToken, profile, done) =>{
  const emails= await allEmails();

  const response= emails.includes(profile.emails[0].value);
  
  if (response){console.log('si hay res')
  
    done(null, profile)
  
  } else { console.log('nohay res')
    done(null, profile)
  }
};
   


const authgoogle =new GoogleStrategy ({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google"//primera autentica y por ahora lleva a home
  }, execute)


module.exports= authgoogle


