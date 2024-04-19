// api/errorHandler.js

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // Verifica si el error es de validación (proveniente de express-validator)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({ errors });
  }

  // Otros tipos de errores
  console.error(err.stack); // Loggea el stack trace del error

  // Responde al cliente con un mensaje de error genérico
  res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
};

module.exports = errorHandler;
