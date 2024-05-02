// api/middleware/auth.js

import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    console.log("Decoded JWT:", decoded); // Verifica que el token se decodifica correctamente
    req.user = decoded;
    next();
  });
};

export default authenticate;
