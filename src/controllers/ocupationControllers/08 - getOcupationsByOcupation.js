const { Ocupation } = require('../../db');
const { Op } = require('sequelize');
const { Profesional } = require('../../db');
const { Category } = require('../../db');

const getOcupationsByOcupation= async (name)=>{
    
    const ocupacionsName = await Ocupation.findAll({
        where:{
          name:{
            [Op.iLike] :`%${name}%`
          },
        },
      });

      if(ocupacionsName.length === 0) throw Error (`No hay profesionales con ocupaciones llamadas: ${name}`);

      if(ocupacionsName.length !== 0) { 
        
        const profesionals = await Profesional.findAll({
    include: [
      {
        model: Category,
        attributes: ["id","name"],
        through: { attributes: [] }
      },
      {
        model: Ocupation,
        attributes: ["id","name","CategoryId"],
        through: { attributes: [] }
      }
    ]
  });


const profesionalsWithThisOcupation= []


  for (let i=0; i<profesionals.length;i++){
     const ocupaciones=profesionals[i].Ocupations

     for (let j=0; j<ocupaciones.length;j++){
       
       if(ocupaciones[j].name.toUpperCase()===name.toUpperCase()){
profesionalsWithThisOcupation.push(profesionals[i])
            


        }
  }
}return profesionalsWithThisOcupation


}

}

module.exports= getOcupationsByOcupation