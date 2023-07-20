const { Profesional , Client} = require('../../db');

const updateContact = async (id,profesionalId) => {
  const client = await Client.findByPk(id);
  if(!client) throw Error(`No existe el cliente de id ${id}`);

  const profesional = await Profesional.findByPk(profesionalId);
  if(!profesional) throw Error(`No existe el profesional de id ${profesionalId}`);

  await client.removeProfesional(profesional);

  const clientWithProfesionals = await Client.findByPk(id,{
    include:{
      model:Profesional,
      attributes: ["id","name","email","image"],
      through: { attributes: []} 
    }
  });

  return clientWithProfesionals;
};

module.exports = updateContact;