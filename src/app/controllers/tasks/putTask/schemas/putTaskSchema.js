const yup = require("yup");

const putTaskSchema = yup.object().shape({
  title: yup
    .string()
    .label("Task Title")
    .typeError("The task title must be a string"),
  description: yup
    .string()
    .label("Task Description")
    .typeError("The task description must be a string"),
  priority: yup
    .string()
    .label("Task Priority")
    .oneOf(
      ["high", "medium", "low"],
      "The task priority must be either high, medium or low"
    ),
  dueDate: yup
    .date()
    .label("Task Due Date")
    .typeError("The task due date must be a valid date"),
  completed: yup
    .boolean()
    .label("Task Completed?")
    .typeError("The completion status must be a boolean")
});

module.exports = putTaskSchema;
