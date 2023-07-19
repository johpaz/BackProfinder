const {Country,Location} = require('../db');

const cleanArray = async (profesionals) => {
  const professionsWithLocation = await Promise.all(
    profesionals.map(async (profesional) => {
      const country = await Country.findByPk(profesional.CountryId);
      const location = await Location.findByPk(profesional.LocationId);
      // console.log(country);
      // console.log(location);

      const professions = profesional.Categories.map((category) => {
        const ocupations = profesional.Ocupations.filter(
          (ocupation) => ocupation.CategoryId === category.id
        );
        return {
          id: category.id,
          category: category.name,
          ocupations: ocupations.map((ocupation) => ({
            id: ocupation.id,
            name: ocupation.name,
          })),
        };
      });

      return {
        id: profesional.id,
        name: profesional.name,
        email: profesional.email,
        // password: profesional.password,
        image: profesional.image,
        rating: profesional.rating,
        genre: profesional.genre,
        years_exp: profesional.years_exp,
        phone: profesional.phone,
        ubication: {
          country: country ? country.name : null,
          location: location ? location.name : null,
        },
        professions: professions,
        posts: profesional.PostProfesionals,
        reviews: profesional.Reviews
      };
    })
  );

  return professionsWithLocation;
};

module.exports = cleanArray;
