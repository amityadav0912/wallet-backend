import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from './config/db.js'

dotenv.config()

const app = express();

app.use(express.json());
app.use(rateLimiter)

const PORT = process.env.PORT || 5001;

import transactionRoute from './routes/transaction.route.js'
import rateLimiter from "./middleware/rateLimiter.js";
import job from './config/cron.js'

app.use('/api/transactions', transactionRoute);  
job.start() 

app.get('api/health', (req, res)=>{
    return res.status(200).json(
        {
            "status": "OK"
        }
    )
})

initDB().then(
    app.listen(PORT, () => {
        console.log("App is listening on port :: ", PORT)
    })
);
