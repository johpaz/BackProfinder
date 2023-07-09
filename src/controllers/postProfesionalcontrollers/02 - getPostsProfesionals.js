const { PostProfesional } = require("../../db.js")


const getAllPostsByProfesionals = async () => {
    const posts = await PostProfesional.findAll()
    if (!posts) {
        throw Error("Hubo un error a la hora de mostrar los posteos")
    }
    return posts
}

module.exports = getAllPostsByProfesionals