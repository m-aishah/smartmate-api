const { submitQuery } = require("~root/lib/database");

const deleteSummary = async ({ summaryId, summarisationTaskId, lectures }) => {
  if (lectures && lectures.length > 0) {
    for (const lecture of lectures) {
      await submitQuery`
                DELETE FROM
                    lectures
                WHERE lecture_id = ${lecture.lectureId}
            `;
    }
  }

  await submitQuery`
        DELETE FROM
            summaries
        WHERE summary_id = ${summaryId}
    `;

  if (summarisationTaskId) {
    await submitQuery`
        DELETE FROM
            model_stack_processor_tasks
        WHERE task_id = ${summarisationTaskId}
    `;
  }
};

module.exports = deleteSummary;
