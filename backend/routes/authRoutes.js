const express = require("express")
const router = express.Router();
const protect = require("../middleware/authMiddleware")

const { signupUser,loginUser } = require("../controllers/authController")

router.get("/test", (req, res) => {
  res.send("Auth route working");
})

router.get("/dashboard", protect, (req,res)=>{
  res.json({
    message: "welcome to dashboard",
    user: req.User
  })
})

router.get("/me", protect, (req,res)=>{
  res.status(200).json({
    user: req.user
  })
})

router.post("/signup", signupUser)
router.post("/login", loginUser)

module.exports = router;