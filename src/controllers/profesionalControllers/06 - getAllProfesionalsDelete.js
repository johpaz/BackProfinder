const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Country } = require('../../db');
const { Location } = require('../../db');
const { PostProfesional } = require("../../db")
const { Review } = require("../../db")
const cleanArray = require('../../helpers/cleanArrayProfesionals');

const axios = require('axios');


const getAllProfesionalsDelete = async () => {
   
    let profesionals = await Profesional.findAll()

    return profesionals}



module.exports = {getAllProfesionalsDelete };
