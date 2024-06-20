const express = require("express");
const model = require("./model");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get("/expenses", async (request, response) => {
  let expenses = await model.Expense.find();
  response.json(expenses);
});

app.post("/expenses", (request, response) => {
  const data = request.body;
  let newExpense = new model.Expense({
    category: data.category,
    amount: data.amount,
    description: data.description,
  });
  newExpense
    .save()
    .then(() => {
      response.status(201).send("Created expense");
      response.json(newExpense);
    })
    .catch(() => {
      response.status(400).send("Failed to create expense");
    });
});

app.delete("/expenses/:id", (request, response) => {
  model.Expense.findOneAndDelete({ _id: request.params.id }).then((expense) => {
    if (expense) {
      response.status(204).send("Removed expense from DB");
    } else {
      response.status(400).send("Expense not found");
    }
  });
});

app.get("/expenses/:id", (request, response) => {
  model.Expense.findOne({ _id: request.params.id }).then((expense) => {
    if (expense) {
      response.json(expense);
    } else {
      response.status(404).send("Expense not found :(");
    }
  });
});

app.put("/expenses/:id", (request, response) => {
  const updatedExpense = {
    category: request.body.category,
    amount: request.body.amount,
    description: request.body.description,
  };
  model.Expense.findByIdAndUpdate({ _id: request.params.id }, updatedExpense, {
    new: true,
  }).then((expense) => {
    if (expense) {
      response.status(204).json(expense);
    } else {
      response.status(400).send("Failed to update expense");
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
