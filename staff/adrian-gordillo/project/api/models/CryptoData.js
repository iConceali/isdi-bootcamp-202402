// api/models/CryptoData.js
import mongoose from "mongoose";

const cryptoDataSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  price24Hr: { type: Number, required: true },
  marketCap: { type: Number, required: true },
});

export default mongoose.model("CryptoData", cryptoDataSchema);
