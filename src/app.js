const app = require('./index');

// Creamos la conexión de la bdd con el backend:

const { sequelize } = require('./db');

app.listen(3001,()=>{
    
  sequelize.sync({alter:true}) //// Luego será alter:true terminando la etapa de pruebas

  console.log(`Server on port 3001`);
});