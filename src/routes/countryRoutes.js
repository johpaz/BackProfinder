const { Router } = require('express');

// Handlers:

const { getAllCountries, postCountry} = require('../handlers/countryHandlers');


// Router

const countryRouter = Router();

// Enrutado:

countryRouter.get('/',getAllCountries);
countryRouter.post('/',postCountry);

module.exports = countryRouter;