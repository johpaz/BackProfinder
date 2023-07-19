const { PostProfesional } = require("../../db.js")
const axios = require('axios');

const getAllPostsByProfesionalsApi = () => {
    return axios.get('https://raw.githubusercontent.com/johpaz/ApiProfinder/master/src/json/postsProfesionals.json')
    .then((response)=>{
      const postProfesional = response.data.postprofesional;
      const promises = postProfesional.map((post)=>{
        const postFormat = {
          title: post.title,
          image: [post.image],
          content: post.content, 
          ProfesionalId: post.profesionalId,
        };
        return PostProfesional.findOrCreate({where:postFormat})
      });

      return Promise.all(promises)
      .then(()=>{
        const postProfesionals = PostProfesional.findAll();
        console.log("Base de datos llenada exitosamente con los posts de los profesionales.")
        return postProfesionals
      });
    })
    .catch((error)=>{
      throw Error (error.message)
    })
  };
  

  const getAllPostsByProfesionals = async () => {
    const posts = await PostProfesional.findAll({
        include: [
            {
                model: Category,
                as: 'categories', // Así se debe llamar el alias de la relación en el modelo PostProfesional
                through: { attributes: ["name"] }, // Si solo quieres los campos de la tabla intermedia, deja esto así
            },
            {
                model: Occupation,
                as: 'occupations', // Así se debe llamar el alias de la relación en el modelo PostProfesional
                through: { attributes: ["name"] }, // Si solo quieres los campos de la tabla intermedia, deja esto así
            },
        ],
    });

    if (!posts) {
        throw new Error("Hubo un error a la hora de mostrar los posteos");
    }

    return posts;
};


module.exports = {
    getAllPostsByProfesionals,
    getAllPostsByProfesionalsApi
}