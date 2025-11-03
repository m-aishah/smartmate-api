const yup = require("yup");
const selectTaskById = require("./queries/selectTaskById");

const deleteTaskSchema = yup.object().shape({
  taskId: yup
    .number()
    .integer()
    .required()
    .label("Task ID")
    .typeError("The task ID must be an integer")
    .test(
      "doesTaskExist",
      "The task does not exist, make sure the lectureId is valid ",
      async function doesTaskExist(taskId) {
        if (!taskId) return false;
        const count = await selectTaskById({ taskId });
        if (count === 0) return false;
        return true;
      }
    )
    .test(
      "isTaskDeleted",
      "The task is already deleted",
      async function isTaskDeleted(taskId) {
        if (!taskId) return false;
        const { isDeleted } = await selectTaskById({ taskId });
        if (isDeleted) return false;
        return true;
      }
    )
});

module.exports = deleteTaskSchema;
