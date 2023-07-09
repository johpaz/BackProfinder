//Controllers
const { createPostProfesional, getAllPostsByProfesionals,getAllPostsByProfesionalsApi} = require("../controllers/postProfesionalcontrollers/index")
//Handlers

const getAllPostsProfesionalHandler = async (req, res) => {
    try {
        const allPosts = await getAllPostsByProfesionals();
        
        if (allPosts.length === 0) {
            // Si no hay datos en la base de datos, llamar a getAllPostsByProfesionalsApi
            const apiPosts = await getAllPostsByProfesionalsApi();
            return res.status(200).json(apiPosts);
        } else {
            // Si hay datos en la base de datos, devolver los datos existentes
            return res.status(200).json(allPosts);
        }
    } catch (error) {
        return res.status(204).json({ error: error });
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