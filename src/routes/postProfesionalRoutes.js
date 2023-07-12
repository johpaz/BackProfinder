const { Router } = require('express');
const { getAllPostsProfesionalHandler, createPostHandler } = require('../handlers/postProfesionalHandlers');

// Middleware

const postValidate = require('../middlewares/postProfresional/postValidate')

//Router
const postProfesionalRouter = Router();

postProfesionalRouter.get("/", getAllPostsProfesionalHandler);
postProfesionalRouter.post("/",postValidate,createPostHandler)


module.exports = postProfesionalRouter// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8