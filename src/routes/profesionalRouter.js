const { Router } = require('express');

// Handlers: 

const {createUserProfesional,logicDelete, getProfesionals,getProfesional,putProfesional} = require ('../handlers/profesionalHandlers')

// Middleware: 

const postValidate = require('../middlewares/profesional/postValidate');
const putValidate = require('../middlewares/profesional/putValidate');

// Router:

const profesionalRouter = Router();

// Enrutado:

profesionalRouter.get('/', getProfesionals);

profesionalRouter.get('/:id', getProfesional);

profesionalRouter.post('/', postValidate,createUserProfesional);

profesionalRouter.put('/delete/:id', logicDelete);

profesionalRouter.put('/:id',putValidate,putProfesional);

module.exports = profesionalRouter;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8