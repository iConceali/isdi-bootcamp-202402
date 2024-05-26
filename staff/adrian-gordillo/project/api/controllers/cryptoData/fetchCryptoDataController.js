// api/controllers/cryptoData/fetchCryptoDataController.js

import { errors } from "com";
import fetchCryptoData from "../../services/cryptoData/fetchCryptoData";

const { SystemError } = errors;

const fetchCryptoDataController = async (req, res, next) => {
  try {
    const cryptoData = await fetchCryptoData();
    res.status(200).json(cryptoData);
  } catch (error) {
    if (error instanceof SystemError) {
      res.status(500).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default fetchCryptoDataController;
