"use client";
import React from "react";
import {ResponsiveContainer,AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";

const ExpenseLineChart = ({ transactions }) => {

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

  const formatCurrency = (amount) =>
    `₹${amount.toLocaleString("en-IN")}`;

  // Initialize all months with 0 expense
  const monthlyData = {};

  monthNames.forEach((month) => {
    monthlyData[month] = {
      month,
      expense: 0,
    };
  });

  // Calculate monthly expenses
  transactions.forEach((transaction) => {

    if (transaction.type === "expense") {

      const month =
        monthNames[new Date(transaction.date).getMonth()];

      monthlyData[month].expense += transaction.amount;
    }
  });

  const chartData = Object.values(monthlyData);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 w-full h-[420px]">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height="85%">

        <AreaChart data={chartData}>

          <defs>

            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#EF4444"
                stopOpacity={0.4}
              />

              <stop
                offset="95%"
                stopColor="#EF4444"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis
            tickFormatter={formatCurrency}
          />

          <Tooltip
            formatter={(value) => formatCurrency(value)}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            strokeWidth={3}
            fill="url(#expenseGradient)"
            dot={{
              r: 5,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default ExpenseLineChart;