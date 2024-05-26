// api/services/cryptoPrices/findCryptoById.js

import CryptoPrice from "../../models/CryptoPrice.js";
import { errors, validate } from "com";

const { NotFoundError, ContentError } = errors;

const findCryptoById = async (id) => {
  try {
    validate.text(id, "crypto ID");

    const crypto = await CryptoPrice.findById(id);
    if (!crypto) {
      throw new NotFoundError("Crypto not found");
    }
    return crypto;
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ContentError) {
      throw error;
    } else {
      throw new ContentError("Failed to find crypto by ID");
    }
  }
};

export default findCryptoById;
