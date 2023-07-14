const { PostProfesional } = require("../../db.js")

const createPostProfesional = async (title, category, ocupation, image, content, profesionalId) => {

    const newPost = await PostProfesional.create({ title, category, ocupation, image, content });
    await newPost.setProfesional(profesionalId);
    console.log(newPost);

    if (!newPost) throw Error(`No se pudo crear el posteo`);
    return newPost;
};

module.exports = createPostProfesional// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8