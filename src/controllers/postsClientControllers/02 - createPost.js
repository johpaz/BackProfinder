const { Post } = require("../../db.js")


const createPost = async (title, image, content, clientId) => {

    const newPost = await Post.create({ title, image, content });
    await newPost.setClient(clientId);

    if (!newPost) throw Error(`No se pudo crear el posteo`);
    return newPost;
};

module.exports = createPost// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8