const { Client, Review } = require("../../db.js");
const cleanArrayClientById = require("../../helpers/cleanArrayClientById.js");

const getClientById = async (id) => {
    const searchClient = await Client.findByPk(id, {
        include: {
            model: Review,
            attributes: ["title", "image", "content"]
        }
    })
    if(!searchClient) throw Error(`No existe un cliente de id: ${id}`);
  const cleanedInfo = cleanArrayClientById(searchClient);
  return cleanedInfo
    
};



module.exports = getClientById;

// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8