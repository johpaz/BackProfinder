const { Sequelize } = require('sequelize');

// Importamos los modelos

const ProfesionalModel = require('./models/Profesional');
const OcupationModel = require('./models/Ocupation');
const ClientModel = require('./models/Client');
const PostModel = require('./models/Post');
const CategoryModel = require('./models/Category');
const PostProfesionalModel = require('./models/PostProfesional');
const UserModel = require('./models/User')
const ProfesionalImagesPostModel = require('./models/ProfesionalImagesPost');
const CountryModel = require('./models/Country');
const LocationModel = require('./models/Location');

// Credenciales

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// Instanciamos sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { logging: false });

// Definimos los modelos -> usando una función que recibe una instancia de sequelize

ProfesionalModel(sequelize);
OcupationModel(sequelize);
ClientModel(sequelize);
PostModel(sequelize);
CategoryModel(sequelize);
PostProfesionalModel(sequelize);
ProfesionalImagesPostModel(sequelize);
UserModel(sequelize);
CountryModel(sequelize);
LocationModel(sequelize);

// Destructuring de los modelos para vincularlos -> sequelize.models

const { Profesional, Category, Ocupation, Client, Post, PostProfesional, User, ProfesionalImagesPost, Country, Location } = sequelize.models;

// Relacionar los modelos n:n

Profesional.belongsToMany(Category, { through: "ProfesionalCategory" });
Category.belongsToMany(Profesional, { through: "ProfesionalCategory" });

Profesional.belongsToMany(Ocupation, { through: "ProfesionalOcupations" });
Ocupation.belongsToMany(Profesional, { through: "ProfesionalOcupations" });

// Relacionar los modelos 1:n

Client.hasMany(Post);

Post.belongsTo(Client);

Profesional.hasMany(PostProfesional);

PostProfesional.belongsTo(Profesional);

//? Esto es para el detalle del profesional (Front)
Profesional.hasMany(ProfesionalImagesPost);

ProfesionalImagesPost.belongsTo(Profesional);

//?
Category.hasMany(Ocupation);

Ocupation.belongsTo(Category);

Country.hasMany(Location);
Location.belongsTo(Country);

// Relacionar ambos modelos:

Profesional.belongsToMany(Client, { through: "ProfesionalClientRelation" });
Client.belongsToMany(Profesional, { through: "ProfesionalClientRelation" });


// Relacionar 1:1:
User.hasOne(Profesional)

module.exports = {
  sequelize,
  ...sequelize.models
}