const { Router } = require('express');


// Handlers
const { getClientsHandler, getClientByIdHandler, createUserClient, putClient, logicDeleteHandler } = require('../handlers/clientHandlers');

//Midlewares 

const postValidate = require("../middlewares/clients/postValidate.js")

//Router
const clientRouter = Router();

//Enrutado
clientRouter.get('/', getClientsHandler);
clientRouter.get('/:id', getClientByIdHandler);
clientRouter.post('/', postValidate, createUserClient);

clientRouter.post('/', createUserClient);

clientRouter.put('/:id', putClient);
clientRouter.put('/delete/:id', logicDeleteHandler)

module.exports = clientRouter;

