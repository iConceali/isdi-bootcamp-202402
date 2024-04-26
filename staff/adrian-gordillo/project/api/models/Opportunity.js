import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // 'standard' o 'triangular'
    symbol: String,
    buyExchange: String,
    buyPrice: Number,
    sellExchange: String,
    sellPrice: Number,
    profit: Number,
    from: String,
    to: String,
    amount: Number,
    trades: [
      {
        from: String,
        to: String,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
