const express = require("express")
const router = express.Router();
const goal = require("../models/Goal")

const{
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
    addSavings,
} = require("../controllers/goalController")

const authMiddleware = require("../middleware/authMiddleware")

router.post("/",authMiddleware,createGoal)
router.get("/",authMiddleware,getGoals)
router.put("/:id",authMiddleware,updateGoal)
router.delete("/:id",authMiddleware,deleteGoal)
router.patch("/:id/add-savings",authMiddleware,addSavings)

module.exports = router;