const yup = require("yup");

const postTaskSchema = yup.object().shape({
  title: yup
    .string()
    .label("Task Title")
    .required("The task title is required")
    .typeError("The task title must be a string"),
  description: yup
    .string()
    .label("Task Description")
    .typeError("The task description must be a string"),
  priority: yup
    .string()
    .label("Task Priority")
    .required("The task task priority is required")
    .oneOf(
      ["high", "medium", "low"],
      "The task priority must be either high, medium or low"
    ),
  dueDate: yup
    .date()
    .label("Task Due Date")
    .nullable()
    .typeError("The task due date must be a valid date"),
  completed: yup
    .boolean()
    .label("Task Completed?")
    .required("The completion status is required")
    .typeError("The completion status must be a boolean")
});

module.exports = postTaskSchema;
