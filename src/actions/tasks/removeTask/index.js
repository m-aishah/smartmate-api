const deleteTask = require("./queries/deleteTask");

const removeTask = async ({ taskId }) => {
  await deleteTask({
    taskId
  });
};

module.exports = removeTask;
