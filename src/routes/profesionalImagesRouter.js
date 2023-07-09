const { Router } = require('express');

// Handlers:

const { getProfesionalImages, getProfesionalImage, postProfesionalImage, putProfesionalImage } = require('../handlers/profesionalImagesHandlers');

// Middlewares

// 

// Router

const profesionalImagesRouter = Router();

// Enrutado:

profesionalImagesRouter.get('/',getProfesionalImages);

profesionalImagesRouter.get('/:id',getProfesionalImage);

profesionalImagesRouter.post('/',postProfesionalImage);

profesionalImagesRouter.put('/:id',putProfesionalImage);

module.exports = profesionalImagesRouter;