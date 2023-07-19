const mercadopago = require('mercadopago');

const { API_KEY_PASA} = process.env;

async function recibirNotificacion(req, res) {
    try {
      console.log(req.body);
       res.status(200);
    } catch (error) {
      console.error('Error al procesar la notificación:', error);
      res.sendStatus(500);
    }
  }

module.exports = {
   
    recibirNotificacion
  
  };
  