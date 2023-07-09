//Controllers
const { getAllPostsByClients, getAllPostsByClientsApi, createPost } = require("../controllers/postsClientControllers/index")
//Handlers




const getAllPostsClientsHandler = async (req, res) => {
    try {
        const allPosts = await getAllPostsByClients();
        
        if (allPosts.length === 0) {
            // Si no hay datos en la base de datos, llamar a getAllPostsByClientsApi
            const apiPosts = await getAllPostsByClientsApi();
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
    const { title, image, content, clientId } = req.body
    try {
        const post = await createPost(title, image, content, clientId)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllPostsClientsHandler,
    createPostHandler
}