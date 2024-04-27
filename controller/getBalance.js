import express from 'express'
import axios from 'axios';

export const calculateBalance =async (req,res)=>{
    try{
    console.log(true);
    const {userAddress} = req.params
    const etherscanAPIKey = "85QBABZR8KQSYJB3WJV4VG4VXFQT2CZV46";
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${etherscanAPIKey}`;
    const response = await axios.get(apiUrl);
    const transaction = response.data.result;
    let balance = 0;
    const transactions = Array.from(transaction);
    transactions.forEach(transaction => {
        // Check if the 'to' and 'from' fields exist and are not undefined
        if (transaction.to && transaction.from) {
            // Convert 'to' and 'from' addresses to lowercase for comparison
            const toAddress = transaction.to.toLowerCase();
            const fromAddress = transaction.from.toLowerCase();

            // Check if the transaction is sent to the user's address
            if (toAddress === userAddress.toLowerCase()) {
                balance += parseInt(transaction.value);
            }
            // Check if the transaction is sent from the user's address
            if (fromAddress === userAddress.toLowerCase()) {
                balance -= parseInt(transaction.value);
            }
        }
    });

    res.json({ balance });
    }catch(err){
        console.log(err);
    }
}