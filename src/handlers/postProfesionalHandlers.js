//Controllers
const { createPostProfesional, getAllPostByProfesionals } = require("../controllers/postProfesionalcontrollers/index")
//Handlers

const getAllPostsProfesionalHandler = async (req, res) => {
    try {
        const allPosts = await getAllPostByProfesionals()
        return res.status(200).json(allPosts)
    } catch (error) {
        return res.status(204).json({ error: error })
    }
}

const createPostHandler = async (req, res) => {
    const { title, image, content, profesionalId } = req.body
    
    try {
        const post = await createPostProfesional(title, image, content, profesionalId)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllPostsProfesionalHandler,
    createPostHandler
}