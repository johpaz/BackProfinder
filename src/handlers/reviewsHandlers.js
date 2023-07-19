//Controllers
const { getAllPostsByClients, getAllPostsByClientsApi, createPost, getPostsClient, createReview } = require("../controllers/reviewsControllers/index")

//Handlers

const getAllReviewsHandler = async (req, res) => {
    try {
        const reviews = await getReviews();
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(204).json({ error: error.message });
    };
};


const createReviewHandler = async (req, res) => {
    const { content, clientId, rating, profesionalId } = req.body
    try {
        const post = await createReview(content, clientId, rating, profesionalId)
        return res.status(201).json(post)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllReviewsHandler,
    createReviewHandler
}// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8