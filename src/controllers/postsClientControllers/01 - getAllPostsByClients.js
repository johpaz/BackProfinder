const { Post } = require("../../db.js")


const getAllPostsByClients = async () => {
    const posts = await Post.findAll()
    if (!posts) {
        throw Error("Hubo un error a la hora de mostrar los posteos")
    }
    return posts
}

module.exports = getAllPostsByClients