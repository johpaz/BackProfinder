const { PostProfesional } = require("../../db.js")
const axios = require('axios');

const getAllPostsByProfesionalsApi = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/postsProfesionals.json');
      const apiData = response.data;
  
      //console.log(apiData);
  
      // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
      const normalizedPostProfesionals = apiData.postprofesional.map(apiPost => {
        return {
          title: apiPost.title,
          image: apiPost.image,
          content: apiPost.content,
          ProfesionalId: apiPost.profesionalId,
        };
      });
  
      console.log(normalizedPostProfesionals);
  
      // Crear todas las ocupaciones de una sola vez en la base de datos
      await PostProfesional.bulkCreate(normalizedPostProfesionals);
  
      console.log('Base de datos llenada exitosamente.');
    } catch (error) {
      console.error('Error al llenar la base de datos:', error.message);
    }
  };
  

const getAllPostsByProfesionals = async () => {
    const posts = await PostProfesional.findAll()
    if (!posts) {
        throw Error("Hubo un error a la hora de mostrar los posteos")
    }
    return posts
}

module.exports = {
    getAllPostsByProfesionals,
    getAllPostsByProfesionalsApi
}