const { Router } = require('express');

// Handlers: 

const {createUserProfesional,logicDelete, getProfesionals,getProfesional,putProfesional} = require ('../handlers/profesionalHandlers')

// Middleware: 
const postValidate = require('../middlewares/profesional/postValidate');

// Router:

const profesionalRouter = Router();

// Enrutado:

profesionalRouter.get('/', getProfesionals);

profesionalRouter.get('/:id', getProfesional);

profesionalRouter.post('/', postValidate,createUserProfesional);

profesionalRouter.put('/delete/:id', logicDelete);

profesionalRouter.put('/:id',putProfesional);

module.exports = profesionalRouter;