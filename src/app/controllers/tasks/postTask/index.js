const handleAPIError = require("~root/utils/handleAPIError");
const createTask = require("~root/actions/tasks/createTask");
const postTaskSchema = require("./schemas/postTaskSchema");

const postTask = async (req, res) => {
  const { userId } = req.user;
  const { title, description, priority, dueDate, completed } = req.body;

  try {
    await postTaskSchema.validate(
      {
        userId,
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

    const { taskId } = await createTask({
      userId,
      title,
      description,
      priority,
      dueDate,
      completed
    });

    res.status(201).send({
      id: taskId
    });
  } catch (err) {
    handleAPIError(res, err);
  }
};

module.exports = postTask;
