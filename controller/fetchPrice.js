import Transaction from "../models/schema.js";
import axios from "axios";
export const   fetchPrice = async ()=>{
    try{
        const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr';
        const response = await axios.get(apiUrl);
        const ethereumPrice = response.data.ethereum.inr;
        return ethereumPrice;
    }catch(error){
        console.error('Error fetching transactions:', error.message);
        // res.status(500).json({ success: false, message: 'Error fetching transactions.' });
    }
}


