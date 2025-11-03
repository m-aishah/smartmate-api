const selectCourseByCourseCode = require("~root/actions/schemaHelpers/queries/selectCourseByCourseCode");
const insertSummary = require("./queries/insertSummary");

const createSummary = async ({
  courseCode,
  userId,
  summaryTitle,
  summaryDescription,
  briefSummary,
  detailedSummary,
  keyPoints,
  summarizationTaskId
}) => {
  const { courseId } = await selectCourseByCourseCode({ courseCode });
  const summaryId = await insertSummary({
    courseId,
    userId,
    summaryTitle,
    summaryDescription,
    briefSummary,
    detailedSummary,
    keyPoints,
    summarizationTaskId
  });

  return { summaryId };
};

module.exports = createSummary;
