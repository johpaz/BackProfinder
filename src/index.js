// Dependencias:

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

//Para mensaje flash e inicios de sesion:
const flash = require('connect-flash');
const session= require ('express-session');
const passport= require ('passport')
//const {passportHandler}=require('../src/handlers/loginHandler');

//passportHandler(passport);//al pendiente de si es passportHandler(passport)
//inicializo flash e inicio de session:

// Router

const mainRouter = require('./routes/index');


// Server

const server = express();


// recuperacion de las sesiones, para evitar vulnerabilidades
server.use(cors());
server.use(session({
    secret:'secret',
   resave: false,
   saveUninitialized: false
}));



server.use(flash())


server.use(morgan('dev'));

server.use(express.json());



//sesiones
server.use(passport.initialize());
server.use(passport.session());




// Conexión a las rutas:
server.use('/', mainRouter)


//Configuracion autenticacion google
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:5173/auth/google/"//primera autentica y por ahora lleva a home
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         console.log("llegue aca")
//       return cb(err, user);
//     });
//   }
// ));



module.exports = server;