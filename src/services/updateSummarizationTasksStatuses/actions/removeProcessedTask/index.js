const deleteProcessedTask = require("./queries/deleteProcessedTask");

const removeProcessedTask = async ({ taskId }) => {
  const processedTask = await deleteProcessedTask({ taskId });

  return { processedTask };
};

module.exports = removeProcessedTask;
