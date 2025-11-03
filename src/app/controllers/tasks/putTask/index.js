const handleAPIError = require("~root/utils/handleAPIError");
const modifyTask = require("~root/actions/tasks/modifyTask");
const putTaskSchema = require("./schemas/putTaskSchema");

const putTask = async (req, res) => {
  const { userId } = req.user;
  const { taskId } = req.params;
  const { title, description, priority, dueDate, completed } = req.body;

  try {
    await putTaskSchema.validate(
      {
        title,
        description,
        priority,
        dueDate,
        completed
      },
      {
        abortEarly: false
      }
    );

    const updatedTask = await modifyTask({
      taskId,
      userId,
      title,
      description,
      priority,
      dueDate,
      completed
    });

    res.status(201).send({
      success: true,
      message: "Task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = putTask;
