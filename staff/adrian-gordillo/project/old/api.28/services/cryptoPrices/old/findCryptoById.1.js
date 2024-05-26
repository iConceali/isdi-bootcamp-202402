// api/services/cryptoPrices/findCryptoById.js

import CryptoPrice from "../../models/CryptoPrice.js";
import { errors, validate } from "com";

const { NotFoundError } = errors;

const findCryptoById = async (id) => {
  validate.text(id, "crypto ID");

  const crypto = await CryptoPrice.findById(id);
  if (!crypto) {
    throw new NotFoundError("Crypto not found");
  }
  return crypto;
};

export default findCryptoById;
