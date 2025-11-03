const updateSummary = require("./queries/updateSummary");

const modifySummary = async ({
  summaryId,
  summaryTitle,
  summaryDescription,
  briefSummary,
  detailedSummary,
  keyPoints
}) => {
  await updateSummary({
    summaryId,
    summaryTitle,
    summaryDescription,
    briefSummary,
    detailedSummary,
    keyPoints
  });
};

module.exports = modifySummary;
