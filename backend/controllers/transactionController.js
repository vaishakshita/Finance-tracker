const Transaction = require("../models/Transaction")

//Add transaction
exports.addTransaction = async(req,res)=>{
    try{
        const{title,amount,type,category} = req.body;

        const transaction = await Transaction.create({
            user:req.user.id,
            title,
            amount,
            type,
            category,
        })

        res.status(201).json(transaction)
    } catch (error){
        res.status(500).json({message:error.message})
    }
}

//get transaction
exports.getTransaction = async(req,res)=>{
    try{
        const transactions = await Transaction.find({user:req.user.id}).sort({Date: -1})
        res.status(200).json(transactions)
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

//delete transaction
exports.deleteTransaction = async(req,res)=>{
    try{
        const transaction = await Transaction.findByIdAndDelete(req.params.id)
        if(!transaction){
            return res.status(404).json({message:"transaction not found"})
        }
        await transaction.deleteOne()
        res.status(200).json({message: "Deleted Successfully"})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}