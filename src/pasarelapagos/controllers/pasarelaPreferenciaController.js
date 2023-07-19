const mercadopago = require('mercadopago');
const { Profesional } = require('..//..//db');

const { API_KEY_PASA } = process.env;

// Configura tus credenciales de acceso de Mercado Pago
mercadopago.configure({
  access_token: `${API_KEY_PASA}`,
});

async function crearPreferencia(req, res, next) {
  try {
    const { description, price, quantity, ProfesionalId } = req.body;
    console.log('ProfesionalId:', ProfesionalId);

    const profesional = await Profesional.findOne({
      where: { id: ProfesionalId },
    });

    // Crea la preferencia de pago
    let preference = {
     // metadata: { id_shop: resOrder.data.results[0].id, notification_Url: "https://backprofinder-production.up.railway.app/cash" },
      items: [
        {
          title: description,
          unit_price: Number(price),
          quantity: Number(quantity),
          ProfesionalId: Number(profesional.id), // Asignamos el ProfesionalId de la base de datos
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
    res.json({ id });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearPreferencia,
};
