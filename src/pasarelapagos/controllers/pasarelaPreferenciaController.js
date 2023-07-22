const mercadopago = require('mercadopago');
const { Profesional, Premium } = require('../../db');

const { API_KEY_PASA } = process.env;

mercadopago.configure({
  access_token: `${API_KEY_PASA}`,
});

async function crearPreferencia(req, res, next) {
  try {
    const { description, price, quantity, ProfesionalId } = req.body;

    const profesional = await Profesional.findOne({ 
      where: { id: ProfesionalId }, 
    });
    

    if (!profesional) {
      throw new Error('El ProfesionalId proporcionado no es válido.');
    }

    // Crea la orden en la base de datos Premium
    const nuevaOrden = await Premium.create({
      description: description,
      price: price,
      quantity: quantity,
      ProfesionalId: ProfesionalId,
    });

    const idCompra = nuevaOrden.getDataValue('idCompra');
    // Crea la preferencia de pago
    let preference = {
     metadata: { id_shop: idCompra },
      notification_url: 'https://apipokemon-ashen.vercel.app/',
      items: [
        {
          description: description,
          unit_price: Number(price),
          quantity: Number(quantity),
          ProfesionalId: Number(ProfesionalId),
        },
       ], back_urls : {
          success: `https://profinder-client.vercel.app/dashboardSuppliers`,
          failure: 'https://profinder-client.vercel.app/pasarela',
          pending: '',
        }, 
        auto_return: 'approved',
        
      
    };

    // Crea la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    console.log(response);
    const preferenceId = response.body.id;
      
    // Actualiza el estado de la fila "Premium" con la información de la preferencia de pago
    await Premium.update(
      { preferenceId },
      { where: { idCompra } }, // Utilizamos el campo correcto "idCompra" en lugar de "premiumId"
    );
 
    // Devuelve la respuesta con o sin el preferenciaId, según corresponda
    if (preferenceId) {
      res.json({ preferenceId, idCompra});
    } else {
      res.json({ idCompra });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearPreferencia,
};

