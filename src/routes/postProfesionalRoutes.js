const { Router } = require('express');
const { getAllPostsProfesionalHandler, createPostHandler,putPostProfesional,getPostProfesionalId,logicPostProfesionalHandler } = require('../handlers/postProfesionalHandlers');

// Middleware

const postValidate = require('../middlewares/postProfresional/postValidate');


//Router
const postProfesionalRouter = Router();

postProfesionalRouter.get("/:id", getPostProfesionalId  );
postProfesionalRouter.get("/", getAllPostsProfesionalHandler);
postProfesionalRouter.post("/",createPostHandler)
postProfesionalRouter.put("/:id", putPostProfesional)
postProfesionalRouter.put("/delete/:id", logicPostProfesionalHandler  )


module.exports = postProfesionalRouter