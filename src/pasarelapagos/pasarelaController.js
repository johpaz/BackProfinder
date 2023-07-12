const mercadopago = require('mercadopago');

const { API_KEY_PASA} = process.env;

// Configura tus credenciales de acceso de Mercado Pago
mercadopago.configure({
  access_token: `${API_KEY_PASA}`,
});

async function crearPreferencia(req, res, next) {
  try {
    const { description, price, quantity } = req.body;

    // Crea la preferencia de pago
    let preference = {
      items: [
        {
          title: description,
          unit_price: Number(price),
          quantity: Number(quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:5173/pasarela",
        failure: "http://localhost:5173/pasarela",
        pending: "",
      },
      auto_return: "approved", 
    };
 
    const response = await mercadopago.preferences.create(preference);
    res.json({
      id: response.body.id,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearPreferencia,
};
