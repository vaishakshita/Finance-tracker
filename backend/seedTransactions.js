require("dotenv").config();

const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const USER_ID = "6a2bdd473305883088cf3432";

const transactions = [
    //JANUARY
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-01-02" },
    { title: "Freelancing", amount: 8000, type: "income", category: "salary", date: "2026-01-15" },
    { title: "House Rent", amount: 12000, type: "expense", category: "Bills", date: "2026-01-05" },
    { title: "Groceries", amount: 4500, type: "expense", category: "Grocery", date: "2026-01-09" },
    { title: "Shopping at mall", amount: 3500, type: "expense", category: "Shopping", date: "2026-01-18" },
    { title: "Movie", amount: 1200, type: "expense", category: "Entertainment", date: "2026-01-24" },

    //FEBRUARY
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-02-01" },
    { title: "Freelancing", amount: 10000, type: "income", category: "Salary", date: "2026-02-19" },
    { title: "Electricity Bill", amount: 2800, type: "expense", category: "Bills", date: "2026-02-07" },
    { title: "Dinner", amount: 2200, type: "expense", category: "Food and drinks", date: "2026-02-10" },
    { title: "Petrol", amount: 3000, type: "expense", category: "Travel", date: "2026-02-15" },
    { title: "Shopping", amount: 4200, type: "expense", category: "Shopping", date: "2026-02-26" },

    //MARCH
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-03-01" },
    { title: "Bonus", amount: 15000, type: "income", category: "Salary", date: "2026-03-20" },
    { title: "Internet Bill", amount: 1200, type: "expense", category: "Bills", date: "2026-03-06" },
    { title: "Pizza Party", amount: 1800, type: "expense", category: "Food and drinks", date: "2026-03-11" },
    { title: "Amazon Order", amount: 6000, type: "expense", category: "Shopping", date: "2026-03-18" },
    { title: "Concert", amount: 2500, type: "expense", category: "Entertainment", date: "2026-03-25" },

    //APRIL
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-04-01" },
    { title: "Freelancing", amount: 12000, type: "income", category: "Salary", date: "2026-04-21" },
    { title: "Rent", amount: 12000, type: "expense", category: "Bills", date: "2026-04-05" },
    { title: "Groceries", amount: 5200, type: "expense", category: "Grocery", date: "2026-04-08" },
    { title: "Train Ticket", amount: 3500, type: "expense", category: "Travel", date: "2026-04-17" },
    { title: "Shopping", amount: 4800, type: "expense", category: "Shopping", date: "2026-04-27" },

    //MAY
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-05-01" },
    { title: "Project Payment", amount: 18000, type: "income", category: "Salary", date: "2026-05-23" },
    { title: "Electricity Bill", amount: 2600, type: "expense", category: "Bills", date: "2026-05-06" },
    { title: "Restaurant", amount: 2800, type: "expense", category: "Food and drinks", date: "2026-05-13" },
    { title: "Vacation", amount: 7000, type: "expense", category: "Travel", date: "2026-05-18" },
    { title: "Netflix", amount: 799, type: "expense", category: "Entertainment", date: "2026-05-28" },

    //JUNE
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-06-01" },
    { title: "Freelancing", amount: 9000, type: "income", category: "Salary", date: "2026-06-18" },
    { title: "Rent", amount: 12000, type: "expense", category: "Bills", date: "2026-06-05" },
    { title: "Groceries", amount: 4900, type: "expense", category: "Grocery", date: "2026-06-09" },
    { title: "Shopping", amount: 5600, type: "expense", category: "Shopping", date: "2026-06-16" },
    { title: "Movie", amount: 1500, type: "expense", category: "Entertainment", date: "2026-06-25" },

    // ---------- JULY ----------
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-07-01" },
    { title: "Freelancing", amount: 10000, type: "income", category: "Salary", date: "2026-07-20" },
    { title: "House Rent", amount: 12000, type: "expense", category: "Bills", date: "2026-07-04" },
    { title: "Groceries", amount: 5200, type: "expense", category: "Grocery", date: "2026-07-08" },
    { title: "Dinner with Friends", amount: 2400, type: "expense", category: "Food and drinks", date: "2026-07-12" },
    { title: "Amazon Shopping", amount: 4800, type: "expense", category: "Shopping", date: "2026-07-18" },
    { title: "Movie Night", amount: 900, type: "expense", category: "Entertainment", date: "2026-07-26" },

    // ---------- AUGUST ----------
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-08-01" },
    { title: "Project Payment", amount: 14000, type: "income", category: "Salary", date: "2026-08-24" },
    { title: "Electricity Bill", amount: 2600, type: "expense", category: "Bills", date: "2026-08-05" },
    { title: "Groceries", amount: 4700, type: "expense", category: "Grocery", date: "2026-08-10" },
    { title: "Restaurant", amount: 1800, type: "expense", category: "Food and drinks", date: "2026-08-16" },
    { title: "Flight Ticket", amount: 8500, type: "expense", category: "Travel", date: "2026-08-22" },
    { title: "Headphones", amount: 3200, type: "expense", category: "Shopping", date: "2026-08-28" },

    // ---------- SEPTEMBER ----------
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-09-01" },
    { title: "Freelancing", amount: 9000, type: "income", category: "Salary", date: "2026-09-17" },
    { title: "Internet Bill", amount: 1200, type: "expense", category: "Bills", date: "2026-09-04" },
    { title: "Groceries", amount: 5100, type: "expense", category: "Grocery", date: "2026-09-08" },
    { title: "Pizza", amount: 1200, type: "expense", category: "Food and drinks", date: "2026-09-12" },
    { title: "Mall Shopping", amount: 6100, type: "expense", category: "Shopping", date: "2026-09-21" },
    { title: "Concert", amount: 2800, type: "expense", category: "Entertainment", date: "2026-09-29" },

    // ---------- OCTOBER ----------
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-10-01" },
    { title: "Bonus", amount: 20000, type: "income", category: "Salary", date: "2026-10-18" },
    { title: "House Rent", amount: 12000, type: "expense", category: "Bills", date: "2026-10-05" },
    { title: "Groceries", amount: 5300, type: "expense", category: "Grocery", date: "2026-10-09" },
    { title: "Cafe", amount: 1500, type: "expense", category: "Food and drinks", date: "2026-10-13" },
    { title: "Diwali Shopping", amount: 9800, type: "expense", category: "Shopping", date: "2026-10-20" },
    { title: "Weekend Trip", amount: 7000, type: "expense", category: "Travel", date: "2026-10-27" },

    // ---------- NOVEMBER ----------
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-11-01" },
    { title: "Freelancing", amount: 13000, type: "income", category: "Salary", date: "2026-11-21" },
    { title: "Electricity Bill", amount: 2400, type: "expense", category: "Bills", date: "2026-11-05" },
    { title: "Groceries", amount: 4800, type: "expense", category: "Grocery", date: "2026-11-10" },
    { title: "Dinner", amount: 2600, type: "expense", category: "Food and drinks", date: "2026-11-14" },
    { title: "Jacket", amount: 4500, type: "expense", category: "Shopping", date: "2026-11-18" },
    { title: "Movie", amount: 850, type: "expense", category: "Entertainment", date: "2026-11-26" },

    // ---------- DECEMBER ----------
    { title: "Salary", amount: 50000, type: "income", category: "Salary", date: "2026-12-01" },
    { title: "Year End Bonus", amount: 25000, type: "income", category: "Salary", date: "2026-12-22" },
    { title: "House Rent", amount: 12000, type: "expense", category: "Bills", date: "2026-12-04" },
    { title: "Groceries", amount: 6000, type: "expense", category: "Grocery", date: "2026-12-08" },
    { title: "Christmas Dinner", amount: 3500, type: "expense", category: "Food and drinks", date: "2026-12-15" },
    { title: "Gift Shopping", amount: 9000, type: "expense", category: "Shopping", date: "2026-12-20" },
    { title: "New Year Trip", amount: 11000, type: "expense", category: "Travel", date: "2026-12-29" },
];

async function seedDB() {
    try {
        await Transaction.deleteMany({ user: USER_ID });

        const data = transactions.map((t) => ({
            ...t,
            user: USER_ID,
        }));

        await Transaction.insertMany(data);

        console.log("Seed Data Inserted Successfully");

        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

seedDB();