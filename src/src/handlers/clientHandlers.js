const sequelize = require('sequelize');
// usersHandlers.js
const { Profesional, Client } = require('../db');
const { getClients,getAllClientsApi, createClient, updateClient, getClientById, logicDeleteClient } = require("../controllers/clientController/index")
// Resto del código...


const getClientsHandler = async (req, res) => {
  try {
    let clients = await getClients();

    if (!clients || clients.length === 0) {
      // No hay clientes en la base de datos, llamar a la función para obtener los clientes de la API y llenar la base de datos
      await getAllClientsApi();

      // Obtener los clientes actualizados
      clients = await getClients();
    }

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(204).json({ error: 'Error al obtener los clientes' });
  }
};


const getClientByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const clientFound = await getClientById(id)
    // Lógica para obtener un usuario por su ID

    res.status(200).json({clientFound });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};



const createUserClient = async (req, res) => {
  const { name, email, phone, image, genre, description, ubication } = req.body;
  try {
    
    const clientCreated = await createClient(name, email, phone, image, genre, description,ubication)

    //constante donde guardo lo que retorna el controller createClient y envio la respuesta

    return res.status(201).json(clientCreated);
  } catch (error) {
    //En caso de que falten datos, se envia la respuesta con un mensaje de error
    return res.status(500).json({ error: error.message });
  }
};
const putClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, image, genre, description } = req.body;
  //Guardamos la info de req.body en un objeto, para trabajar mas organizado cuando la funcion reciba el id y el mismo objeto.
  const clientInfo = { name, email, image, genre, description }
  try {
    const updatedClient = await updateClient(clientInfo, id)


    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const logicDeleteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dbProf = await logicDeleteClient(id);

    if (dbProf.length === 0) { res.send("The indicated Profesional's id has not been found") }
    else res.status(200).json(dbProf)

  } catch (error) {
    res.status(400).json({ error: error.message })

  }
}

module.exports = {
  getClientsHandler,
  getClientByIdHandler,
  putClient,
  createUserClient,
  logicDeleteHandler
};
