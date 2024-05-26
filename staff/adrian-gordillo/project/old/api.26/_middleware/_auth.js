// api/middleware/auth.js

import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
  } catch (error) {
    next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token expirado, redirige al usuario a la página de inicio de sesión con un mensaje de error
        return res
          .status(403)
          .redirect(
            "/login?message=Your session has expired. Please log in again."
          );
      } else {
        // Token inválido, muestra un mensaje de error
        return res.status(403).send({ message: "Invalid token" });
      }
    }
    // console.log("Decoded JWT:", decoded); // Verifica que el token se decodifica correctamente
    req.user = decoded;
    next();
  });
};

export default authenticate;
