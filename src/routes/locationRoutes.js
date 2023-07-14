const { Router } = require('express');

// Handlers:

const {getAllLocations, postLocation} = require('../handlers/locationHandlers')

// Middleware

const postValidate = require('../middlewares/location/postValidate');

// Router

const locationRouter = Router();

// Enrutado:

locationRouter.get('/',getAllLocations);

locationRouter.post('/',postValidate,postLocation);

module.exports = locationRouter;