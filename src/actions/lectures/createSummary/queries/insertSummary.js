const { submitQuery, getInsertId } = require("~root/lib/database");

const insertSummary = ({
  courseId,
  userId,
  summaryTitle,
  summaryDescription,
  briefSummary,
  detailedSummary,
  keyPoints,
  summarizationTaskId
}) => submitQuery`

    INSERT INTO summaries
    (
        course_id,
        created_by,
        summary_title,
        summary_description,
        brief_summary,
        detailed_summary,
        key_points,
        summarisation_task_id
    )
    VALUES
    (
        ${courseId},
        ${userId},
        ${summaryTitle},
        ${summaryDescription},
        ${briefSummary},
        ${detailedSummary},
        ${keyPoints},
        ${summarizationTaskId}
    )
`;

module.exports = getInsertId(insertSummary);
