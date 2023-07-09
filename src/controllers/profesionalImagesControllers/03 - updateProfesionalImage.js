const { ProfesionalImagesPost } = require('../../db');

const updateProfesionalImage = async (id,image, description, view, profesionalId) => {
  if(!id) throw Error (`El id es obligatorio`);
  if(!isNaN(id)) throw Error (`El id es de formato uuid`);

  const profesionalImageToUpdate = await ProfesionalImagesPost.findByPk(id);
  if(!profesionalImageToUpdate) throw Error (`No se encontró el posts de id: ${id}`);

  profesionalImageToUpdate.image = image || profesionalImageToUpdate.image;
  profesionalImageToUpdate.description = description !== undefined ? description : profesionalImageToUpdate.description;
  profesionalImageToUpdate.view = view !== undefined ? view : profesionalImageToUpdate.view;
  profesionalImageToUpdate.profesionalId = profesionalId || profesionalImageToUpdate.profesionalId;

  await profesionalImageToUpdate.save();

  const updatedProfesionalImage = {
    image: profesionalImageToUpdate.image,
    description: profesionalImageToUpdate.description,
    view: profesionalImageToUpdate.view,
    profesionalId: profesionalImageToUpdate.profesionalId
  }
  // console.log(updatedProfesionalImage)
  return updatedProfesionalImage;
};

module.exports = updateProfesionalImage;