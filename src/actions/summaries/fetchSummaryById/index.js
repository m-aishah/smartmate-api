const selectSummaryById = require("./queries/selectSummaryById");

const fetchSummaryById = async ({ userId, summaryId }) => {
  const summary = await selectSummaryById({ userId, summaryId });

  return { summary };
};

module.exports = fetchSummaryById;
