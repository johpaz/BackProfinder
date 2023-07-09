const { Router } = require('express');
const { getAllPostsProfesionalHandler, createPostHandler } = require('../handlers/postProfesionalHandlers');

//Router
const postProfesionalRouter = Router();

postProfesionalRouter.get("/", getAllPostsProfesionalHandler);
postProfesionalRouter.post("/", createPostHandler)


module.exports = postProfesionalRouter