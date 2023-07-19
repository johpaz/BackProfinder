const createPostProfesional = require("./01 - createPostProfesional");
const {getAllPostsByProfesionals,getAllPostsByProfesionalsApi, } = require("./02 - getPostsProfesionals");
const updatePostProfesional = require('./03 - putPostsProfesionals')
const getPostProfesionalById = require('./04- getPostsProfesionalsById')

module.exports = { createPostProfesional, getAllPostsByProfesionals,getAllPostsByProfesionalsApi,updatePostProfesional,getPostProfesionalById }