const { Router } = require('express');

// Handlers:

const { getProfesionalImages, getProfesionalImage, postProfesionalImage, putProfesionalImage } = require('../handlers/profesionalImagesHandlers');

// Middlewares

// 

// Router

const profesionalImagesRouter = Router();

// Enrutado:

profesionalImagesRouter.get('/',getProfesionalImages);

//profesionalImagesRouter.get('/:id',getProfesionalImage);

profesionalImagesRouter.post('/',postProfesionalImage);

profesionalImagesRouter.put('/:id',putProfesionalImage);

module.exports = profesionalImagesRouter;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8