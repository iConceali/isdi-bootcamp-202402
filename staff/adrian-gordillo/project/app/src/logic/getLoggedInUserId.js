import { util, validate } from "com";

function getLoggedInUserId() {
  if (!sessionStorage.token) {
    console.error("No token found in sessionStorage");
    return null;
  }

  validate.token(sessionStorage.token); // Asumiendo que esto lanza una excepción si el token no es válido

  const { sub: userId } = util.extractJwtPayload(sessionStorage.token);
  return userId;
}

export default getLoggedInUserId;
