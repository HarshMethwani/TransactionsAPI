import express from "express"
import mongoose from "mongoose";
import { GetNormalTransactionData } from "./controller/normalTransaction.js";
import { fetchPrice} from "./controller/fetchPrice.js";
import { calculateBalance } from "./controller/getBalance.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { normalTransactionRoute } from "./routes/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());


mongoose.connect("mongodb+srv://golumethwani2:682duXb5pEZGzKpz@transactions.9ttrgue.mongodb.net/?retryWrites=true&w=majority&appName=transactions")
        .then(console.log("Mongodb connected"))
        .catch((err)=>{console.log(err);});
app.get('/transactions/:address',GetNormalTransactionData );
console.log("ok");
app.get('/balance/:address',calculateBalance);
app.use('/', express.static(path.join(__dirname, 'express')));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
