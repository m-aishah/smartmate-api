const handleAPIError = require("~root/utils/handleAPIError");
const removeTask = require("~root/actions/tasks/removeTask");
const deleteTaskSchema = require("./schemas/deleteTaskSchema");

const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await deleteTaskSchema.validate(
      { taskId },
      {
        abortEarly: false
      }
    );

    const response = await removeTask({ taskId });

    res.status(204).send(response);
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = deleteTask;
