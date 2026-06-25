const express = require("express")
const router = express.Router()
const Transaction = require("../models/Transaction");

const{
    addTransaction,
    getTransaction,
    deleteTransaction,
} = require("../controllers/transactionController")

const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransaction);
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;