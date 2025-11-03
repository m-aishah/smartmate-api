const { submitQuery, getFirst } = require("~root/lib/database");

const selectNecessaryIds = async ({ lectureId }) => {
  const result = await getFirst(submitQuery)`
    SELECT 
      l.recording_id,
      l.summary_id,
      s.summarisation_task_id
    FROM lectures l
    LEFT JOIN summaries s ON l.summary_id = s.summary_id
    WHERE l.lecture_id = ${lectureId}
  `;

  if (!result) {
    throw new Error(`Lecture with ID ${lectureId} not found`);
  }

  return {
    summaryId: result.summary_id, // This could be null
    recordingId: result.recording_id,
    summarisationTaskId: result.summarisation_task_id // This will be null if summary_id is null
  };
};

module.exports = selectNecessaryIds;
