const { PostProfesional } = require("../../db.js")


const createPostProfesional = async (title,  image, content, ProfesionalId,category, ocupation,) => {
  console.log(title,ProfesionalId); 
  
  
  const postProfesionalFormat= {
    title,
    image,
    content,
    ProfesionalId,
    category,
    ocupation
  }; 

  console.log(postProfesionalFormat);
  
  const newPostProfesional = await PostProfesional.create(postProfesionalFormat); //Creo el profesional

  

  if(!newPostProfesional) throw EPostrror (`No se pudo crear el profesional llamado: ${title}`);

  return {
    id: newPostProfesional.id,
    title: newPostProfesional.title,
    content:newPostProfesional.content,
    ProfesionalId: newPostProfesional.ProfesionalId,
    category: newPostProfesional.category,
    ocupation: newPostProfesional.ocupation
  };
    
}; 

module.exports = createPostProfesional// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8