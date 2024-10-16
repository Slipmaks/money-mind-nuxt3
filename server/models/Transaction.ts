import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Связь с пользователем
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true }, // income или expense
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", TransactionSchema);
