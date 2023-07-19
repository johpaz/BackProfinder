const { Review } = require("../../db.js")


const createReview = async (content, clientId, rating, profesionalId) => {

    const newReview = await Review.create({ content, rating, });
    await newReview.setClient(clientId);
    await newReview.setProfesional(profesionalId)

    if (!newReview) throw Error(`No se pudo crear la opinion.`);
    return newReview;
};

module.exports = createReview// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8