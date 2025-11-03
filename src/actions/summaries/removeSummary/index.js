const selectSummarisationTaskBySummaryId = require("./queries/selectSummarisationTaskBySummaryId");
const selectLecturesBySummaryId = require("./queries/selectLecturesBySummaryId");
const deleteSummary = require("./queries/deleteSummary");

const removeSummary = async ({ summaryId }) => {
  const { summarisationTaskId } = await selectSummarisationTaskBySummaryId({
    summaryId
  });

  const lectures = await selectLecturesBySummaryId({ summaryId });

  await deleteSummary({
    summaryId,
    summarisationTaskId,
    lectures
  });
};

module.exports = removeSummary;
