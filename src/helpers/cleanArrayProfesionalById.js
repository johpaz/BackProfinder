const { Country } = require('../db');
const { Location } = require('../db');

const cleanArrayProfesionalId = async (profesionalId) => {

  const cleanedProfesionals = await Promise.all(
    profesionalId.map(async (profesional) => {
      const country = await Country.findByPk(profesional.CountryId);
      const location = await Location.findByPk(profesional.LocationId);
      const professions = profesional.Categories.map((category) => {
        const ocupations = profesional.Ocupations.filter((ocupation) => ocupation.CategoryId === category.id);
        return {
          id: category.id,
          category: category.name,
          ocupations: ocupations.map((ocupation) => ({
            id: ocupation.id,
            name: ocupation.name
          }))
        };
      });

      return {
        id: profesional.id,
        name: profesional.name,
        email: profesional.email,
        image: profesional.image,
        genre: profesional.genre,
        rating: profesional.rating,
        years_exp: profesional.years_exp,
        phone: profesional.phone,
        ubication: {
          country: country ? country.name : null,
          location: location ? location.name : null,
        },
        professions: professions,
        jobimages: profesional.ProfesionalImagesPosts,
        posts: profesional.PostProfesionals,
        reviews: profesional.Reviews
      };
    })
  );

  return cleanedProfesionals;
};

module.exports = cleanArrayProfesionalId;

/*
const { Country } = require('../db');
const { Location } = require('../db');

const cleanArrayProfesionalId = async (profesional) => {
  const country = await Country.findByPk(profesional.CountryId);
  const location = await Location.findByPk(profesional.LocationId);
  const professions = profesional.Categories.map((category) => {
    const ocupations = profesional.Ocupations.filter((ocupation) => ocupation.CategoryId === category.id);
    return {
      id: category.id,
      category: category.name,
      ocupations: ocupations.map((ocupation) => ({
        id: ocupation.id,
        name: ocupation.name
      }))
    };
  });

  return {
    id: profesional.id,
    name: profesional.name,
    email: profesional.email,
    image: profesional.image,
    genre: profesional.genre,
    rating: profesional.rating,
    years_exp: profesional.years_exp,
    phone: profesional.phone,
    ubication: {
      country: country ? country.name : null,
      location: location ? location.name : null,
    },
    professions: professions,
    jobimages: profesional.ProfesionalImagesPosts,
    posts: profesional.PostProfesionals
  };
};

module.exports = cleanArrayProfesionalId;

*/ 