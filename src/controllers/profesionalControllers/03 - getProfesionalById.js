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
        model: PostProfesional,
        attributes: ["title", "image", "content",]
      },
      {
        model: ProfesionalImagesPost,
        attributes: ["image", "description"],
        where: {
          view: true,
        }
      }
    ]
  });
  console.log(profesional);
  if (!profesional) throw Error(`No existe el profesional de id: ${id}`);
  const formattedProfesional = cleanArrayProfesionalId([profesional]);
  return formattedProfesional;
};

module.exports = getProfesionalById;