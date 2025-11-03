const updateSummary = require("./queries/updateSummary");

const modifySummary = async ({
  summaryId,
  userId,
  summaryTitle,
  summaryDescription,
  briefSummary,
  detailedSummary,
  keyPoints
}) => {
  const updatedSummary = await updateSummary({
    summaryId,
    userId,
    summaryTitle,
    summaryDescription,
    briefSummary,
    detailedSummary,
    keyPoints
  });

  return { updatedSummary };
};

module.exports = modifySummary;
