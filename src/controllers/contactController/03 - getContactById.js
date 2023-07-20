const { Profesional, Client } = require('../../db');
const { sequelize } = require('../../db')

const getContactById = async (id) => {
  const client = await Client.findByPk(id,{
    include: {
      model: Profesional,
      attributes: ["id", "name", "email", "image"],
      through: { attributes: [] }
    },
  });


  if(client.Profesionals.length === 0) throw Error(`No se encontró relación entre el cliente de id ${id} con profesionales`);
 
  return client;
};

module.exports = getContactById;