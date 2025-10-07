
import {sql } from '../config/db.js'

const addTransaction = async (req, res) => {
    try {
        const { user_id, title, amount, category } = req.body;

        if (!user_id || !title || !category || amount === undefined) {
            return res.status(400).json(
                {
                    "message": 'All fields are required'
                }
            )
        }

        const transaction = await sql`
                    INSERT INTO transanctions(user_id,title,amount,category)
                    VALUES (${user_id},${title},${amount},${category})
                    RETURNING *
        `;
        console.log(transaction);

        return res.status(201).json(
            transaction[0]
        )
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                'message': "Error in creating transaction"
            }
        )
    }
}

const getAllTransactionById = async (req, res) =>{
    try {
        const {userId} = req.params;
    
        const transactions = await sql`SELECT * FROM transanctions WHERE user_id = ${userId} ORDER BY created_at DESC`; 
    
        return res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                'message': "Error in fetching transaction for a user"
            }
        )
    }
}

const deleteTransactionById = async (req, res)=>{
    try {
        const {transaction_id} = req.params;
    
        if(isNaN(parseInt(transaction_id))){
            return res.status(401).json({"message":"Transaction Id is invalid"})
        }

        const result = await sql`DELETE FROM transanctions WHERE id=${transaction_id} RETURNING *`

        if(result.length === 0){
            return res.status(500).json({"message": "NO Transaction is found"})
        }

        return res.status(200).json(
            {
                "message": "Transaction Deleted Succesfulllys"
            }
        )

    } catch (error) {
         console.log(error)
        res.status(500).json(
            {
                'message': "Error in deleting transaction"
            }
        )
    }
}

const getSummaryByUserId = async (req, res) =>{
    try {
        const {userId} = req.params;

        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as balance FROM transanctions WHERE user_id = ${userId}
        `;

        const earningResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as earnings FROM transanctions WHERE user_id= ${userId} AND amount > 0 ;
        `

        const expenseResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transanctions WHERE user_id= ${userId} AND amount < 0 ;
        `
        console.log(balanceResult)

        return res.status(200).json(
            {
                balance : balanceResult[0].balance,
                income: earningResult[0].earnings,
                expenses: expenseResult[0].expenses
            }
        )

        
    } catch (error) {
        console.log(error)
        res.status(500).json(
            {
                'message': "Error in Fetching Summary"
            }
        )
    }
}

export {
    addTransaction,
    getAllTransactionById,
    deleteTransactionById,
    getSummaryByUserId
}