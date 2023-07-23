const { Router } = require('express');

const { userRegister}=require('../handlers/registerHandler');

const postValidate = require('../middlewares/users/postValidate');

const registerRouter = Router();

registerRouter.post('/', postValidate, userRegister)


module.exports = registerRouter;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8