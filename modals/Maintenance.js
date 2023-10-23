const mongoose = require("mongoose");

// Schema for the monthly maintenance details
const MonthlyDetailSchema = new mongoose.Schema({
    month:{
        type:String,
        required: true,
    },
  status: {
    type: String, // 'pending' or 'paid'
    enum: ["pending", "paid"],
    default: "pending",
  },
  due: {
    type: Date, // Due date for the month
  },
});

// Main Maintenance Schema
const MaintenanceSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  monthlyDetails: {
    jan: MonthlyDetailSchema,
    feb: MonthlyDetailSchema,
    mar: MonthlyDetailSchema,
    apr: MonthlyDetailSchema,
    may: MonthlyDetailSchema,
    jun: MonthlyDetailSchema,
    jul: MonthlyDetailSchema,
    aug: MonthlyDetailSchema,
    sep: MonthlyDetailSchema,
    oct: MonthlyDetailSchema,
    nov: MonthlyDetailSchema,
    dec: MonthlyDetailSchema,
  },
  amount:{
    type:Number
  },
  fine: {
    type: Number, // Fine amount (if applicable)
    default: 0,
  },
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);
