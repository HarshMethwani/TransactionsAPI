import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  blockNumber: { type: Number, required: true },
  timeStamp: { type: Date, required: true },
  hash: { type: String, required: true, unique: true },
  blockHash: String,
  transactionIndex: Number,
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: String, required: true },
  gas: Number,
  gasPrice: { type: String, required: true },
  isError: { type: Number, required: true },
  txreceipt_status: Number,
  input: String,
  contractAddress: String,
  cumulativeGasUsed: Number,
  gasUsed: Number,
  confirmations: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction
