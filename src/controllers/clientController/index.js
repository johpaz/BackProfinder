const { getClients, getAllClientsApi } = require("./01 - getClients.js");
const createClient = require("./02 - createClient.js");
const updateClient = require("./03 - updateClient.js");
const getClientById = require("./04 - getClientById.js");
const logicDeleteClient = require("./05 - logicDeleteClient.js");
const getClientByName = require("./06 - getClientByName.js");
const getAllClients = require("./08 - getAllClients.js");
const reverseDeleteClient= require("./09 - reverseDeleteClient.js");
const getClientsBaneados= require("./10 - getClientsBaneados.js");





module.exports = { getClients, getAllClientsApi, createClient, updateClient, getClientById, logicDeleteClient, getClientByName, getAllClients,reverseDeleteClient, getClientsBaneados}// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8