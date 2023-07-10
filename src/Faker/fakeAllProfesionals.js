const faker = require('faker');
const { Profesional, Profesion, Categoria } = require('..//db'); // Importa los modelos de Sequelize

const generateProfesionales = async () => {
  const profesionales = [];
  // Obtiene todas las profesiones y categorías de la base de datos
  const profesiones = await Profesion.findAll();
  const categorias = await Categoria.findAll();

  for (let i = 0; i < 5; i++) {
    const profesional = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.imageUrl(),
      genre: faker.random.arrayElement(['male', 'female']),
      years_exp: faker.random.number({ min: 1, max: 3 }).toString(),
      profesion: faker.random.arrayElement(profesiones).name, // Obtiene una profesión aleatoria de la lista
      description: faker.lorem.sentence(),
      categoria: faker.random.arrayElement(categorias).name // Obtiene una categoría aleatoria de la lista
    };

    profesionales.push(profesional);
  }

  return profesionales;
};

// Ejecuta la función asincrónica para generar los profesionales
generateProfesionales().then((profesionales) => {
  console.log(JSON.stringify(profesionales, null, 2));
}).catch((error) => {
  console.error(error.message);
});