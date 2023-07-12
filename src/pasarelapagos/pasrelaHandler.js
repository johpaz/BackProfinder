const pasarelaController = require('./pasarelaController');

function pasarelaHandler(req, res, next) {
  pasarelaController.crearPreferencia(req, res, next);
}

module.exports = pasarelaHandler;