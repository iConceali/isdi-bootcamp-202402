// api/controllers/user/addCryptoToWatchlistController.js

import addCryptoToWatchlist from "../../services/user/addCryptoToWatchlist.js";
import { errors } from "com";

const { NotFoundError, DuplicityError } = errors;

const addCryptoToWatchlistController = async (req, res) => {
  try {
    const { userId, cryptoId } = req.params; // Asume que ambos IDs vienen como parámetros de la ruta.
    await addCryptoToWatchlist(userId, cryptoId);

    res.json({ message: "Crypto added to watchlist successfully" });
  } catch (error) {
    console.error("Error adding crypto to watchlist:", error);
    if (error instanceof NotFoundError || error instanceof DuplicityError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({
        error: "InternalServerError",
        message: error.message || "An unexpected error occurred",
      });
    }
  }
};

export default addCryptoToWatchlistController;
