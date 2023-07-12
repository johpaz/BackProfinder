const User = require('../models/User');
const passport = require('passport');
  
// Controlador para el inicio de sesión con Facebook
exports.facebookLogin = (req, res, next) => {
  passport.authenticate('facebook-token', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Ha ocurrido un error en la autenticación con Facebook.' });
    }
    if (!user) {
      return res.status(401).json({ error: 'La autenticación con Facebook ha fallado.' });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Ha ocurrido un error en la autenticación con Facebook.' });
      }
      // Generar el token de acceso y enviarlo en la respuesta
      const token = generateAccessToken(user);
      return res.status(200).json({ token });
    });
  })(req, res, next);
};

// Función para generar el token de acceso
function generateAccessToken(user) {
  // Aquí puedes generar el token de acceso según tus preferencias
  // Puedes utilizar una biblioteca como "jsonwebtoken" para generar el token
  // Puedes incluir información adicional en el token, como el ID de usuario
  // Por ejemplo:
  const token = jwt.sign({ userId: user.id }, 'tu_secreto', { expiresIn: '1h' });
  return token;
}
// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8