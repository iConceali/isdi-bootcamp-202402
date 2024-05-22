import getUserWatchlist from "../../services/user/getUserWatchlist.js";
import { errors } from "com";

const { NotFoundError } = errors;

const getUserWatchlistController = async (req, res) => {
  try {
    const { userId } = req.params; // Asegúrate de que el userId se extraiga de los parámetros de la ruta.
    const watchlist = await getUserWatchlist(userId);

    res.json({ watchlist });
  } catch (error) {
    console.error("Error retrieving user's watchlist:", error);
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

export default getUserWatchlistController;
