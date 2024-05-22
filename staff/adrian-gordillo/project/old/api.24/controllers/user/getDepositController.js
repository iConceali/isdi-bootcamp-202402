// api/controllers/user/getDepositController.js

import { errors } from "com";
import getDeposit from "../../services/user/getDeposit";

const { NotFoundError } = errors;

const getDepositController = async (req, res) => {
  try {
    const userId = req.params.userId; // Asegúrate de que el ID del usuario se obtenga correctamente de los parámetros de la ruta.
    const deposit = await getDeposit(userId);

    res.json({ deposit });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "An unexpected error occurred",
        message: error.message,
      });
    }
  }
};

export default getDepositController;
