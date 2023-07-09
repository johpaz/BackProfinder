const { Router } = require('express');

const { sequelize } = require("../db");

const { loginUser }=require('../handlers/loginHandler');




const loginRouter = Router();


loginRouter.post('/', loginUser);





module.exports= loginRouter;