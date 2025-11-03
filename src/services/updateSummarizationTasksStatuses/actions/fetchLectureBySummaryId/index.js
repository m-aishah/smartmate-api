const selectLectureBySummaryId = require("./queries/selectLectureBySummaryId");

const fetchLectureBySummaryId = async ({ summaryId }) => {
  const lecture = await selectLectureBySummaryId({ summaryId });

  return lecture;
};

module.exports = fetchLectureBySummaryId;
