const { Profesional, PostProfesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Country, Location } = require('../../db');
const { ProfesionalImagesPost } = require('../../db');

const cleanArrayProfesionalId = require('../../helpers/cleanArrayProfesionalById');

const getProfesionalById = async (id) => {
  const parseNumber = Number(id);
  if (!Number(id)) throw Error(`El id debe ser numérico!`);

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
        model: Country,
        attributes: ["id", "name"],
      },
      {
        model: Location,
        attributes: ["id", "name", "CountryId"],
      },
      {
        model: ProfesionalImagesPost,
        attributes: ["image", "description"],
      },
      {
        model: PostProfesional,
        attributes: ["id", "title", "image", "content", "softDelete"], // Incluir también la propiedad softDelete
      }
    ]
  });

  if (!profesional) throw Error(`No existe el profesional de id: ${id}`);

  // Filtrar los posts con softDelete en false
  const filteredPosts = profesional.PostProfesionals.filter((post) => !post.softDelete || post.softDelete === false);

  // Reemplazar el array original de posts con el array filtrado
  profesional.PostProfesionals = filteredPosts;

  const formattedProfesional = cleanArrayProfesionalId(profesional);
  return [formattedProfesional];
};

module.exports = getProfesionalById;
