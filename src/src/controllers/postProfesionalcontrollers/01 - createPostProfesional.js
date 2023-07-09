const { PostProfesional } = require("../../db.js")

const createPostProfesional = async (title, image, content, profesionalId) => {

    const newPost = await PostProfesional.create({ title, image, content });
    await newPost.setProfesional(profesionalId);
    console.log(newPost);

    if (!newPost) throw Error(`No se pudo crear el posteo`);
    return newPost;
};

module.exports = createPostProfesional