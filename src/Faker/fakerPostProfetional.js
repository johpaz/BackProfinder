const faker = require('faker');

const posts = [];

for (let i = 0; i < 10; i++) {
  const post = {
    title: faker.lorem.sentence(),
    image: faker.image.imageUrl(),
    content: faker.lorem.paragraph()
  };

  posts.push(post);
}

console.log(posts);
