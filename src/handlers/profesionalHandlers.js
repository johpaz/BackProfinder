// Controllers:

const {searchUserProfesional,getProfById} = require ("../controllers/profesionalControllers/profesionalsControllers")
const { createProfesional, getAllProfesionals,getAllProfesionalApi, getProfesionalById, getPresionalsByName,updateProfesional} = require('../controllers/profesionalControllers/index');
// const getProfesionals = async (req, res) => {
//   const {name}= req.query

//   try {
    
//     const names= name?  await searchUserProfesional(name): await getAllProfesionals();

//    if(names.length===0) {res.send("The indicated Profesional's name has not been found")}
//    else res.status(200).json(names)

//   } catch (error) {
//      res.status(400).json({ error: error.messages});
//   }
// };
  
// Handlers: 

const getProfesionals = async (req,res) => {
    const { name } = req.query;
    try {
      const profesionals = name ? await getPresionalsByName(name) : await getAllProfesionals();
      return res.status(200).json(profesionals);
    } catch (error) {
      return res.status(404).json({error: error.message});
    }
  };

  const getProfesional = async (req,res) => {
    const { id } = req.params;
    try {
      const profesional = await getProfesionalById(id);
      return res.status(200).json(profesional);
    } catch (error) {
      return res.status(404).json({error: error.message})
    };
  };

  const logicDelete=async( req,res)=>{
    const { id } = req.params;
    try {
      const dbProf= await getProfById(id);
      
      if(dbProf.length===0) {res.send("The indicated Profesional's id has not been found")}
      else res.status(200).json(dbProf)
  
    } catch (error) {
      res.status(400).json({error: error.message})
    };
  };

  const createUserProfesional = async (req, res) => {
    const { name, email,password, image, genre, years_exp, categories, ocupations, phone, ubication } = req.body;
    
    try {
      const newUser = await createProfesional(name,email,password,image,genre,years_exp, categories,ocupations, phone, ubication);
      return res.status(201).json({ profesionalCreated: newUser });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    };
  };

  const putProfesional = async (req,res) => {
    const { id } = req.params;
    console.log(id);
    const { name, email,password, image, genre, years_exp, description, categories, ocupations, phone, ubication } = req.body;
    try {
      const updatedProfesional = await updateProfesional(id, name, email, password, image, genre, years_exp, description, categories, ocupations, phone, ubication);
      return res.status(200).json(updatedProfesional);
    } catch (error) {
      return res.status(404).json({error: error.message});
    }
  };

module.exports = { 
    createUserProfesional,
    getProfesionals, getProfesional,
    logicDelete, putProfesional
};// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8