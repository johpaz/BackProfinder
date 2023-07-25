const { Router } = require('express');
const { getAllReviewsHandler, createReviewHandler } = require('../handlers/reviewsHandlers');

// Middlewares

const postValidate = require('../middlewares/reviews/postValidate')

//Router
const reviewRouter = Router();

//Enrutado
reviewRouter.get("/", getAllReviewsHandler)
reviewRouter.post("/", postValidate, createReviewHandler)

module.exports = reviewRouter// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8