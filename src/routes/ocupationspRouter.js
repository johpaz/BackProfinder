const { Router } = require('express');

// Handlers:

const {getProfesionals
} = require('../handlers/ocupationspHandlers');



const ocupationspRouter = Router();

ocupationspRouter.get('/',getProfesionals);

module.exports = ocupationspRouter;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8