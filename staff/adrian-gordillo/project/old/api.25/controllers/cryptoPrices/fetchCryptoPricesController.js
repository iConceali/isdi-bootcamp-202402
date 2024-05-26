// api/controllers/cryptoPrices/fetchCryptoPricesController.js

import { errors } from "com";
import fetchCryptoPrices from "../../services/cryptoPrices/fetchCryptoPrices";

const { SystemError } = errors;

const fetchCryptoPricesController = async (req, res, next) => {
  try {
    const cryptoPrices = await fetchCryptoPrices();
    res.status(200).json(cryptoPrices);
  } catch (error) {
    if (error instanceof SystemError) {
      res.status(500).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

export default fetchCryptoPricesController;
