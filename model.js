const mongoose = require("mongoose");
mongoose.connect(process.env.DBPASSWORD);

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Expense must have a category"],
    },
    amount: {
      type: Number,
      required: [true, "Expense must have an amount"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true } // this will add createdAt and updatedAt fields
);

const Expense = mongoose.model("Schema", expenseSchema);
module.exports = { Expense: Expense };
