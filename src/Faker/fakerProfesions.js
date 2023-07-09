const faker = require('faker');

const categories = [];

for (let i = 0; i < 20; i++) {
  const name = faker.name.jobType();

  const category = {
    name,
  };

  categories.push(category);
}

console.log(categories);
