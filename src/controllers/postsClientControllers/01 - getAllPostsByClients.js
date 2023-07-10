const { Post } = require("../../db.js")
const axios = require('axios');

const getAllPostsByClientsApi = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/postsclient.json');
      const apiData = response.data;
      // console.log(apiData);
  
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
};

const getPostsClient = () => {
  return axios.get(`https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/postsclient.json`)
    .then((response) => {
      const clientPosts = response.data.postClient;
      if(clientPosts.length === 0) throw Error(`Error con los datos en la api - no hay información`)
      const promises = clientPosts.map((post) => {
        const postFormat = {
          title: post.title,
          image: post.image,
          content: post.content,
          ClientId: post.clientId,
        };
        return Post.findOrCreate({ where: postFormat }); // si lo encuentra, lo retorna y si no, lo crea
      });

      return Promise.all(promises)
        .then(() => {
          const postClients = Post.findAll();
          if(postClients.length === 0) throw Error(`No hay posteos de los clientes`)
          return postClients
        });
    })
    .catch((error) => {
      throw Error(error.message);
    });
};

module.exports = {
    getAllPostsByClients,
    getAllPostsByClientsApi, getPostsClient
}