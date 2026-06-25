const jwt = require("jsonwebtoken")
const User = require("../models/User")

const protect = async(req, res, next)=>{
    try{
        let token
        if (req.headers.authorization){
            token = req.headers.authorization.split(" ")[1] //Get token from request
            const decoded = jwt.verify(token, "secretkey") //verify token
            req.user = await User.findById(decoded.id) //find user in db

            next() //next step
        } else {
            res.status(401).json({message: "not authorized"})
        }
    } catch(error){
        res.status(401).json({message: "token failed"})
    }
}

module.exports = protect