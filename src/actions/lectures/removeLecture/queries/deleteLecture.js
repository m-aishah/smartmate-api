const { submitQuery } = require("~root/lib/database");

const deleteLecture = async ({
  recordingId,
  summaryId,
  summarisationTaskId,
  lectureId
}) => {
  await submitQuery`
        DELETE FROM
            lectures
        WHERE lecture_id = ${lectureId}
    `;

  if (summaryId) {
    await submitQuery`
        DELETE FROM
            summaries
        WHERE summary_id = ${summaryId}
    `;
  }

  if (summarisationTaskId) {
    await submitQuery`
        DELETE FROM
            model_stack_processor_tasks
        WHERE task_id = ${summarisationTaskId}
    `;
  }

  if (recordingId) {
    await submitQuery`
        DELETE FROM
            recordings
        WHERE recording_id = ${recordingId}
    `;
  }
};

module.exports = deleteLecture;
