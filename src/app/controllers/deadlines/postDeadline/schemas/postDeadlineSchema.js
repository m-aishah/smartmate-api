const yup = require("yup");

const postDeadlineSchema = yup.object().shape({
  title: yup
    .string()
    .label("Deadline Title")
    .required("The deadline title is required")
    .typeError("The deadline title must be a string"),
  description: yup
    .string()
    .label("Deadline Description")
    .typeError("The deadline description must be a string"),
  priority: yup
    .string()
    .label("Deadline Priority")
    .oneOf(
      ["high", "medium", "low"],
      "The deadline priority must be either high, medium or low"
    ),
  date: yup
    .date()
    .label("Deadline Due Date")
    .required("The deadline due date is required")
    .typeError("The deadline due date must be a valid date"),
  completed: yup
    .boolean()
    .label("Deadline Completed?")
    .typeError("The completion status must be a boolean")
});

module.exports = postDeadlineSchema;
