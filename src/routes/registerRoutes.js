const { Router } = require('express');

const { userRegister}=require('../handlers/registerHandler');




const registerRouter = Router();

registerRouter.post('/', userRegister)





module.exports = registerRouter;