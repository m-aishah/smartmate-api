const yup = require("yup");
const selectDeadlineById = require("./queries/selectDeadlineById");

const deleteDeadlineSchema = yup.object().shape({
  deadlineId: yup
    .number()
    .integer()
    .required()
    .label("Deadline ID")
    .typeError("The deadline ID must be an integer")
    .test(
      "doesDeadlineExist",
      "The deadline does not exist, make sure the lectureId is valid ",
      async function doesDeadlineExist(deadlineId) {
        if (!deadlineId) return false;
        const count = await selectDeadlineById({ deadlineId });
        if (count === 0) return false;
        return true;
      }
    )
    .test(
      "isDeadlineDeleted",
      "The deadline is already deleted",
      async function isDeadlineDeleted(deadlineId) {
        if (!deadlineId) return false;
        const { isDeleted } = await selectDeadlineById({ deadlineId });
        if (isDeleted) return false;
        return true;
      }
    )
});

module.exports = deleteDeadlineSchema;
