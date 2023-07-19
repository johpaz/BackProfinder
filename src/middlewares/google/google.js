
const passport= require ('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv').config()

const {sequelize} = require("../../db");


var  use =require ('passport');
var {config}= require('dotenv');
const { all } = require('../../routes');
// const { response } = require('../..');
config();





const allEmails= async()=>{
  const allemails= await sequelize.query('SELECT email FROM "Users" ')

console.log(allemails[0])




  const emailsdb=[];
  for (var i = 0; i < allemails[0].length; i++){
            const newEmail= allemails[0][i].email
            //console.log(newEmail)
           emailsdb.push(newEmail);
  
        
        }return(emailsdb)
  
   
  
    }

  

;


//console.log(allemails[0])




  


  // const emails= (arrayEmails(allEmails))
  // console.log(emails)

 
    //  console.info(emailsdb)





// // const emails= async ()=>{
//   const allEmails=  async ()=>{ await sequelize.query('SELECT email FROM "Users" ')}
// console.log(allEmails)
// // return  allEmails
// // };


const emails=["nathalyquiva@gmail.com", "jdmontanez3@gmail.com"];//base de datos que tienen los gmails




const authgoogle =new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google"//primera autentica y por ahora lleva a home
  },
  function(accessToken, refreshToken, profile, done) {
  //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //      console.log("llegue aca")
  //     return cb(err, user);



  //const allEmails=  sequelize.query('SELECT email FROM "Users" ');

const response= emails.includes(profile.emails[0].value);
console.log('estoy aca ')
console.log(allEmails())
//console.log(allemails())
console.log(response)
if (response){
  console.log(response)
  const isEmailBd= emails.includes(profile.emails[0].value)
console.log(isEmailBd)
  console.log('si hay res')
  done(null, isEmailBd)//profile)

} else {
  console.log('nohay res')
  // emails.push(profile.emails[0].value);
  done(null, profile)
}
}
    )

;

module.exports= authgoogle


