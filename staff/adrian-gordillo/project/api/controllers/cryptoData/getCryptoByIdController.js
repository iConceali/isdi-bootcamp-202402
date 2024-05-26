// api/controllers/cryptoData/getCryptoByIdController.js

import { errors, validate } from "com";
import findCryptoById from "../../services/cryptoData/findCryptoById";

const { NotFoundError } = errors;

const getCryptoByIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    validate.text(id, "crypto ID");

    const crypto = await findCryptoById(id);
    if (!crypto) {
      throw new NotFoundError("Crypto not found");
    }

    res.status(200).json(crypto);
  } catch (error) {
    next(error);
  }
};

export default getCryptoByIdController;
