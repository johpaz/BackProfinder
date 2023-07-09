// Controllers:
const axios = require('axios');
const {getAllOcupations, getOcupationsByName, createOcupation, getOcupationById,updateOcupation, getProfesionalsByOcupation,getAllProfesionals} = require('../controllers/ocupationControllers/index');

// Handlers:




const getAllOcupationApi = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/ocupation.json');
    const apiData = response.data;

    console.log(apiData);

    // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
    const normalizedOcupations = apiData.profesiones.map(apiOcupation => {
      const normalizedOcupation = {
        id: apiOcupation.id,
        name: apiOcupation.nombre.trim().slice(0, 40),
        categoryId: apiOcupation.idcategoria,
      };

      return normalizedOcupation;
    });

    console.log(normalizedOcupations);

    // Crear todas las ocupaciones de una sola vez en la base de datos
    await Ocupation.bulkCreate(normalizedOcupations);

    console.log('Base de datos llenada exitosamente.');
  } catch (error) {
    console.error('Error al llenar la base de datos:', error.message);
  }
};



const getOcupations = async (req,res) => {
  const { name } = req.query;
  try {
    const ocupations = name ? await getOcupationsByName(name) : await getAllOcupations();
    return res.status(200).json(ocupations);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const getOcupation = async (req,res) => {
  const { id } = req.params;
  try {
    const ocupation = await getOcupationById(id);
    return res.status(200).json(ocupation) 
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const postOcupation = async (req,res) => {
  const {name,categoryId} = req.body;
  try {
    const newOcupation = await createOcupation(name,categoryId);
    return res.status(201).json(newOcupation);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
  // return res.status(200).json({DIY: "En esta ruta se creará una ocupación"})
};

const putOcupation = async (req,res) => {
  const { id } = req.params;
  const { name , categoryId} = req.body;
  try {
    const updatedOcupation = await updateOcupation(id,name,categoryId);
    return res.status(200).json(updatedOcupation);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};






module.exports = {
  getOcupations, getOcupation, postOcupation, putOcupation,
}