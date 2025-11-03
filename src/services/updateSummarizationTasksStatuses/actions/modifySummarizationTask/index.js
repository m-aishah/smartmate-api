const updateSummarizationTask = require("./queries/updateSummarizationTask");

const modifySummarizationTask = async ({
  taskId,
  result,
  status,
  message,
  progressPercentage,
  completedAt
}) => {
  await updateSummarizationTask({
    taskId,
    result,
    status,
    message,
    progressPercentage,
    completedAt
  });
};

module.exports = modifySummarizationTask;
