// api/models/CryptoPrice.js
import mongoose from "mongoose";

const cryptoPriceSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  price24Hr: { type: Number, required: true },
  marketCap: { type: String, required: true },
});

export default mongoose.model("CryptoPrice", cryptoPriceSchema);
