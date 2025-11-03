const yup = require("yup");

const putDeadlineSchema = yup.object().shape({
  title: yup
    .string()
    .label("Deadline Title")
    .required("The deadline title is required")
    .typeError("The deadline title must be a string"),
  date: yup
    .date()
    .label("Deadline Due Date")
    .required("The deadline due date is required")
    .typeError("The deadline due date must be a valid date")
});

module.exports = putDeadlineSchema;
