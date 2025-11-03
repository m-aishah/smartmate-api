const selectUserTasks = require("./queries/selectUserTasks");

const fetchUserTasks = async ({ userId }) => {
  const tasks = await selectUserTasks({ userId });

  return { tasks };
};

module.exports = fetchUserTasks;
