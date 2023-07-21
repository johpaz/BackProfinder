const { Profesional, Client } = require('../../db');

const createContact = async  (id,profesionalId) => {
  const client = await Client.findByPk(id);
  if(!client) throw Error(`No existe el cliente de id ${id}`);

  const profesional = await Profesional.findByPk(profesionalId);
  if(!profesional) throw Error(`No existe el profesional de id ${profesionalId}`);

  await client.addProfesional(profesional);

  const clientWithProfesionals = await Client.findByPk(id,{
    include:{
      model:Profesional,
      attributes: ["id","name","email","image","rating"],
      through: { attributes: []} 
    }
  });
  return clientWithProfesionals;
};

module.exports = createContact;