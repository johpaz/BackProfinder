const nodemailer = require("nodemailer");
require('dotenv').config();
const { google } = require("googleapis")
const { ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_ID_EMAIL, CLIENT_SECRET_EMAIL, REDIRECT_URI, REFRESH_TOKEN } = process.env
const oAuth2Client = new google.auth.OAuth2({
    CLIENT_ID_EMAIL,
    CLIENT_SECRET_EMAIL,
    REDIRECT_URI
});

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const sendEmail = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: ADMIN_EMAIL,
                pass: ADMIN_PASSWORD,
                clientId: CLIENT_ID_EMAIL,
                clientSecret: CLIENT_SECRET_EMAIL,
                refreshToken: REFRESH_TOKEN,
            }
        });
        const mailOptions = {
            from: `"App Profinder" < ${ADMIN_EMAIL} >`, // sender address
            to: "chrismai1020162016@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
    }

};

module.exports = sendEmail
