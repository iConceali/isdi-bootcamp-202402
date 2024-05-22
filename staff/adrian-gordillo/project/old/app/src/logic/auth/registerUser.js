import { validate, errors } from "com";

/**
 * Registra un nuevo usuario.
 * @param {Object} userData - Los datos del usuario.
 * @param {string} userData.name - El nombre del usuario.
 * @param {string} userData.email - El correo electrónico del usuario.
 * @param {string} userData.password - La contraseña del usuario.
 * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando el registro es exitoso.
 */
const registerUser = async ({ name, email, password }) => {
  validate.text(name, "name", true);
  validate.text(email, "email", true);
  validate.password(password);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );

  if (response.status !== 201) {
    const errorData = await response.json();
    const { error, message } = errorData;

    const ErrorConstructor = errors[error] || Error;
    throw new ErrorConstructor(message);
  }
};

export default registerUser;
