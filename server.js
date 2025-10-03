import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from './src/config/db.js'

dotenv.config()

const app = express();

app.use(express.json());
app.use(rateLimiter)

const PORT = process.env.PORT || 5001;

import transactionRoute from './src/routes/transaction.route.js'
import rateLimiter from "./src/middleware/rateLimiter.js";

app.use('/api/transactions', transactionRoute);   

initDB().then(
    app.listen(PORT, () => {
        console.log("App is listening on port :: ", PORT)
    })
);
