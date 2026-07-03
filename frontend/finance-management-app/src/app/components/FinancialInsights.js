import React from 'react'

const FinancialInsights = ({transactions}) => {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // total income
    const totalIncome = transactions.filter((transaction)=>transaction.type ==="income").reduce((sum,transaction)=> sum+transaction.amount, 0)

    // total expense
    const totalExpense = transactions.filter((transaction)=>transaction.type ==="expense").reduce((sum,transaction)=> sum+transaction.amount, 0)

    // savings rate
    const savingsRate = totalIncome === 0 ? 0 :(((totalIncome-totalExpense)/totalIncome * 100).toFixed(1))

    //monthly expense
    const monthlyExpense = {};
    monthNames.forEach((month)=>{
        monthlyExpense[month]=0;
    })
    transactions.forEach((transaction)=>{
        if(transaction.type==="expense"){
            const month = monthNames[new Date(transaction.date).getMonth()]
            monthlyExpense[month] += transaction.amount
        }
    })

    //Highest spending month
    let highestMonth = "";
    let highestExpense = 0;

    Object.entries(monthlyExpense).forEach(([month,amount])=>{
        console.log(month)
        if(amount>highestExpense){
            highestExpense = amount;
            highestMonth = month;
        }
    })

    //category Totals
    const categoryTotals = {};
    transactions.forEach((transaction)=>{
        if(transaction.type==="expense"){
            categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
        }
    })

    //Top category
    let topCategory =""
    let topCategoryAmount = 0;

    Object.entries(categoryTotals).forEach(([category,amount])=>{
        if(amount > topCategoryAmount){
            topCategory = category;
            topCategoryAmount = amount;
        }
    })

    //total transactions
    const totalTransactions = transactions.length;
  return (
    <div className='bg-white rounded-3xl shadow-lg p-6'>
      <h2 className='text-2xl font-bold mb-6'>Financial Insightes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-purple-100 rounded-xl p-5 shadow">
        <h3 className="text-gray-600 text-sm">Highest Spending Month</h3>
        <p className="text-3xl font-bold text-purple-700 mt-2">{highestMonth}</p>
        <p className="text-gray-700 mt-2">₹{highestExpense.toLocaleString("en-IN")}</p>
        </div>
      
        <div className="bg-blue-100 rounded-xl p-5 shadow">
        <h3 className="text-gray-600 text-sm">Top Expense Category</h3>
        <p className="text-3xl font-bold text-blue-700 mt-2">{topCategory}</p>
        <p className="text-gray-700 mt-2">₹{topCategoryAmount.toLocaleString("en-IN")}</p>
        </div>
    
        <div className="bg-green-100 rounded-xl p-5 shadow">
        <h3 className="text-gray-600 text-sm">Savings Rate</h3>
        <p className="text-3xl font-bold text-green-700 mt-2">{savingsRate}%</p>
        <p className="text-gray-700 mt-2">Saved this year</p>
        </div>
      
        <div className="bg-orange-100 rounded-xl p-5 shadow">
        <h3 className="text-gray-600 text-sm">Total Transactions</h3>
        <p className="text-3xl font-bold text-orange-600 mt-2">{totalTransactions}</p>
        <p className="text-gray-700 mt-2">Recorded transactions</p>
        </div>

      </div>
    </div>
  )
}

export default FinancialInsights
