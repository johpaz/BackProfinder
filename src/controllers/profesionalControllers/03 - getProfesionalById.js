const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { ProfesionalImagesPost } = require('../../db');
const { PostProfesional } = require("../../db");

const cleanArrayProfesionalId = require('../../helpers/cleanArrayProfesionalById');

const getProfesionalById = async (id) => {

  const parseNumber = Number(id)
  if (!Number(id)) throw Error(`El id debe ser númerico!`);

  const profesional = await Profesional.findByPk(parseNumber, {
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
        through: { attributes: [] }
      },
      {
        model: Ocupation,
        attributes: ["id", "name", "CategoryId"],
        through: { attributes: [] }
      },
      {
        model: ProfesionalImagesPost,
        attributes: ["image", "description"],
      },
      {
        model: PostProfesional,
        attributes: ["id", "title", "category", "ocupation", "image", "content"]
      }
    ]
  });
  // console.log(profesional);
  if (!profesional) throw Error(`No existe el profesional de id: ${id}`);
  const formattedProfesional = cleanArrayProfesionalId([profesional]);
  return formattedProfesional;
};

module.exports = getProfesionalById;// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8