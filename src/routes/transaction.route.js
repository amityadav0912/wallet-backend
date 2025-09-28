import express from "express"

const router = express.Router()
import {
 addTransaction,
 getAllTransactionById,
 deleteTransactionById,
 getSummaryByUserId
} from '../controller/transaction.controller.js'

router.post('/', addTransaction );
router.get('/:userId', getAllTransactionById);
router.delete('/:transaction_id', deleteTransactionById);
router.get('/summary/:userId', getSummaryByUserId)

export default router;