// api/services/cryptoData/findCryptoById.js

import CryptoData from "../../models/CryptoData.js";
import { errors, validate } from "com";

const { NotFoundError, ContentError } = errors;

const findCryptoById = async (id) => {
  try {
    validate.text(id, "crypto ID");

    const crypto = await CryptoData.findById(id).lean();
    if (!crypto) {
      throw new NotFoundError("Crypto not found");
    }
    const { _id, __v, ...rest } = crypto;
    return {
      id: _id.toString(),
      ...rest,
    };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ContentError) {
      throw error;
    } else {
      throw new ContentError("Failed to find crypto by ID");
    }
  }
};

export default findCryptoById;
