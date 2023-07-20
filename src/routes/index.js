const { Router } = require('express');

// Aqui se importan los routers para las diferentes rutas:

const clientRouter = require('./clientRoutes');

const ocupationsRouter = require('./ocupationsRoutes');
const ocupationspRouter = require('./ocupationspRouter')
const profesionalRouter = require('./profesionalRouter');
const pasarelaRouter = require('../pasarelapagos/rutas/pasarelaRouter')
const categoryRouter = require('./categoryRoutes');
const reviewRouter = require("./reviewRoutes");
const registerRouter = require('./registerRoutes');
const loginRouter = require('./loginRoutes');
const postProfesional = require("./postProfesionalRoutes");
const profesionalImagesRouter = require('./profesionalImagesRouter');
const countryRouter = require('./countryRoutes');
const locationRouter = require('./locationRoutes');
const loginGoogleRouter=require('./googleRoutes');
const insertImage=require('./insertImage');
const contactRouter = require('./contactRoutes');

// Router: 

const router = Router();

// Enrutado:

router.use('/cash', pasarelaRouter); // Clientes 

router.use('/client', clientRouter); // Clientes 

router.use('/profesional', profesionalRouter); //Proveedores

router.use('/category', categoryRouter); //Categorias

router.use('/ocupations', ocupationsRouter); // Ocupaciones

router.use('/ocupationsp', ocupationspRouter); // profesionales por Ocupacion

router.use("/review", reviewRouter); // Posts del cliente

router.use("/postProfesional", postProfesional) // Post del profesional

router.use('/profesional-images', profesionalImagesRouter); // Posts de las imagenes de los profesionales (detail)

router.use('/register', registerRouter); // register

router.use('/login', loginRouter); //login

router.use('/country', countryRouter); // Country

router.use('/location',locationRouter);

router.use('/auth/google', loginGoogleRouter) //google

router.use('/image', insertImage)

router.use('/relation',contactRouter); // ClientProfesionalRelation

// Esto es para mande un error en caso de que le peguen a una ruta que no hemos desarrollado -> http://localhost:3001/profesional-categories
// router.use((req, res, next) => {
//   const error = new Error(`La ruta ${req.originalUrl} con el método ${req.method} no está implementada`);
//   error.status = 404;
//   next(error);
// });

// // Middleware de manejo de errores
// router.use((error, req, res, next) => {
//   res.status(error.status || 500).json({
//     message: error.message || 'Error interno del servidor'
//   });
// });

module.exports = router;