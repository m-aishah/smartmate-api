const audioProcessor = require("~root/services/audioProcessor");
const {
  PROGRESS_PERCENTAGE,
  TASK_STATUS
} = require("~root/constants/taskStatus");
const modifyLecture = require("~root/actions/lectures/modifyLecture");
const fetchIncompleteSummarizationTasks = require("./actions/fetchIncompleteSummarizationTasks");
const modifySummarizationTask = require("./actions/modifySummarizationTask");
const fetchSummaryByTaskId = require("./actions/fetchSummaryByTaskId");
const modifySummary = require("./actions/modifySummary");
const fetchLectureBySummaryId = require("./actions/fetchLectureBySummaryId");
// const removeProcessedTask = require("./actions/removeProcessedTask");

const updateSummarizationTasksStatuses = async () => {
  const incompleteTasks = await fetchIncompleteSummarizationTasks();

  for (const task of incompleteTasks) {
    const { taskId } = task;

    const taskDetails = await audioProcessor.getTaskStatus({ taskId });
    const {
      result,
      status,
      message,
      progress: progressPercentage,
      completed_at: completedAt
    } = taskDetails;

    // Update summary content if task is fully complete and has no errors
    if (
      String(progressPercentage) === PROGRESS_PERCENTAGE.COMPLETED &&
      status === TASK_STATUS.COMPLETED &&
      result &&
      !result.error
    ) {
      const {
        brief_summary: briefSummary,
        detailed_summary: detailedSummary,
        key_points: keyPoints,
        lecture_title: lectureTitle,
        lecture_description: lectureDescription
      } = result;

      const { summaryId } = await fetchSummaryByTaskId({ taskId });
      const { lectureId, userId } = await fetchLectureBySummaryId({
        summaryId
      });

      await modifySummary({
        summaryId,
        summaryTitle: lectureTitle,
        summaryDescription: lectureDescription,
        briefSummary,
        detailedSummary,
        keyPoints
      });

      if (lectureId) {
        await modifyLecture({
          lectureId,
          userId,
          lectureTitle,
          lectureDescription
        });
      }

      // await removeProcessedTask({ taskId });
    }
    // Always update task status
    await modifySummarizationTask({
      taskId,
      result,
      status,
      message,
      progressPercentage,
      completedAt
    });
  }
};

module.exports = updateSummarizationTasksStatuses;
