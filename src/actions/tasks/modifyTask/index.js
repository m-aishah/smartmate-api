const updateTask = require("./queries/updateTask");

const modifyTask = async ({
  taskId,
  userId,
  title,
  description = "",
  priority,
  dueDate,
  completed
}) => {
  const updatedTask = await updateTask({
    taskId,
    userId,
    title,
    description,
    priority,
    dueDate,
    completed
  });

  return { updatedTask };
};

module.exports = modifyTask;
