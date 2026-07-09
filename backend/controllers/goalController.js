const Goal = require("../models/Goal");

exports.createGoal = async (req, res) => {
    try {
        const { title, targetAmount, savedAmount, deadline } = req.body;

        const goal = await Goal.create({
            user: req.user.id,
            title,
            targetAmount,
            savedAmount,
            deadline,
        })
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};


exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};


exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            })
        }

        res.json({
            message: "Goal deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}


exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id,
            },

            req.body,
            {
                new: true
            }
        )

        if (!goal) {
            return res.status(404).json({
                message: "Goal not found"
            })
        }

        res.json(goal);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.addSavings = async (req, res) => {
    try {
        const { amount } = req.body;

        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id,
        })

        if (!goal) {
            return res.status(404).json({
                message: "goal not found"
            })
        }
        if (!amount || amount <= 0) {

            return res.status(400).json({

                message: "Amount must be greater than zero"

            });

        }

        goal.savedAmount += Number(amount);
        if (goal.savedAmount > goal.targetAmount) {
            goal.savedAmount = goal.targetAmount;
        }
        await goal.save();
        res.json(goal);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}