const { Premium, Profesional } = require('..//..//db');

async function updatePremiumStatus(req, res, next) {
  try {
    // Obtén los datos del cuerpo de la solicitud POST
    const { collectionStatus, preferenceId } = req.body;
    console.log(collectionStatus, preferenceId);

    // Verifica que collectionStatus sea "approved"
    if (collectionStatus !== 'approved') {
      return res.status(400).json({ error: 'El estado de colección no es aprobado.' });
    }

    // Busca el modelo Premium asociado al preferenceId
    const premium = await Premium.findOne({
      where: { preferenceId: preferenceId },
    });

    if (!premium) {
      throw new Error('El preferenciaId no fue encontrada.');
    }

    // Actualiza el estado active a true en el modelo Premium
    premium.active = true;
    await premium.save();

    // Busca el modelo Profesional asociado al ProfesionalId de la tabla Premium
    const profesional = await Profesional.findOne({
      where: { id: premium.ProfesionalId },
    });

    if (profesional) {
      // Actualiza el estado active a true en el modelo Profesional
      profesional.active = true;
      await profesional.save();
    }

    // Responde con una respuesta de éxito
    res.json({ message: 'Estados actualizados con éxito en la BD.' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  updatePremiumStatus,
};
