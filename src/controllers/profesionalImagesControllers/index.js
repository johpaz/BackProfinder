const createProfesionalImage = require('./01 - createProfesionalImage');
const {getAllProfesionalImages, getAllProfesionalImagesApi} = require('./02 - getAllProfesionalImages');
const updateProfesionalImage = require('./03 - updateProfesionalImage');
const profesionalImageById = require('./04 - getProfesionalImageById');

module.exports = {
  createProfesionalImage,
  getAllProfesionalImages,
  getAllProfesionalImagesApi,
  updateProfesionalImage,
  profesionalImageById
}