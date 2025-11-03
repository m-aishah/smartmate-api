module.exports = {
  TASK_STATUS: {
    QUEUED: "queued",
    STARTING: "starting",
    PROCESSING: "processing",
    TRANSCRIBING: "transcribing",
    SUMMARIZING:
      "summarizing" || "summarizing with GPT" || "summarizing with BERT",
    COMPLETED: "completed",
    FAILED: "failed"
  },
  PROGRESS_PERCENTAGE: {
    NOT_STARTED: "0",
    STARTING: "5",
    PROCESSING: "10",
    TRANSCRIBING: "20",
    SUMMARIZING: "30",
    COMPLETED: "100"
  }
};
