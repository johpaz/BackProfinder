const createProfesional = require('./01 - createProfesional');
const {getAllProfesionals, getAllProfesionalApi} = require('./02 - getAllProfesionals')
const getProfesionalById = require('./03 - getProfesionalById');
const getPresionalsByName = require('./04 - getProfesionalsByName');
const updateProfesional = require('./05 - putProfesional')

module.exports = {
  createProfesional,
  getAllProfesionals,
  getAllProfesionalApi,
  getProfesionalById,
  getPresionalsByName,
  updateProfesional
};