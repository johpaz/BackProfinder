const { Post } = require("../../db.js")
const axios = require('axios');

const getAllPostsByClientsApi = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/postsclient.json');
      const apiData = response.data;
  
      console.log(apiData);
  
      // Mapear los datos de la API en el formato esperado por el modelo de Sequelize
      const normalizedPostClients = apiData.postClient.map(apiPost => {
        const normalizedPostClient = {
          title:apiPost.title,
          image: apiPost.image,
          content: apiPost.content,
          ClientId: apiPost.clientId,
        };
  
        return normalizedPostClient;
      });
      // console.log(normalizedOcupations);

    // Crear todas las ocupaciones de una sola vez en la base de datos
    await Post.bulkCreate(normalizedPostClients);

    console.log('Base de datos llenada exitosamente.');
  } catch (error) {
    console.error('Error al llenar la base de datos:', error.message);
  }
};
const getAllPostsByClients = async () => {
    const posts = await Post.findAll()
    if (!posts) {
        throw Error("Hubo un error a la hora de mostrar los posteos")
    }
    return posts
}

module.exports = {
    getAllPostsByClients,
    getAllPostsByClientsApi
}