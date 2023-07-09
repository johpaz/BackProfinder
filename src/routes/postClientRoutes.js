const { Router } = require('express');
const { getAllPostsClientsHandler, createPostHandler } = require('../handlers/postClientsHandlers');

//Router
const postClientRouter = Router();

//Controllers

//Enrutado
postClientRouter.get("/", getAllPostsClientsHandler)
postClientRouter.post("/", createPostHandler)

module.exports = postClientRouter