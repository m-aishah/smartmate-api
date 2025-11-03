const {
  submitQuery,
  camelKeys,
  sqlValueOrNull
} = require("~root/lib/database");
const {
  TASK_STATUS,
  PROGRESS_PERCENTAGE
} = require("~root/constants/taskStatus");

const selectIncompleteSummarizationTasks = async () => submitQuery`
    SELECT
        task_id
    FROM
        model_stack_processor_tasks
    WHERE
        status != ${sqlValueOrNull(
          TASK_STATUS.COMPLETED
        )} AND progress_percentage != ${sqlValueOrNull(
  PROGRESS_PERCENTAGE.COMPLETED
)}
    ORDER BY
        created_at DESC
`;

module.exports = camelKeys(selectIncompleteSummarizationTasks);
