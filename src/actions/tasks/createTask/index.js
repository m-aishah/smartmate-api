const insertTask = require("./queries/insertTask");

const createTask = async ({
  userId,
  title,
  description = "",
  priority,
  dueDate,
  completed
}) => {
  const taskId = await insertTask({
    userId,
    title,
    description,
    priority,
    dueDate,
    completed
  });
  return { taskId };
};

module.exports = createTask;
