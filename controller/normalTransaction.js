import Transaction from "../models/schema.js";
import axios from "axios";
// import etherscanAPIKey from "../config/config.js"
export const GetNormalTransactionData = async (req,res) =>{
  try{
    const {address} = req.params;
    const etherscanAPIKey = "85QBABZR8KQSYJB3WJV4VG4VXFQT2CZV46";
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanAPIKey}`;
    const response = await axios.get(apiUrl);
    const transactions = response.data.result;
    try{await Promise.all(transactions.map(async (tx) => {
        const transaction = new Transaction({
            blockNumber: tx.blockNumber,
            timeStamp: new Date(tx.timeStamp * 1000), // Convert timestamp to Date object
            hash: tx.hash,
            nonce: tx.nonce,
            blockHash: tx.blockHash,
            transactionIndex: tx.transactionIndex,
            from: tx.from,
            to: tx.to,
            value: tx.value,
            gas: tx.gas,
            gasPrice: tx.gasPrice,
            isError: Boolean(tx.isError),
            txReceiptStatus: tx.txreceipt_status,
            input: tx.input,
            contractAddress: tx.contractAddress,
            cumulativeGasUsed: tx.cumulativeGasUsed,
            gasUsed: tx.gasUsed,
            confirmations: tx.confirmations
          });
          await transaction.save();
        }));}catch(err){
          res.json({ success: true, message: 'Transactions alerady stored successfully.' });  
        }
        console.log("transaction aleray in database");
        res.json({ success: true, message: 'Transactions fetched and stored successfully.' });
      }catch (error) {
    console.error('Error fetching transactions:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching transactions.' });
  }
}