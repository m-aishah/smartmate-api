const selectSummaryByTaskId = require("./queries/selectSummaryByTaskId");

const fetchSummaryByTaskId = async ({ taskId }) => {
  const { summaryId } = await selectSummaryByTaskId({ taskId });

  return { summaryId };
};

module.exports = fetchSummaryByTaskId;
