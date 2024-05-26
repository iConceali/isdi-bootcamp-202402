// api/controllers/user/updateDepositController.js

import { errors } from "com";
import updateDeposit from "../../services/user/updateDeposit.js";

const { NotFoundError } = errors;

const updateDepositController = async (req, res) => {
  try {
    const { userId } = req.params; // Asegúrate de que el userId se extraiga de los parámetros de la ruta.
    const { deposit } = req.body; // Asegúrate de que el deposito se extraiga del cuerpo de la solicitud.

    await updateDeposit(userId, deposit);

    res.json({ message: "Deposit updated successfully" });
  } catch (error) {
    console.error("Error updating deposit:", error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "InternalServerError",
        message: error.message || "An unexpected error occurred",
      });
    }
  }
};

export default updateDepositController;
