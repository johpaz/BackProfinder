const { Router } = require("express");

const { sequelize } = require("../db");

const {
  loginUser,
  passportHandler,
  changePasswordLogin,
} = require("../handlers/loginHandler");

const putValidate = require("../middlewares/users/putValidate")

const passport = require("passport");

const loginRouter = Router();

loginRouter.post("/", loginUser);
loginRouter.put("/", putValidate, changePasswordLogin);

/* loginRouter.post('/', passport.authenticate('local',{
    successRedirect : '/', //En caso de que la autenticacion es satifactoria dirigide al dashboard, por ahora va a home
    failureRedirect: '/login', // se queda en / login si la autenticacion es insatisfactoria
    failureFlash: true //mensaje flash de error activado
})); */

module.exports = loginRouter; // 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8
