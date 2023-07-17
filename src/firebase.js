require('dotenv').config();

const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: 'react-imagenes-profinder.appspot.com' // Reemplaza con el nombre del bucket correcto

});

const storage = admin.storage();

const getImageUrl = async (filePath) => {
  try {
    const bucket = storage.bucket();
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });
    console.log("Yey")
    return url;
  } catch (error) {
    console.log(`Error al obtener la url de la imagen ${error}`);
    throw error
  }
};

module.exports = { getImageUrl };