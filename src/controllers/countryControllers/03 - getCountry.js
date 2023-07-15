const { Country } = require('../../db');

const getCountry = async (id) => {
  const country = await Country.findByPk(id);
  if(!country) throw Error(`No existe el país de id: ${id}`);
  return country;
};

module.exports = getCountry;