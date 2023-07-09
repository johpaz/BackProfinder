const app = require('./index');
const {DB_HOST,PORT} = process.env;


// Creamos la conexión de la bdd con el backend:

const { sequelize } = require('./db');

app.listen(PORT,()=>{
    
  sequelize.sync({force:true}) //// Luego será alter:true terminando la etapa de pruebas

  console.log(`Server on port ${PORT}`);
});
