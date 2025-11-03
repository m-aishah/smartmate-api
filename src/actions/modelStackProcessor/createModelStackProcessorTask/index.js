const insertModelStackProcessorTask = require("./queries/inserModelProcessorTask");

const createModelStackProcessorTask = async ({
  taskId,
  taskType,
  result = null,
  status = "pending",
  message = null,
  statusUrl = null,
  progressPercentage = 0
}) => {
  await insertModelStackProcessorTask({
    taskId,
    taskType,
    result,
    status,
    message,
    statusUrl,
    progressPercentage
  });

  return taskId;
};
module.exports = createModelStackProcessorTask;
