const faker = require('faker');
const generos = ['Lesbiana', 'Gay', 'Bisexual', 'Transgénero', 'Intersexual', 'Queer', 'Otro'];


const professionals = [];

for (let i = 0; i < 5; i++) {
  const name = faker.name.findName();
  const email = faker.internet.email();
  const image = faker.image.imageUrl();
  const genre = faker.random.arrayElement(generos);
  const years_exp = faker.random.number({ min: 1, max: 10 }) > 5 ? 'Más de 5 años' : faker.random.number({ min: 1, max: 5 }).toString();
  const description = faker.lorem.sentence();
  const profession = faker.name.jobTitle();

  const professional = {
    name,
    email,
    image,
    genre,
    years_exp,
    description,
    profession
  };

  professionals.push(professional);
}

console.log(professionals);
