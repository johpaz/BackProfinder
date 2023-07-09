// Controllers:

const { createProfesionalImage, getAllProfesionalImages, updateProfesionalImage, profesionalImageById} = require('../controllers/profesionalImagesControllers/index');

// Handlers:

const getProfesionalImages = async (req,res) => {
  try {
    const profesionalImages =  await getAllProfesionalImages();
    return res.status(200).json(profesionalImages);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const getProfesionalImage = async (req,res) => {
  const { id } = req.params;
  try {
    const profesionalImage = await profesionalImageById(id);
    return res.status(200).json(profesionalImage);
  } catch (error) {
    return res.status(404).json({error : error.message});
  }
};

const postProfesionalImage = async (req,res) => {
  const {image, description ,profesionalId} = req.body;
  try {
    const newProfesionalImage = await createProfesionalImage(image,description,profesionalId);
    return res.status(201).json(newProfesionalImage);
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

const putProfesionalImage = async (req,res) => {
  const { id } = req.params;
  const { image, description, view, profesionalId } = req.body;
  try {
    const updatedProfesionalImage = await updateProfesionalImage(id ,image, description, view , profesionalId);
    return res.status(202).json({updatedProfesionalImage});
  } catch (error) {
    return res.status(404).json({error: error.message});
  }
};

module.exports = {
  getProfesionalImages, getProfesionalImage, postProfesionalImage, putProfesionalImage
}