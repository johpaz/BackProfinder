const { ProfesionalImagesPost } = require('../../db');

const createProfesionalImagesPost = async (image,description,profesionalId) => {
  if(!image || image.length === 0) throw Error (`La imagen no puede estar vacía`);
  if(!Number(profesionalId)) throw Error (`Debe asociar el post con un id válido (númerico)`);

  const newProfesionalImage = await ProfesionalImagesPost.create({ image, description });
  await newProfesionalImage.setProfesional(profesionalId);

  if(!newProfesionalImage) throw Error(`No se pudo crear el post`);

  return newProfesionalImage;
};

module.exports = createProfesionalImagesPost;