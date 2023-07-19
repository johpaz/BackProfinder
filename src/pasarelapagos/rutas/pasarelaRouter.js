const { Router } = require('express');

// Handlers:

const pasarelaHandler = require('../handler/pasrelaHandler');

// Middlewares en caso de usar:

// Router

const pasarelaRouter = Router();

// Enrutado:

pasarelaRouter.post('/',pasarelaHandler);


module.exports = pasarelaRouter;