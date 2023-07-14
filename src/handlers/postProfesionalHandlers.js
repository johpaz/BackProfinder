//Controllers
const { createPostProfesional, getAllPostsByProfesionals, getAllPostsByProfesionalsApi } = require("../controllers/postProfesionalcontrollers/index")
//Handlers

const getAllPostsProfesionalHandler = async (req, res) => {
  try {
    const allPosts = await getAllPostsByProfesionalsApi();
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const createPostHandler = async (req, res) => {
  const { title, image, category, ocupation, content, profesionalId } = req.body
  try {
    const post = await createPostProfesional(title, category, ocupation, image, content, profesionalId)
    return res.status(201).json(post)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllPostsProfesionalHandler,
  createPostHandler
}// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8