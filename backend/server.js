const express = require("express")
const cors = require("cors")
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const transactionRoutes = require("./routes/transactionRoutes")

const app = express();

//connect db
connectDB();

//Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)

//test route
app.get("/", (req, res)=>{
    res.send("API is running..")
});

//port
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})