// api/controllers/user/removeCryptoFromWatchlistController.js

import removeCryptoFromWatchlist from "../../services/user/removeCryptoFromWatchlist.js";
import { errors } from "com";

const { NotFoundError } = errors;

const removeCryptoFromWatchlistController = async (req, res) => {
  try {
    const { userId, cryptoId } = req.params; // Asume que ambos IDs vienen como parámetros de la ruta.
    await removeCryptoFromWatchlist(userId, cryptoId);

    res.json({ message: "Crypto removed from watchlist successfully" });
  } catch (error) {
    console.error("Error removing crypto from watchlist:", error);
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

export default removeCryptoFromWatchlistController;
