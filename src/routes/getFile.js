const { Router } = require('express');
const { sequelize } = require("../db");
const {DocumentsProfesional} = require("../db")
const { Profesional } =require("../db")




const getFile= Router();



const getDoc=  async(req,res, file)=>{
try {
    const {id}=req.params;
    
    const fileProf= await Profesional.findByPk(id,{include: [{
    model: DocumentsProfesional,
    attributes: ["id", "name",  "document"]
 }]})


    console.log(fileProf)

    const filemimetype=file.mimetype
    const fileName= file.originalname

    const extractedData = fileProf.DocumentsProfesionals.map((item) => {
        const { name, document} = item;
        return { name,document};
       });
     
       res.status(200).json(extractedData)
    }
     catch (error) {
        res.status(400).json({ error: error.message })
    }
}

getFile.get('/:id', getDoc);//En este caso el id es del profesional




module.exports= getFile;

