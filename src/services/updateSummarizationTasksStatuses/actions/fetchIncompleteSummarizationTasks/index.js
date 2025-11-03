const selectIncompleteSummarizationTasks = require("./queries/selectIncompleteSummarizationTasks");

const fetchIncompleteSummarizationTasks = async () => {
  const incompleteTasks = await selectIncompleteSummarizationTasks();

  return incompleteTasks;
};

module.exports = fetchIncompleteSummarizationTasks;
