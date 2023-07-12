const { Category } = require('../../db');

module.exports = async (req,res,next) => {

  const { name } = req.body;

  if(name === "" || /\d/.test(name)) {
    return res.status(400).json({error:`La categoría no puede estar vacía o contener números`});
  }

  const nameCategoryFormat = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const categoryMatch = await Category.findOne({where: {name: nameCategoryFormat}});

  if(categoryMatch) {
    return res.status(400).json({error:`Ya existe una categoría llamada: ${nameCategoryFormat}`});
  };

  next();
};// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8